import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';
import GameContext from '../../context/GameContext';
import { GameModel } from '../../model/Game';
import { useState, useEffect } from 'preact/hooks';
import { Board } from './board';
import { gameSocket } from '../..';
import { NewGameButton } from './newGameButton';
import { SideBar } from './sideBar';

const Game = () => {
	const [gameState, setGameState] = useState(new GameModel());
  const context = { gameState, setGameState };

	useEffect(() => {
		gameSocket.do('newGame', { a: 1 }).then(console.log);
	}, []);

	return (
		<GameContext.Provider value={context}>
			<div className={style.gameContainer} >
				<SideBar />
				<Board />
			</div>
    </GameContext.Provider>
	);
};

export default Game;
