import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './components/backend/context/Auth.jsx';   // Import AuthProvider to wrap the App component.

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
      {/*The App component is wrapped inside AuthProvider so that the authentication context is available throughout the entire app. 
          Here, App acts as the child component of AuthProvider. */}
    </AuthProvider>
  </StrictMode>
);
