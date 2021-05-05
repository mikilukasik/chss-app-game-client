import './style';
import App from './components/app';
import { initWorkers } from './workers';
import { msgClient } from '../msg/src/client';
import { clientLogger } from '../chss-module-logger';
import { ensureClientIdCookie } from './services/cookieService';
import { setUser } from './services/userService';
import { useActiveGamesDistobj } from './services/gamesService';

ensureClientIdCookie();

export const logger = clientLogger({ msgClient });

export const authSocket = msgClient.ws(`ws://${typeof window === 'undefined' || window.location.hostname}:3300/authSocket`);
authSocket.on('setUser', (user, comms) => {
  setUser(user);
  comms.send('ok');
});

export const playerSocket = msgClient.ws(`ws://${typeof window === 'undefined' || window.location.hostname}:3300/playerSocket`);
useActiveGamesDistobj(playerSocket.distObj('activeGames'));

initWorkers();
export default App;
