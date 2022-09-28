import React from 'react';
import { TimerContainer, TimerSpace, TimerUtilities } from './Timer.styles';
import TimerDisplay from './components/TimerDisplay/TimerDisplay';

const Timer: React.FC = () => {
  return (
    <TimerContainer>
      <TimerSpace>
        <TimerDisplay />
      </TimerSpace>
      <TimerUtilities>Mundo</TimerUtilities>
    </TimerContainer>
  );
};

export default Timer;
