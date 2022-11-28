import React from 'react';
import { TableStat, TableHeaderRow } from './TimeList.styles';
import { useSelector, useDispatch } from 'react-redux';
import { AppStore } from '../../../../redux/store';
import { formatTime } from '../../../../utils/format-timer.utility';
import Solve from '../../../../models/timer/solve';
import {
  Stat,
  StatsSection,
  StatTable,
  TableStatHeader,
  TableWrapper,
  TimeListCard,
} from './TimeList.styles';
import { removeEdgeTimes } from '../../../../utils/remove_edge_times';
import TextButton from '../../../../components/TextButton/TextButton';
import { red, yellow } from '../../../../resources/colors';
import { modifyTimerSession } from '../../../../redux/states/timer';
import db from '../../../../data/db';

const historicAvgOfFive = (previousSolves: Array<Solve>, index: number) => {
  const solves = previousSolves.slice(
    previousSolves.length - 5 - index,
    previousSolves.length - index
  );
  if (solves.length >= 4) {
    if (solves.filter((solve) => solve.isDNF).length <= 1) {
      const solvesToCalculateMean = removeEdgeTimes(solves);
      const avgOfFive =
        solvesToCalculateMean
          .map((solve) => solve.time)
          .reduce((totalTime, time) => totalTime + time, 0) / 3;
      return avgOfFive;
    }
  }
  return -1;
};

const historicAvgOfTwelve = (previousSolves: Array<Solve>, index: number) => {
  const solves = previousSolves.slice(
    previousSolves.length - 11 - index,
    previousSolves.length - index
  );
  if (solves.length >= 4) {
    if (solves.filter((solve) => solve.isDNF).length <= 1) {
      const solvesToCalculateMean = removeEdgeTimes(solves);
      const avgOfFive =
        solvesToCalculateMean
          .map((solve) => solve.time)
          .reduce((totalTime, time) => totalTime + time, 0) / 10;
      return avgOfFive;
    }
  }
  return -1;
};

const TimeList: React.FC = () => {
  const timerSessionGlobalState = useSelector((store: AppStore) => store.timer);
  const dispatch = useDispatch();

  function markAsDNF(index: number) {
    const solves = timerSessionGlobalState.previousSolves.slice();
    const solve = solves[index];
    solves[index] = { ...solve, isDNF: !solve.isDNF };
    dispatch(
      modifyTimerSession({
        previousSolves: solves,
        ...calcNewAvg(solves, index),
      })
    );
    calcNewAvg(solves, index);
    void db.session.update(timerSessionGlobalState.id, {
      rubikSession: {
        ...timerSessionGlobalState,
        id: timerSessionGlobalState.id,
        lastTime:
          index == solves.length - 1
            ? solves[index]
            : timerSessionGlobalState.lastTime,
        previousSolves: [...solves],
        ...calcNewAvg(solves, index),
      },
    });
  }

  function calcNewAvg(
    solves: Array<Solve>,
    index: number
  ): {
    avgOfFive: number;
    avgOfTwelve: number;
    avgOfThree: number;
    bestAvgOfFive: number;
    bestAvgOfTwelve: number;
  } {
    let newAvgOfFive: number = timerSessionGlobalState.avgOfFive;
    let newAvgOfTwelve: number = timerSessionGlobalState.avgOfTwelve;
    let newAvgOfThree: number = timerSessionGlobalState.avgOfThree;
    if (index >= solves.length - 5) {
      if (
        solves
          .slice(solves.length - 5, solves.length)
          .filter((solve) => solve.isDNF).length <= 1
      ) {
        const solvesToCalculateMean = removeEdgeTimes(
          solves.slice(solves.length - 5, solves.length)
        );
        console.log('lenght: ' + solvesToCalculateMean.length.toString());

        newAvgOfFive =
          solvesToCalculateMean
            .map((solve) => solve.time)
            .reduce((totalTime, time) => totalTime + time, 0) / 3;
      } else {
        newAvgOfFive = -3000 * 10;
      }
    }
    if (index >= solves.length - 12) {
      if (
        solves
          .slice(solves.length - 12, solves.length)
          .filter((solve) => solve.isDNF).length <= 1
      ) {
        const solvesToCalculateMean = removeEdgeTimes(
          solves.slice(solves.length - 12, solves.length)
        );
        newAvgOfTwelve =
          solvesToCalculateMean
            .map((solve) => solve.time)
            .reduce((totalTime, time) => totalTime + time, 0) / 10;
      } else {
        newAvgOfTwelve = -3000 * 10;
      }
    }
    if (index >= solves.length - 3) {
      if (
        solves
          .slice(solves.length - 3, solves.length)
          .filter((solve) => solve.isDNF).length <= 1
      ) {
        const solvesToCalculateMean = solves.slice(
          solves.length - 3,
          solves.length
        );
        newAvgOfThree =
          solvesToCalculateMean
            .map((solve) => solve.time)
            .reduce((totalTime, time) => totalTime + time, 0) / 3;
      } else {
        newAvgOfThree = -3000 * 10;
      }
    } else {
      console.log(index, solves.length);
    }

    let bestOfAvgFive: number = -3000 * 10;
    let bestOfAvgTwelve: number = -3000 * 10;

    for (let i = 0; i + 5 <= solves.length; i++) {
      const solveSlice = removeEdgeTimes(solves.slice(i, i + 5));
      const bestOfFiveCandidate =
        solveSlice
          .map((solve) => solve.time)
          .reduce((totalTime, time) => totalTime + time, 0) / 3;

      if (bestOfFiveCandidate < bestOfAvgFive || bestOfAvgFive < 0) {
        bestOfAvgFive = bestOfFiveCandidate;
      }
    }
    for (let i = 0; i + 12 <= solves.length; i++) {
      const solveSlice = removeEdgeTimes(solves.slice(i, i + 12));
      const bestOfTwelveCandidate =
        solveSlice
          .map((solve) => solve.time)
          .reduce((totalTime, time) => totalTime + time, 0) / 10;
      if (bestOfTwelveCandidate < bestOfAvgTwelve || bestOfAvgTwelve < 0) {
        bestOfAvgTwelve = bestOfTwelveCandidate;
      }
    }

    const result = {
      avgOfFive: newAvgOfFive,
      avgOfTwelve: newAvgOfTwelve,
      avgOfThree: newAvgOfThree,
      bestAvgOfFive: bestOfAvgFive,
      bestAvgOfTwelve: bestOfAvgTwelve,
    };
    return result;
  }

  function markAsPenalty(index: number) {
    const solves = timerSessionGlobalState.previousSolves.slice();
    const solve = solves[index];
    const penalty = solve.hasPenalty ? -2000 : 2000;
    solves[index] = {
      ...solve,
      time: solve.time + penalty,
      hasPenalty: !solve.hasPenalty,
    };
    dispatch(
      modifyTimerSession({
        previousSolves: solves,
        ...calcNewAvg(solves, index),
      })
    );
    void db.session.update(timerSessionGlobalState.id, {
      rubikSession: {
        ...timerSessionGlobalState,
        id: timerSessionGlobalState.id,
        lastTime:
          index == solves.length - 1
            ? solves[index]
            : timerSessionGlobalState.lastTime,
        previousSolves: [...timerSessionGlobalState.previousSolves],
        ...calcNewAvg(solves, index),
      },
    });
  }

  return (
    <TimeListCard>
      <StatsSection>
        <Stat>
          Last Time: {formatTime(timerSessionGlobalState.lastTime.time)}
        </Stat>
        <Stat>Mean: {formatTime(timerSessionGlobalState.avgOfThree)}</Stat>
        <Stat>
          Best AVG of Five: {formatTime(timerSessionGlobalState.bestAvgOfFive)}
        </Stat>
        <Stat>
          Beast AVG of Twelve{' '}
          {formatTime(timerSessionGlobalState.bestAvgOfTwelve)}
        </Stat>
        <Stat>Best Time: {formatTime(timerSessionGlobalState.bestTime)}</Stat>
      </StatsSection>
      <TableWrapper>
        <StatTable>
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <TableHeaderRow>
              <TableStatHeader width={10}>Id</TableStatHeader>
              <TableStatHeader>Time</TableStatHeader>
              <TableStatHeader>Ao5</TableStatHeader>
              <TableStatHeader>Ao12</TableStatHeader>
              <TableStatHeader></TableStatHeader>
            </TableHeaderRow>
          </thead>
          <tbody>
            {timerSessionGlobalState.previousSolves
              .slice()
              .reverse()
              .map((item, index) => (
                <tr key={index}>
                  <TableStat width={10}>
                    {timerSessionGlobalState.previousSolves.length - index}
                  </TableStat>
                  <TableStat>
                    {item.isDNF ? 'DNF' : formatTime(item.time)}
                  </TableStat>
                  <TableStat>
                    {formatTime(
                      historicAvgOfFive(
                        timerSessionGlobalState.previousSolves,
                        index
                      )
                    )}
                  </TableStat>
                  <TableStat>
                    {formatTime(
                      historicAvgOfTwelve(
                        timerSessionGlobalState.previousSolves,
                        index
                      )
                    )}
                  </TableStat>
                  <TableStat>
                    <TextButton
                      title="DNF"
                      color={red}
                      lineThrough={item.isDNF}
                      onClick={() =>
                        markAsDNF(
                          timerSessionGlobalState.previousSolves.length -
                            index -
                            1
                        )
                      }
                    />
                    <TextButton
                      title="+2"
                      color={yellow}
                      lineThrough={item.hasPenalty}
                      onClick={() => {
                        markAsPenalty(
                          timerSessionGlobalState.previousSolves.length -
                            1 -
                            index
                        );
                      }}
                    />
                  </TableStat>
                </tr>
              ))}
          </tbody>
        </StatTable>
      </TableWrapper>
    </TimeListCard>
  );
};

export default TimeList;
