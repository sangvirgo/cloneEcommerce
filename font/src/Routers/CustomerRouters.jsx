import { Route, Routes } from "react-router-dom"
import HomePage from "../components/HomePage"
import Cart from "../components/Cart/Cart"
import Navigation from "../components/Navigation/Navigation"
import Footer from "../components/Footer/Footer"
import Product from "../components/Product/Product"
import ProductDetails from "../components/ProductDetails/ProductDetails"
import Checkout from "../components/Checkout/Checkout"
import Order from "../components/Order/Order"
import OrderDetail from "../components/Order/OrderDetail"


const CustomerRouters = () => {
  return (
    <div>
        <div>
            <Navigation />
        </div>

        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/:category/:section/:item" element={<Product/>} />
            <Route path="/product/:productId" element={<ProductDetails/>} />
            <Route path="/checkout" element={<Checkout/>} />
            <Route path="/account/order" element={<Order/>} />
            <Route path="/checkout/order/:orderId" element={<OrderDetail/>} />


        </Routes>

        <div>
            <Footer />
        </div>
    </div>
  )
}

export default CustomerRouters