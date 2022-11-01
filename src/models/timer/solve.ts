import Scramble from './scramble';
export default interface Solve {
  time: number;
  isDNF: boolean;
  hasPenalty: boolean;
  scramble: Scramble;
  id: string;
  correlative: number;
}
