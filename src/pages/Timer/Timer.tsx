import React from 'react';
import { TimerContainer, TimerSpace, TimerUtilities } from './Timer.styles';
import TimerDisplay from './components/TimerDisplay/TimerDisplay';
import { ScrambleSection } from './components';
import { Params, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import db from '../../data/db';
import timer, {
  createTimerSession,
  resetTimerSession,
  timerEmptyState,
} from '../../redux/states/timer';
import { useDispatch } from 'react-redux';
import TimeList from './components/TimeList/TimeList';

export interface TimerParams {
  sessionId: string;
}

const Timer: React.FC = () => {
  const timerSessionId = useParams<Params<keyof TimerParams>>() as TimerParams;
  const dispatch = useDispatch();

  useEffect(() => {
    db.session
      .get(Number.parseInt(timerSessionId.sessionId))
      .then(async (timerSession) => {
        console.log(timerSession);
        if (timerSession === undefined) {
          await db.session.add({
            id: Number.parseInt(timerSessionId.sessionId),
            rubikSession: {
              ...timerEmptyState,
              id: Number.parseInt(timerSessionId.sessionId),
            },
          });
          dispatch(
            createTimerSession({
              ...timerEmptyState,
              id: Number.parseInt(timerSessionId.sessionId),
            })
          );
        } else {
          dispatch(resetTimerSession());
          dispatch(createTimerSession(timerSession.rubikSession));
        }
      })
      .catch((_) => {
        console.log('hubo error');
      });

    return;
  }, [timerSessionId.sessionId, dispatch]);

  return (
    <TimerContainer>
      <TimerSpace>
        <TimerDisplay />
      </TimerSpace>
      <TimerUtilities>
        <ScrambleSection />
        <TimeList />
      </TimerUtilities>
    </TimerContainer>
  );
};

export default Timer;
