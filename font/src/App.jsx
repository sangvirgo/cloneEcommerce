import { Route, Routes } from 'react-router-dom'
import './App.css'
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
  return (
    <div className="">
      <Routes>
        <Route path="/*" element={<CustomerRouters/>} />
      </Routes>
    </div>

  )
}

export default App
