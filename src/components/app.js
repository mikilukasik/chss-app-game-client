import { h } from 'preact';
import { route, Router } from 'preact-router';
import GameContext from '../context/GameContext';
import UserContext from '../context/UserContext';
import { useEffect, useState } from 'preact/hooks';
import Header from './header';
import style from './style.scss';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Game from '../routes/game';
import AuthRoute from '../routes/auth';
import { useUserSetter } from '../services/userService';
import { useActiveGamesSetter, useCurrentGameUpdater } from '../services/gamesService';

const App = () => {
	const [activeGames, setActiveGames] = useState();
	const [gameState, setGameState] = useState();
	const [isNewGameState, setIsNewGameState] = useState();
  const gameContext = { gameState, setGameState, activeGames, setActiveGames, isNewGameState, setIsNewGameState };

	const [user, setUser] = useState();
  const userContext = { user, setUser };

	useEffect(() => {
		useUserSetter((user) => {
			setUser(user);
		});

		useActiveGamesSetter((activeGames) => {
			setActiveGames(activeGames);
		});

		let previousId;
		useCurrentGameUpdater((game) => {
			if (previousId !== game.id) setIsNewGameState(true);
			previousId = game.id;

			setGameState(game);
		});
	}, []);

	return (<div id="app" className={style.appContainer}>
		<UserContext.Provider value={userContext}><GameContext.Provider value={gameContext}>
			<Header />
			<div id="main-content" className={style.mainContent}>
				<Router>
					<Home path="/" />
					<Game path="/game/" />
					<AuthRoute path="/auth/:*" />
				</Router>
			</div>
		</GameContext.Provider></UserContext.Provider>
	</div>);
};

export default App;
