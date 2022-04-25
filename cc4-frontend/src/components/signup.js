import { Input, FormControl, InputLabel, Button, Grid, Card, CardContent } from '@mui/material';
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

              <FormControl fullWidth={true}>
                <Button type='submit' color='primary' variant='contained'>
                  Signup
                </Button>
              </FormControl>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
