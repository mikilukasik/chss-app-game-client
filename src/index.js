import './style';
import App from './components/app';
import { initWorkers } from './workers';
import { msgClient } from '../msg/src/client';
import { clientLogger } from '../chss-module-logger';
import { ensureClientIdCookie } from './services/cookieService';

ensureClientIdCookie();

export const logger = clientLogger({ msgClient });

export const authSocket = msgClient.ws(`ws://${typeof window === 'undefined' || window.location.hostname}:3300/authSocket`);
export const playerSocket = msgClient.ws(`ws://${typeof window === 'undefined' || window.location.hostname}:3300/playerSocket`);

initWorkers();
export default App;
