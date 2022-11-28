import styled from 'styled-components';
export interface ButtonProps {
  color: string;
  lineThrough: boolean;
}

export const Button = styled.button<ButtonProps>`
  display: inline-block;
  border: none;
  background-color: inherit;
  padding: 0.5em 0.5em;
  margin: 0.1em;

  font-size: 0.9em;
  font-weight: bold;
  color: ${(props) => props.color};
  text-decoration-line: ${(props) =>
    props.lineThrough ? 'line-through' : 'none'};
  text-decoration-thickness: 0.15em;
  cursor: pointer;
  :hover {
    background-color: #111;
    font-weight: bolder;
    text-decoration-thickness: 0.2em;
  }
`;
