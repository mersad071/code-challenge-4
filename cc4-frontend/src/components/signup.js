import { Input, FormControl, InputLabel, Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Context from './context';

export default function Signup() {

  const context = React.useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    context.signUp({ username: email.value, password: password.value })
      .then(() => navigate('/signin'))
      .catch(err => console.log('something is wrong', err));
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input type='email' id="email" name="email" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input type='password' id="password" name="password" />
      </FormControl>
      <FormControl fullWidth={true}>
        <Button type='submit' color='primary' variant='contained'>
          Signup
        </Button>
      </FormControl>
    </form>
  );
}
