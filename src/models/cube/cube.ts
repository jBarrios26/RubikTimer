import { CubeType } from '../timer/scramble';
export interface CubePiece {
  color: RubikColor;
}

export enum RubikColor {
  red = 'R',
  blue = 'B',
  orange = 'O',
  white = 'W',
  yellow = 'Y',
  green = 'G',
}

/**
 * @desc Representation of a rubiks cube
 * @param cubeType Represents which type of rubiks cube is
 * @param cubePieces Array that contains all the rubiks pieces, faces follows this order: WOGRBY
 */
export default class Cube {
  private cubeType: CubeType;
  private cubePieces: CubePiece[][][];

  constructor(cubeType: CubeType, cubePieces: CubePiece[][][]) {
    this.cubeType = cubeType;
    this.cubePieces = cubePieces;
  }

  public rotateFace(face: number, anticlock = false): void {
    this._transpose(face);
    if (anticlock) {
      this._reverseColumns(face);
    } else {
      this._reverseRows(face);
    }
  }

  public get getCubePieces(): CubePiece[][][] {
    return this.cubePieces;
  }

  public get getCubeType(): CubeType {
    return this.cubeType;
  }

  private _transpose(face: number): void {
    for (let row = 0; row < this.cubePieces[face].length - 1; row++) {
      for (
        let column = row + 1;
        column < this.cubePieces[face][row].length;
        column++
      ) {
        const temp = this.cubePieces[face][row][column];
        this.cubePieces[face][row][column] = this.cubePieces[face][column][row];
        this.cubePieces[face][column][row] = temp;
      }
    }
  }

  private _reverseRows(face: number): void {
    for (let row = 0; row < this.cubePieces[face].length; row++) {
      for (
        let column = 0, lastColumn = this.cubePieces[face][row].length - 1;
        column < this.cubePieces[face][row].length / 2;
        column++, lastColumn--
      ) {
        const temp = this.cubePieces[face][row][column];
        this.cubePieces[face][row][column] =
          this.cubePieces[face][row][lastColumn];
        this.cubePieces[face][row][lastColumn] = temp;
      }
    }
  }

  private _reverseColumns(face: number): void {
    for (let column = 0; column < this.cubePieces[face].length; column++) {
      for (
        let row = 0, lastRow = this.cubePieces[face][column].length - 1;
        row < this.cubePieces[face][column].length / 2;
        row++, lastRow--
      ) {
        const temp = this.cubePieces[face][row][column];
        this.cubePieces[face][row][column] =
          this.cubePieces[face][lastRow][column];
        this.cubePieces[face][lastRow][column] = temp;
      }
    }
  }

  private _formatStringFace(face: number, padding: number): string {
    const facePieces = this.cubePieces[face];
    let faceString = '';
    for (let row = 0; row < facePieces.length; row++) {
      faceString += '   '.repeat(padding);
      faceString += ' |';
      for (let column = 0; column < facePieces[row].length; column++) {
        faceString += ` ${facePieces[row][column].color} `;
      }
      faceString += '|\n';
    }
    return faceString;
  }

  private _formatStringRow(
    face: number,
    row: number,
    padding: number,
    newline = true
  ): string {
    const facePieces = this.cubePieces[face];
    let rowString: string = '  '.repeat(padding);
    rowString += '|';
    for (let column = 0; column < facePieces[row].length; column++) {
      rowString += ` ${facePieces[row][column].color} `;
    }
    if (newline) {
      rowString += '\n';
    } else rowString += '';

    return rowString;
  }

  public toString(): string {
    const whiteFace = this._formatStringFace(0, 3);

    let mainBody = '';
    for (let row = 0; row < this.cubePieces[0].length; row++) {
      for (let face = 1; face < 5; face++) {
        mainBody += this._formatStringRow(face, row, 0, false);
      }
      mainBody += '|\n';
    }

    const yellowFace = this._formatStringFace(5, 3);

    return `${whiteFace}\n${mainBody}\n${yellowFace}`;
  }

  /**
   * Scramble the pieces of the cube
   * @param scrambleString: Scramble represented as a String
   */
  public scramble(scrambleString: string): void {
    const scrambleStringMoves = scrambleString.split(' ');
    for (const move of scrambleStringMoves) {
      switch (move) {
        case 'R':
          this.R();
          break;
        case "R'":
          this.Ra();
          break;
        case 'L':
          this.L();
          break;
        case "L'":
          this.La();
          break;
        case 'F':
          this.F();
          break;
        case "F'":
          this.Fa();
          break;
        case 'B':
          this.B();
          break;
        case "B'":
          this.Ba();
          break;
        case 'D':
          this.D();
          break;
        case "D'":
          this.Da();
          break;
        case 'U':
          this.U();
          break;
        case "U'":
          this.Ua();
          break;
        case 'F2':
          this.F2();
          break;
        case 'D2':
          this.D2();
          break;
        case 'B2':
          this.B2();
          break;
        case 'R2':
          this.R2();
          break;
        case 'L2':
          this.L2();
          break;
        case 'U2':
          this.U2();
          break;

        default:
          console.log(move);
          break;
      }
    }
  }

  /**
   * @desc Makes a R move on the cube
   */
  public R() {
    const faces = [4, 5, 2, 0];
    let bufferPieces = [
      this.cubePieces[0][0][this.cubePieces[0].length - 1],
      this.cubePieces[0][1][this.cubePieces[0].length - 1],
      this.cubePieces[0][2][this.cubePieces[0].length - 1],
    ];

    for (let faceIndex = 0; faceIndex < faces.length; faceIndex++) {
      const face = faces[faceIndex];
      const temporalFaceBuffer = [];

      if (face === 5) {
        for (let row = 0; row < this.cubePieces[0].length; row++) {
          temporalFaceBuffer.push(
            this.cubePieces[face][row][this.cubePieces[0].length - 1]
          );
          this.cubePieces[face][row][this.cubePieces[0].length - 1] =
            bufferPieces[this.cubePieces[0].length - 1 - row];
        }
        bufferPieces = temporalFaceBuffer;
        continue;
      } else if (face == 4) {
        for (let row = 0; row < this.cubePieces[0].length; row++) {
          temporalFaceBuffer.push(this.cubePieces[face][row][0]);
          this.cubePieces[face][row][0] =
            bufferPieces[this.cubePieces[0].length - 1 - row];
        }
        bufferPieces = temporalFaceBuffer;
        continue;
      }

      for (let row = 0; row < this.cubePieces[0].length; row++) {
        temporalFaceBuffer.push(
          this.cubePieces[face][row][this.cubePieces[0].length - 1]
        );
        this.cubePieces[face][row][this.cubePieces[0].length - 1] =
          bufferPieces[row];
      }
      bufferPieces = temporalFaceBuffer;
    }
    this.rotateFace(3);
  }

  /**
   * @desc Makes a R' move on the cube (anticlock)
   */
  public Ra() {
    const faces = [2, 5, 4, 0];
    let bufferPieces = [
      this.cubePieces[0][0][this.cubePieces[0].length - 1],
      this.cubePieces[0][1][this.cubePieces[0].length - 1],
      this.cubePieces[0][2][this.cubePieces[0].length - 1],
    ];

    for (let faceIndex = 0; faceIndex < faces.length; faceIndex++) {
      const face = faces[faceIndex];
      const temporalFaceBuffer = [];

      if (face === 4) {
        for (let row = 0; row < this.cubePieces[0].length; row++) {
          temporalFaceBuffer.unshift(this.cubePieces[face][row][0]);
          this.cubePieces[face][row][0] =
            bufferPieces[this.cubePieces[0].length - 1 - row];
        }
        bufferPieces = temporalFaceBuffer;
        continue;
      } else if (face === 5) {
        for (let row = 0; row < this.cubePieces[0].length; row++) {
          temporalFaceBuffer.push(
            this.cubePieces[face][row][this.cubePieces[0].length - 1]
          );
          this.cubePieces[face][row][this.cubePieces[0].length - 1] =
            bufferPieces[this.cubePieces[0].length - 1 - row];
        }
        bufferPieces = temporalFaceBuffer;
        continue;
      }

      for (let row = 0; row < this.cubePieces[0].length; row++) {
        temporalFaceBuffer.unshift(
          this.cubePieces[face][row][this.cubePieces[0].length - 1]
        );
        this.cubePieces[face][row][this.cubePieces[0].length - 1] =
          bufferPieces[row];
      }
      bufferPieces = temporalFaceBuffer;
    }
    this.rotateFace(3, true);
  }

  /**
   * @desc Makes a L move on the cube
   */
  public L() {
    const faces = [2, 5, 4, 0];
    let bufferPieces = [
      this.cubePieces[0][0][0],
      this.cubePieces[0][1][0],
      this.cubePieces[0][2][0],
    ];

    for (let faceIndex = 0; faceIndex < faces.length; faceIndex++) {
      const face = faces[faceIndex];
      const temporalFaceBuffer = [];

      if (face === 4) {
        for (let row = 0; row < this.cubePieces[0].length; row++) {
          temporalFaceBuffer.unshift(
            this.cubePieces[face][row][this.cubePieces[0].length - 1]
          );
          this.cubePieces[face][row][this.cubePieces[0].length - 1] =
            bufferPieces[this.cubePieces[0].length - 1 - row];
        }
        bufferPieces = temporalFaceBuffer;
        continue;
      }

      for (let row = 0; row < this.cubePieces[0].length; row++) {
        temporalFaceBuffer.push(this.cubePieces[face][row][0]);
        this.cubePieces[face][row][0] = bufferPieces[row];
      }
      bufferPieces = temporalFaceBuffer;
    }
    this.rotateFace(1);
  }

  /**
   * @desc Makes a L' move on the cube (anticlock)
   */
  public La() {
    const faces = [4, 5, 2, 0];

    let bufferPieces = [
      this.cubePieces[0][0][0],
      this.cubePieces[0][1][0],
      this.cubePieces[0][2][0],
    ];
    for (let faceIndex = 0; faceIndex < faces.length; faceIndex++) {
      const face = faces[faceIndex];
      const temporalFaceBuffer = [];

      if (face === 4) {
        for (let row = 0; row < this.cubePieces[0].length; row++) {
          temporalFaceBuffer.unshift(
            this.cubePieces[face][row][this.cubePieces[0].length - 1]
          );
          this.cubePieces[face][row][this.cubePieces[0].length - 1] =
            bufferPieces[this.cubePieces[0].length - 1 - row];
        }
        bufferPieces = temporalFaceBuffer;
        continue;
      }

      for (let row = 0; row < this.cubePieces[0].length; row++) {
        temporalFaceBuffer.push(this.cubePieces[face][row][0]);
        this.cubePieces[face][row][0] = bufferPieces[row];
      }
      bufferPieces = temporalFaceBuffer;
    }
    this.rotateFace(1, true);
  }

  /**
   * @desc Makes a U move on the cube (clockwise)
   */
  public U() {
    const faces = [1, 4, 3, 2];

    let bufferPieces = [
      this.cubePieces[2][0][0],
      this.cubePieces[2][0][1],
      this.cubePieces[2][0][2],
    ];

    for (let faceIndex = 0; faceIndex < faces.length; faceIndex++) {
      const face = faces[faceIndex];
      const temporalFaceBuffer = [];

      for (let column = 0; column < this.cubePieces[0].length; column++) {
        temporalFaceBuffer.push(this.cubePieces[face][0][column]);
        this.cubePieces[face][0][column] = bufferPieces[column];
      }
      bufferPieces = temporalFaceBuffer;
    }
    this.rotateFace(0);
  }

  /**
   * @desc Makes a U' move on the cube (anticlockwise)
   */
  public Ua() {
    const faces = [3, 4, 1, 2];
    let bufferPieces = [
      this.cubePieces[2][0][0],
      this.cubePieces[2][0][1],
      this.cubePieces[2][0][2],
    ];

    for (let faceIndex = 0; faceIndex < faces.length; faceIndex++) {
      const face = faces[faceIndex];
      const temporalFaceBuffer = [];

      for (let column = 0; column < this.cubePieces[0].length; column++) {
        temporalFaceBuffer.push(this.cubePieces[face][0][column]);
        this.cubePieces[face][0][column] = bufferPieces[column];
      }
      bufferPieces = temporalFaceBuffer;
    }
    this.rotateFace(0, true);
  }

  /**
   * @desc Makes a D move on the cube (clockwise)
   */
  public D() {
    const faces = [3, 4, 1, 2];
    let bufferPieces = [
      this.cubePieces[2][this.cubePieces[0].length - 1][0],
      this.cubePieces[2][this.cubePieces[0].length - 1][1],
      this.cubePieces[2][this.cubePieces[0].length - 1][2],
    ];

    for (let faceIndex = 0; faceIndex < faces.length; faceIndex++) {
      const face = faces[faceIndex];
      const temporalFaceBuffer = [];

      for (let column = 0; column < this.cubePieces[0].length; column++) {
        temporalFaceBuffer.push(
          this.cubePieces[face][this.cubePieces[0].length - 1][column]
        );
        this.cubePieces[face][this.cubePieces[0].length - 1][column] =
          bufferPieces[column];
      }
      bufferPieces = temporalFaceBuffer;
    }
    this.rotateFace(5);
  }

  /**
   * @desc Makes a D' move on the cube (anticlockwise)
   */
  public Da() {
    const faces = [1, 4, 3, 2];

    let bufferPieces = [
      this.cubePieces[2][this.cubePieces[0].length - 1][0],
      this.cubePieces[2][this.cubePieces[0].length - 1][1],
      this.cubePieces[2][this.cubePieces[0].length - 1][2],
    ];

    for (let faceIndex = 0; faceIndex < faces.length; faceIndex++) {
      const face = faces[faceIndex];
      const temporalFaceBuffer = [];

      for (let column = 0; column < this.cubePieces[0].length; column++) {
        temporalFaceBuffer.push(
          this.cubePieces[face][this.cubePieces[0].length - 1][column]
        );
        this.cubePieces[face][this.cubePieces[0].length - 1][column] =
          bufferPieces[column];
      }
      bufferPieces = temporalFaceBuffer;
    }
    this.rotateFace(5, true);
  }

  /**
   * @desc Makes a F move on the cube (clockwise)
   */
  public F() {
    const faces = [3, 5, 1, 0];
    let bufferPieces = [
      this.cubePieces[0][this.cubePieces[0].length - 1][0],
      this.cubePieces[0][this.cubePieces[0].length - 1][1],
      this.cubePieces[0][this.cubePieces[0].length - 1][2],
    ];

    for (let faceIndex = 0; faceIndex < faces.length; faceIndex++) {
      const face = faces[faceIndex];
      const temporalFaceBuffer = [];

      if (face === 3) {
        for (let row = 0; row < this.cubePieces[0].length; row++) {
          temporalFaceBuffer.unshift(this.cubePieces[face][row][0]);

          this.cubePieces[face][row][0] = bufferPieces[row];
        }
      } else if (face === 0) {
        for (let column = 0; column < this.cubePieces[0].length; column++) {
          temporalFaceBuffer.push(
            this.cubePieces[face][this.cubePieces[0].length - 1][column]
          );
          this.cubePieces[face][this.cubePieces[0].length - 1][column] =
            bufferPieces[column];
        }
      } else if (face === 5) {
        for (let column = 0; column < this.cubePieces[0].length; column++) {
          temporalFaceBuffer.push(this.cubePieces[face][0][column]);
          this.cubePieces[face][0][column] = bufferPieces[column];
        }
      } else {
        for (let row = 0; row < this.cubePieces[0].length; row++) {
          temporalFaceBuffer.unshift(
            this.cubePieces[face][row][this.cubePieces[0].length - 1]
          );
          this.cubePieces[face][row][this.cubePieces[0].length - 1] =
            bufferPieces[row];
        }
      }
      bufferPieces = temporalFaceBuffer;
    }
    this.rotateFace(2);
  }

  /**
   * @desc Makes a F' move on the cube (anticlockwise)
   */
  public Fa() {
    const faces = [1, 5, 3, 0];
    let bufferPieces = [
      this.cubePieces[0][this.cubePieces[0].length - 1][2],
      this.cubePieces[0][this.cubePieces[0].length - 1][1],
      this.cubePieces[0][this.cubePieces[0].length - 1][0],
    ];

    for (let faceIndex = 0; faceIndex < faces.length; faceIndex++) {
      const face = faces[faceIndex];
      const temporalFaceBuffer = [];

      if (face === 3) {
        for (let row = 0; row < this.cubePieces[0].length; row++) {
          temporalFaceBuffer.push(this.cubePieces[face][row][0]);
          this.cubePieces[face][row][0] = bufferPieces[row];
        }
      } else if (face === 0) {
        for (let column = 0; column < this.cubePieces[0].length; column++) {
          temporalFaceBuffer.push(
            this.cubePieces[face][this.cubePieces[0].length - 1][column]
          );
          this.cubePieces[face][this.cubePieces[0].length - 1][column] =
            bufferPieces[column];
        }
      } else if (face === 5) {
        for (let column = 0; column < this.cubePieces[0].length; column++) {
          temporalFaceBuffer.unshift(this.cubePieces[face][0][column]);
          this.cubePieces[face][0][column] = bufferPieces[column];
        }
      } else {
        for (let row = 0; row < this.cubePieces[0].length; row++) {
          temporalFaceBuffer.push(
            this.cubePieces[face][row][this.cubePieces[0].length - 1]
          );
          this.cubePieces[face][row][this.cubePieces[0].length - 1] =
            bufferPieces[row];
        }
      }
      bufferPieces = temporalFaceBuffer;
    }
    this.rotateFace(2, true);
  }

  /**
   * @desc Makes a B move on the cube (clockwise)
   */
  public B() {
    const faces = [1, 5, 3, 0];

    let bufferPieces = [
      this.cubePieces[0][0][2],
      this.cubePieces[0][0][1],
      this.cubePieces[0][0][0],
    ];

    for (let faceIndex = 0; faceIndex < faces.length; faceIndex++) {
      const face = faces[faceIndex];
      const temporalFaceBuffer = [];

      if (face === 1) {
        for (let row = 0; row < this.cubePieces[0].length; row++) {
          temporalFaceBuffer.push(this.cubePieces[face][row][0]);
          this.cubePieces[face][row][0] = bufferPieces[row];
        }
      } else if (face === 5) {
        for (let column = 0; column < this.cubePieces[0].length; column++) {
          temporalFaceBuffer.unshift(
            this.cubePieces[face][this.cubePieces[0].length - 1][column]
          );
          this.cubePieces[face][this.cubePieces[0].length - 1][column] =
            bufferPieces[column];
        }
      } else if (face === 0) {
        for (let column = 0; column < this.cubePieces[0].length; column++) {
          temporalFaceBuffer.push(this.cubePieces[face][0][column]);
          this.cubePieces[face][0][column] = bufferPieces[column];
        }
      } else {
        for (let row = 0; row < this.cubePieces[0].length; row++) {
          temporalFaceBuffer.push(
            this.cubePieces[face][row][this.cubePieces[0].length - 1]
          );
          this.cubePieces[face][row][this.cubePieces[0].length - 1] =
            bufferPieces[row];
        }
      }
      bufferPieces = temporalFaceBuffer;
    }
    this.rotateFace(4);
  }

  /**
   * @desc Makes a B' move on the cube (anticlockwise)
   */
  public Ba() {
    const faces = [3, 5, 1, 0];
    let bufferPieces = [
      this.cubePieces[0][0][0],
      this.cubePieces[0][0][1],
      this.cubePieces[0][0][2],
    ];

    for (let faceIndex = 0; faceIndex < faces.length; faceIndex++) {
      const face = faces[faceIndex];
      const temporalFaceBuffer = [];

      if (face === 1) {
        for (let row = 0; row < this.cubePieces[0].length; row++) {
          temporalFaceBuffer.unshift(this.cubePieces[face][row][0]);
          this.cubePieces[face][row][0] = bufferPieces[row];
        }
      } else if (face === 5) {
        for (let column = 0; column < this.cubePieces[0].length; column++) {
          temporalFaceBuffer.push(
            this.cubePieces[face][this.cubePieces[0].length - 1][column]
          );
          this.cubePieces[face][this.cubePieces[0].length - 1][column] =
            bufferPieces[column];
        }
      } else if (face === 0) {
        for (let column = 0; column < this.cubePieces[0].length; column++) {
          temporalFaceBuffer.push(this.cubePieces[face][0][column]);
          this.cubePieces[face][0][column] = bufferPieces[column];
        }
      } else {
        for (let row = 0; row < this.cubePieces[0].length; row++) {
          temporalFaceBuffer.unshift(
            this.cubePieces[face][row][this.cubePieces[0].length - 1]
          );
          this.cubePieces[face][row][this.cubePieces[0].length - 1] =
            bufferPieces[row];
        }
      }
      bufferPieces = temporalFaceBuffer;
    }
    this.rotateFace(4, true);
  }

  public U2() {
    this.U();
    this.U();
  }

  public R2() {
    this.R();
    this.R();
  }

  public L2() {
    this.L();
    this.L();
  }

  public F2() {
    this.F();
    this.F();
  }

  public B2() {
    this.B();
    this.B();
  }

  public D2() {
    this.D();
    this.D();
  }
}
