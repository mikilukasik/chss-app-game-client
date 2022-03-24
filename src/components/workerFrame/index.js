import { h } from 'preact';

const WorkerFrame = () => {
  const src = `http://${typeof window === 'undefined' || window.location.hostname}:3300/workers/learner.html`;

  return <iframe src={src} style="position: absolute;width:0;height:0;border:0;" />;
};

export default WorkerFrame;
