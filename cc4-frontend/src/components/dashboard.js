import React from 'react';
import { Card, CardContent, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Context from './context';
import { list, remove } from './data';
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

  const handleDelete = (id) => {
    remove(id)
      .then(() => {
        const newItems = items.filter(item => item.id !== id);
        setItems(newItems);
      })
      .catch(err => console.log('something is wrong', err));
  }

  return (

    <div className='p-2'>
      <h2>Dashboard</h2>
      <div className='text-right' style={{ marginTop: '-2em' }}>
        <Button onClick={ handleSignOut }>Sign Out</Button>
        <br/>
      </div>

      <Grid container spacing={1} justifyContent="start">
        {items.map(item => (
          <Grid item xs={6} md={3} key={item.id}>
            <Card sx={{ minWidth: 275, marginTop: '1em' }}>
              <CardContent>
                <p>
                  <strong>Name:</strong> {item.name}
                </p>
                <p className='text-muted'>
                  <br/>
                  <strong>Created:</strong> {new Date(item.createdAt).toLocaleString()}
                </p>
                <p className='text-muted'>
                  <strong>Last update:</strong>  {new Date(item.updatedAt).toLocaleString()}
                </p>
                <Button onClick={ () => { navigate('/add-item', { state: item }) } }> Update </Button>
                <Button onClick={ () => { handleDelete(item.id) } } color='error'> Delete </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div>
        <br/>
        <Button onClick={ ()=>{ navigate('/add-item') } } variant='contained' >Add Item</Button>
      </div>
    </div>
  );
}