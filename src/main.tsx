import { AppRouter } from '@boot/router';
import { loadEnv } from '@core/models/env';
import '@fontsource/atkinson-hyperlegible/400.css';
import '@fontsource/atkinson-hyperlegible/700.css';
import { AppThemeProvider } from '@modules/core/ui/theme/app-theme-provider';
import '@styles/globals.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

async function main() {
    const rootElement = document.getElementById('root')!;
    await loadEnv();
    createRoot(rootElement).render(
        <StrictMode>
            <AppThemeProvider>
                <AppRouter />
            </AppThemeProvider>
        </StrictMode>
    );
}

main();
