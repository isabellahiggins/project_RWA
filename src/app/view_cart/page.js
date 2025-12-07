"use client";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import {useState, useEffect} from 'react';

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
    <div>
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
        <Button size="small" color="primary" onClick={() => removeFromCart(item._id)}>
          Remove from Cart
        </Button>
      </CardActions>
    </Card>
    ))}
    </div>
    );
   
}