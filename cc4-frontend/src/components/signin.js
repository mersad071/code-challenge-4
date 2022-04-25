import { Input, FormControl, InputLabel, Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Context from './context';

export default function Signin() {

  const [showConfirm, setShowConfirm] = React.useState(false);
  const context = React.useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password, code } = event.target.elements;

    if(showConfirm) {
      context.confirmSignUp({ username: email.value, password: password.value, code: code.value })
        .then(() => setShowConfirm(false))
        .then(() => context.signIn({ username: email.value, password: password.value }))
        .then(() => navigate('/Dashboard'))
        .catch(err => console.log('something is wrong', err));
      return;
    }

    context.signIn({ username: email.value, password: password.value })
      .then(() => navigate('/dashboard'))
      .catch(err => {
        if(err.name === 'UserNotConfirmedException') {
          setShowConfirm(true);
        }
      });
  }

  const handleSignUp = (event) => {
    event.preventDefault();
    navigate('/signup');
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

      {
        showConfirm && <FormControl>
          <InputLabel htmlFor="code">Confirmation Code</InputLabel>
          <Input type='text' id="code" name="code" />
        </FormControl>
      }

      <FormControl fullWidth={true}>
        <Button type='submit' color='primary' variant='contained'>
          Signin
        </Button>
        <Button onClick={handleSignUp} type='button' color='primary' variant='contained'>
          Signup
        </Button>
      </FormControl>
    </form>
  );
}
