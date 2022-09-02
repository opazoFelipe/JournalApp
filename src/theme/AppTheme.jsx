import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { prupleTheme } from './purpleTheme'

export const AppTheme = ({ children }) => {
    return (
        <ThemeProvider theme={prupleTheme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            { children }
        </ThemeProvider>
    )
}
