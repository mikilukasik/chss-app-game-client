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
import Admin from '../routes/admin';
import { useUserSetter, useUserSettingsSetter } from '../services/userService';
import {
  useGamesSetter,
  useCurrentGameUpdater,
  getPlayerSocket,
  useReplayMoveNumberSetter,
} from '../services/gamesService';
import { LoginModal } from './loginModal';
import WorkerFrame from './workerFrame';

const App = () => {
  const [games, setGames] = useState();
  const [gameState, setGameState] = useState();
  const [scoreBoardData, setScoreBoardData] = useState();
  const [isNewGameState, setIsNewGameState] = useState();
  const [replayMoveNumber, setReplayMoveNumber] = useState(-1);
  const gameContext = {
    gameState,
    setGameState,
    games,
    setGames,
    isNewGameState,
    setIsNewGameState,
    scoreBoardData,
    setScoreBoardData,
    replayMoveNumber,
    setReplayMoveNumber,
  };

  const [user, setUser] = useState();
  const [userSettings, setUserSettings] = useState({});
  const userContext = { user, setUser, userSettings, setUserSettings };

  useEffect(async () => {
    useUserSetter((user) => {
      setUser(user);
    });

    useUserSettingsSetter((settings) => {
      setUserSettings(settings);
    });

    useGamesSetter((games) => {
      setGames(games);
    });

    useReplayMoveNumberSetter((rmn) => {
      setReplayMoveNumber(rmn);
    });

    let previousId;
    useCurrentGameUpdater((game) => {
      if (previousId !== game.id) setIsNewGameState(true);
      previousId = game.id;
      setGameState(game);
    });

    const playerSocket = await getPlayerSocket();
    const scoreBoardData = await playerSocket.do('getScoreBoard');
    setScoreBoardData(scoreBoardData);
    playerSocket.subscribe('scoreBoardChanged', setScoreBoardData);
  }, []);

  return (
    <div id="app" className={style.appContainer}>
      <WorkerFrame />
      <UserContext.Provider value={userContext}>
        <GameContext.Provider value={gameContext}>
          <Header />
          <div id="main-content" className={style.mainContent}>
            <Router>
              <Home path="/" />
              <Game path="/game/" />
              <Admin path="/admin/:subRoute?" />
            </Router>
            <LoginModal />
          </div>
        </GameContext.Provider>
      </UserContext.Provider>
    </div>
  );
};

export default App;
