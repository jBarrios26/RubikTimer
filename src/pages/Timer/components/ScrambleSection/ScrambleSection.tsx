import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  ScrambleSectionCard,
  ScrambleViewer,
  CubeFace,
  CubeColumn,
} from './ScrambleSection.styles';
import { AppStore } from '../../../../redux/store';
import { threeByThreeCubePieces } from '../../../../resources/cube_pieces';
import { CubeFaceItem } from './ScrambleSection.styles';

import Cube from '../../../../models/cube/cube';
import { CubeType } from '../../../../models/timer/scramble';
import cubePieceToColor from '../../../../utils/cube-piece-to-color';
import { useEffect } from 'react';
import { CubePiece } from '../../../../models/cube/cube';
import { cloneMatrix } from '../../../../utils/clone-matrix';

const ScrambleSection: React.FC = () => {
  const stateScramble = useSelector((store: AppStore) => store.timer);
  const [cubePieces, setCubePieces] = useState<CubePiece[][][]>(
    threeByThreeCubePieces
  );

  useEffect(() => {
    const cube = new Cube(
      CubeType.threeByThree,
      cloneMatrix(threeByThreeCubePieces)
    );
    cube.scramble(stateScramble.currentScramble.scramble ?? '');
    setCubePieces(cube.getCubePieces);
  }, [stateScramble.currentScramble]);

  return (
    <ScrambleSectionCard>
      <ScrambleViewer>
        <CubeColumn>
          <CubeFace dimension={3}>
            {cubePieces[1]
              .flatMap((row) => row)
              .flatMap((piece) => (
                <CubeFaceItem color={cubePieceToColor(piece)} />
              ))}
          </CubeFace>
        </CubeColumn>
        <CubeColumn>
          <CubeFace dimension={3}>
            {cubePieces[0]
              .flatMap((row) => row)
              .flatMap((piece) => (
                <CubeFaceItem color={cubePieceToColor(piece)} />
              ))}
          </CubeFace>
          <CubeFace dimension={3}>
            {cubePieces[2]
              .flatMap((row) => row)
              .flatMap((piece) => (
                <CubeFaceItem color={cubePieceToColor(piece)} />
              ))}
          </CubeFace>
          <CubeFace dimension={3}>
            {cubePieces[5]
              .flatMap((row) => row)
              .flatMap((piece) => (
                <CubeFaceItem color={cubePieceToColor(piece)} />
              ))}
          </CubeFace>
        </CubeColumn>
        <CubeColumn>
          <CubeFace dimension={3}>
            {cubePieces[3]
              .flatMap((row) => row)
              .flatMap((piece) => (
                <CubeFaceItem color={cubePieceToColor(piece)} />
              ))}
          </CubeFace>
        </CubeColumn>
        <CubeColumn>
          <CubeFace dimension={3}>
            {cubePieces[4]
              .flatMap((row) => row)
              .flatMap((piece) => (
                <CubeFaceItem color={cubePieceToColor(piece)} />
              ))}
          </CubeFace>
        </CubeColumn>
      </ScrambleViewer>
    </ScrambleSectionCard>
  );
};

export default ScrambleSection;
