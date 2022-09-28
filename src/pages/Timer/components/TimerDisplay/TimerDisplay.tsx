import React from 'react';
import { Stats } from './TimerDisplay.styles';
import {
  Scramble,
  Segments,
  TimerDisplayContainer,
  TimerSegments,
} from './TimerDisplay.styles';

const TimerDisplay: React.FC = () => {
  return (
    <TimerDisplayContainer>
      <Scramble>
        <h1>
          {
            "F2 L B' U' L2 U2 L' R F D U' L' R2 U B' F D' U R' D2 B' D' U L R' B' L2 B2 D2 B' "
          }
        </h1>
      </Scramble>

      <TimerSegments>
        <Segments>12:11:11</Segments>
        <Stats>
          5-avg: 12:11 <br /> 12-avg: 13:11
        </Stats>
      </TimerSegments>
    </TimerDisplayContainer>
  );
};

export default TimerDisplay;
