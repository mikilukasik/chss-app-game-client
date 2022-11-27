import { h } from 'preact';
import { useState } from 'preact/hooks';

import Dialog from 'preact-material-components/Dialog';
import { Select, SelectOption } from 'preact-material-components/Select';
import Formfield from 'preact-material-components/FormField';

import 'preact-material-components/TextField/style.css';
import 'preact-material-components/Select/style.css';
import 'preact-material-components/Dialog/style.css';
import 'preact-material-components/Button/style.css';

import style from './style.scss';

let dialog;
const showNewGameSettingsAwaiters = [];

let resolver = () => {};

const showNewGameSettings = (val) =>
  new Promise((resolve) => {
    if (dialog) {
      if (val === false) {
        dialog.MDComponent.close();
        return resolve();
      }

      dialog.MDComponent.show();
      return resolve();
    }

    showNewGameSettingsAwaiters.push({ val, resolve });
  });

export const askNewGameSettings = () =>
  new Promise((r) => {
    // colorSetter(isWhite);
    resolver = async (data) => {
      await showNewGameSettings(false);
      r(data);
    };
    showNewGameSettings();
  });

export const NewGameSettings = () => {
  const [computerPlaysWhite, setCPW] = useState(false);
  const [computerPlaysBlack, setCPB] = useState(false);

  const colorSetters = {
    'Play with white': () => {
      setCPW(false), setCPB(true);
    },
    'Play with black': () => {
      setCPW(true), setCPB(false);
    },
  };

  const useRef = (_dialog) => {
    if (!_dialog) return;
    dialog = _dialog;

    if (showNewGameSettingsAwaiters.length) {
      const val = showNewGameSettingsAwaiters[showNewGameSettingsAwaiters.length].val;
      dialog.MDComponent[val === false ? 'close' : 'show']();

      while (showNewGameSettingsAwaiters.length) {
        showNewGameSettingsAwaiters.pop().resolve();
      }
    }
  };

  return (
    <div>
      <Dialog ref={useRef} class={style.promotionContainer}>
        <Dialog.Body class={style.promotionChooser}>
          <Formfield>
            <Select
              onChange={(e) => colorSetters[e.target.value]()}
              /*selectedIndex={depth - 2}*/ hintText="Player color"
            >
              {Object.keys(colorSetters).map((option) => (
                <SelectOption value={option}>{option}</SelectOption>
              ))}
            </Select>
          </Formfield>
        </Dialog.Body>

        <Dialog.FooterButton
          onClick={() => resolver({ computerPlaysBlack, computerPlaysWhite })}
          disabled={!computerPlaysBlack && !computerPlaysWhite}
        >
          Play
        </Dialog.FooterButton>
      </Dialog>
    </div>
  );
};
