import { h } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import style from './style.css';
import UserContext from '../../context/UserContext';
import { persistUserSettings } from '../../services/userService';
import { GameBuilder } from '../game/gameBuilder';
import { Select, SelectOption } from 'preact-material-components/Select';
import Button from 'preact-material-components/Button';
import { getTournamentSocket } from '../../services/tournamentService';

let tournamentSocket;

export const LearningControl = () => {
  const { user, userSettings, setUserSettings } = useContext(UserContext);
  if (!user || !user.isAdmin) return;

  const [modelNames, setModelNames] = useState([]);
  const [selectedModelName, selectModelName] = useState(null);

  useEffect(async () => {
    tournamentSocket = await getTournamentSocket();
    tournamentSocket.do('getModelNames').then(setModelNames).catch(console.error);
  }, []);

  const onLocalSingleThreadAiChange = ({ target: { checked } }) => {
    setUserSettings({ ...userSettings, useLocalSingleThreadAi: checked });
    persistUserSettings({ useLocalSingleThreadAi: checked });
  };

  const onModelNameChange = ({ target: { value } }) => selectModelName(value);

  const onStartLearningClick = () => {
    tournamentSocket.do('startLearning', { model: selectedModelName }).then(console.log).catch(console.error);
  };

  return (
    <div className={style.learningControlContainer}>
      <div>
        <Select onChange={onModelNameChange}>
          <SelectOption value={null}>Select model</SelectOption>
          {modelNames.map((modelName) => (
            <SelectOption value={modelName}>{modelName}</SelectOption>
          ))}
        </Select>
      </div>
      <div>
        <Button disabled={!selectedModelName} onClick={onStartLearningClick}>
          Start learning
        </Button>
      </div>
    </div>
  );
};
