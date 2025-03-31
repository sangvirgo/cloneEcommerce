import AddressCard from "./AddressCard"
import Cart from "../Cart/Cart"
import { useLocation } from "react-router-dom";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { getOrderById } from "../../State/Order/Action";

const OrderSummary = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const querySearch = new URLSearchParams(location.search);
  const orderId = querySearch.get("orderId");
  const { order, loading, error } = useSelector(state => state.order);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        await dispatch(getOrderById(orderId));
        console.log("Order details received:", order);
      }
      catch (error) {
        console.error("Error fetching order details:", error);
      }
    };
    
    fetchOrderDetails();
  }, [dispatch, orderId]); // Removed orderDetails from dependency array to prevent infinite loop


  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <CircularProgress />
        <p className="ml-3">Đang tải thông tin đơn hàng...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <p>{error}</p>
        <p>Vui lòng quay lại bước trước và thử lại.</p>
      </div>
    );
  }


  return (
    <div>

        <AddressCard address={order?.shippingAddress}  />

      <Cart isReview={true} orderId={orderId}/>
    </div>
  )
}

export default OrderSummary