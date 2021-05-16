import { h } from 'preact';
import style from './style.scss';

import { useContext, useEffect, useState } from 'preact/hooks';
import GameContext from '../../../context/GameContext';
import { coordsToMoveString, moveInTable, getHitScores, rotateTable } from '../../../../chss-module-engine/src/engine/engine';
// import { playerSocket } from '../../..';
import { ProgressBar } from '../progressBar';
import UserContext from '../../../context/UserContext';
import { MovePager } from '../movePager';
import { ReplayBoard } from '../replayBoard';
import { getPlayerSocket } from '../../../services/gamesService';

/* debug */ let started;

const previosTable = [];
for (let x = 0; x < 8; x += 1) {
  previosTable[x] = [];
  for (let y = 0; y < 8; y += 1) previosTable[x][y] = [];
}

export const Board = () => {
  const { gameState, setGameState, isNewGameState, setIsNewGameState, replayMoveNumber, setReplayMoveNumber } = useContext(GameContext);
  const [firstClickedCellAddress, setFirstClickedCellAddress] = useState();
  const [progressTotal, setProgressTotal] = useState();
  const [progressCompleted, setProgressCompleted] = useState();
	const { user: { userId } = {} } = useContext(UserContext);

  if (!gameState) return null;
  const { table } = gameState;

  if (isNewGameState) {
    setFirstClickedCellAddress(null);
    for (const [x, row] of table.entries()) for (const [y, cell] of row.entries()) cell[9] = false;
  }

  useEffect(() => {
    setReplayMoveNumber(-1); // replay off
  }, [gameState]);

  /* debug */ getPlayerSocket().then(playerSocket => {
  /* debug */   playerSocket.on('displayStats', (stats, comms) => {
  /* debug */     const converted = stats
  /* debug */       .map(stat => `${stat.moveTree.map(m => Array.isArray(m) ? coordsToMoveString(...m) : m.toString().padStart(5)).join(' ')} ${stat.value.toString().padStart(5)}`);
  /* debug */     console.log(`\n\n%c${converted.join('\n%c')}`, ...converted.map((l, i) => i % 2 ? 'background: #ddd' : ''));
  /* debug */     comms.send('ok');
  /* debug */   });
  /* debug */ });
  

  if (replayMoveNumber !== -1) {
    return (<div>
      <ReplayBoard {...{ replayMoveNumber, setReplayMoveNumber, gameState }} />
    </div>);
  };

  const whiteState = rotateTable(table);

  for (const [x, row] of whiteState.entries()) for (const [y, cell] of row.entries()) {
    if (!isNewGameState && (cell[0] !== previosTable[x][y][0] || cell[0] !== previosTable[x][y][0])) cell[15] = true; // highlight if changed
    previosTable[x][y] = [cell[0], cell[1]];
  }
  setIsNewGameState(false);

  const clearHighlights = (game) => Object.assign({}, game, {
    table: game.table.map(row => row.map(cell => Object.assign({}, cell, { 9: null })))
  });

  const cellClickHandler = async(rowIndex, colIndex, cell) => {
    if (
      gameState.completed ||
      !(
        gameState.wNext && userId === gameState.wPlayer ||
        !gameState.wNext && userId === gameState.bPlayer
      )
    ) return;

    if (!firstClickedCellAddress) {
      // if 1st click is not on a white piece, nothing to do
      if (table[colIndex][7 - rowIndex][0] !== 2) return;
      
      // iphone is funny.. not needed on chrome
      for (const [x, row] of whiteState.entries()) for (const [y, cell] of row.entries()) cell[15] = false;

      cell[9] = true; // selected
      cell[5].forEach(([x, y]) => {
        table[x][y][9] = true; //highlighted
      })
      setFirstClickedCellAddress({ rowIndex, colIndex });
      return;
    }

    const moveToMake = [
      firstClickedCellAddress.colIndex,
      7 - firstClickedCellAddress.rowIndex,
      colIndex,
      7 - rowIndex
    ];

    // if 2nd click is on a non-highlighted cell, nothing to do
    if (!table[moveToMake[2]][moveToMake[3]][9]) return;

    if (moveToMake[0] === moveToMake[2] && moveToMake[1] === moveToMake[3]) {
      setFirstClickedCellAddress(null);
      setGameState(clearHighlights(gameState));
      return;
    }

    const nextGameState = moveInTable(moveToMake, gameState);
    setGameState(nextGameState);
    setFirstClickedCellAddress(null);

    const progressHandler = ({ progress: p }) => {
      setProgressTotal(p.total);
      setProgressCompleted(p.completed);
    };

    const dataHandler = ({ onData }) => {
      onData(progressHandler);
    };

    /* debug */ started = Date.now();

    const playerSocket = await getPlayerSocket();
    playerSocket.do('updateGame', nextGameState, dataHandler)
      /* debug */ .then(() => console.log(`move took ${Date.now() - started}ms`))
      .catch(console.error)
      .then(setProgressCompleted);

    // The below makes a computer move calculated locally
    // setTimeout(() => {
    //   const { moveCoords } = singleThreadAi(nextGameState, 3)
    //   setGameState(Object.assign({}, moveInTable(moveCoords, nextGameState)));
    // }, 0);
  };

  return (<div>
    <ProgressBar progress={{ total: progressTotal, completed: progressCompleted }} />
    <div className={style.boardContainer}>
      <div className={style.boardRow}>
        <div className={style.boardHeadingCell}> </div>
        {'ABCDEFGH'.split('').map((letter, i) => <div key={i} className={style.boardHeadingCell}>{letter}</div>)}
      </div>
      {whiteState.map((row, rowIndex) => (<div key={rowIndex} className={style.boardRow}>
        <div className={style.boardHeadingCellWrapper}><div className={style.boardHeadingCell}>{8 - rowIndex}</div></div>
        {row.map((cell, colIndex) => (<div key={colIndex} className={(rowIndex + colIndex) & 1  ? style.darker : style.square}>
          <div onClick={() => cellClickHandler(rowIndex, colIndex, cell)}>
            <img src={`/assets/pieces/${cell[0]}${cell[1]}.png`} className={`${cell[8] || cell[9] ? style.selected : ''} ${cell[15] ? style.selected2 : ''}`} />
          </div>
        </div>))}
      </div>))}
      <MovePager {...{ replayMoveNumber, setReplayMoveNumber, gameState }} />
    </div>
  </div>);
};
