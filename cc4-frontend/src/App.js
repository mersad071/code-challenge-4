import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Signin from './components/signin';
import Signup from './components/signup';

function App() {
  return (     
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={
          <Dashboard />
        } />
        <Route exact path="/dashboard" element={
          <Dashboard />
        } />
        <Route exact path="/signin" element={<Signin />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;