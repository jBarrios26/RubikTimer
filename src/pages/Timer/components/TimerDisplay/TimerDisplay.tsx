import React, { useEffect, useState } from 'react';
import {
  AvgOfFive,
  AvgOfTwelve,
  MinuteSegments,
  SecondsSegments,
  MilisecondsSegments,
} from './TimerDisplay.styles';
import {
  formatMinutes,
  formatMiliseconds,
  formatSeconds,
} from '../../../../utils/format-timer.utility';
import useInterval from '../../../../hooks/use_interval';

import {
  Scramble,
  Segments,
  TimerDisplayContainer,
  TimerSegments,
} from './TimerDisplay.styles';

export interface TimerDisplayState {
  phase: TimerPhase;
  hour: number;
  minute: number;
  seconds: number;
  miliseconds: number;
  totalMiliseconds: number;
}

enum TimerPhase {
  idle,
  holding,
  ready,
  solving,
}

const initialTimerState: TimerDisplayState = {
  phase: TimerPhase.idle,
  hour: 0,
  miliseconds: 0,
  seconds: 0,
  minute: 0,
  totalMiliseconds: 0,
};

const getTimerPhaseColor = (phase: TimerPhase) => {
  if (phase === TimerPhase.holding) return 'red';
  if (phase === TimerPhase.ready) return 'green';
  return 'white';
};

const TimerDisplay: React.FC = () => {
  const [timerState, setTimerState] =
    useState<TimerDisplayState>(initialTimerState);

  const [readyTimer, setReadyTimer] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);

  const readyTimerInterval = useInterval(
    () => {
      if (timerState.phase !== TimerPhase.idle) {
        setTimerState({ ...timerState, phase: TimerPhase.ready });
        setReadyTimer(false);
      }
    },
    readyTimer ? 1000 : null
  );

  const timer = useInterval(
    () => {
      setTimerState((previousTimerState) => {
        const newTotalMiliseconds = previousTimerState.totalMiliseconds + 100;
        const minutesPassed = Math.floor(newTotalMiliseconds / 60000);
        const secondsPassed = Math.floor(
          (newTotalMiliseconds - minutesPassed * 60000) / 1000
        );
        const milisecondsPassed =
          newTotalMiliseconds - minutesPassed * 60000 - secondsPassed * 1000;

        console.log(
          newTotalMiliseconds,
          minutesPassed,
          secondsPassed,
          milisecondsPassed
        );

        return {
          ...timerState,
          totalMiliseconds: newTotalMiliseconds,
          miliseconds: milisecondsPassed,
          seconds: secondsPassed,
          minute: minutesPassed,
        };
      });
    },
    timerRunning ? 100 : null
  );

  useEffect(() => {
    function handleKeyDown(keyboardEvent: KeyboardEvent) {
      if (keyboardEvent.code !== 'Space') return;

      if (timerState.phase === TimerPhase.idle) {
        setTimerState({ ...timerState, phase: TimerPhase.holding });
        setReadyTimer(true);
      } else if (timerState.phase === TimerPhase.solving) {
        setTimerRunning(false);
      }
    }

    function handleKeyUp(keyboardEvent: KeyboardEvent) {
      if (keyboardEvent.code !== 'Space') return;

      if (timerState.phase === TimerPhase.ready) {
        setTimerState({ ...timerState, phase: TimerPhase.solving });
        setTimerRunning(true);
      } else if (timerState.phase == TimerPhase.holding) {
        setTimerState({ ...timerState, phase: TimerPhase.idle });
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [timerState]);

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
        <Segments>
          {timerState.minute > 0 && (
            <MinuteSegments color={getTimerPhaseColor(timerState.phase)}>
              {formatMinutes(timerState.minute)}:
            </MinuteSegments>
          )}
          <SecondsSegments color={getTimerPhaseColor(timerState.phase)}>
            {formatSeconds(timerState.seconds)}.
          </SecondsSegments>
          <MilisecondsSegments color={getTimerPhaseColor(timerState.phase)}>
            {formatMiliseconds(timerState.miliseconds, timerRunning)}
          </MilisecondsSegments>
        </Segments>
        <AvgOfFive>5-avg: 12:11</AvgOfFive>
        <AvgOfTwelve>12-avg: 13:11</AvgOfTwelve>
      </TimerSegments>
    </TimerDisplayContainer>
  );
};

export default TimerDisplay;
