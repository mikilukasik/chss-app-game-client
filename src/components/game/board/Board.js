import { h } from 'preact';
import style from './style.scss';

import { useContext, useEffect, useState } from 'preact/hooks';
import GameContext from '../../../context/GameContext';
import { moveInBoard } from '../../../../chss-module-engine/src/engine/engine';
import { ProgressBar } from '../progressBar';
import UserContext from '../../../context/UserContext';
import { MovePager } from '../movePager';
import { ReplayBoard } from '../replayBoard';
import { getPlayerSocket, setCurrentGameState } from '../../../services/gamesService';
import { toNested } from '../../../utils/toNested';
import { move2moveString } from '../../../../../chss-module-engine/src/engine_new/transformers/move2moveString';
import { getPieceBalance } from '../../../../chss-module-engine/src/engine_new/evaluators/evaluateBoard';

/* debug */ let started;

const previosTable = [];
for (let x = 0; x < 8; x += 1) {
  previosTable[x] = [];
  for (let y = 0; y < 8; y += 1) previosTable[x][y] = [];
}

export const Board = () => {
  const { gameState, setGameState, isNewGameState, setIsNewGameState, replayMoveNumber, setReplayMoveNumber } = useContext(GameContext);
  const [moveSourceCell, setMoveSourceCell] = useState();
  const [movePotentialTargetCells, setMovePotentialTargetCells] = useState([]);
  const [progressTotal, setProgressTotal] = useState();
  const [progressCompleted, setProgressCompleted] = useState();
	const { user: { userId } = {}, userSettings } = useContext(UserContext);

  if (!gameState) return null;
  setCurrentGameState(gameState);

  const { board, nextMoves, bitBoard: _bitBoard } = gameState;

  if (isNewGameState) {
    setMoveSourceCell(null);
    setMovePotentialTargetCells([]);
  }

  useEffect(() => {
    setReplayMoveNumber(-1); // replay off
  }, [gameState]);

  /* debug */
  /* debug */ const displayStats = (stats) => {
  /* debug */   const converted = stats
  /* debug */     .map(stat => `${(stat.score /* - stat.aiValue */).toFixed(5).padStart(8)} ${stat.moveTree.filter(Boolean).map(m => move2moveString(m)).join(' ')}`);
  /* debug */   console.log(`\n\n%c${converted.join('\n%c')}`, ...converted.map((l, i) => i % 2 ? 'background: #ddd' : ''));
  /* debug */ }
  /* debug */
  /* debug */ getPlayerSocket().then(playerSocket => {
  /* debug */   playerSocket.on('displayStats', (stats, comms) => {
  /* debug */     displayStats(stats);
  /* debug */     comms.send('ok');
  /* debug */   });
  /* debug */ });
  /* debug */
  

  if (replayMoveNumber !== -1) {
    return (<div>
      <ReplayBoard {...{ replayMoveNumber, setReplayMoveNumber, gameState }} />
    </div>);
  };

  const nestedBoard = toNested(board);

  setIsNewGameState(false);

  const nestedMoves = nextMoves.reduce((p, c) => {
    const sourceIndex = c >>> 10;
    const targetIndex = c & 63;
    p[sourceIndex] = (p[sourceIndex] || []).concat(targetIndex);
    return p;
  }, {});


  const clearMoveSourceCell = () => {
    setMoveSourceCell(null);
    setMovePotentialTargetCells([]);
  };

  const makeMove = async(move) => {



    const nextGameState = moveInBoard(move, gameState);

    nextGameState.pieceBalance = getPieceBalance(nextGameState.board);


    setGameState(nextGameState);
    clearMoveSourceCell();

    const progressHandler = ({ progress: p }) => {
      setProgressTotal(p.total);
      setProgressCompleted(p.completed);
    };

    const dataHandler = ({ onData }) => {
      onData(progressHandler);
    };

    /* debug */ started = Date.now();

    const playerSocket = await getPlayerSocket();
    playerSocket.do('updateGame', { game: nextGameState, aiToRespond: !userSettings.useLocalSingleThreadAi, userId }, dataHandler)
      /* debug */ .then(() => console.log(`move took ${Date.now() - started}ms`))
      .catch(console.error)
      .then(setProgressCompleted);
  };

  return (<div>
    <ProgressBar progress={{ total: progressTotal, completed: progressCompleted }} />
    <div className={style.boardContainer}>
      <div className={style.boardRow}>
        <div className={style.boardHeadingCell}> </div>
        {'ABCDEFGH'.split('').map((letter, i) => <div key={i} className={style.boardHeadingCell}>{letter}</div>)}
      </div>
      {nestedBoard.map((row, rowIndex) => (<div key={rowIndex} className={style.boardRow}>
        <div className={style.boardHeadingCellWrapper}><div className={style.boardHeadingCell}>{8 - rowIndex}</div></div>
        {row.map((cell, colIndex) => {
          const cellIndex = rowIndex * 8 + colIndex;
          const moveTargets = nestedMoves[cellIndex];
          
          const onDragStart = moveTargets && ((e) => {
            setMoveSourceCell(cellIndex);
            setMovePotentialTargetCells(moveTargets);
          });

          const isPotentialTarget = movePotentialTargetCells.includes(cellIndex);

          const onDragOver = (e) => {
            e.preventDefault();
          };

          const moveToThisCell = () => {
            // TODO: deal with underpromotion here
            const move = (moveSourceCell << 10) + cellIndex;
            makeMove(move);
          };

          const onDrop = isPotentialTarget
            ? moveToThisCell
            : () => {};

          const cellClickHandler = () => {
            if (moveSourceCell === cellIndex) {
              clearMoveSourceCell();
              return;
            }

            if (!moveSourceCell) {
              if (onDragStart) onDragStart();
              return;
            }

            if (movePotentialTargetCells.includes(cellIndex)) {
              moveToThisCell();
              return;
            }
          }

          const selectedClass = moveSourceCell === cellIndex || isPotentialTarget ? style.selected : '';

          return (<div key={colIndex} className={(rowIndex + colIndex) & 1  ? style.darker : style.square}>
            <div onDragOver={onDragOver} onDrop={onDrop} onClick={cellClickHandler}>
              <img src={`/assets/pieces/${cell}.png`} draggable={moveTargets} onDragStart={onDragStart} className={`${selectedClass} ${' ' || (cell[15] ? style.selected2 : '')}`} />
            </div>
          </div>);
        })}
      </div>))}
      <MovePager {...{ replayMoveNumber, setReplayMoveNumber, gameState }} />
    </div>
  </div>);
};
