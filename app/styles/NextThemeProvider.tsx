'use client'
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';


const NextThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#000000', // Change this to your desired primary color
      },
      secondary: {
        main: '#ff6f00', // Change this to your desired secondary color
      },
      // You can customize other colors as well, like error, success, etc.
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
          },
        },
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
export default NextThemeProvider;
