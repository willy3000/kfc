import logo from './logo.svg';
import './App.css';
import { Fragment } from 'react';
import NavBar from './components/navbar';
import { useEffect } from 'react';
import axios from 'axios'
import { useDispatch } from 'react-redux/es/exports';
import {loadFood} from './slices/foodSlice'
import Foods from './components/foods';
import {Routes, Route} from 'react-router-dom';
import Cart from './components/cart';


function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    getData()
  }, [])

  async function getData(){
    try{
      const data = await axios.get("http://localhost:5000/foods")
      dispatch(loadFood(data.data))
    }catch(error){
      console.log(error)
    }

  }

  return (
    <Fragment>
      <NavBar></NavBar>
      <Routes>
      <Route path='/' element={<Foods></Foods>}/>
      <Route path='/cart' element={<Cart></Cart>}/>
      </Routes>
      
    </Fragment>
  );
}

export default App;
