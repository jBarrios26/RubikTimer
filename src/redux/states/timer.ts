import { createSlice } from '@reduxjs/toolkit';
import { CubeType } from '../../models/timer/scramble';
import TimerSession from '../../models/timer/timer_session';
import Scramble from '../../models/timer/scramble';
import Solve from '../../models/timer/solve';

export const timerEmptyState: TimerSession = {
  id: 0,
  currentScramble: { scramble: '', cubeType: CubeType.threeByThree },
  lastTime: {
    scramble: { scramble: '', cubeType: CubeType.threeByThree },
    isDNF: false,
    hasPenalty: false,
    time: 0,
    id: '',
    correlative: 0,
  },
  avgOfFive: 0,
  avgOfTwelve: 0,
  avgOfThree: 0,
  bestTime: 0,
  bestAvgOfFive: 0,
  bestAvgOfTwelve: 0,
  previousSolves: [],
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState: timerEmptyState,
  reducers: {
    createTimerSession: (
      _state,
      action: { payload: TimerSession; type: string }
    ) => action.payload,
    modifyTimerSession: (state, action) => {
      return { ...state, ...action.payload } as TimerSession;
    },
    setNewScramble: (state, action: { payload: Scramble; type: string }) => {
      return { ...state, currentScramble: action.payload };
    },
    addNewSolve: (
      state,
      action: {
        payload: {
          previousSolves: Array<Solve>;
          bestTime: number;
          bestAvgOfFive: number;
          bestAvgOfTwelve: number;
          lastTime: Solve;
          avgOfFive: number;
          avgOfTwelve: number;
          avgOfThree: number;
          currentScramble?: Scramble;
        };
      }
    ) => {
      return { ...state, ...action.payload };
    },
    resetTimerSession: () => timerEmptyState,
  },
});

export const {
  createTimerSession,
  modifyTimerSession,
  setNewScramble,
  resetTimerSession,
  addNewSolve,
} = timerSlice.actions;

export default timerSlice.reducer;
