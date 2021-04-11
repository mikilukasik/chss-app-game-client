import './style';
import App from './components/app';
import { initWorkers } from './worker';
import { msgClient } from '../../msg/src/client';

export const gameSocket = msgClient.ws('ws://192.168.1.164:3300/gameSocket');

initWorkers();

export default App;
