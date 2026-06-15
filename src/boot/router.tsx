import { lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const ReaderPage = lazy(() => import('../modules/reader/page'));
const HomePage = lazy(() => import('../modules/home/page'));

export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/reader" element={<ReaderPage />} />
                <Route path="/reader/:id" element={<ReaderPage />} />
            </Routes>
        </BrowserRouter>
    );
}