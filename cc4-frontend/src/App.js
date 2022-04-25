import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Signin from './components/signin';
import Signup from './components/signup';
import { ContextProvider } from './components/context';
import AuthGuard from './auth-guard';
import { ThemeProvider } from '@emotion/react';
import darkTheme from './ui/theme';

function App() {
  return (
    <ContextProvider>
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={
              <AuthGuard>
                <Dashboard />
              </AuthGuard>
            } />
            <Route exact path="/dashboard" element={
              <AuthGuard>
                <Dashboard />
              </AuthGuard>
            } />
            <Route exact path="/signin" element={<Signin />} />
            <Route exact path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ContextProvider>
  )
}

export default App;