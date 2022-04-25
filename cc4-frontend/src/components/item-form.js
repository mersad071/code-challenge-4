import { Button, Card, CardContent, FormControl, Grid, Input, InputLabel } from "@mui/material";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { add, update } from './data';

function ItemForm(){
  const { state } = useLocation();
  const navigate = useNavigate();

  const [item, setItem] = React.useState(state || {name: ''});

  const onChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();    
    if (state) {
      const { id, name } = item;
      update({ id, name })
        .then(() => navigate('/dashboard'))
        .catch(err => console.log(err));
      return;
    }
    add({ name: item.name })
      .then(() => navigate('/dashboard'))
      .catch(err => console.log(err));
  }

  return(
    <>
      <Grid container spacing={0} justifyContent="center">
        <Grid item xs={6} md={4}>
          <Card sx={{ minWidth: 275, marginTop: '1em' }}>
            <CardContent>
              <h4>Add Item</h4>
              <br/>
              <form onSubmit={handleSubmit}>
                <FormControl fullWidth={true} margin='normal'>
                  <InputLabel htmlFor="name">Name</InputLabel>
                  <Input value={item?.name} type='text' id="name" name="name" onChange={onChange} />
                </FormControl>

                <FormControl fullWidth={true}>
                <Button type='submit' color='primary' variant='contained'>
                  Send
                </Button>
              </FormControl>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default ItemForm