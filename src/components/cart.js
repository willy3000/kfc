import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { Card } from '@mui/material'
import './cart.css'
import {Button} from '@mui/material'
import { Fragment } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import {IconButton} from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch } from 'react-redux'
import {addItem, removeItem, deleteItem} from '../slices/foodSlice'


export default function Cart() {

    const orders = useSelector((state) => state.food.cart)
    const dispatch = useDispatch()

  return (
    <div className='orders-container'>
        {orders.map((order)=>
        <div className='order-item' key={order.id}>
            <span><img className='order-image' src={order.image} alt="" height={100} /></span>
            <h3>{order.name}</h3>
            <h4>{order.price}</h4>
            <IconButton onClick={() => dispatch(removeItem(order.id))}><RemoveIcon></RemoveIcon></IconButton><h5>{order.amount}</h5><IconButton onClick={() => dispatch(addItem(order.id))}><AddIcon></AddIcon></IconButton>
            <IconButton onClick={() => dispatch(deleteItem(order.id))}><DeleteIcon className="deleteIcon"></DeleteIcon></IconButton>
        </div>
        )}
    {orders.length>0 && <Button className='checkout-btn' style={{backgroundColor: "#a40204", color: '#FFFFFF'}}
        >Go to checkout</Button>}
    </div>
  )
}
