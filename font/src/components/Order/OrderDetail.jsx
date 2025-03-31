import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById } from "../../State/Order/Action";
import AddressCard from "../Checkout/AddressCard"
import ConfirmOrderCard from "./ConfirmOrderCard";
import OrderTracker from "./OrderTracker"
import { Button, Box, CircularProgress, Typography, Divider, Chip } from "@mui/material";
import { api } from "../../config/ApiConfig";



const OrderDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { order } = useSelector((state) => state.order);
  const [loading, setLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      await dispatch(getOrderById(orderId));
      try {
        // Lấy thông tin thanh toán nếu có
        const paymentResponse = await api.get(`/api/payment/order/${orderId}`);
        if (paymentResponse.data) {
          setPaymentDetails(paymentResponse.data);
        }
      } catch (error) {
        console.error("Error fetching payment details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [dispatch, orderId]);

  const getPaymentStatusColor = (status) => {
    if (!status) return "default";
    
    switch (status) {
      case "COMPLETED":
        return "success";
      case "PENDING":
        return "warning";
      case "FAILED":
        return "error";
      case "CANCELLED":
        return "error";
      case "REFUNDED":
        return "info";
      default:
        return "default";
    }
  };

  const handleProceedToPayment = () => {
    navigate(`/payment/process/${orderId}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="px-5 lg:px-20">
      {order && (
        <>
          <Typography variant="h4" sx={{ mt: 2, mb: 4 }}>
            Chi tiết đơn hàng #{orderId}
          </Typography>

          {/* Thông tin thanh toán */}
          <Box sx={{ mb: 4, p: 2, border: "1px solid #e0e0e0", borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Thông tin thanh toán
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            {paymentDetails ? (
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Typography sx={{ mr: 2 }}>Trạng thái:</Typography>
                  <Chip 
                    label={paymentDetails.paymentStatus || "Chưa thanh toán"} 
                    color={getPaymentStatusColor(paymentDetails.paymentStatus)}
                    size="small" 
                  />
                </Box>
                <Typography variant="body2" gutterBottom>
                  Phương thức: {paymentDetails.paymentMethod || "Chưa chọn"}
                </Typography>
                {paymentDetails.transactionId && (
                  <Typography variant="body2" gutterBottom>
                    Mã giao dịch: {paymentDetails.transactionId}
                  </Typography>
                )}
                {paymentDetails.paymentDate && (
                  <Typography variant="body2" gutterBottom>
                    Ngày thanh toán: {new Date(paymentDetails.paymentDate).toLocaleString('vi-VN')}
                  </Typography>
                )}
              </Box>
            ) : (
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography>Chưa có thông tin thanh toán</Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleProceedToPayment}
                >
                  Thanh toán ngay
                </Button>
              </Box>
            )}
          </Box>

          {/* Địa chỉ giao hàng */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Địa chỉ giao hàng
            </Typography>
            {order.shippingAddress && (
              <AddressCard address={order.shippingAddress} />
            )}
          </Box>

          {/* Trạng thái đơn hàng */}
          <div className="py-10">
            <OrderTracker activeStep={order.orderStatus === "PENDING" ? 1 : 
                          order.orderStatus === "CONFIRMED" ? 2 : 
                          order.orderStatus === "SHIPPED" ? 3 : 
                          order.orderStatus === "DELIVERED" ? 4 : 0} />
          </div>

          {/* Sản phẩm đặt hàng */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Sản phẩm đã đặt
            </Typography>
            <div>
              {order.orderItems && order.orderItems.map((item, index) => (
                <ConfirmOrderCard key={index} card={item} />
              ))}
            </div>
          </Box>

          {/* Tổng thanh toán */}
          <Box sx={{ mb: 4, p: 2, border: "1px solid #e0e0e0", borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Tổng thanh toán
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography>Tổng tiền hàng:</Typography>
              <Typography>{order.totalPrice?.toLocaleString('vi-VN')}₫</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography>Phí vận chuyển:</Typography>
              <Typography>{order.shippingPrice?.toLocaleString('vi-VN')}₫</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography>Giảm giá:</Typography>
              <Typography>-{order.discount?.toLocaleString('vi-VN')}₫</Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6">Tổng cộng:</Typography>
              <Typography variant="h6" color="primary">
                {(order.totalPrice + order.shippingPrice - order.discount)?.toLocaleString('vi-VN')}₫
              </Typography>
            </Box>
          </Box>

          {/* Nút thanh toán (nếu chưa thanh toán) */}
          {(!paymentDetails || paymentDetails.paymentStatus === "FAILED") && (
            <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleProceedToPayment}
              >
                Thanh toán đơn hàng
              </Button>
            </Box>
          )}
        </>
      )}
    </div>
  )
}

export default OrderDetail