import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#F4F6F8',
      paper: colors.common.white
    },
    primary: {
      contrastText: '#ffffff',
      main: '#ff9100'
    },
    text: {
      primary: '#eb941a',
      secondary: '#d6904f'
    }
  },
  shadows,
  typography
});

export default theme;
