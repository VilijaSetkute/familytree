import React from 'react';
import { ButtonContainer, ButtonText } from './styles';
import { ColorVariant, WidthVariant } from './model';

interface ButtonProps {
  type?: 'submit' | 'button' | 'text' | undefined;
  text: string;
  color: ColorVariant;
  shadowSize?: number;
  width?: WidthVariant;
  onClick?: () => void;
}

const CustomButton: React.FC<ButtonProps> = ({ text, color, shadowSize, width = 'content', onClick }) => {
  return (
    <ButtonContainer
      width={width}
      shadow={shadowSize ?? 15}
      disableRipple
      colorVariant={color}
      className="button-hover"
      onClick={onClick}
    >
      <ButtonText colorVariant={color} uppercase={false}>
        {text}
      </ButtonText>
    </ButtonContainer>
  );
};

export default CustomButton;
