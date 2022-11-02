import React from 'react';
import {
  Stat,
  StatsSection,
  StatTable,
  TableWrapper,
  TimeListCard,
} from './TimeList.styles';

export const data: Array<{ [key: string]: any }> = [
  {
    'Country Name': 'Afghanistan',
    Capital: 'Kabul',
    Currency: 'Afghani',
  },
  {
    'Country Name': 'Albania',
    Capital: 'Tirane',
    Currency: 'Lek',
  },
  {
    'Country Name': 'Algeria',
    Capital: 'Algiers',
    Currency: 'Dinar',
  },
  {
    'Country Name': 'Afghanistan',
    Capital: 'Kabul',
    Currency: 'Afghani',
  },
  {
    'Country Name': 'Albania',
    Capital: 'Tirane',
    Currency: 'Lek',
  },
  {
    'Country Name': 'Algeria',
    Capital: 'Algiers',
    Currency: 'Dinar',
  },
  {
    'Country Name': 'Afghanistan',
    Capital: 'Kabul',
    Currency: 'Afghani',
  },
  {
    'Country Name': 'Albania',
    Capital: 'Tirane',
    Currency: 'Lek',
  },
  {
    'Country Name': 'Algeria',
    Capital: 'Algiers',
    Currency: 'Dinar',
  },
  {
    'Country Name': 'Afghanistan',
    Capital: 'Kabul',
    Currency: 'Afghani',
  },
  {
    'Country Name': 'Albania',
    Capital: 'Tirane',
    Currency: 'Lek',
  },
  {
    'Country Name': 'Algeria',
    Capital: 'Algiers',
    Currency: 'Dinar',
  },
  {
    'Country Name': 'Afghanistan',
    Capital: 'Kabul',
    Currency: 'Afghani',
  },
  {
    'Country Name': 'Albania',
    Capital: 'Tirane',
    Currency: 'Lek',
  },
  {
    'Country Name': 'Algeria',
    Capital: 'Algiers',
    Currency: 'Dinar',
  },
  {
    'Country Name': 'Afghanistan',
    Capital: 'Kabul',
    Currency: 'Afghani',
  },
  {
    'Country Name': 'Albania',
    Capital: 'Tirane',
    Currency: 'Lek',
  },
  {
    'Country Name': 'Algeria',
    Capital: 'Algiers',
    Currency: 'Dinar',
  },
  {
    'Country Name': 'Afghanistan',
    Capital: 'Kabul',
    Currency: 'Afghani',
  },
  {
    'Country Name': 'Albania',
    Capital: 'Tirane',
    Currency: 'Lek',
  },
  {
    'Country Name': 'Algeria',
    Capital: 'Algiers',
    Currency: 'Dinar',
  },
];

export const titles = Object.keys(data[0]);

const TimeList: React.FC = () => {
  return (
    <TimeListCard>
      <StatsSection>
        <Stat>Best Time: 100</Stat>
        <Stat>Mean: 100</Stat>
        <Stat>Best AVG of Five: 100</Stat>
        <Stat>Beast AVG of Twelve 100</Stat>
        <Stat>Best Time: 100</Stat>
      </StatsSection>
      <TableWrapper>
        <StatTable>
          <caption>Culture about contries</caption>
          <colgroup>
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              {titles.map((title, index) => (
                <th key={index}>{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {titles.map((title, index) => (
                  <td key={index}>{item[title]}</td>
                ))}
              </tr>
            ))}
          </tbody>
          {/* <tfoot>
      <tr>
	  {titles.map((title, index) => (
		  <th key={index}>{title}</th>
		  ))}
		  </tr>
		</tfoot> */}
        </StatTable>
      </TableWrapper>
    </TimeListCard>
  );
};

export default TimeList;
