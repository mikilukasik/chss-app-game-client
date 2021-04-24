import './style';
import App from './components/app';
import { initWorkers } from './workers';
import { msgClient } from '../msg/src/client';

export const gameSocket = msgClient.ws(`ws://${typeof window === 'undefined' || window.location.hostname}:3300/gameSocket`);

initWorkers();

export default App;
