import { h } from 'preact';
import { useContext, useEffect, useState, useCallback } from 'preact/hooks';
import TextField from 'preact-material-components/TextField';
import Button from 'preact-material-components/Button';
import { startTournament } from '../../../services/tournamentService';

import style from './style.scss';

export const EngineTournament = () => {
  const [randomValue, setRandomValue] = useState();
  const [rounds, setRounds] = useState();
  const [tournamentStats, setTournamentStats] = useState();

  const setGameState = console.log;

  const startTournamentClickHandler = () => {
    startTournament({
      rounds,
      randomValue,
      displayedGameUpdater: setGameState,
      // (game) => {
      //   if (Math.random() > 0.95) setGameState(game);
      // },
      displayedStatsUpdater: setTournamentStats,
    });
  };

  return (
    <div className={style.engineTournamentContainer}>
      <span>
        <TextField label="Rounds" onKeyUp={(e) => setRounds(e.target.value)} />
      </span>
      <span>
        <TextField label="Random value" onKeyUp={(e) => setRandomValue(e.target.value)} />
      </span>
      <Button onClick={startTournamentClickHandler}>Start tournament</Button>
      <pre className={style.tournamentStats}>{tournamentStats}</pre>
    </div>
  );
};
