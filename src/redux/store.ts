import { configureStore } from '@reduxjs/toolkit';
import TimerSession from '../models/timer/timer_session';
import { timer } from './states';

export interface AppStore {
  timer: TimerSession;
}

export default configureStore<AppStore>({ reducer: { timer: timer } });
