import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { route } from 'preact-router';
import GameContext from '../../context/GameContext';
import { setCurrentGameId } from '../../services/gamesService';
import style from './style.css';

const gameClickHandlers = {};

export const ScoreBoard = () => {
  const { scoreBoardData } = useContext(GameContext);
	if (!scoreBoardData) return;

	const getGameClickHandler = (id) => {
		if (gameClickHandlers[id]) return gameClickHandlers[id];

		gameClickHandlers[id] = () => {
			setCurrentGameId(id);
			route('/game', true);
		};

		return gameClickHandlers[id];
	};

	return (<div>
		<table><tbody>
		{scoreBoardData.map(({ name, result, resultScore, moveCount, gameId }, index) => resultScore === 1 // draw
			? <tr><th>{index + 1}.</th><td>{name}</td> <td>played a draw.</td><td><a className={style.gameLink} href="#" onClick={getGameClickHandler(gameId)}>game</a></td></tr>
			: <tr><th>{index + 1}.</th><td>{name}</td> <td>{result} in {moveCount} moves.</td><td><a className={style.gameLink} href="#" onClick={getGameClickHandler(gameId)}>game</a></td></tr>)}
		</tbody></table>
	</div>);
};

