import React from 'react';
import { Button } from './TextButton.styles';
export interface TextButtonInterface {
  onClick: () => void;
  color: string;
  title: string;
  lineThrough: boolean;
}

const TextButton: React.FC<TextButtonInterface> = (props) => {
  return (
    <Button
      color={props.color}
      onClick={props.onClick}
      lineThrough={props.lineThrough}
    >
      {props.title}
    </Button>
  );
};

export default TextButton;
