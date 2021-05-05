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
import { useActiveGameIdsSetter } from '../services/gamesService';

const App = () => {
	const [activeGameIds, setActiveGameIds] = useState();
	const [gameState, setGameState] = useState();
  const gameContext = { gameState, setGameState, activeGameIds, setActiveGameIds };

	const [user, setUser] = useState();
  const userContext = { user, setUser };

	useEffect(() => {
		useUserSetter((user) => {
			setUser(user);
		});

		useActiveGameIdsSetter((activeGameIds) => {
			setActiveGameIds(activeGameIds);
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
