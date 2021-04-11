import { h } from 'preact';
import style from './style.scss';

import { useContext, useState } from 'preact/hooks';
import GameContext from '../../../context/GameContext';
import { moveInTable, singleThreadAi } from '../../../engine/engine';

export const Board = () => {
  const { gameState, setGameState } = useContext(GameContext);
  const { table } = gameState;
  const [firstClickedCellAddress, setFirstClickedCellAddress] = useState();

  const cellSize = Math.min(window.innerHeight, window.innerWidth) / 10;

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

    setTimeout(() => {
      const { moveCoords } = singleThreadAi(nextGameState, 3)
      setGameState(Object.assign({}, moveInTable(moveCoords, nextGameState)));
    }, 0);
  };

  return (<div className={style.boardContainer}>
    <table className="main-table unselectable">
      <tbody>
        <tr className="heading row0" style={{ width: cellSize, height: 1 }}>
          <td></td>
          <td>A</td>
          <td>B</td>
          <td>C</td>
          <td>D</td>
          <td>E</td>
          <td>F</td>
          <td>G</td>
          <td>H</td>
        </tr>
        {whiteState.map((row, rowIndex) => (<tr key={rowIndex} style={{ height: cellSize }}>
          <td>{8 - rowIndex}</td>
          {row.map((cell, colIndex) => (<td key={colIndex} className={cell[7] ? style.darker : style.square}>
            <div style={{ height: cellSize }} onClick={() => cellClickHandler(rowIndex, colIndex, cell)}>
              <img src={`/assets/pieces/${cell[0]}${cell[1]}.png`} height={cellSize} width={cellSize} className={`${cell[8] || cell[9] ? style.selected : ''}${cell[15] ? style.selected2 : ''}`} />
            </div>
          </td>))}
        </tr>))}
      </tbody>
    </table>
  </div>);
};
