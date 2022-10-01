import React from 'react'
import './foods.css'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { Card, CardHeader, CardMedia, CardActions } from '@mui/material'
import {Button} from '@mui/material';
import {IconButton} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from 'react';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import {changeOrderState, addItem, removeItem} from '../slices/foodSlice'
import {Badge} from '@mui/material';
import {styled} from '@mui/material';
import { red } from '@mui/material/colors';


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 15,
    top: 13,
    padding: '7px',
    color: "#fff1e3",
    backgroundColor: "#a40204",
    fontWeight: 500,
    fontSize: 15
  },
}));



export default function Foods() {

    const dispatch = useDispatch()

    const foods = useSelector((state) => state.food.foods)
    const orders = useSelector((state) => state.food.cart)
    const searchKeyword = useSelector((state) => state.food.searchTerm)

    const check = (id) => {
      try{
        const newId = orders.find(x => x.id === id).amount
        return true
      }catch{
        return false
      }
    }

  return (
    <div className='foods-container'>
        {foods.map((food) => 
          <StyledBadge badgeContent={check(food.id) ? orders.find(x => x.id === food.id).amount : 0} key={food.id}>
          {food.name.toLowerCase().includes(searchKeyword.toLowerCase()) && <Card className='food-card' key={food.id}>
            <CardMedia
            component="img"
            height="194"
            image={food.image}
            alt="Paella dish"
          />

          <CardHeader
          title = {food.name}
          subheader = {food.price}
          />
          
        <CardActions>
          {!food.order_state && <Button className='order' variant="outlined" color="error" onClick={() => dispatch(changeOrderState(food.id))}>
            Order
          </Button>}
          {food.order_state && <div className='order-count'>
            <IconButton onClick={() => dispatch(removeItem(food.id))}><RemoveIcon></RemoveIcon></IconButton>
            <h3>
              {orders.find(x => x.id === food.id).amount}
            </h3>
            <IconButton onClick={() => dispatch(addItem(food.id))}><AddIcon></AddIcon></IconButton>
          </div>}
        </CardActions>
        </Card>}
        </StyledBadge>
        )}
    </div>
  )
}
