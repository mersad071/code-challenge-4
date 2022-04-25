import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Signin from './components/signin';
import Signup from './components/signup';
import { ContextProvider } from './components/context';
import AuthGuard from './auth-guard';
import { ThemeProvider } from '@emotion/react';
import darkTheme from './ui/theme';
import Nav from './components/nav';
import ItemForm from './components/item-form';

function App() {
  return (
    <ContextProvider>
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/signin" element={<Signin />} />
              <Route exact path="/signup" element={<Signup />} />

              <Route exact path="/" element={
                <AuthGuard>
                  <Nav />
                  <Dashboard />
                </AuthGuard>
              } />
              <Route exact path="/dashboard" element={
                <AuthGuard>
                  <Nav />
                  <Dashboard />
                </AuthGuard>
              } />
              <Route exact path="/add-item" element={
                <AuthGuard>
                  <Nav />
                  <ItemForm />
                </AuthGuard>
              } />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ContextProvider>
  )
}

export default App;