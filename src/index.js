import './style';
import App from './components/app';
import { initWorkers } from './workers';
import { msgClient } from '../msg/src/client';
import { clientLogger } from '../chss-module-logger';
import { ensureClientIdCookie } from './services/cookieService';
import { setUser } from './services/userService';
import { usePlayerSocket } from './services/gamesService';
import { debugService } from './services/debugService';
import { useTournamentSocket } from './services/tournamentService';
import { useTaskSocket } from './services/taskService';

let _authSocket;
const authSocketAwaiters = [];

export const getAuthSocket = () =>
  new Promise((resolve) => {
    if (_authSocket) return resolve(_authSocket);
    authSocketAwaiters.push(resolve);
  });

(() => {
  if (typeof self === 'undefined') return;
  ensureClientIdCookie();

  const authSocket = msgClient.ws(`ws://${typeof window === 'undefined' || window.location.hostname}:3300/authSocket`);
  authSocket.on('setUser', (user, comms) => {
    setUser(user);
    comms.send('ok');
  });
  _authSocket = authSocket;
  authSocketAwaiters.forEach((r) => r(authSocket));

  const playerSocket = msgClient.ws(
    `ws://${typeof window === 'undefined' || window.location.hostname}:3300/playerSocket`,
  );
  usePlayerSocket(playerSocket);

  const tournamentSocket = msgClient.ws(
    `ws://${typeof window === 'undefined' || window.location.hostname}:3300/tournamentSocket`,
  );
  useTournamentSocket(tournamentSocket);

  const taskSocket = msgClient.ws(`ws://${typeof window === 'undefined' || window.location.hostname}:3300/taskSocket`);
  useTaskSocket(taskSocket);

  initWorkers();

  debugService();
})();

export default App;
