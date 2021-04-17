import './style';
import App from './components/app';
import { initWorkers } from './workers';
import { msgClient } from 'msg/src/client';

const wsAddress = `ws://${typeof window === 'undefined' || window.location.host}`;

export const gameSocket = msgClient.ws(`${wsAddress}/gameSocket`);
export const workersSocket = msgClient.ws(`${wsAddress}/workersSocket`);

initWorkers();

export default App;
