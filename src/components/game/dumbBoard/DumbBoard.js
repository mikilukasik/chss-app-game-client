import { h } from 'preact';
import style from './style.scss';

import { useContext, useEffect, useState, useCallback } from 'preact/hooks';
import GameContext from '../../../context/GameContext';
import { moveInBoard, moveString2move } from '../../../../chss-module-engine/src/engine/engine';
import { ProgressBar } from '../progressBar';
import UserContext from '../../../context/UserContext';
import { MovePager } from '../movePager';
import { ReplayBoard } from '../replayBoard';
import { getPlayerSocket, setCurrentGameState, getPredictionSocket } from '../../../services/gamesService';
import { toNested } from '../../../utils/toNested';
import { move2moveString } from '../../../../../chss-module-engine/src/engine_new/transformers/move2moveString';
import { getPieceBalance } from '../../../../chss-module-engine/src/engine_new/evaluators/evaluateBoard';
import { GameModel } from '../../../../../chss-module-engine/src/model/Game';
import * as tf from '@tensorflow/tfjs';
import { board2fen } from '../../../../chss-module-engine/src/engine_new/transformers/board2fen';
import { getMovedBoard } from '../../../../chss-module-engine/src/engine_new/utils/getMovedBoard';
import Button from 'preact-material-components/Button';
import TextField from 'preact-material-components/TextField';
import { Select, SelectOption } from 'preact-material-components/Select';

import Checkbox from 'preact-material-components/Checkbox';
import 'preact-material-components/Checkbox/style.css';

// import FormControlLabel from 'preact-material-components/FormControlLabel';
// // import 'preact-material-components/FormControlLabel/style.css';

import Formfield from 'preact-material-components/FormField';
import { getPrediction } from '../../../../chss-module-engine/src/engine_new/tfModels/getPrediction';
import { getMoveSorter } from '../../../../chss-module-engine/src/engine_new/moveGenerators/getMoveSorter';
import { aiWorker } from '../../workerFrame';

// const evalMethods = {
//   localSingleThread: {},
// };

// const highlightMethods = ['Off', 'Legacy', 'OneHot (server)'];

// const _modelName = '0.03606-e8-1644187281482';
// const _modelName = '0.00473-1641230911613_s1000k_e20'; //can count pieces
// const _modelName = '451_d2-14-0.03523-s5.33M-e25-1643486743133';
// const _modelName = '424_d2-0.06103-s0.89M-e50-1643221783648';
const _modelName = 'champion';
const _movesModelName = 'moves_0.02679-e1-1652876197395';
// const _modelName = '451_r4-0.03330-s5.22M-e4-1643803305990';

// tf.loadLayersModel(`/assets/models/${modelName}/model.json`).then((_model) => {
//   console.log('tf model loaded in DumbBoard');

// model = _model;
// while (getModelResolvers.length) getModelResolvers.pop()(model);

/* debug */ let started;

// const getChangedIndexes = (() => {
//   let previousBoard = [];
//   let previousResult = [];

//   return (board) => {
//     if (previousBoard === board) return previousResult;

//     previousResult = [];
//     board.slice(0, 64).forEach((cell, index) => {
//       if (cell !== previousBoard[index]) previousResult.push(index);
//     });

//     previousBoard = board;
//     return previousResult;
//   };
// })();

// const previosTable = [];
// for (let x = 0; x < 8; x += 1) {
//   previosTable[x] = [];
//   for (let y = 0; y < 8; y += 1) previosTable[x][y] = [];
// }
// let autoMoveSwitch;
export const DumbBoard = () => {
  // const {
  //   gameState,
  //   setGameState,
  //   isNewGameState,
  //   setIsNewGameState,
  //   replayMoveNumber,
  //   setReplayMoveNumber,
  // } = useContext(GameContext);
  const [moveSourceCell, setMoveSourceCell] = useState();
  const [movePotentialTargetCells, setMovePotentialTargetCells] = useState([]);
  const [gameState, setGameState] = useState(new GameModel());
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
  // const [activeFen, setActiveFen] = useState();
  // const [autoMoveSwitch, setAutoMoveSwitch] = useState(false);
  // const [progressTotal, setProgressTotal] = useState();
  // const [progressCompleted, setProgressCompleted] = useState();
  // const { user: { userId } = {}, userSettings } = useContext(UserContext);

  // if (!gameState) return null;
  // setCurrentGameState(gameState);

  const { board, nextMoves, bitBoard: _bitBoard } = gameState;
  // const changedIndexes = getChangedIndexes(board);

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

    if (moveToHighlighted) {
      const winningMove = sortedMoves.find(({ move }) => gameState.nextMoves.includes(moveString2move(move)));
      if (winningMove) {
      }
    }

    // let greenMarked;
    setWinningMove(
      <table>
        {sortedMoves.slice(0, 10).map(({ move, val }, i) => (
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

    if (moveToHighlighted) {
      const winningMove = sortedMoves.find(({ move }) => gameState.nextMoves.includes(moveString2move(move)));
      if (winningMove) {
        makeMove(moveString2move(winningMove.move));
      }
    }
    // const moveSorter = await getMoveSorter(nextGameState.board);
    // const moves = nextGameState.nextMoves.slice().sort(moveSorter);
    // setWinningMove(move2moveString(moves[0]));

    // setAiMovesResult(
    //   normalizeToOneGrouped(
    //     await getPrediction({
    //       modelName: _movesModelName,
    //       board: nextGameState.board,
    //       repeatedPastFens: nextGameState.repeatedPastFens,
    //     }),
    //   ),
    // );
  };

  const clearHighlights = () => {
    console.log('clearing highlights');
    setWinningMove(null);
    setAiMovesResult([]);
  };

  const updateAiDisplayHandlers = {
    Pg_SL: ({ nextGameState }) => updateAiDisplayOneHotMethod({ nextGameState, modelName: 'pg_SL' }),
    Pg_large: ({ nextGameState }) => updateAiDisplayOneHotMethod({ nextGameState, modelName: 'pg_large' }),
    Pg_small: ({ nextGameState }) => updateAiDisplayOneHotMethod({ nextGameState, modelName: 'pg_small' }),
    Pg_tiny: ({ nextGameState }) => updateAiDisplayOneHotMethod({ nextGameState, modelName: 'pg_tiny' }),
    OneHot: ({ nextGameState }) => updateAiDisplayOneHotMethod({ nextGameState, modelName: 'oneHot' }),
    Inc: ({ nextGameState }) => updateAiDisplayOneHotMethod({ nextGameState, modelName: 'inc' }),
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
      return (updateAiDisplayHandlers[highlightMethod] || clearHighlights)({ nextGameState });
    clearHighlights();
  };

  useEffect(() => {
    updateAiDisplay(gameState);
  }, [highlightMethod]);

  // const userCanMove = userId === gameState[board[64] ? "wPlayer" : "bPlayer"];

  // if (isNewGameState) {
  //   changedIndexes.length = 0;
  //   setMoveSourceCell(null);
  //   setMovePotentialTargetCells([]);
  // }

  // useEffect(() => {
  //   setReplayMoveNumber(-1); // replay off
  // }, [gameState]);

  // /* debug */
  // /* debug */ const displayStats = (stats) => {
  //   /* debug */ const converted = stats
  //     /* debug */ .map(
  //       (stat) =>
  //         `${stat.score /* - stat.aiValue */
  //           .toFixed(5)
  //           .padStart(8)} ${stat.moveTree
  //           .filter(Boolean)
  //           .map((m) => move2moveString(m))
  //           .join(" ")}`
  //     );
  //   /* debug */ console.log(
  //     `\n\n%c${converted.join("\n%c")}`,
  //     ...converted.map((l, i) => (i % 2 ? "background: #ddd" : ""))
  //   );
  //   /* debug */
  // };
  // /* debug */
  // /* debug */ getPlayerSocket().then((playerSocket) => {
  //   /* debug */ playerSocket.on("displayStats", (stats, comms) => {
  //     /* debug */ displayStats(stats);
  //     /* debug */ comms.send("ok");
  //     /* debug */
  //   });
  //   /* debug */
  // });
  // /* debug */

  // if (replayMoveNumber !== -1) {
  //   return (
  //     <div>
  //       <ReplayBoard
  //         {...{ replayMoveNumber, setReplayMoveNumber, gameState }}
  //       />
  //     </div>
  //   );
  // }

  const nestedBoard = toNested(board);

  // setIsNewGameState(false);

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

  // 1k6/pp3p2/2pb2p1/3p4/3P3r/4BP2/PP2BP2/R1R2K1r w - - 0 1

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

    // if (!nextGameState.wNext && !freeMovesChecked) return autoMove();

    // const progressHandler = ({ progress: p }) => {
    //   setProgressTotal(p.total);
    //   setProgressCompleted(p.completed);
    // };

    // const dataHandler = ({ onData }) => {
    //   onData(progressHandler);
    // };

    // /* debug */ started = Date.now();

    setAiResult(
      (await getPrediction({
        modelName: _modelName,
        board: nextGameState.board,
        repeatedPastFens: nextGameState.repeatedPastFens,
      })) * 50,
    );

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

    // console.log({ movesResult });
    // console.log(Math.round(aiResult), aiResult);

    // const playerSocket = await getPlayerSocket();
    // playerSocket
    //   .do(
    //     'updateGame',
    //     {
    //       game: nextGameState,
    //       aiToRespond: !userSettings.useLocalSingleThreadAi,
    //       userId,
    //     },
    //     dataHandler,
    //   )
    //   /* debug */ .then(() => console.log(`move took ${Date.now() - started}ms`))
    //   .catch(console.error)
    //   .then(setProgressCompleted);
  };

  // const pieceValues = new Int8Array([0, -1, -3, -3, -5, -9, -64, 0, 0, 1, 3, 3, 5, 9, 64]);

  // alphazero's valuation https://arxiv.org/pdf/2009.04374.pdf
  // empty, pawn, bishop, knight, rook, queen, null, null, null, king
  const weights = [0, -1, -3.33, -3.05, -5.63, -9.5, -20, 0, 0, 1, 3.33, 3.05, 5.63, 9.5, 20].map((w) => w / 50);

  const indexOfMaxValue = (array) => array.reduce((iMax, x, i, arr) => (x !== null && x > arr[iMax] ? i : iMax), 0);
  const indexOfMinValue = (array) => array.reduce((iMin, x, i, arr) => (x !== null && x < arr[iMin] ? i : iMin), 0);

  // const autoMove = async () => {
  //   // console.log(gameState);
  //   const { nextMoves, wNext, board } = gameState;
  //   if (!nextMoves.length) {
  //     throw true;
  //   }
  //   const predictions = await Promise.all(
  //     nextMoves.map((move) => {
  //       // const movedState = moveInBoard(move, gameState);
  //       const movedBoard = getMovedBoard(move, board);
  //       return getPrediction({
  //         modelName: _modelName,
  //         board: movedBoard,
  //         repeatedPastFens: gameState.repeatedPastFens,
  //       }).then(
  //         (pred) => {
  //           const pawnMoved = (board[move >>> 10] & 7) === 1;
  //           const targetIndex = move & 63;
  //           const pawnTurnsQueen = pawnMoved && targetIndex >= 56;
  //           // console.log(pawnTurnsQueen);
  //           return pred + weights[board[targetIndex] & 7] + (pawnTurnsQueen ? weights[5] - weights[1] : 0);
  //         }, //+ (Math.random() - 0.5) / 100, //+ weights[board[move & 63] & 7], //
  //       );
  //     }),
  //   );

  //   // const moveindex = indexOfMinValue(predictions);
  //   // const moveindex = !wNext ? indexOfMinValue(predictions) : Math.floor(Math.random() * predictions.length); //indexOfMinValue(predictions);
  //   const moveindex = wNext ? indexOfMaxValue(predictions) : indexOfMinValue(predictions);

  //   // console.log({ moveindex, predictions });
  //   console.log(
  //     nextMoves
  //       .map((move, i) => ({ move: move2moveString(move), value: predictions[i] }))
  //       .sort((a, b) => (wNext ? b.value - a.value : a.value - b.value))
  //       .map(({ move, value }) => `${move} ${value}`)
  //       .join('\n'),
  //   );
  //   makeMove(nextMoves[moveindex]);
  //   // console.log({ predictions });
  //   // console.log(autoMoveSwitch);
  //   // if (autoMoveSwitch)
  //   // setTimeout(() => {
  //   //   // console.log(autoMoveSwitch);

  //   //   // if (autoMoveSwitch) autoMove();
  //   // }, 0);
  // };

  // const autoMoveSwitched = async (event) => {
  //   const { checked } = event.target;
  //   // setAutoMoveSwitch(checked);
  //   autoMoveSwitch = checked;
  //   // await setAutoMoveSwitch(checked);
  //   if (checked) autoMove();
  // };

  const onFeeMovesCheckboxChange = ({ target: { checked } }) => setFreeMovesChecked(checked);
  const onAutoMoveChangeWhite = ({ target: { checked } }) => setKeepMovingWhite(checked);
  const onAutoMoveChangeBlack = ({ target: { checked } }) => setKeepMovingBlack(checked);

  const setWnext = (wNext, game = gameState) => {
    const nextGameState = Object.assign({}, game, { wNext, board: game.board.slice() });
    nextGameState.board[64] = wNext ? 1 : 0;
    return nextGameState;
  };

  const onWhitesMoveCheckboxChange = async ({ target: { checked } }) => {
    // console.log('aaaaaa');

    const nextGameState = setWnext(checked);
    // const nextGameState = Object.assign({}, gameState, { wNext: checked, board: board.slice() });
    // nextGameState.board[64] = checked ? 1 : 0;
    // console.log(nextGameState.wNext);
    // console.log('hello');

    setAiResult(
      (await getPrediction({
        modelName: _modelName,
        board: nextGameState.board,
        repeatedPastFens: nextGameState.repeatedPastFens,
      })) * 50,
    );
    setGameState(nextGameState);
  };

  const evaluateBoard = ({ method = 'localSingleThread' } = {}) =>
    console.log('ai', {
      method,
      board: gameState.board,
      moves: gameState.nextMoves,
      depth,
    }) ||
    aiWorker.do('ai', {
      method,
      board: gameState.board,
      moves: gameState.nextMoves,
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
                      // if (!userCanMove) return;
                      // changedIndexes.length = 0;
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

              // const aiMoveSourceCol = ;
              // const aiMoveTargetCol = ;
              const aiBorder = aiMovesResult.length
                ? `5px solid #${getColorFromIndex(rowIndex * 8 + colIndex)}00${getColorFromIndex(
                    rowIndex * 8 + colIndex + 64,
                  )}`
                : 'none';
              // console.log({ aiBorder });

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

                      // className={`${selectedClass} ${
                      //   changedIndexes.includes(rowIndex * 8 + colIndex) ? style.selected2 : ''
                      // }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        {/* <MovePager {...{ replayMoveNumber, setReplayMoveNumber, gameState }} /> */}
      </div>
      <div>
        <div>
          <Formfield>
            <TextField
              label="State"
              value={board2fen(gameState.board)}
              onChange={(e) => setGameState(new GameModel({ fen: e.target.value }))}
              outerStyle={{ 'min-width': '-webkit-fill-available' }}
            />
          </Formfield>

          <Formfield>
            <Checkbox id="auto-move-checkbox" size="small" onChange={onAutoMoveChangeWhite} checked={keepMovingWhite} />
            <label className={style.freeMovesCheckboxLabel} for="auto-move-checkbox" id="auto-move-checkbox-label">
              Auto move white
            </label>
          </Formfield>

          <Formfield>
            <Checkbox id="auto-move-checkbox" size="small" onChange={onAutoMoveChangeBlack} checked={keepMovingBlack} />
            <label className={style.freeMovesCheckboxLabel} for="auto-move-checkbox" id="auto-move-checkbox-label">
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
              <label className={style.freeMovesCheckboxLabel} for="free-moves-checkbox" id="free-moves-checkbox-label">
                White's move
              </label>
            </Formfield>
          )}
        </div>
        <div className={style.aiResult}>
          {/* <input type="checkbox" value={autoMoveSwitch} onChange={autoMoveSwitched}></input>
          <select onChange={console.log}>
            <option>a</option>
            <option>b</option>
          </select> */}
          {/* <input type="checkbox">Free moves</input> */}
          {aiResult?.toFixed(3)}
          <br />
          {winningMove}

          <div>
            <Button
              onClick={async () => {
                setEvalResult({});
                const result = await evaluateBoard();
                // console.log({ result });
                setEvalResult(result);
              }}
            >
              Evaluate
            </Button>

            <Formfield>
              <Select onChange={(e) => setDepth(Number(e.target.value))} selectedIndex={depth - 2} hintText="Depth">
                {[3, 4, 5, 6, 7].map((option) => (
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
                selectedIndex={Object.keys(updateAiDisplayHandlers).indexOf(highlightMethod) + 1}
                hintText="Highlight hints"
              >
                {Object.keys(updateAiDisplayHandlers).map((option) => (
                  <SelectOption value={option}>{option}</SelectOption>
                ))}
              </Select>
            </Formfield>

            <Formfield>
              <Checkbox
                id="whites-move-checkbox"
                size="small"
                onChange={() => setMoveToHighlighted(!moveToHighlighted)}
                checked={moveToHighlighted}
              />
              <label className={style.freeMovesCheckboxLabel} for="free-moves-checkbox" id="free-moves-checkbox-label">
                Auto move to highlighted
              </label>
            </Formfield>

            {/* <input value={depth} onChange={(e) => setDepth(Number(e.target.value))} /> */}
            <div className={style.smallerText}>
              <pre>{JSON.stringify(evalResult, null, 2)}</pre>
            </div>
          </div>

          {/* <span>
            <TextField label="Rounds" onKeyUp={(e) => setRounds(e.target.value)} />
          </span>
          <span>
            <TextField label="Random value" onKeyUp={(e) => setRandomValue(e.target.value)} />
          </span>
          <Button onClick={startTournamentClickHandler}>Start tournament</Button>
          <pre className={style.tournamentStats}>{tournamentStats}</pre> */}
        </div>
      </div>
    </div>
  );
};
