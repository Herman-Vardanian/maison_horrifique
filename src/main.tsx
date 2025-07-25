import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './ThemeChoice';

import('./mocks/browser').then(({ worker }) => {
  worker.start().then(()=> {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </StrictMode>,
    );
  });
});


