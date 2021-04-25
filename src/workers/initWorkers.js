import { DeepeningTask, oneDeeper, solveDeepeningTask, resolveDepth } from '../../chss-engine/src/engine/engine';
import { msgClient } from '../../msg/src/client';
import { ensureCookies } from '../services/cookieService';
import Worker from './mainWorker/main.worker.js'

export const initWorkers = async() => {
  console.log('Starting workers..');
  await ensureCookies();

  const mainWorker = new Worker();
};
