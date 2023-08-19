// import { createTheme } from '@mui/material/styles';

export const colors = {
  white: '#FFF',
  dark: '#212121',
  primaryGreen: {
    greenVibrant: '#3F0',
    greenLight: '#60C646',
    greenLighter: '#99C58F',
  },
  secondaryBlue: {
    blueDark: '#00477A',
  },
};

// primary?: PaletteColorOptions;
// secondary?: PaletteColorOptions;
// error?: PaletteColorOptions;
// warning?: PaletteColorOptions;
// info?: PaletteColorOptions;
// success?: PaletteColorOptions;
// mode?: PaletteMode;
// tonalOffset?: PaletteTonalOffset;
// contrastThreshold?: number;
// common?: Partial<CommonColors>;
// grey?: ColorPartial;
// text?: Partial<TypeText>;
// divider?: string;
// action?: Partial<TypeAction>;
// background?: Partial<TypeBackground>;
// getContrastText?: (background: string) => string;

// export type PaletteColorOptions = SimplePaletteColorOptions | ColorPartial;

// export interface SimplePaletteColorOptions {
//   light?: string;
//   main: string;
//   dark?: string;
//   contrastText?: string;
// }

// export const theme = createTheme({});

// examples

// export const colors = {
//   backgroundMain: '#F2F7FA',
//   backgroundSecondary: '#F5F5F5',
//   primaryMain: '#0288D1',
//   primaryLight: '#E9F1F5',
//   primaryDark: '#01579B',
//   secondaryMain: '#9E9E9E',
//   secondaryLighter: '#EEEEEE',
//   secondaryLight: '#E0E0E0',
//   secondaryDarker: '#212121',
//   secondaryDark: '#515151',
//   secondaryGrayLighter: '#CCCCCC',
//   secondaryGrayDarker: '#757575',
//   successMain: '#3BB78F',
//   errorMain: '#F44336',
//   errorMainHover: '#C62828',
//   errorHover: '#FFEBEE',
//   errorSecondaryLighter: '#EF5350',
//   errorSecondaryDarker: '#E53935',
//   warningMain: '#FFA500',
//   placeholder: '#808080',
//   disabledButton: '#CDD4D7',
//   lightestBlue: '#66A4E0',
//   lightestBlueHover: '#66A4E0',
//   lightGreen: '#00DAC4',
//   white: '#FFFFFF',
//   gray50: '#F9FAFB',
//   gray300: '#D0D5DD',
//   gray400: '#98A2B3',
//   gray500: '#667085',
//   gray700: '#344054',
//   blue500: '#2E90FA'
// };

// export const theme = createTheme({
//   palette: {
//     primary: {
//       background: colors.backgroundMain,
//       main: colors.primaryMain,
//       light: colors.primaryLight,
//       dark: colors.primaryDark
//     },
//     secondary: {
//       main: colors.secondaryMain,
//       lighter: colors.secondaryLighter,
//       light: colors.secondaryLight,
//       darker: colors.secondaryDarker,
//       dark: colors.secondaryDark
//     },
//     success: {
//       main: colors.successMain
//     },
//     error: {
//       main: colors.errorMain
//     },
//     warning: {
//       main: colors.warningMain
//     },
//     roles: {
//       intern: { contrastText: '#C01048', main: '#FECDD6', darker: '#FEA3B4', mark: '#F63D68', markHover: '#A11043' },
//       administrator: { contrastText: '#C4320A', main: '#FDDCAB', darker: '#FEB273', mark: '#FB6514', markHover: '#9C2A10' },
//       employee: { contrastText: '#026AA2', main: '#B9E6FE', darker: '#7CD4FD', mark: '#0288D1', markHover: '#01579B' },
//       teamLead: { contrastText: '#027A48', main: '#A6F4C5', darker: '#6CE9A6', mark: '#12B76A', markHover: '#05603A' }
//     }
//   },

//   transitions: {
//     easing: {
//       easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
//       easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
//       easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
//       sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
//     },
//     duration: {
//       shortest: 150,
//       shorter: 200,
//       short: 250,
//       standard: 300,
//       complex: 375,
//       enteringScreen: 225,
//       leavingScreen: 195
//     }
//   },

//   components: {
//     MuiCssBaseline: {
//       styleOverrides: {
//         a: {
//           textDecoration: 'none'
//         }
//       }
//     },
//     MuiFab: {
//       styleOverrides: {
//         root: {
//           ':disabled': {
//             backgroundColor: colors.disabledButton
//           }
//         }
//       }
//     },
//     MuiStepIcon: {
//       styleOverrides: {
//         root: {
//           fontSize: 30
//         }
//       }
//     },
//     MuiCheckbox: {
//       styleOverrides: {
//         indeterminate: {
//           color: colors.primaryMain
//         }
//       }
//     },
//     MuiFormLabel: {
//       styleOverrides: {
//         asterisk: {
//           color: colors.errorMain
//         }
//       }
//     },
//     MuiAvatar: {
//       styleOverrides: {
//         colorDefault: {
//           backgroundColor: colors.primaryMain
//         }
//       }
//     },
//     MuiButton: {
//       defaultProps: {
//         disableElevation: true,
//         disableRipple: true
//       },
//       styleOverrides: {
//         root: {
//           whiteSpace: 'nowrap',
//           borderRadius: '8px'
//         }
//       }
//     },
//     MuiInputBase: {
//       styleOverrides: {
//         input: {
//           fontSize: '1rem',
//           fontWeight: 400,
//           '&::placeholder': {
//             color: colors.placeholder,
//             opacity: 1
//           },
//           height: 17
//         }
//       }
//     }
//   }
// });
