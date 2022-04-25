import { useEffect, useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import ContextProvider from './components/context';
import { Auth } from 'aws-amplify';

export default function AuthGuard ({ children }) {
  const [ isAuthenticated, setIsAuthenticated ] = useState(true);
  const context = useContext(ContextProvider);
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false));
  }, [context]);
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}