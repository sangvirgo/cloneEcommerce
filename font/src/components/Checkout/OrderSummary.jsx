import AddressCard from "./AddressCard"
import Cart from "../Cart/Cart"
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../State/Order/Action";
const OrderSummary = () => {
  const location = useLocation();
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const querySearch = new URLSearchParams(location.search);
  const orderId = querySearch.get("orderId");
  const order = useSelector(store => store.order);


  useEffect(() => {
    dispatch(getOrderById(orderId)).catch(err => {
      console.error("Failed to fetch order details:", err);
    }
    );
  }, [dispatch, orderId]);



  return (
    <div>

        <AddressCard address={order.shippingAddress}  />

      <Cart isReview={true}/>
    </div>
  )
}

export default OrderSummary