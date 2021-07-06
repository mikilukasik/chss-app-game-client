import { h } from 'preact';
import { board2fen } from '../../../chss-module-engine/src/engine_new/transformers/board2fen';
import { GameModel } from "../../../chss-module-engine/src/model/Game";
import { fen2intArray } from "../../../chss-service-game-handler/chss-module-engine/src/engine_new/transformers/fen2intArray";
import { generateLegalMoves } from "../../chss-module-engine/src/engine_new/moveGenerators/generateLegalMoves";
import { getCurrentGameState, getCurrentGameUpdater, getPlayerSocket, startCustomGame } from "./gamesService"

export const debugService = async() => {
  if (typeof window === 'undefined') return;

  const playerSocket = await getPlayerSocket();
  const currentGameUpdater = await getCurrentGameUpdater();
  
  window.perft = (fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', depth = 5) => {
    const board = fen2intArray(fen);
    const moves = generateLegalMoves(board);
    playerSocket.do('perft', { board: Array.from(board), moves: Array.from(moves), depth }, ({ onData }) => {
      onData(({ progress: { total, completed } }) => console.log(`${completed} / ${total}`));
    }).then(console.log, console.error);
  };

  window.displayBoard = (board) => {
    currentGameUpdater(new GameModel({ board }));
  };

  window.getFen = () => {
    const gameState = getCurrentGameState();
    return board2fen(gameState.board);
  };

  window.displayFen = (fen) => {
    window.displayBoard(fen2intArray(fen));
  }

  window.startCustomGame = startCustomGame
};
