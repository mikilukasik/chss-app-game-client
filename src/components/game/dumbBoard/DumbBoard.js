import { h } from 'preact';
import style from './style.scss';

import { useContext, useEffect, useState, useCallback } from 'preact/hooks';
import GameContext from '../../../context/GameContext';
import { moveInBoard, moveString2move } from '../../../../chss-module-engine/src/engine/engine';
import { ProgressBar } from '../progressBar';
import UserContext from '../../../context/UserContext';
import { MovePager } from '../movePager';
import { ReplayBoard } from '../replayBoard';
import {
  getPlayerSocket,
  setCurrentGameState,
  getPredictionSocket,
  getModelStoreSocket,
} from '../../../services/gamesService';
import { toNested } from '../../../utils/toNested';
import { move2moveString } from '../../../../../chss-module-engine/src/engine_new/transformers/move2moveString';
import { getPieceBalance } from '../../../../chss-module-engine/src/engine_new/evaluators/evaluateBoard';
import { GameModel } from '../../../../../chss-module-engine/src/model/Game';
import * as tf from '@tensorflow/tfjs';
import { board2fen } from '../../../../chss-module-engine/src/engine_new/transformers/board2fen';
import { getMovedBoard } from '../../../../chss-module-engine/src/engine_new/utils/getMovedBoard';
import Button from 'preact-material-components/Button';
import TextField from 'preact-material-components/TextField';
import 'preact-material-components/TextField/style.css';

import { Select, SelectOption } from 'preact-material-components/Select';

import Checkbox from 'preact-material-components/Checkbox';
import 'preact-material-components/Checkbox/style.css';

// import FormControlLabel from 'preact-material-components/FormControlLabel';
// // import 'preact-material-components/FormControlLabel/style.css';

import Formfield from 'preact-material-components/FormField';
import { getPrediction } from '../../../../chss-module-engine/src/engine_new/tfModels/getPrediction';
import { getMoveSorter } from '../../../../chss-module-engine/src/engine_new/moveGenerators/getMoveSorter';
import { aiWorker } from '../../workerFrame';
// import { getWasmEngine } from '../../../../../chss-module-engine/src/engine_new/utils/wasmEngine';

const _modelName = 'champion';
const _movesModelName = 'moves_0.02679-e1-1652876197395';

/* debug */ let started;

export const DumbBoard = () => {
  const [moveSourceCell, setMoveSourceCell] = useState();
  const [movePotentialTargetCells, setMovePotentialTargetCells] = useState([]);
  const [gameState, _setGameState] = useState(new GameModel());
  const [evalResult, setEvalResult] = useState({});
  const [aiResult, setAiResult] = useState();
  const [aiMovesResult, setAiMovesResult] = useState([]);
  const [winningMove, setWinningMove] = useState('');

  const [freeMovesChecked, setFreeMovesChecked] = useState(false);
  const [keepMovingWhite, setKeepMovingWhite] = useState(false);
  const [keepMovingBlack, setKeepMovingBlack] = useState(false);
  const [depth, setDepth] = useState(5);
  const [highlightMethod, setHighlightMethod] = useState('Inc');
  const [highlightsFor, setHighlightsFor] = useState('None');
  const [moveToHighlighted, setMoveToHighlighted] = useState(false);
  const [allModelNames, setAllModelNames] = useState([]);
  const [fenHistory, setFenHistory] = useState([]);
  const [currentFenIndex, setCurrentFenIndex] = useState(0);

  const setGameState = (game, dontAdd) => {
    if (dontAdd) return _setGameState(game);

    const newFenHistory = [...fenHistory, board2fen(game.board)];
    setFenHistory(newFenHistory);
    setCurrentFenIndex(newFenHistory.length - 1);
    _setGameState(game);
  };

  const goBack = () => {
    const newFenIndex = Math.max(0, currentFenIndex - 1);
    setCurrentFenIndex(newFenIndex);
    setGameState(new GameModel({ fen: fenHistory[newFenIndex] }), true);
  };

  const goForward = () => {
    const newFenIndex = Math.min(fenHistory.length - 1, currentFenIndex + 1);
    setCurrentFenIndex(newFenIndex);
    setGameState(new GameModel({ fen: fenHistory[newFenIndex] }), true);
  };

  const { board, nextMoves, bitBoard: _bitBoard } = gameState;

  const updateAiDisplayOldMethod = async ({ nextGameState }) => {
    const moveSorter = await getMoveSorter(nextGameState.board);
    const moves = nextGameState.nextMoves.slice().sort(moveSorter);
    setWinningMove(move2moveString(moves[0]));

    setAiMovesResult(
      normalizeToOneGrouped(
        await getPrediction({
          modelName: _movesModelName,
          board: nextGameState.board,
          repeatedPastFens: nextGameState.repeatedPastFens,
        }),
      ),
    );
  };

  const updateAiDisplayOneHotMethod = async ({ nextGameState, modelName = 'oneHot' }) => {
    const predictionSocket = await getPredictionSocket();
    const response = await predictionSocket.do('predictMove', { game: nextGameState, modelName });

    const sortedMoves = Object.keys(response.moveStringValues)
      .map((move, i) => ({ move, val: response.moveStringValues[move] }))
      .sort((a, b) => b.val - a.val);

    setWinningMove(
      <table>
        {sortedMoves.slice(0, 50).map(({ move, val }, i) => (
          <tr>
            <td
              style={
                !gameState.nextMoves.includes(moveString2move(move))
                  ? { color: 'red' }
                  : {
                      color: `#00${Math.floor(Math.max(0, Math.min(1, val)) * 255)
                        .toString(16)
                        .padStart(2, 0)}00`,
                    }
              }
            >
              {move}
            </td>
            <td>{val}</td>
          </tr>
        ))}
      </table>,
    );
    // console.log({ moveToHighlighted });
    if (moveToHighlighted) {
      const winningMove = sortedMoves.find(({ move }) => gameState.nextMoves.includes(moveString2move(move)));
      if (winningMove) {
        // console.log('bububu');
        makeMove(moveString2move(winningMove.move));
      }
    }
  };

  const clearHighlights = () => {
    console.log('clearing highlights');
    console.log('clearing highlights yeah');
    setWinningMove(null);
    setAiMovesResult([]);
  };

  // console.log('bio');

  useEffect(async () => {
    const modelStoreSocket = await getModelStoreSocket();
    const modelNames = await modelStoreSocket.do('getAllModelNames', { requiredFiles: ['loader.js'] });
    // console.log(modelNames);

    setAllModelNames(modelNames);

    // console.log('bo');
    // getWasmEngine()
    //   .then((we) => {
    //     console.log('amottan', { we });
    //     window.we = we;
    //   })
    //   .catch((e) => {
    //     console.error('itten', e);
    //   });
  }, []);

  const aiDisplayHandlers = {
    Legacy: updateAiDisplayOldMethod,
    Off: clearHighlights,
  };

  const highlightOptions = {
    None: { black: false, white: false },
    White: { black: false, white: true },
    Black: { black: true, white: false },
    Both: { black: true, white: true },
  };

  const updateAiDisplay = async (nextGameState) => {
    const { black, white } = highlightOptions[highlightsFor];
    const { wNext } = gameState;
    if ((wNext && white) || (!wNext && black))
      return (
        aiDisplayHandlers[highlightMethod] ||
        (({ nextGameState }) => updateAiDisplayOneHotMethod({ nextGameState, modelName: highlightMethod }))
      )({ nextGameState });
    clearHighlights();
  };

  useEffect(() => {
    updateAiDisplay(gameState);
  }, [highlightMethod]);

  const nestedBoard = toNested(board);

  const nestedMoves = nextMoves.reduce((p, c) => {
    const sourceIndex = c >>> 10;
    const targetIndex = c & 63;
    p[sourceIndex] = (p[sourceIndex] || []).concat(targetIndex);
    return p;
  }, {});

  const clearMoveSourceCell = () => {
    setMoveSourceCell(null);
    setMovePotentialTargetCells([]);
  };

  const normalizeToOne = (arr) => {
    const maxVal = Math.max(...arr);
    const multiplier = 1 / maxVal;
    return arr.map((num) => num * multiplier);
  };

  const normalizeToOneGrouped = (longArr) => [
    ...normalizeToOne(longArr.slice(0, 64)),
    ...normalizeToOne(longArr.slice(64)),
  ];

  const makeMove = async (move) => {
    console.log({ move });
    const origWnext = gameState.wNext;
    let nextGameState = moveInBoard(move, gameState);

    console.log(1, gameState.wNext, nextGameState.wNext);
    if (freeMovesChecked) nextGameState = setWnext(origWnext, nextGameState);
    console.log(2, gameState.wNext, nextGameState.wNext);

    nextGameState.pieceBalance = getPieceBalance(nextGameState.board);

    setGameState(nextGameState);
    clearMoveSourceCell();

    // setAiResult(
    //   (await getPrediction({
    //     modelName: _modelName,
    //     board: nextGameState.board,
    //     repeatedPastFens: nextGameState.repeatedPastFens,
    //   })) * 50,
    // );

    updateAiDisplay(nextGameState, true);

    if ((keepMovingBlack && !nextGameState.board[64]) || (keepMovingWhite && nextGameState.board[64])) {
      setEvalResult({});

      console.log('hello1');
      const { move: nextMove } = await evaluateBoard();
      console.log('hello2');

      setTimeout(() => {
        console.log('hello3', nextMove);

        makeMove(nextMove);
        console.log('hello4');

        setEvalResult(nextMove);
      }, 50);
    }
  };

  // alphazero's valuation https://arxiv.org/pdf/2009.04374.pdf
  // empty, pawn, bishop, knight, rook, queen, null, null, null, king
  const weights = [0, -1, -3.33, -3.05, -5.63, -9.5, -20, 0, 0, 1, 3.33, 3.05, 5.63, 9.5, 20].map((w) => w / 50);

  const onFeeMovesCheckboxChange = ({ target: { checked } }) => setFreeMovesChecked(checked);
  const onAutoMoveChangeWhite = ({ target: { checked } }) => setKeepMovingWhite(checked);
  const onAutoMoveChangeBlack = ({ target: { checked } }) => setKeepMovingBlack(checked);

  const setWnext = (wNext, game = gameState) => {
    const nextGameState = Object.assign({}, game, { wNext, board: game.board.slice() });
    nextGameState.board[64] = wNext ? 1 : 0;
    return nextGameState;
  };

  const onWhitesMoveCheckboxChange = async ({ target: { checked } }) => {
    const nextGameState = setWnext(checked);

    setAiResult(
      (await getPrediction({
        modelName: _modelName,
        board: nextGameState.board,
        repeatedPastFens: nextGameState.repeatedPastFens,
      })) * 50,
    );
    setGameState(nextGameState);
  };

  const evaluateBoard = ({ method = 'localMultiThread' } = {}) =>
    console.log('ai', {
      method,
      // board: gameState.board,
      // moves: gameState.nextMoves,
      game: gameState,
      depth,
    }) ||
    aiWorker.do('ai', {
      method,
      // board: gameState.board,
      // moves: gameState.nextMoves,
      game: gameState,
      depth,
    });

  return (
    <div className={style.dumbBoardContainer}>
      {/* <ProgressBar progress={{ total: progressTotal, completed: progressCompleted }} /> */}
      <div className={style.boardContainer}>
        <div className={style.boardRow}>
          <div className={style.boardHeadingCell}> </div>
          {'ABCDEFGH'.split('').map((letter, i) => (
            <div key={i} className={style.boardHeadingCell}>
              {letter}
            </div>
          ))}
        </div>
        {nestedBoard.map((row, rowIndex) => (
          <div key={rowIndex} className={style.boardRow}>
            <div className={style.boardHeadingCellWrapper}>
              <div className={style.boardHeadingCell}>{8 - rowIndex}</div>
            </div>
            {row.map((cell, colIndex) => {
              const cellIndex = rowIndex * 8 + colIndex;
              const moveTargets = nestedMoves[cellIndex];

              const onDragStart =
                moveTargets || freeMovesChecked
                  ? (e) => {
                      setMoveSourceCell(cellIndex);
                      if (!freeMovesChecked) setMovePotentialTargetCells(moveTargets);
                    }
                  : () => {};

              const isPotentialTarget = freeMovesChecked || movePotentialTargetCells.includes(cellIndex);

              const onDragOver = (e) => {
                e.preventDefault();
              };

              const moveToThisCell = () => {
                // TODO: deal with underpromotion here
                const move = (moveSourceCell << 10) + cellIndex;
                makeMove(move);
              };

              const onDrop = isPotentialTarget || freeMovesChecked ? moveToThisCell : () => {};

              const cellClickHandler = () => {
                if (moveSourceCell === cellIndex) {
                  clearMoveSourceCell();
                  return;
                }

                if (!moveSourceCell && moveSourceCell !== 0) {
                  if (onDragStart) onDragStart();
                  return;
                }

                if (movePotentialTargetCells.includes(cellIndex) || freeMovesChecked) {
                  moveToThisCell();
                  return;
                }
              };

              const selectedClass =
                moveSourceCell === cellIndex || (isPotentialTarget && !freeMovesChecked) ? style.selected : '';

              const getColorFromIndex = (index) => {
                return Math.round(Math.max(0, Math.min(255, aiMovesResult[index] * 256)))
                  .toString(16)
                  .padStart(2, '0');
              };

              const aiBorder = aiMovesResult.length
                ? `5px solid #${getColorFromIndex(rowIndex * 8 + colIndex)}00${getColorFromIndex(
                    rowIndex * 8 + colIndex + 64,
                  )}`
                : 'none';

              return (
                <div
                  key={colIndex}
                  className={(rowIndex + colIndex) & 1 ? style.darker : style.square}
                  style={{ border: aiBorder }}
                >
                  <div onDragOver={onDragOver} onDrop={onDrop} onClick={cellClickHandler}>
                    <img
                      src={`/assets/pieces/${cell}.png`}
                      draggable={moveTargets || freeMovesChecked}
                      onDragStart={onDragStart}
                      className={selectedClass}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        {/* <MovePager {...{ replayMoveNumber, setReplayMoveNumber, gameState }} /> */}
      </div>
      <div class={style.rightBar}>
        <div>
          <Formfield>
            <div class={style.fenDisplay}>
              <TextField
                label="State"
                value={board2fen(gameState.board)}
                onChange={(e) => setGameState(new GameModel({ fen: e.target.value }))}
                outerStyle={{ 'min-width': '-webkit-fill-available' }}
                trailingIcon={
                  <div class={style.pagingButtonsWrapper}>
                    <button class={style.pagingButton} onClick={goBack}>
                      &lt;
                    </button>
                    <button class={style.pagingButton} onClick={goForward}>
                      &gt;
                    </button>
                  </div>
                }
              />
            </div>
          </Formfield>

          <Formfield>
            <Checkbox
              id="auto-move-checkboxw"
              size="small"
              onChange={onAutoMoveChangeWhite}
              checked={keepMovingWhite}
            />
            <label className={style.freeMovesCheckboxLabel} for="auto-move-checkboxw" id="auto-move-checkboxw-label">
              Auto move white
            </label>
          </Formfield>

          <Formfield>
            <Checkbox
              id="auto-move-checkboxb"
              size="small"
              onChange={onAutoMoveChangeBlack}
              checked={keepMovingBlack}
            />
            <label className={style.freeMovesCheckboxLabel} for="auto-move-checkboxb" id="auto-move-checkboxb-label">
              Auto move black
            </label>
          </Formfield>

          <Formfield>
            <Checkbox
              id="free-moves-checkbox"
              size="small"
              onChange={onFeeMovesCheckboxChange}
              checked={freeMovesChecked}
            />
            <label className={style.freeMovesCheckboxLabel} for="free-moves-checkbox" id="free-moves-checkbox-label">
              Free moves
            </label>
          </Formfield>

          {freeMovesChecked && (
            <Formfield>
              <Checkbox
                id="whites-move-checkbox"
                size="small"
                onChange={onWhitesMoveCheckboxChange}
                checked={gameState.wNext}
              />
              <label
                className={style.freeMovesCheckboxLabel}
                for="whites-move-checkbox"
                id="whites-move-checkbox-label"
              >
                White's move
              </label>
            </Formfield>
          )}
        </div>
        <div className={style.aiResult}>
          {aiResult?.toFixed(3)}
          <br />

          <div>
            <Button
              onClick={async () => {
                setEvalResult({});
                const result = await evaluateBoard();
                setEvalResult(result);
              }}
            >
              Evaluate
            </Button>

            <Formfield>
              <Select onChange={(e) => setDepth(Number(e.target.value))} selectedIndex={depth - 2} hintText="Depth">
                {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((option) => (
                  <SelectOption value={option}>{option}</SelectOption>
                ))}
              </Select>
            </Formfield>

            <Formfield>
              <Select
                onChange={(e) => setHighlightsFor(e.target.value)}
                selectedIndex={Object.keys(highlightOptions).indexOf(highlightsFor) + 1}
                hintText="Hints for player"
              >
                {Object.keys(highlightOptions).map((option) => (
                  <SelectOption value={option}>{option}</SelectOption>
                ))}
              </Select>
            </Formfield>

            <Formfield>
              <Select
                onChange={(e) => setHighlightMethod(e.target.value)}
                selectedIndex={Object.keys(aiDisplayHandlers).concat(allModelNames).indexOf(highlightMethod) + 1}
                hintText="Highlight hints"
              >
                {Object.keys(aiDisplayHandlers)
                  .concat(allModelNames)
                  .map((option) => (
                    <SelectOption value={option}>{option}</SelectOption>
                  ))}
              </Select>
            </Formfield>

            <Formfield>
              <Checkbox
                id="auto-move-highlighted-checkbox"
                size="small"
                onChange={() => setMoveToHighlighted(!moveToHighlighted)}
                checked={moveToHighlighted}
              />
              <label
                className={style.freeMovesCheckboxLabel}
                for="auto-move-highlighted-checkbox"
                id="auto-move-highlighted-checkbox-label"
              >
                Auto move to highlighted
              </label>
            </Formfield>

            <div className={style.smallerText}>
              <pre>{JSON.stringify(evalResult, null, 2)}</pre>
            </div>

            {winningMove}
          </div>
        </div>
      </div>
    </div>
  );
};
