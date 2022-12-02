import { h } from 'preact';
import { useContext, useEffect, useState, useCallback } from 'preact/hooks';
import TextField from 'preact-material-components/TextField';
import Button from 'preact-material-components/Button';
import { startTournament } from '../../../services/tournamentService';

import { Select, SelectOption } from 'preact-material-components/Select';
import Formfield from 'preact-material-components/FormField';

import 'preact-material-components/TextField/style.css';
import 'preact-material-components/Select/style.css';
import 'preact-material-components/Dialog/style.css';
import 'preact-material-components/Button/style.css';

import style from './style.scss';

const fenSetNames = [
  '2',
  '40',
  '100',
  '800',
  'step6',
  'random-step6-50',
  'random-step6-250',
  'random-step6-500',
  'random-step6-1000',
];

export const EngineTournament = () => {
  const [randomValue, setRandomValue] = useState();
  const [rounds, setRounds] = useState();
  const [fenSetName, setFenSetName] = useState(fenSetNames[0]);
  const [tournamentStats, setTournamentStats] = useState();

  const setGameState = console.log;

  const startTournamentClickHandler = () => {
    startTournament({
      rounds,
      randomValue,
      displayedGameUpdater: setGameState,
      fenSetName,
      displayedStatsUpdater: setTournamentStats,
    });
  };

  return (
    <div className={style.engineTournamentContainer}>
      <Formfield>
        <Select
          onChange={(e) => setFenSetName(e.target.value)}
          selectedIndex={fenSetNames.indexOf(fenSetName) + 1}
          hintText="FenSet"
        >
          {fenSetNames.map((option) => (
            <SelectOption value={option}>{option}</SelectOption>
          ))}
        </Select>
      </Formfield>
      <Formfield>
        <Button onClick={startTournamentClickHandler}>Start tournament</Button>
      </Formfield>
      <pre className={style.tournamentStats}>{tournamentStats}</pre>
    </div>
  );
};
