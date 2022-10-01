import React from 'react'
import { Box } from '@mui/system'
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material'
import './navbar.css'
import { ShoppingCart } from '@mui/icons-material'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import {Badge} from '@mui/material'
import { Link } from 'react-router-dom'
import {styled} from '@mui/material'
import {TextField} from '@mui/material';
import { grey } from '@mui/material/colors'
import { useDispatch } from 'react-redux'
import {searchItems} from '../slices/foodSlice'
import {Route, Routes} from 'react-router-dom'


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    color: "#a40204",
    backgroundColor: "#fff1e3",
  },
}));



export default function NavBar() {

  const dispatch = useDispatch()

    const orders = useSelector((state) => state.food.cart)
    const searchKeyword = useSelector((state) => state.food.searchTerm)


  return (
    <div className='main-container'>
    <img className='logo' src={require("../assets/kfc-logo.png")} alt="no image" width={150} />
    <div className='app-bar'>
    <Toolbar>

        <Routes>
        <Route path={!"/cart"} element={<TextField value={searchKeyword} variant='standard' label='search' onChange={(event) => dispatch(searchItems(event.target.value))}></TextField>}>
            </Route>
        </Routes>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <StyledBadge badgeContent={orders.length} color="secondary">
            <Link to="/cart">
            <IconButton><ShoppingCart className="cart-icon"></ShoppingCart></IconButton>
            </Link>
          </StyledBadge>
        </Toolbar>
    </div>

    </div>
  )
}
