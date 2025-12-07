'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {ThemeProvider } from '@mui/material/styles';

import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';
import { useState, useEffect } from 'react'


export default function Page() {
  const [data, setData] = useState(null)

  useEffect(() => {
        fetch('http://localhost:3000/api/products')
          .then((res) => res.json())
          .then((data) => {
            setData(data)
          })
  }, [])

  function putInCart(name, imageLink, price){
    console.log("Adding product to the cart: " + name + " " + imageLink + " " + price);
    fetch(`http://localhost:3000/api/putInCart?pname=${name}&imageLink=${imageLink}&price=${price}`);
  }

   if (!data) return <p>Loading</p>

  const theme = createTheme({
        palette: {
          secondary: {
            main: green[500],
          },
        },
  });

  return (
        <ThemeProvider theme={theme}>
        <Container maxWidth="sm"
            sx={{ backgroundColor: "#FFF8F0", minHeight: '100vh'}}
        >

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <img src="/images/mcdonaldlogo.png" alt="logo" width={80} height={80}/>

            <Typography component="h1" variant="h3" sx={{ color: 'rgb(197, 40, 61)' }}>
                Take a look at our Menu
            </Typography>
            </Box>

    <Box sx={{ mt: 1, border: '2px solid rgba(197, 40, 61)', borderRadius: '6px', p: 2, backgroundColor:'#481D24' }} >
        <Typography component="h4" variant="h5" sx={{ color: '#FFC857' }}>
            Our Products
        </Typography>
    
          {
            data.map((item, i) => (
              <div style={{padding: '20px'}} key={i} >
                <Typography component="h5" sx={{fontWeight: 'bold', color: 'white'}}>{item.name} {item.price}</Typography>
                <br></br>
                <img src={`/${item.imageLink}`} alt={"product image"} width="100" height="100" style={{ borderRadius: '8px' }}/>
                <br></br>
                <Typography component="h5" sx={{color: 'rgba(139, 126, 128, 1)'}}> {item.description} </Typography>
                <br></br>
                <Button variant="outlined" onClick={() => putInCart(item.name, item.imageLink, item.price)}   sx={{ mt: 3, mb: 2  , bgcolor: 'rgb(197, 40, 61)', color: 'white', borderColor: 'rgb(197, 40, 61)'}}> Add to cart </Button>
              </div>
            ))
          }
</Box>
        </Container>
        </ThemeProvider>


  );

}