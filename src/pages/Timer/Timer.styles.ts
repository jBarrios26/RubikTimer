import styled from 'styled-components';

export const TimerContainer = styled.main`
  display: grid;
  gap: 1rem;
  min-width: 100%;
  max-width: 85em;
  margin-inline: auto;
  background-color: var(--second-bg-color);
  align-items: start;

  @media (min-width: 700px) {
    grid-template-columns: 1fr 35%;
  }
`;

export const TimerSpace = styled.div`
  width: 100%;
  height: 100%;

  background-color: var(--red);
`;

export const TimerUtilities = styled.div`
  width: 100%;
  height: 100%;

  background-color: var(--green);
`;
