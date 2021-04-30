import { clientLogger } from "../../../chss-module-logger";
import { msgClient } from '../../../msg/src/client';

export const mainWorkerLogger = clientLogger({ msgClient });
