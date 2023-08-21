import React from 'react';
import { ButtonContainer, ButtonText } from './styles';
import { ColorVariant } from './model';

interface ButtonProps {
  text: string;
  color: ColorVariant;
}

const CustomButton: React.FC<ButtonProps> = ({ text, color }) => {
  return (
    <ButtonContainer
      disableRipple
      colorVariant={color}
      className="button-hover"
    >
      <ButtonText colorVariant={color}>{text}</ButtonText>
    </ButtonContainer>
  );
};

export default CustomButton;
