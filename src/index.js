import './style';
import App from './components/app';
import { initWorkers } from './workers';
import { msgClient } from '../../msg/src/client';

export const gameSocket = msgClient.ws('ws://192.168.1.164:3300/gameSocket');
export const workersSocket = msgClient.ws('ws://192.168.1.164:3300/workersSocket');

initWorkers();

export default App;
