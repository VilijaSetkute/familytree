import React from 'react';
import { ButtonContainer, ButtonText } from './styles';
import { ColorVariant, WidthVariant } from './model';

interface ButtonProps {
  text: string;
  color: ColorVariant;
  shadowSize?: number;
  width?: WidthVariant;
}

const CustomButton: React.FC<ButtonProps> = ({
  text,
  color,
  shadowSize,
  width = 'content',
}) => {
  return (
    <ButtonContainer
      width={width}
      shadow={shadowSize ?? 15}
      disableRipple
      colorVariant={color}
      className="button-hover"
    >
      <ButtonText colorVariant={color} uppercase={false}>
        {text}
      </ButtonText>
    </ButtonContainer>
  );
};

export default CustomButton;
