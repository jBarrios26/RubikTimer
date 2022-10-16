import React from 'react';
import { TimerContainer, TimerSpace, TimerUtilities } from './Timer.styles';
import TimerDisplay from './components/TimerDisplay/TimerDisplay';
import { ScrambleSection } from './components';

const Timer: React.FC = () => {
  return (
    <TimerContainer>
      <TimerSpace>
        <TimerDisplay />
      </TimerSpace>
      <TimerUtilities>
        <ScrambleSection></ScrambleSection> <div style={{ flexGrow: 1 }}></div>
      </TimerUtilities>
    </TimerContainer>
  );
};

export default Timer;
