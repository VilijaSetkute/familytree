import { Box, Button, Tab, TableCell, TableRow, Typography } from '@mui/material';
import { colors } from '../../../config/theme/theme';
import { styled } from '@mui/material/styles';

export const CenteredContainer = styled(Box)({
  height: 'calc(100vh - 280px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const AdminTab = styled(Tab)({
  textTransform: 'capitalize',
  color: colors.dark.main,
  '&.Mui-selected': {
    fontWeight: 700,
  },
});

export const HeadTableCell = styled(TableCell)({
  color: colors.white,
  fontWeight: 600,
});

export const WarningTypography = styled(Typography)({
  fontSize: '14px',
  color: colors.error.error,
  marginBottom: '8px',
});

export const CustomTableRow = styled(TableRow)<{ isDisabled: boolean }>(({ isDisabled }) => ({
  '&:last-child td, &:last-child th': { border: 0 },
  pointerEvents: isDisabled ? 'none' : 'unset',
  opacity: isDisabled ? 0.5 : 1,
}));

export const TableCellButton = styled(Button)<{ isDefault: boolean }>(({ isDefault }) => ({
  minWidth: '130px',
  fontWeight: 700,
  borderRadius: '8px',
  padding: '8px 16px',
  backgroundColor: isDefault ? colors.error.error : colors.primaryGreen.green500,
  '&:hover': {
    backgroundColor: isDefault ? colors.error.errorDarker : colors.primaryGreen.green600,
  },
}));

export const TableCellStatusBox = styled(Box)<{ isActive: boolean }>(({ isActive }) => ({
  fontWeight: 700,
  color: isActive ? colors.primaryGreen.green500 : colors.error.error,
}));

export const selectedStyles = () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: (baseStyles: any, state: any) => ({
    ...baseStyles,
    borderColor: state.isFocused ? 'green' : 'lightgrey',
    width: '150px',
    borderRadius: '8px',
    boxShadow: state.isFocused ? `0 0 0 1px ${colors.primaryGreen.green500}` : 'none',
    '&:hover': {
      boxShadow: `0 0 0 1px ${colors.primaryGreen.green500}`,
    },
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  option: (baseStyles: any, state: any) => ({
    ...baseStyles,
    backgroundColor: state.isSelected ? colors.primaryGreen.green500 : colors.white,
    '&:hover': {
      backgroundColor: state.isSelected ? colors.primaryGreen.green500 : colors.primaryGreen.green100,
    },
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  indicatorSeparator: (baseStyles: any) => ({ ...baseStyles, height: '100%', marginTop: 0 }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dropdownIndicator: (baseStyles: any, state: any) => ({
    ...baseStyles,
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: '0.5s',
  }),
});
