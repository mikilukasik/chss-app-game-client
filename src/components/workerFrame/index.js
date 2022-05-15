import { h } from 'preact';
import uuid from 'uuid-random';

const frameNames = ['learner', 'aiClient'];

const getSrc = (frameName) =>
  `http://${typeof window === 'undefined' || window.location.hostname}:3300/workers/${frameName}.html`;

const workerFrameRefs = {};
const getFrame = (frameName) =>
  new Promise((resolve) => {
    if (workerFrameRefs[frameName]) return resolve(workerFrameRefs[frameName]);

    workerFrameRefs[frameName] = document.getElementById(`frame-${frameName}`);
    if (workerFrameRefs[frameName]) return resolve(workerFrameRefs[frameName]);

    const intervalId = setInterval(() => {
      if (workerFrameRefs[frameName]) {
        resolve(workerFrameRefs[frameName]);
        clearInterval(intervalId);
        return;
      }

      workerFrameRefs[frameName] = document.getElementById(`frame-${frameName}`);
      if (workerFrameRefs[frameName]) {
        resolve(workerFrameRefs[frameName]);
        clearInterval(intervalId);
      }
    }, 20);
  });

const getFrameWindow = async (frameName) => (await getFrame(frameName)).contentWindow;

const responseAwaiters = {};

const toFrame = ({ frameName, cmd, data }) =>
  new Promise((resolve, reject) => {
    const id = uuid();
    responseAwaiters[id] = { resolve, reject };
    getFrameWindow(frameName).then((w) => w.postMessage({ cmd, data, id }, '*'));
  });

export const aiWorker = {
  do: (cmd, data) => toFrame({ frameName: 'aiClient', cmd: 'toWorker', data: { workerName: 'mainWorker', cmd, data } }),
};

window.addEventListener(
  'message',
  async ({ data: rawData }) => {
    try {
      const { error, response, id } = rawData;
      if (!responseAwaiters[id] || (!error && !response)) return;

      if (error) {
        responseAwaiters[id].reject(error);
        delete responseAwaiters[id];
        return;
      }

      responseAwaiters[id].resolve(response);
      delete responseAwaiters[id];
    } catch (e) {
      // console.error(e);
      console.warn(e, { rawData });
    }
  },
  false,
);

window.CHSS = Object.assign(window.CHSS || {}, {
  getFrame,
  getFrameWindow,
  toFrame,
  aiWorker,
});

const WorkerFrame = () => {
  return frameNames.map((frameName) => (
    <iframe src={getSrc(frameName)} style="position: absolute;width:0;height:0;border:0;" id={`frame-${frameName}`} />
  ));
};

export default WorkerFrame;
