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
import OAuthRedirect from "../components/auth/OAuthRedirect"
import PaymentOrderDetail from "../components/Payment/PaymentOrderDetail"
import PaymentForm from "../components/Payment/PaymentForm"
import PaymentResult from "../components/Payment/PaymentResult"


const CustomerRouters = () => {
  return (
    <div>
        <div>
            <Navigation />
        </div>

        <Routes>
            <Route path="/sign-up" element={<HomePage />} />
            <Route path="/sign-in" element={<HomePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/:category/:section/:item" element={<Product/>} />
            <Route path="/product/all" element={<Product/>} />
            <Route path="/product/:productId" element={<ProductDetails/>} />
            <Route path="/checkout" element={<Checkout/>} />
            <Route path="/account/order" element={<Order/>} />
            <Route path="/checkout/order/:orderId" element={<OrderDetail/>} />
            <Route path="/oauth2/redirect" element={<OAuthRedirect />} />
            <Route path="/payment/detail/:orderId" element={<PaymentOrderDetail />} />
            <Route path="/payment/process/:orderId" element={<PaymentForm />} />
            <Route path="/payment/result" element={<PaymentResult />} />
        </Routes>

        <div>
            <Footer />
        </div>
    </div>
  )
}

export default CustomerRouters