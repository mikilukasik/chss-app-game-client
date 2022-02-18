import { h } from 'preact';
import { useState } from 'preact/hooks';
import Select from 'preact-material-components/Select';
import TextField from 'preact-material-components/TextField';
import 'preact-material-components/TextField/style.css';
import 'preact-material-components/List/style.css';
import 'preact-material-components/Menu/style.css';
import 'preact-material-components/Select/style.css';

import style from './style.css';

export const TaskArg = ({ type, values, defaultValue, argKey: key, newTask, setNewTask }) => {
  switch (type) {
    case 'select':
      const [chosenIndex, setChosenIndex] = useState(newTask[key] && values.indexOf(newTask[key]) + 1);

      return (
        <Select
          hintText={key}
          selectedIndex={chosenIndex}
          onChange={(e) => {
            setChosenIndex(e.target.selectedIndex);
            setNewTask(Object.assign({}, newTask, { [key]: values[e.target.selectedIndex - 1] }));
          }}
        >
          {values.map((value) => (
            <Select.Item key={value}>{value}</Select.Item>
          ))}
        </Select>
      );

    case 'textInput':
      const [textValue, setTextValue] = useState(newTask[key]);

      return (
        <TextField
          label={key}
          value={textValue}
          onKeyUp={(e) => {
            setTextValue(e.target.value);
            setNewTask(Object.assign({}, newTask, { [key]: e.target.value }));
          }}
        />
      );

    default:
      return null;
  }
};
