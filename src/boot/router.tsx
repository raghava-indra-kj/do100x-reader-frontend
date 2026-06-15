import { lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const ReaderPage = lazy(() => import('../modules/reader/page'));
const HomePage = lazy(() => import('../modules/home/page'));
const MdViewDemoPage = lazy(() => import('../modules/md-view-demo/page'));
const MdViewLibDemoPage = lazy(() => import('../lib/md-view/demo-page'));
const MdParserDemoPage = lazy(() => import('../modules/md-parser-demo/page'));
const MdParserLibDemoPage = lazy(() => import('../lib/md-parser/demo-page'));

export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/reader" element={<ReaderPage />} />
                <Route path="/reader/:id" element={<ReaderPage />} />
                <Route path="/md-view-demo" element={<MdViewDemoPage />} />
                <Route path="/md-view" element={<MdViewLibDemoPage />} />
                <Route path="/md-parser-demo" element={<MdParserDemoPage />} />
                <Route path="/md-parser" element={<MdParserLibDemoPage />} />
            </Routes>
        </BrowserRouter>
    );
}