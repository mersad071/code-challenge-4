import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Context from './context';
export default function Dashboard() {

  const context = React.useContext(Context);
  const navigate = useNavigate();
  const handleSignOut = (event) => {
    context.signOut()
      .then(() => navigate('/signin'))
      .catch(err => console.log('something is wrong', err));
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <Button onClick={handleSignOut}>Sign Out</Button>
    </div>
  );
}