import { h } from 'preact';
import style from './game.css';
import GameContext from '../../context/GameContext';
import { useState } from 'preact/hooks';
import { Board } from './board';
import { SideBar } from './sideBar';

export const Game = () => {
	const [gameState, setGameState] = useState();
  const context = { gameState, setGameState };

	return (
		<GameContext.Provider value={context}>
			<div className={style.gameContainer} >
				<SideBar />
				<Board />
			</div>
    </GameContext.Provider>
	);
};
