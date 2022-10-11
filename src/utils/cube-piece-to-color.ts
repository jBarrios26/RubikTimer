import { CubePiece, RubikColor } from '../models/cube/cube';
import { blue, white, yellow, green, red, orange } from '../resources/colors';

const cubePieceToColor: (piece: CubePiece) => string = (piece: CubePiece) => {
  switch (piece.color) {
    case RubikColor.blue:
      return blue;
    case RubikColor.white:
      return white;
    case RubikColor.yellow:
      return yellow;
    case RubikColor.green:
      return green;
    case RubikColor.red:
      return red;
    case RubikColor.orange:
      return orange;
  }
};

export default cubePieceToColor;
