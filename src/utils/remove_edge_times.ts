import Solve from '../models/timer/solve';

export const removeEdgeTimes = (solves: Array<Solve>): Array<Solve> => {
  const sortedSolves = solves.sort((solveA, solveB) => {
    if (solveA.isDNF) {
      return 1;
    } else if (solveB.isDNF) {
      return -1;
    }
    return solveA.time - solveB.time;
  });
  return sortedSolves.slice(1, solves.length - 1);
};
