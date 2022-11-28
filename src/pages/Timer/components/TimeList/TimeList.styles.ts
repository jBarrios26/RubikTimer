import styled from 'styled-components';
export interface StatTableProps {
  width?: number;
}

export const TimeListCard = styled.div`
  background-color: var(--card-bg);
  color: white;
  border-radius: 12px;
  margin: 5px 15px;
  padding: 15px 10px;
  flex: 1;
  display: flex;
  min-height: calc(50vh - 65px);
  max-height: calc(50vh - 65px);
  flex-direction: column;
`;

export const StatsSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px 10px;
  border-radius: 20px;
  border: solid var(--white) 3px;
`;

export const Stat = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  font-size: 1em;
  padding: 0.5em;
`;

export const TableWrapper = styled.div`
  overflow: hidden;
  overflow-y: scroll;
  margin: 10px 10px;
  border-radius: 1em;
`;

export const StatTable = styled.table`
  table-layout: fixed;
  width: 100%;
  caption-side: top;
  border-collapse: separate;
  border-spacing: 0px;

  caption-side: bottom;
  /* empty-cell: show | hide;  */
  /* empty-cell is a property of table or the cells themselves */

  /* vertical-align: baseline | sub | super | text-top | 
                text-bottom | middle | top | bottom | 
                <percentage> | <length> */
  vertical-align: middle;

  tfoot {
    position: sticky;
    bottom: 0;
    z-index: 1;
  }

  thead {
    position: sticky;
    top: 0;
    z-index: 1;
  }

  td {
    padding: 5px 10px;
  }

  tbody > tr {
    :nth-of-type(odd) {
      background-color: #efefef;
    }
    :hover {
      background-color: lightpink;
    }
  }

  caption {
    font-size: 0.9em;
    padding: 5px;
    color: white;
    font-weight: bold;
  }
`;

export const TableHeaderRow = styled.tr`
  border-radius: 20px 20px 0 0;
  border: 50px solid red;
  th:last-child {
    border-radius: 0 20px 0 0;
  }
  th:first-child {
    border-radius: 20px 0 0 0;
  }
`;

export const TableStatHeader = styled.th<StatTableProps>`
  font-size: 24px;
  border: 3px solid white;
  text-align: center;
  font-weight: bold;
  width: ${(props) => {
    return `${(props.width ?? 21).toString()}%`;
  }};
`;

export const TableStat = styled.td<StatTableProps>`
  text-align: center;
  font-size: 20px;
  border: 1px solid white;
  width: ${(props) => {
    return `${(props.width ?? 21).toString()}%`;
  }};
`;
