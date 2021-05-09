import { h } from 'preact';
import { useContext } from 'preact/hooks';
import GameContext from '../../context/GameContext';
import style from './style.css';

export const ScoreBoard = () => {
  const { scoreBoardData } = useContext(GameContext);
	if (!scoreBoardData) return;

	return (<div>
		<table><tbody>
		{scoreBoardData.map(({ name, result, resultScore, moveCount }, index) => resultScore === 1 // draw
			? <tr><th>{index + 1}.</th><td>{name}</td> <td>played a draw.</td></tr>
			: <tr><th>{index + 1}.</th><td>{name}</td> <td>{result} in {moveCount} moves.</td></tr>)}
		</tbody></table>
	</div>);
};

