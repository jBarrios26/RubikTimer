import styled from 'styled-components';

export const TimerContainer = styled.main`
  gap: 1rem;
  display: flex;
  flex-direction: column;
  min-width: 100%;
  max-width: 85em;
  margin-inline: auto;
  align-items: stretch;
  min-height: calc(100vh - 70px);

  @media (min-width: 900px) {
    display: grid;
    min-height: calc(100vh - 70px);
    grid-template-columns: 1fr 35%;
  }
`;

export const TimerSpace = styled.div`
  width: 100%;
  min-height: calc(100vh - 70px);
`;

export const TimerUtilities = styled.div`
  width: 100%;
  min-height: calc(100vh - 70px);

  display: flex;
  flex-direction: column;
`;
