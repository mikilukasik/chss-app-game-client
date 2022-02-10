// https://www.chessprogramming.net/perfect-perft/

export const perfTestFens = [
  { description: 'Illegal ep move #1', fen: '3k4/3p4/8/K1P4r/8/8/8/8 b - - 0 1', depth: 6, result: 1134888 },
  { description: 'Illegal ep move #2', fen: '8/8/4k3/8/2p5/8/B2P2K1/8 w - - 0 1', depth: 6, result: 1015133 },
  { description: 'EP Capture Checks Opponent', fen: '8/8/1k6/2b5/2pP4/8/5K2/8 b - d3 0 1', depth: 6, result: 1440467 },
  { description: 'Short Castling Gives Check', fen: '5k2/8/8/8/8/8/8/4K2R w K - 0 1', depth: 6, result: 661072 },
  { description: 'Long Castling Gives Check', fen: '3k4/8/8/8/8/8/8/R3K3 w Q - 0 1', depth: 6, result: 803711 },
  { description: 'Castle Rights', fen: 'r3k2r/1b4bq/8/8/8/8/7B/R3K2R w KQkq - 0 1', depth: 4, result: 1274206 },
  { description: 'Castling Prevented', fen: 'r3k2r/8/3Q4/8/8/5q2/8/R3K2R b KQkq - 0 1', depth: 4, result: 1720476 },
  { description: 'Promote out of Check', fen: '2K2r2/4P3/8/8/8/8/8/3k4 w - - 0 1', depth: 6, result: 3821001 },
  { description: 'Discovered Check', fen: '8/8/1P2K3/8/2n5/1q6/8/5k2 b - - 0 1', depth: 5, result: 1004658 },
  { description: 'Promote to give check', fen: '4k3/1P6/8/8/8/8/K7/8 w - - 0 1', depth: 6, result: 217342 },
  { description: 'Under Promote to give check', fen: '8/P1k5/K7/8/8/8/8/8 w - - 0 1', depth: 6, result: 92683 },
  { description: 'Self Stalemate', fen: 'K1k5/8/P7/8/8/8/8/8 w - - 0 1', depth: 6, result: 2217 },
  { description: 'Stalemate & Checkmate', fen: '8/k1P5/8/1K6/8/8/8/8 w - - 0 1', depth: 7, result: 567584 },
  { description: 'Stalemate & Checkmate', fen: '8/8/2k5/5q2/5n2/8/5K2/8 b - - 0 1', depth: 4, result: 23527 },
];
