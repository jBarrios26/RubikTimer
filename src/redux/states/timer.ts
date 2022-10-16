import { createSlice } from '@reduxjs/toolkit';
import { CubeType } from '../../models/timer/scramble';
import TimerSession from '../../models/timer/timer_session';
import Scramble from '../../models/timer/scramble';

export const timerEmptyState: TimerSession = {
  currentScramble: { scramble: '', cubeType: CubeType.threeByThree },
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
    resetTimerSession: () => timerEmptyState,
  },
});

export const {
  createTimerSession,
  modifyTimerSession,
  setNewScramble,
  resetTimerSession,
} = timerSlice.actions;

export default timerSlice.reducer;
