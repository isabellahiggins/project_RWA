"use client";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import {useState, useEffect} from 'react';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link'
import Box from '@mui/material/Box';


export default function page(){
    const [data, setData ] = useState(null);

    //get the products from cart
    useEffect(() => {
            fetch('http://localhost:3000/api/viewCart')
              .then((res) => res.json())
              .then((data) => {
                setData(data)
              })
      }, [])

      if(!data){
        return <p>loading</p>
      }

      function removeFromCart(id){
        console.log("Removed product from cart: " + id);
        fetch(`http://localhost:3000/api/removeFromCart?itemId=${id}`)
        .then(() => {
            //refresh page after removing prduct from cart
            fetch('http://localhost:3000/api/viewCart')
            .then((res) => res.json())
            .then((data) => setData(data));
        });
      }


  return (
    <Container maxWidth="sm"
    sx={{ backgroundColor: "#FFF8F0", minHeight: '100vh'}}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      <img src="/images/mcdonaldlogo.png" alt="logo" width={80} height={80}/>

      <Typography component="h1" variant="h3" sx={{ color: 'rgb(197, 40, 61)' }}>
         View your cart below
      </Typography>
    </Box>
        
        <Box sx={{ mt: 1, border: '2px solid rgba(197, 40, 61)', borderRadius: '6px', p: 2, backgroundColor:'#481D24', alignItems: 'center'}} >
        {data.map((item, i) => (
    <Card sx={{ maxWidth: 345 }} key={i}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image={`/${item.imageLink}`}
          alt="product image"
          sx={{
            height: 250,
            width: '100%',
            objectFit: 'contain',
        }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.pname} {item.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" sx={{ color: "#FFC857" }} onClick={() => removeFromCart(item._id)}>
          Remove from Cart
        </Button>
      </CardActions>
    </Card>
    ))}</Box>

    <Link href="/checkout" variant="body2" sx={{ mt: 2, color: 'rgb(197, 40, 61)'}}>
      <Button variant="outlined"   sx={{ mt: 3, mb: 2  , bgcolor: 'rgb(197, 40, 61)', color: 'white', borderColor: 'rgb(197, 40, 61)'}}> Checkout Here! </Button> 
    </Link>
    </Container>

    
    );
   
}