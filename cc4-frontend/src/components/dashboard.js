import React from 'react';
import { Button } from '@mui/material';
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
    <div>
      <h1>Dashboard</h1>
      <div>
        {items.map(item => (
          <div key={item.id}>
            {item.name}
          </div>
        ))}
      </div>
      <Button onClick={handleSignOut}>Sign Out</Button>
    </div>
  );
}