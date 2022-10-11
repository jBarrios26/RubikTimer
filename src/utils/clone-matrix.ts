import { CubePiece } from '../models/cube/cube';
export const cloneMatrix = (cubePieces: CubePiece[][][]) => {
  return cubePieces.map((face) => face.map((row) => row.map((col) => col)));
};
