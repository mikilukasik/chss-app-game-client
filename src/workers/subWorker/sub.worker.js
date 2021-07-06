import { evaluateMove } from '../../../chss-module-engine/src/engine_new/evaluators/evaluateMove';

(async() => {
  onmessage = ({ data }) => {
    // 1st message will be an init hello, comes only once
    postMessage('hello');

    onmessage = ({ data }) => {
      try {
        const result = evaluateMove(data, true);
        postMessage(result);
      } catch (e) {
        if (e !== 'illegal') throw e;

        postMessage(null)
      }
    }
  };
})();
