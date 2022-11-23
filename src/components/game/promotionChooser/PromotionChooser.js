import { h } from 'preact';
import { useState } from 'preact/hooks';

import Dialog from 'preact-material-components/Dialog';

import 'preact-material-components/TextField/style.css';
import 'preact-material-components/Dialog/style.css';
import 'preact-material-components/Button/style.css';

import style from './style.scss';

let dialog;
const showPromotionChooserAwaiters = [];

let colorSetter = () => {};
let resolver = () => {};

const showPromotionChooser = (val) =>
  new Promise((resolve) => {
    if (dialog) {
      if (val === false) {
        dialog.MDComponent.close();
        return resolve();
      }

      dialog.MDComponent.show();
      return resolve();
    }

    showPromotionChooserAwaiters.push({ val, resolve });
  });

export const askPromotionChoice = (isWhite) =>
  new Promise((r) => {
    colorSetter(isWhite);
    resolver = async (piece) => {
      await showPromotionChooser(false);
      r(piece);
    };
    showPromotionChooser();
  });

export const PromotionChooser = () => {
  const [isWhite, setIsWhite] = useState();
  colorSetter = setIsWhite;

  const useRef = (_dialog) => {
    if (!_dialog) return;
    dialog = _dialog;

    if (showPromotionChooserAwaiters.length) {
      const val = showPromotionChooserAwaiters[showPromotionChooserAwaiters.length].val;
      dialog.MDComponent[val === false ? 'close' : 'show']();

      while (showPromotionChooserAwaiters.length) {
        showPromotionChooserAwaiters.pop().resolve();
      }
    }
  };

  return (
    <div>
      <Dialog ref={useRef} class={style.promotionContainer}>
        <Dialog.Body class={style.promotionChooser}>
          {(isWhite ? [13, 12, 11, 10] : [5, 4, 3, 2]).map((piece) => (
            <div onClick={() => resolver(piece)} class={style.promotionItem}>
              <img src={`/assets/pieces/${piece}.png`} className={style.promotionImage} />
            </div>
          ))}
        </Dialog.Body>
      </Dialog>
    </div>
  );
};
