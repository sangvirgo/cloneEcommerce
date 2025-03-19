import { Route, Routes } from 'react-router-dom'
import './App.css'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUser } from './State/Auth/Action'
// import Footer from './components/Footer/Footer'
// import HomePage from './components/HomePage'
// import Navigation from './components/Navigation/Navigation'
// import OrderDetail from './components/Order/OrderDetail'
import CustomerRouters from './Routers/CustomerRouters'
// import Product from './components/Product/Product'
// import ProductDetails from './components/ProductDetails/ProductDetails'
// import Cart from './components/Cart/Cart'
// import Checkout from './components/Checkout/Checkout'
// import Order from './components/Order/Order'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      console.log('App initialization - JWT found, loading user data');
      dispatch(getUser(jwt));
    }
  }, [dispatch]);

  return (
    <div className="">
      <Routes>
        <Route path="/*" element={<CustomerRouters/>} />
      </Routes>
    </div>

  )
}

export default App
