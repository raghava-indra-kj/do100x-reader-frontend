import { AppRouter } from '@boot/router';
import { loadEnv } from '@core/models/env';
import '@fontsource/atkinson-hyperlegible/400.css';
import '@fontsource/atkinson-hyperlegible/700.css';
import { TooltipProvider } from '@modules/core/ui/primitives/tooltip';
import { ThemeProvider } from '@modules/core/theme';
import '@styles/globals.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

async function main() {
    const rootElement = document.getElementById('root')!;
    await loadEnv();
    createRoot(rootElement).render(
        <StrictMode>
            <ThemeProvider>
                <TooltipProvider delay={400}>
                    <AppRouter />
                </TooltipProvider>
            </ThemeProvider>
        </StrictMode>
    );
}

main();
