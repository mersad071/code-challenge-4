import { Input, FormControl, InputLabel, Button, Grid, Stack, Card, CardContent } from '@mui/material';
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
    <Grid container spacing={0} alignItems="center" justifyContent="center">
      <Grid item xs={6} md={4}>
        <Card sx={{ minWidth: 275, marginTop: '1em' }}>
          <CardContent>
            <h3>Sign In</h3>
            <p className='text-muted'>Code challenge 4</p>
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth={true} margin='normal'>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input type='email' id="email" name="email" />
              </FormControl>
              
              <FormControl fullWidth={true} margin='normal'>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input type='password' id="password" name="password" />
              </FormControl>

              {
                showConfirm && <FormControl fullWidth={true} margin='normal'>
                  <InputLabel htmlFor="code">Confirmation Code</InputLabel>
                  <Input type='text' id="code" name="code" />
                </FormControl>
              }

              <FormControl>
                <Stack direction="row" spacing={1} sx={{ textAlign: 'right' }}>
                  <Button onClick={handleSignUp} type='button' variant='text' color='info'>
                    Signup
                  </Button>
                  <Button type='submit' color='success' variant='contained'>
                    Signin
                  </Button>
                </Stack>
              </FormControl>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
