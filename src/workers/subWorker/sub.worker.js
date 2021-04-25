import { solveDeepeningTask } from '../../../chss-engine/src/engine/engine';

(async() => {
  onmessage = ({ data }) => {
    // 1st message will be an init hello, comes only once
    postMessage('hello');

    onmessage = ({ data }) => postMessage(solveDeepeningTask(data, true));
  };
})();
