import Scramble from './scramble';
import Solve from './solve';

export default interface TimerSession {
  id: number;
  currentScramble: Scramble;
  lastTime: Solve;
  avgOfFive: number;
  avgOfTwelve: number;
  avgOfThree: number;
  bestTime: number;
  bestAvgOfFive: number;
  bestAvgOfTwelve: number;
  previousSolves: Array<Solve>;
}
