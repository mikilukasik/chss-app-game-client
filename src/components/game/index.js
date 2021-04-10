import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';
import GameContext from '../../context/GameContext';
import { GameModel } from '../../model/Game';
import { useState } from 'preact/hooks';
import { Board } from '../board';

const Game = () => {
	const [gameState, setGameState] = useState(new GameModel());
  const context = { gameState, setGameState };

	return (
		<GameContext.Provider value={context}>
        <Board />
    </GameContext.Provider>
	);
};

export default Game;
