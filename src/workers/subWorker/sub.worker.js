import { solveDeepeningTaskOnNN } from '../../../../chss-module-engine/src/engine/ai';
import { solveDeepeningTask, tableToAptString } from '../../../chss-module-engine/src/engine/engine';

(async() => {
  onmessage = ({ data }) => {
    // 1st message will be an init hello, comes only once
    postMessage('hello');

    onmessage = ({ data }) => {
      try {
        const secondMovedTableApt = tableToAptString(data.table);
        const wouldLoop = data.repeatedPastTables.includes(secondMovedTableApt);
        
        if (wouldLoop) {
          console.log('it would loop', data.repeatedPastTables)
          data.score = data.shouldIDraw
            ? data.score + 6000
            : data.score - 6000;
        }

        postMessage(solveDeepeningTask(data, true));
      } catch (e) {
        if (e !== 'illegal') throw e;

        postMessage(null)
      }
    }
  };
})();
