import styled from 'styled-components';

interface SegmentsProps {
  color: string;
}

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

  padding-top: 3em;

  > h1 {
    text-align: center;
    font-size: 24px;
    margin: 20px 10%;
    @media screen and (min-width: 700px) {
      font-size: 36px;
    }
    @media screen and (min-width: 1100px) {
      font-size: 48px;
    }
  }
`;

export const TimerSegments = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  flex-basis: 100%;
`;

export const Segments = styled.div`
  font-family: SevenSegments;
  font-size: 6rem;

  @media screen and (min-width: 700px) {
    font-size: 9rem;
  }
  @media screen and (min-width: 1100px) {
    font-size: 12rem;
  }
`;

export const MinuteSegments = styled.span<SegmentsProps>`
  font-size: 6rem;
  color: ${(props) => {
    if (props.color == 'red') return 'var(--red)';
    if (props.color == 'green') return 'var(--green)';
    return 'white';
  }};
  @media screen and (min-width: 700px) {
    font-size: 9rem;
  }
  @media screen and (min-width: 1100px) {
    font-size: 12rem;
  }
`;

export const SecondsSegments = styled.span<SegmentsProps>`
  font-size: 6rem;
  color: ${(props) => {
    if (props.color == 'red') return 'var(--red)';
    if (props.color == 'green') return 'var(--green)';
    return 'white';
  }};
  @media screen and (min-width: 700px) {
    font-size: 9rem;
  }
  @media screen and (min-width: 1100px) {
    font-size: 12rem;
  }
`;

export const MilisecondsSegments = styled.span<SegmentsProps>`
  font-size: 4rem;
  display: inline-block;
  min-width: 110px;

  color: ${(props) => {
    if (props.color == 'red') return 'var(--red)';
    if (props.color == 'green') return 'var(--green)';
    return 'white';
  }};
  @media screen and (min-width: 700px) {
    font-size: 5rem;
  }
  @media screen and (min-width: 1100px) {
    font-size: 8rem;
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
