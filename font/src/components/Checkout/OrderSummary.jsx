import AddressCard from "./AddressCard"
import Cart from "../Cart/Cart"
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../State/Order/Action";
import { CircularProgress } from "@mui/material";
const OrderSummary = () => {
  const location = useLocation();
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const querySearch = new URLSearchParams(location.search);
  const orderId = querySearch.get("orderId");
  // const [orderDetails, setOrderDetails] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const {orderDetails} = useSelector(store => store.order)

  useEffect(() => {
    // const fetchOrderDetails = async () => {
    //   if (!orderId) {
    //     setError("Không thể tìm thấy mã đơn hàng");
    //     setLoading(false);
    //     return;
    //   }

    //   try {
    //     setLoading(true);
    //     console.log("Fetching order details for orderId:", orderId);
    //     const data = await dispatch(getOrderById(orderId));
    //     console.log("Order details received:", data);
    //     setOrderDetails(data);
    //     setError(null);
    //   } catch (err) {
    //     console.error("Error fetching order details:", err);
    //     setError("Không thể tải thông tin đơn hàng");
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchOrderDetails();
    dispatch(getOrderById(orderId))
    console.log("Order details received:", orderDetails);
  }, [dispatch, orderId]);


  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-[50vh]">
  //       <CircularProgress />
  //       <p className="ml-3">Đang tải thông tin đơn hàng...</p>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
  //       <p>{error}</p>
  //       <p>Vui lòng quay lại bước trước và thử lại.</p>
  //     </div>
  //   );
  // }


  return (
    <div>

        <AddressCard address={orderDetails?.data?.shippingAddress}  />

      <Cart isReview={true}/>
    </div>
  )
}

export default OrderSummary