import styled from 'styled-components';

export const TimerDisplayContainer = styled.div`
  flex-direction: column;
  display: flex;
  height: 100%;
`;

export const Scramble = styled.div`
  color: white;
  font-weight: bolder;
  display: flex;
  justify-content: center;
  align-items: center;

  > h1 {
    text-align: center;
    font-size: 24px;
    margin: 20px 10%;
    @media screen and (min-width: 700px) {
      font-size: 32px;
    }
    @media screen and (min-width: 1100px) {
      font-size: 36px;
    }
  }
`;

export const TimerSegments = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Segments = styled.span`
  font-family: SevenSegments;
  font-size: 6rem;
  color: white;

  @media screen and (min-width: 700px) {
    font-size: 9rem;
  }
  @media screen and (min-width: 1100px) {
    font-size: 12rem;
  }
`;

export const AvgOfFive = styled.div`
  font-size: 32px;
  color: white;

  cursor: pointer;

  :hover {
    color: var(--blue);
  }
`;

export const AvgOfTwelve = styled.div`
  font-size: 32px;
  color: white;
  cursor: pointer;
  :hover {
    color: var(--blue);
  }
`;
