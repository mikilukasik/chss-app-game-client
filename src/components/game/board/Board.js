import { h } from 'preact';
import style from './style.scss';

import { useContext, useState } from 'preact/hooks';
import GameContext from '../../../context/GameContext';
import { moveInTable } from 'chss-engine/src/engine/engine';
import { gameSocket } from '../../..';

export const Board = () => {
  const { gameState, setGameState } = useContext(GameContext);
  const [firstClickedCellAddress, setFirstClickedCellAddress] = useState();

  gameSocket.on('updateGame', (data, comms) => {
    setGameState(data.cmdArgs); // TODO: we really need new payload from msg.. data is data
    comms.send('OK');
  });

  if (!gameState) return;

  const { table } = gameState;

  const whiteState = [];
  for (let i = 0; i < 8; i += 1) {
    whiteState[i] = [];
    for (let j = 0; j < 8; j += 1) {
      // if(oldValue&&oldValue[i][j][0] != newValue[i][j][0]) scope.input[i][j][15] = true       //highlight moved
      whiteState[i][j] = table[j][7 - i]
      if ((i + j) & 1) whiteState[i][j][7] = true     //grey fields
    }
  }

  const clearHighlights = (game) => Object.assign({}, game, {
    table: game.table.map(row => row.map(cell => Object.assign({}, cell, { 9: null })))
  });

  const cellClickHandler = (rowIndex, colIndex, cell) => {
    if (!firstClickedCellAddress) {
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

    if (moveToMake[0] === moveToMake[2] && moveToMake[1] === moveToMake[3]) {
      setFirstClickedCellAddress(null);
      setGameState(clearHighlights(gameState));
      return;
    }

    const nextGameState = moveInTable(moveToMake, gameState)
    setGameState(nextGameState);
    setFirstClickedCellAddress(null);

    gameSocket.do('makeComputerMove', nextGameState).then(console.log).catch(console.error);

    // The below makes a computer move calculated locally
    // setTimeout(() => {
    //   const { moveCoords } = singleThreadAi(nextGameState, 3)
    //   setGameState(Object.assign({}, moveInTable(moveCoords, nextGameState)));
    // }, 0);
  };

  return (<div className={style.boardContainer}>
    <div className={style.boardRow}>
      <div className={style.boardHeadingCell}> </div>
      {'ABCDEFGH'.split('').map((letter, i) => <div key={i} className={style.boardHeadingCell}>{letter}</div>)}
    </div>
    {whiteState.map((row, rowIndex) => (<div key={rowIndex} className={style.boardRow}>
      <div className={style.boardHeadingCellWrapper}><div className={style.boardHeadingCell}>{8 - rowIndex}</div></div>
      {row.map((cell, colIndex) => (<div key={colIndex} className={cell[7] ? style.darker : style.square}>
        <div onClick={() => cellClickHandler(rowIndex, colIndex, cell)}>
          <img src={`/assets/pieces/${cell[0]}${cell[1]}.png`} className={`${cell[8] || cell[9] ? style.selected : ''}${cell[15] ? style.selected2 : ''}`} />
        </div>
      </div>))}
    </div>))}
  </div>);
};
