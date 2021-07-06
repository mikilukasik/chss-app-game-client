export const toNested = (arr) => {
  const nested = [[], [], [], [], [], [], [], []];
  
  arr.slice(0, 64).forEach((cell, index) => {
    nested[Math.floor(index / 8)][index % 8] = cell;    
  });

  return nested;
};
