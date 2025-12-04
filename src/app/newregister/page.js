'use client';

//MUI framework imports that let us use components
import * as React from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';


//main function for the main, all code goes here
export default function Home() {

  const [message, setMessage] = React.useState('');
  const [messageType, setMessageType] = React.useState('success');

//Javascript
  const handleSubmit = (event) => {
    console.log("handling submit");

  //prevent defalt function call is to make sure browser doesn't refresh the page
  event.preventDefault();

  //get data from form and store it into const dara
  const data = new FormData(event.currentTarget);

//data.get to get the email and pass variables from the form data
  let email = data.get('email')
  let confirmEmail = data.get('confirmEmail')
  let pass = data.get('pass')
  let confirmPass = data.get('confirmPass')
  let address = data.get('address')
  let telephoneNumber = data.get('telephoneNumber')

//print the sent data to console
  console.log("Sent email:" + email)
  console.log("Sent confirmEmail:" + confirmEmail)
  console.log("Sent pass:" + pass) 
  console.log("Sent address:" + address)
  console.log("Sent telephoneNumber:" + telephoneNumber)

// run a function to talk to the database
  runDBCallAsync(
  `/api/newregister?email=${email}&confirmEmail=${confirmEmail}&pass=${pass}&confirmPass=${confirmPass}&address=${address}&telephoneNumber=${telephoneNumber}`);
 }; // end handle submit

//async means it will run by itself and not hold up other code
async function runDBCallAsync(url) {

    const res = await fetch(url);
    const data = await res.json();

  if(data.success){
    setMessage(data.message);
    setMessageType('success');
  }else{
    setMessage(data.message);
    setMessageType('error');
  }
}

//html code
  return (

    <Container maxWidth="sm">
    <Box sx={{ height: '100vh' }} >
      {message && <Alert severity={messageType}>{message}</Alert>}

    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

    <TextField margin="normal"
      required
      fullWidth
      id="email"
      label="Email Address"
      name="email"
      autoComplete="email"
      autoFocus
    />

    <TextField
      margin="normal"
      required
      fullWidth
      name="confirmEmail"
      label="Confirm your email"
      type="email"
      id="confirmEmail"
      autoComplete="current-email"
      ></TextField>

    <TextField
      margin="normal"
      required
      fullWidth
      name="pass"
      label="Pass"
      type="password"
      id="pass"
      autoComplete="current-password"
      ></TextField>

      <TextField
      margin="normal"
      required
      fullWidth
      name="confirmPass"
      label="confirm password"
      type="password"
      id="confirmPass"
      autoComplete="current-password"
      ></TextField>

      <TextField
      margin="normal"
      required
      fullWidth
      name="address"
      label="Address"
      type="text"
      id="address"
      autoComplete="current-address"
      ></TextField>

      <TextField
      margin="normal"
      required
      fullWidth
      name="telephoneNumber"
      label="Telephone Number"
      type="tel"
      id="telephoneNumber"
      autoComplete="current-telephoneNumber"
      ></TextField>

 <FormControlLabel
      control={<Checkbox value="remember" color="primary" />}
      label="Remember me"
></FormControlLabel>


    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
    >
      Register
    </Button>
    </Box>
  </Box>
</Container>

  ); // end return
}

