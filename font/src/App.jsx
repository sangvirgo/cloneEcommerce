import './App.css'
import Footer from './components/Footer/Footer'
// import HomePage from './components/HomePage'
import Navigation from './components/Navigation/Navigation'
import OrderDetail from './components/Order/OrderDetail'
// import Product from './components/Product/Product'
// import ProductDetails from './components/ProductDetails/ProductDetails'
// import Cart from './components/Cart/Cart'
// import Checkout from './components/Checkout/Checkout'
// import Order from './components/Order/Order'

function App() {
  return (
    <div className="">
      <Navigation />

    <div>
      {/* <HomePage /> */}
      {/* <Product /> */}
      {/* <ProductDetails /> */}
      {/* <Cart /> */}
      {/* <Checkout /> */}
      {/* <Order /> */}
      <OrderDetail />
    </div>

    <Footer />
    </div>

  )
}

export default App
