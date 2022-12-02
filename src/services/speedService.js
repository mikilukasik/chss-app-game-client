const SPEED_TEST_LENGTH = 200;

export const getHardwareConcurrency = () => navigator.hardwareConcurrency || 6;

export const measureClientSpeed = () => {
  // TODO: don't do this on the main thread, spawn a worker!!

  const finishAt = Date.now() + SPEED_TEST_LENGTH;
  let count = 0;
  while (Date.now() < finishAt) count += 1;
  return count; // * getHardwareConcurrency();
};
