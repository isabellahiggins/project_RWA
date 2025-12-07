"use client";

import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function CheckoutPage() {
  const [cart, setCart] = useState(null);
  const [message, setMessage] = useState("");

  //Get cart
  useEffect(() => {
    fetch("http://localhost:3000/api/viewCart")
      .then(res => res.json())
      .then(data => setCart(data));
  }, []);

  if (!cart) return <p>Loading...</p>;

  // Get cart total
  let totalPrice = 0;
  for(let i = 0; i <cart.length; i++){
    totalPrice += Number(cart[i].price);
  }

  function checkoutOrder() {
    fetch("http://localhost:3000/api/checkout")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMessage("Order placed successfully!");
        } else {
          setMessage(data.message);
        }
      });
  }

  return (
    <Box sx={{ p: 4,  border: '1px solid #481D24',  borderRadius: '6px',  backgroundColor:'#FFF8F0'}}>

    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, justifyContent: "center" }}>
          <img src="/images/mcdonaldlogo.png" alt="logo" width={80} height={80}/>
    
          <Typography component="h1" variant="h3" sx={{ color: 'rgb(197, 40, 61)', textAlign: "center" }}>
             Checkout
          </Typography>
        </Box>

    <Box sx={{ textAlign: "center", mb: 2, backgroundColor: "#481D24", borderRadius: '6px', p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, color: "white", textAlign: "center", padding:8}}>
        Total Price: €{totalPrice}
      </Typography>

    
      <Button
        variant="contained"
        sx={{ bgcolor: "rgb(197,40,61)", alignItems: "center" }}
        onClick={checkoutOrder}
      >
        Confirm Order
      </Button>
    </Box>
    <Typography variant="h6" sx={{ color: "rgb(197,40,61)", textAlign: "center" }}> 
      Thank you for choosing McDonald's!
    </Typography>
      {message && (
        <Typography sx={{ mt: 3, color: "rgb(197,40,61)", textAlign: "center" }}>{message}</Typography>
      )}
    </Box>

  );
}
