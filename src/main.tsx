import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '@/App'

const rootElement = document.getElementById('root');
console.log('rootElement:', rootElement);

if (!rootElement) {
  throw new Error("Элемент #root не найден в index.html");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
