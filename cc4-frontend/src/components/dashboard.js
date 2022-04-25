import React from 'react';
import { Card, CardContent, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Context from './context';
import { list } from './data';
export default function Dashboard() {

  const [items, setItems] = React.useState([]);
  const context = React.useContext(Context);
  const navigate = useNavigate();
  const handleSignOut = (event) => {
    context.signOut()
      .then(() => navigate('/signin'))
      .catch(err => console.log('something is wrong', err));
  }

  React.useEffect(() => {
    list(10, null)
      .then(result => {
        const data = result.data.listItems.items;
        setItems(data)
      })
      .catch(err => console.log('something is wrong', err));
  }, [context]);

  return (
    <div className='p-2'>
      <h2>Dashboard</h2>
      <div className='text-right' style={{ marginTop: '-2em' }}>
        <Button onClick={ handleSignOut }>Sign Out</Button>
        <br/>
      </div>

      <Grid container spacing={0} justifyContent="start">
        {items.map(item => (
          <Grid item xs={6} md={3} key={item.id}>
            <Card sx={{ minWidth: 275, marginTop: '1em' }}>
              <CardContent>
                {item.name}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}