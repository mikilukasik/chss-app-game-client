import { move2moveString } from '../../../../chss-module-engine/src/engine_new/transformers/move2moveString';
import { generatePseudoMoves } from '../../../chss-module-engine/src/engine_new/moveGenerators/generatePseudoMoves';
import { board2fen } from '../../../chss-module-engine/src/engine_new/transformers/board2fen';
import { getMovedBoard } from '../../../chss-module-engine/src/engine_new/utils/getMovedBoard';
import { isCaptured } from '../../../chss-module-engine/src/engine_new/utils/isCaptured';

export const solveSmallMoveTaskOnSubWorkers = ({ smallMoveTask, getNextAvailableWorker }) =>
  new Promise(async (resolve) => {
    const {
      move,
      currentBest = [],
      board,
      desiredDepth,
      popularMoves,
      nextMoves,
      moveTree = [],
      dontLoop,
      repeatedPastFens = [],
      perft = false,
    } = smallMoveTask;
    const currentBests = Array.from({ length: desiredDepth }).map(() => -32768);
    const movedBoard = getMovedBoard(move, board);

    let castlingScore = 0;

    if (board[65] !== movedBoard[65]) {
      if (board[64]) {
        // computer plays white
        // TODO: implement white castling value score
      } else {
        const qSideChangeVal = (board[65] & 1) !== (movedBoard[65] & 1) ? 50 : 0;
        const kSideChangeVal = (board[65] & 2) !== (movedBoard[65] & 2) ? 50 : 0;

        if (![4102, 4098].includes(move)) castlingScore += qSideChangeVal + kSideChangeVal;
      }
    }

    let loopScore = 0;
    if (repeatedPastFens.includes(board2fen(movedBoard))) {
      // move would loop
      loopScore = 2000;

      if (!dontLoop) loopScore *= -1;
      if (movedBoard[64] === 0) loopScore *= -1;
    }

    const depth2Moves = nextMoves || Array.from(generatePseudoMoves(movedBoard));
    const d2MovesCopy = depth2Moves.slice();

    let aborted = false;

    const moveCountPerDepth = new Int32Array(desiredDepth + 1);
    moveCountPerDepth[2] = depth2Moves.length;

    const res = [];
    const evaluateMove = async () => {
      if (res.length === 0) {
        if (isCaptured(movedBoard, movedBoard.indexOf(6 + (movedBoard[64] << 3)), movedBoard[64])) {
          // checkmate
          res.push({ score: movedBoard[64] ? -32000 : 32000, moveTree: [move] });
        } else {
          // TODO: use shouldloop, shouldidraw
          res.push({ score: movedBoard[64] ? 120 : -120, moveTree: [move] });
        }
      }

      // TODO: play with white?
      res.sort((a, b) => b.score - a.score);
      d2MovesCopy.sort((a, b) => {
        let aIndex = res.findIndex((r) => r.d2Move === a);
        let bIndex = res.findIndex((r) => r.d2Move === b);

        if (aIndex === -1) aIndex = 127;
        if (bIndex === -1) bIndex = 127;

        return bIndex - aIndex;
      });

      const result = {
        move,
        nextMoves: d2MovesCopy,
        score: res[0].score, // + loopScore + castlingScore,
        aiValue: res[0].aiVal,
        pieceScore: res[0].score,
        moveTree: res[0].moveTree,
        moveCountPerDepth: Array.from(moveCountPerDepth),
      };

      return resolve(result);
    };

    const mergeCurrentBests = (receivedCurrentBests) => {
      const valueToUse = receivedCurrentBests[0];
      if (
        currentBests[0] === -32768 ||
        (board[64] === 0 && valueToUse > currentBests[0]) ||
        (board[64] === 1 && valueToUse < currentBests[0])
      ) {
        currentBests[0] = valueToUse;
      }
    };

    let tasksLength = depth2Moves.length;
    while (depth2Moves.length > 0) {
      if (aborted) return;
      const { worker, release } = await getNextAvailableWorker();

      if (aborted) {
        release();
        return;
      }

      const d2Move = depth2Moves.pop();

      worker.onmessage = async ({ data }) => {
        if (data.score === -32768) {
          // that was an illegal return move
          tasksLength -= 1;
          release();
          if (res.length === tasksLength) evaluateMove();
          return;
        }

        data.score += loopScore + castlingScore;

        if (currentBest[0] !== -32768 && !perft) {
          if (data.score > currentBest[0]) {
            // abort, server already has a better move than this

            res.push({ ...data, d2Move, moveTree: [move, ...(data.moveTree || [])] });

            evaluateMove();
            release();
            depth2Moves.length = 0;
            aborted = true;
            return;
          }

          if (data.score === currentBest[0]) {
            // abort, server already has a move at least as good as this
            // make this move worst than the currentbest to make sure it won't be used
            // TODO: implement white version of the same
            data.score = 32767;

            res.push({ ...data, d2Move, moveTree: [move, ...(data.moveTree || [])] });

            evaluateMove();
            release();
            depth2Moves.length = 0;
            aborted = true;
            return;
          }
        }

        res.push({ ...data, d2Move, moveTree: [move, ...(data.moveTree || [])] });

        mergeCurrentBests(data.currentBests);
        release();
        if (res.length === tasksLength) evaluateMove();
      };

      worker.postMessage({
        board: movedBoard,
        move: d2Move,
        currentBests,
        desiredDepth,
        moveTree: moveTree.slice(2),
        origMove: move,
        repeatedPastFens,
        dontLoop,
      });
    }
  });
