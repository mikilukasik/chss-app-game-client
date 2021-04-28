import { clientLogger } from "../../../chss-service-logger";
import { msgClient } from '../../../msg/src/client';

export const mainWorkerLogger = clientLogger({ msgClient });
