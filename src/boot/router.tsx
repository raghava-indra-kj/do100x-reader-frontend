import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { homePageRoute, mdParserLibDemoRoute, mdViewLibDemoRoute, pagesPageRoute, pagesPageWithIdRoute } from './routes';

const ReaderPage = lazy(() => import('../modules/reader/page'));
const HomePage = lazy(() => import('../modules/home/page'));
const MdViewLibDemoPage = lazy(() => import('../lib/md-view/demo-page'));
const MdParserLibDemoPage = lazy(() => import('../lib/md-parser/demo-page'));

export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={homePageRoute} element={<HomePage />} />
                <Route path={pagesPageRoute} element={<ReaderPage />} />
                <Route path={pagesPageWithIdRoute} element={<ReaderPage />} />
                <Route path={mdViewLibDemoRoute} element={<MdViewLibDemoPage />} />
                <Route path={mdParserLibDemoRoute} element={<MdParserLibDemoPage />} />
            </Routes>
        </BrowserRouter>
    );
}