import { h } from 'preact';
import { useContext } from 'preact/hooks';
import UserContext from '../../../context/UserContext';
import { startCustomGame } from '../../../services/gamesService';
import style from './style.scss';

export const MovePager = ({ replayMoveNumber, setReplayMoveNumber, gameState }) => {
	const { user } = useContext(UserContext);

  const getClickHandler = (moveNumebr) => () => setReplayMoveNumber(moveNumebr);

  const newGameFromHereHandler = async() => { //
    startCustomGame(gameState.allPastFens[replayMoveNumber]);
  };

  return (<div className={style.movePagerContainer}>
    <div> </div>
    <div>
      <button className={style.movePagerButton} disabled={replayMoveNumber === 0} onClick={getClickHandler(0)} >&lt;&lt;</button>
      <button className={style.movePagerButton} disabled={replayMoveNumber === 0} onClick={getClickHandler(replayMoveNumber === -1 ? gameState.moveCount - 1 : replayMoveNumber - 1)} >&lt;</button>
      <div className={style.replayMoveNumber}>{ replayMoveNumber === -1 ? gameState.moveCount : replayMoveNumber }</div>
      <button className={style.movePagerButton} disabled={replayMoveNumber === -1} onClick={getClickHandler(replayMoveNumber === gameState.moveCount - 1 ? - 1 : replayMoveNumber + 1)} >&gt;</button>
      <button className={style.movePagerButton} disabled={replayMoveNumber === -1} onClick={getClickHandler(-1)} >&gt;&gt;</button>
    </div>
    <div>
      <button className={style.newGameFromHereButton} disabled={replayMoveNumber === -1} onClick={newGameFromHereHandler} >New game from here</button>
    </div>
  </div>);
};
