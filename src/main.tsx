import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { UsuarioProvider } from './context/index.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UsuarioProvider>
      <App />
    </UsuarioProvider>
  </StrictMode>,
);
