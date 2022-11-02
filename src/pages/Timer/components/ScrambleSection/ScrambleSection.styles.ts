import styled from 'styled-components';

export interface CubeFaceItemProps {
  color: string;
}

export interface CubeFaceProps {
  dimension: number;
}

export const ScrambleSectionCard = styled.div`
  background-color: var(--card-bg);
  color: white;
  border-radius: 12px;
  margin: 5px 15px;
  padding: 5px 5px;
  height: 100%;

  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const ScrambleViewer = styled.div`
  display: flex;
  flex: 1;
  height: 100%;

  background-color: var(--card-bg);
  justify-content: flex-start;
  align-items: center;
  gap: 1px;
`;

export const CubeColumn = styled.div`
  background-color: var(--card-bg);
  flex: 0.25;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1px;
`;

export const CubeFace = styled.div<CubeFaceProps>`
  background-color: var(--card-bg);

  flex: 0.33;

  display: grid;
  grid-template-rows: ${(props) => {
    return `repeat(${props.dimension.toString()}, ${(100 / props.dimension)
      .toFixed(0)
      .toString()}%)`;
  }};
  grid-template-columns: ${(props) => {
    return `repeat(${props.dimension.toString()}, ${(100 / props.dimension)
      .toFixed(0)
      .toString()}%)`;
  }};
  grid-gap: 1px;
`;

export const CubeFaceItem = styled.div<CubeFaceItemProps>`
  background-color: ${(props) => {
    return props.color;
  }};
  color: white;
  border: 3px solid black;

  border-radius: 10px;
`;
