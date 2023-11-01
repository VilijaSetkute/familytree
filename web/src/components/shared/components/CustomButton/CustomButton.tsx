import React from 'react';
import { ButtonContainer, ButtonText } from './styles';
import { ColorVariant, WidthVariant } from './model';
import { CircularProgress } from '@mui/material';

interface ButtonProps {
  type?: 'submit' | 'button' | 'text' | undefined;
  text: string;
  color: ColorVariant;
  shadowSize?: number;
  width?: WidthVariant;
  onClick?: () => void;
  isLoading?: boolean;
  withLoader?: boolean;
}

const CustomButton: React.FC<ButtonProps> = ({
  text,
  color,
  shadowSize,
  width = 'content',
  onClick,
  isLoading = false,
  withLoader = false,
}) => {
  return (
    <ButtonContainer
      width={width}
      shadow={shadowSize ?? 15}
      disableRipple
      colorVariant={color}
      className="button-hover"
      onClick={isLoading ? undefined : onClick}
      isLoading={isLoading}
    >
      {isLoading && withLoader ? (
        <CircularProgress size="30px" />
      ) : (
        <ButtonText colorVariant={color} uppercase={false}>
          {text}
        </ButtonText>
      )}
    </ButtonContainer>
  );
};

export default CustomButton;
