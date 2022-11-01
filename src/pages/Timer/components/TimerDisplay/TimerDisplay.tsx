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

import { randomScrambleForEvent } from 'cubing/scramble';

import {
  Scramble,
  Segments,
  TimerDisplayContainer,
  TimerSegments,
} from './TimerDisplay.styles';
import { useAsync } from 'react-async-hook';
import { useDispatch } from 'react-redux';
import timer, {
  addNewSolve,
  setNewScramble,
} from '../../../../redux/states/timer';
import { CubeType } from '../../../../models/timer/scramble';
import { useSelector } from 'react-redux';
import { AppStore } from '../../../../redux/store';
import Solve from '../../../../models/timer/solve';
import { removeEdgeTimes } from '../../../../utils/remove_edge_times';
import { assert } from 'console';
import useDownKey from '../../../../hooks/use_downkey';
import useUpKey from '../../../../hooks/use_upkey';
import db from '../../../../data/db';

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
  const timerGlobalState = useSelector((state: AppStore) => state.timer);
  const dispatch = useDispatch();

  const scramble = useAsync(async () => {
    const generateScramble = await randomScrambleForEvent('333');
    dispatch(
      setNewScramble({
        scramble: generateScramble.toString(),
        cubeType: CubeType.threeByThree,
      })
    );
    return generateScramble;
  }, []);

  useInterval(
    () => {
      if (timerState.phase !== TimerPhase.idle) {
        setTimerState({ ...timerState, phase: TimerPhase.ready });
        setReadyTimer(false);
      }
    },
    readyTimer ? 500 : null
  );

  function processSolve(): void {
    const lastSolve: Solve = {
      time: timerState.totalMiliseconds,
      isDNF: false,
      hasPenalty: false,
      scramble: timerGlobalState.currentScramble,
      id: timerGlobalState.currentScramble.scramble,
      correlative: timerGlobalState.previousSolves.length + 1,
    };

    let newAvgOfFive = -3000 * 100;
    let newAvgOfTwelve = -3000 * 100;
    let newAvgOfThree = -3000 * 100;

    if (timerGlobalState.previousSolves.length >= 2) {
      const solves = timerGlobalState.previousSolves.slice(
        timerGlobalState.previousSolves.length - 2,
        timerGlobalState.previousSolves.length
      );

      if (solves.filter((solve) => solve.isDNF).length <= 1) {
        solves.push(lastSolve);
        newAvgOfThree =
          solves
            .map((solve) => solve.time)
            .reduce((totalTime, time) => totalTime + time, 0) / 3;
      }
    }

    if (timerGlobalState.previousSolves.length >= 4) {
      const solves = timerGlobalState.previousSolves.slice(
        timerGlobalState.previousSolves.length - 4,
        timerGlobalState.previousSolves.length
      );
      if (solves.filter((solve) => solve.isDNF).length <= 1) {
        solves.push(lastSolve);
        const solvesToCalculateMean = removeEdgeTimes(solves);
        newAvgOfFive =
          solvesToCalculateMean
            .map((solve) => solve.time)
            .reduce((totalTime, time) => totalTime + time, 0) / 3;
      }
    }

    if (timerGlobalState.previousSolves.length >= 11) {
      const solves = timerGlobalState.previousSolves.slice(
        timerGlobalState.previousSolves.length - 11,
        timerGlobalState.previousSolves.length
      );
      if (solves.filter((solve) => solve.isDNF).length <= 1) {
        solves.push(lastSolve);
        const solvesToCalculateMean = removeEdgeTimes(solves);
        newAvgOfTwelve =
          solvesToCalculateMean
            .map((solve) => solve.time)
            .reduce((totalTime, time) => totalTime + time, 0) / 11;
      }
    }

    const bestTime: number =
      timerGlobalState.bestTime > timerState.totalMiliseconds ||
      timerGlobalState.bestTime < 0
        ? timerState.totalMiliseconds
        : -3000 * 100;

    const bestAvgOfFive: number =
      (timerGlobalState.bestAvgOfFive > newAvgOfFive && newAvgOfFive > 0) ||
      timerGlobalState.bestAvgOfFive < 0
        ? newAvgOfFive
        : -3000 * 100;
    const bestAvgOfTwelve: number =
      (timerGlobalState.bestAvgOfTwelve > newAvgOfTwelve &&
        newAvgOfTwelve > 0) ||
      timerGlobalState.bestAvgOfTwelve < 0
        ? newAvgOfTwelve
        : -3000 * 100;

    void db.session.update(timerGlobalState.id, {
      rubikSession: {
        id: timerGlobalState.id,
        currentScramble: timerGlobalState.currentScramble,
        previousSolves: [...timerGlobalState.previousSolves, lastSolve],
        avgOfFive: newAvgOfFive,
        avgOfTwelve: newAvgOfTwelve,
        avgOfThree: newAvgOfThree,
        bestAvgOfFive: bestAvgOfFive,
        bestAvgOfTwelve: bestAvgOfTwelve,
        bestTime: bestTime,
        lastTime: lastSolve,
      },
    });

    dispatch(
      addNewSolve({
        previousSolves: [...timerGlobalState.previousSolves, lastSolve],
        avgOfFive: newAvgOfFive,
        avgOfTwelve: newAvgOfTwelve,
        avgOfThree: newAvgOfThree,
        bestAvgOfFive: bestAvgOfFive,
        bestAvgOfTwelve: bestAvgOfTwelve,
        bestTime: bestTime,
        lastTime: lastSolve,
      })
    );
  }

  useInterval(
    () => {
      setTimerState((previousTimerState) => {
        const newTotalMiliseconds = previousTimerState.totalMiliseconds + 10;
        const minutesPassed = Math.floor(newTotalMiliseconds / 60000);
        const secondsPassed = Math.floor(
          (newTotalMiliseconds - minutesPassed * 60000) / 1000
        );
        const milisecondsPassed =
          newTotalMiliseconds - minutesPassed * 60000 - secondsPassed * 1000;

        return {
          ...timerState,
          totalMiliseconds: newTotalMiliseconds,
          miliseconds: milisecondsPassed,
          seconds: secondsPassed,
          minute: minutesPassed,
        };
      });
    },
    timerRunning ? 10 : null
  );
  function handleKeyDown(keyboardEvent: KeyboardEvent) {
    if (keyboardEvent.code !== 'Space') return;

    if (timerState.phase === TimerPhase.idle) {
      setTimerState({
        ...timerState,
        phase: TimerPhase.holding,
      });
      setReadyTimer(true);
    } else if (timerState.phase === TimerPhase.solving) {
      console.log(timerState.totalMiliseconds);
      setTimerRunning(false);
      setTimerState({ ...timerState, phase: TimerPhase.idle });
      processSolve();
      void scramble.execute();
    }
  }

  function handleKeyUp(keyboardEvent: KeyboardEvent) {
    if (keyboardEvent.code !== 'Space') return;

    if (timerState.phase === TimerPhase.ready) {
      setTimerState({
        ...timerState,
        phase: TimerPhase.solving,
        miliseconds: 0,
        totalMiliseconds: 0,
        minute: 0,
        seconds: 0,
      });
      setTimerRunning(true);
    } else if (timerState.phase == TimerPhase.holding) {
      setTimerState({ ...timerState, phase: TimerPhase.idle });
    }
  }
  useDownKey(handleKeyDown);
  useUpKey(handleKeyUp);

  return (
    <TimerDisplayContainer>
      <Scramble>
        <h1> {scramble.loading ? ' ' : scramble.result?.toString()}</h1>
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
