import { Button, Card, CardContent, FormControl, Grid, Input, InputLabel } from "@mui/material";
import React, { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { add, update } from './data';

function ItemForm(){
  const { state } = useLocation();
  const navigate = useNavigate();
  const ref = useRef(state.name);

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.elements.name.value;
    if (state) {
      state.name = name;
      update(state)
        .then(() => navigate('/dashboard'))
        .catch(err => console.log(err));
      return;
    }
    add({ name })
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
                  <Input type='text' id="name" name="name" ref={ref} />
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