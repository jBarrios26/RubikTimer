import Dexie from 'dexie';
import TimerSession from '../models/timer/timer_session';

export interface RubikSessionTable {
  id?: number;
  rubikSession: TimerSession;
}

export class RubikTimerDatabase extends Dexie {
  session!: Dexie.Table<RubikSessionTable, number>;

  constructor() {
    super('RubikTimerDatabase');

    this.version(1).stores({ session: '++id, session' });
  }
}

export default new RubikTimerDatabase();
