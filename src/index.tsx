import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import { createRoot } from 'react-dom/client';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import Header from '@edx/frontend-component-header';
import { FooterSlot } from '@edx/frontend-component-footer';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@openedx/paragon';

import messages from './i18n';
import './index.scss';

import HomePage from './features/home/HomePage';
import CourseAboutPage from './features/course-about/CourseAboutPage';
import CatalogPage from './features/сatalog/CatalogPage';
import NotFoundPage from './features/not-found-page/NotFoundPage';

const queryClient = new QueryClient();
const container = document.getElementById('root');
const root = createRoot(container!);

subscribe(APP_READY, () => {
  root.render(
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <Header />
        <main>
          <Container className="content-wrapper">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<CatalogPage />} />
              <Route path="/courses/:courseId/about" element={<CourseAboutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Container>
        </main>
        <FooterSlot />
      </QueryClientProvider>
    </AppProvider>,
  );
});

subscribe(APP_INIT_ERROR, (error: { message: any; }) => {
  root.render(<ErrorPage message={error.message} />);
});

initialize({
  messages,
});
