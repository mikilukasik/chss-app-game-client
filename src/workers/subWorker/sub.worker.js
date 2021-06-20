import { getValueFromNN, solveDeepeningTaskOnNN } from '../../../../chss-module-engine/src/engine/ai';
import { solveDeepeningTask, tableToAptString, getNormalizedMoveTree } from '../../../chss-module-engine/src/engine/engine';

(async() => {
  onmessage = ({ data }) => {
    // 1st message will be an init hello, comes only once
    postMessage('hello');

    onmessage = ({ data }) => {
      try {

        // console.log({ data })
        // redo
        const secondMovedTableApt = tableToAptString(data.table);
        const wouldLoop = data.repeatedPastTables.includes(secondMovedTableApt);
        
        if (wouldLoop) {
          console.log('it would loop', data.shouldIDraw)
          data.score = data.shouldIDraw
            ? data.score + 6000
            : data.score - 6000;
        }

        const valueFromNN = getValueFromNN(data);




        // data.score += valueFromNN;

        // console.log({ valueFromNN })
        // data.currentBests=[]

        // const resp = solveDeepeningTask(data, true)
        // if (!resp) return postMessage(resp);
        // resp.score += valueFromNN * 10;
        // postMessage(resp);

        postMessage(solveDeepeningTaskOnNN(data, true));
      } catch (e) {
        if (e !== 'illegal') throw e;

        postMessage(null)
      }
    }
  };
})();
