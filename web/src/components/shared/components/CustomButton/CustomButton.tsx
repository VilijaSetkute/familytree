import React from 'react';
import { ButtonContainer, ButtonText } from './styles';
import { ColorVariant, WidthVariant } from './model';

interface ButtonProps {
  text: string;
  color: ColorVariant;
  shadowSize?: number;
  width?: WidthVariant;
  onSubmit?: (
    e: React.MouseEvent<HTMLButtonElement>
  ) => void | undefined | Promise<void>;
}

const CustomButton: React.FC<ButtonProps> = ({
  text,
  color,
  shadowSize,
  width = 'content',
  onSubmit,
}) => {
  return (
    <ButtonContainer
      width={width}
      shadow={shadowSize ?? 15}
      disableRipple
      colorVariant={color}
      className="button-hover"
    >
      <ButtonText colorVariant={color} uppercase={false} onClick={onSubmit}>
        {text}
      </ButtonText>
    </ButtonContainer>
  );
};

export default CustomButton;
