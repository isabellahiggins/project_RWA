'use client';

//MUI framework imports that let us use components
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

//main function for the main, all code goes here
export default function Home() {
//Javascript
  const handleSubmit = (event) => {
  console.log("handling submit");
  //prevent defalt function call is to make sure browser doesn't refresh the page
  event.preventDefault();

  //get data from form and store it into const dara
  const data = new FormData(event.currentTarget);


//data.get to get the email and pass variables from the form data
   let email = data.get('email')
   let pass = data.get('pass')

   console.log("Sent email:" + email)
   console.log("Sent pass:" + pass)
// run a function to talk to the database
   runDBCallAsync(`http://localhost:3000/api/login?email=${email}&pass=${pass}`)

 }; // end handle submit

//async means it will run by itself and not hold up other code
async function runDBCallAsync(url) {

    const res = await fetch(url);
    const data = await res.json();

    if(data.data== "true"){
      console.log("login is valid!")
    } else {
      console.log("not valid  ")
    }
  }



//html code
  return (

    <Container maxWidth="sm">

    <Box sx={{ height: '100vh' }} >


    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

    <TextField

      margin="normal"

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

      name="pass"

      label="Pass"

      type="pass"

      id="pass"

      autoComplete="current-password"

    />

    
    <FormControlLabel
      control={<Checkbox value="remember" sx={{ color: 'rgb(197, 40, 61)', '&.Mui-checked': { color: 'rgb(255, 200, 87)'} }} />}
      label="Remember me"
    ></FormControlLabel>

    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2  ,bgcolor: 'rgb(197, 40, 61)' }}
    >

      Sign In

    </Button>

    

</Box>

</Box>

       </Container>

  ); // end return

}

