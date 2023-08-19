import React from 'react';
// import './styles';
// import { colors } from '../../../../config/theme/theme';
import { ButtonContainer, ButtonText } from './styles';
import { ColorVariant } from './model';

interface ButtonProps {
  text: string;
  color: ColorVariant;
}

const CustomButton: React.FC<ButtonProps> = ({ text, color }) => {
  return (
    <ButtonContainer colorVariant={color}>
      <ButtonText colorVariant={color}>{text}</ButtonText>
    </ButtonContainer>
  );
};

export default CustomButton;
