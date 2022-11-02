import styled from 'styled-components';
export const TimeListCard = styled.div`
  background-color: var(--card-bg);
  color: white;
  border-radius: 12px;
  margin: 5px 15px;
  padding: 5px 5px;
  flex: 1;
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
  padding: 0.5em;
`;

export const TableWrapper = styled.div`
  overflow: hidden;
  overflow-y: scroll;
  max-height: calc((100vh - 65px) / 2);
`;

export const StatTable = styled.table`
  caption-side: top;
  border: none;
  border-collapse: collapse;
  /* border-collapse: separate; */
  /* border-spacing: 5px 10px; */

  caption-side: bottom;
  /* empty-cell: show | hide;  */
  /* empty-cell is a property of table or the cells themselves */

  /* vertical-align: baseline | sub | super | text-top | 
                text-bottom | middle | top | bottom | 
                <percentage> | <length> */

  td,
  th {
    border: none;
  }
  /* td,
  th {
    border: 1px solid;
  } */

  td {
    padding: 5px 10px;
  }

  tbody tr {
    :nth-of-type(odd) {
      background-color: #efefef;
    }
    :hover {
      background-color: lightpink;
    }
  }
  thead > tr {
    background-color: #c2c2c2;
  }
  caption {
    font-size: 0.9em;
    padding: 5px;
    color: white;
    font-weight: bold;
  }
`;
