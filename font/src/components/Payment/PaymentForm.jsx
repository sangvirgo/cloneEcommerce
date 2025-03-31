import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button, Box, Typography, Grid, Paper, CircularProgress, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { api } from '../../config/ApiConfig';

const PaymentForm = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const { auth } = useSelector(state => state);

  // Kiểm tra xem có mã thanh toán từ VNPay trả về không
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const vnp_ResponseCode = searchParams.get('vnp_ResponseCode');
    const vnp_OrderInfo = searchParams.get('vnp_OrderInfo');
    
    if (vnp_ResponseCode) {
      // Xử lý kết quả thanh toán từ VNPay
      if (vnp_ResponseCode === '00') {
        // Thanh toán thành công
        setError(null);
        alert('Thanh toán thành công!');
        // Chuyển đến trang chi tiết đơn hàng
        navigate(`/payment/detail/${orderId}`);
      } else {
        // Thanh toán thất bại
        setError(`Thanh toán thất bại: Mã lỗi ${vnp_ResponseCode}`);
      }
    }
  }, [location.search, navigate, orderId]);

  // Lấy thông tin đơn hàng
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) return;
      
      setIsLoading(true);
      try {
        const { data } = await api.get(`/api/order/${orderId}`);
        setOrderDetails(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching order details:', err);
        setError('Không thể lấy thông tin đơn hàng');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  // Tạo URL thanh toán VNPay
  const handleVnpayPayment = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.post(`/api/payment/create/${orderId}`);
      if (data.paymentUrl) {
        setPaymentUrl(data.paymentUrl);
        // Chuyển hướng đến trang thanh toán VNPay
        window.location.href = data.paymentUrl;
      } else {
        setError('Không thể tạo đường dẫn thanh toán');
      }
    } catch (err) {
      console.error('Error creating payment:', err);
      setError(err.response?.data?.error || 'Lỗi khi tạo thanh toán');
    } finally {
      setIsLoading(false);
    }
  };

  // Thanh toán khi nhận hàng (COD)
  const handleCodPayment = async () => {
    setIsLoading(true);
    try {
      // Gọi API hoặc cập nhật trạng thái đơn hàng cho COD
      alert('Đã chọn thanh toán khi nhận hàng. Đơn hàng sẽ được xử lý!');
      navigate(`/payment/detail/${orderId}`);
    } catch (err) {
      console.error('Error processing COD:', err);
      setError('Lỗi khi xử lý thanh toán khi nhận hàng');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: '900px', margin: '0 auto', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Thanh toán đơn hàng
      </Typography>
      
      {error && (
        <Paper sx={{ p: 2, mb: 2, bgcolor: '#ffebee' }}>
          <Typography color="error">{error}</Typography>
        </Paper>
      )}
      
      {orderDetails && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6">Thông tin đơn hàng #{orderDetails.id}</Typography>
          <Divider sx={{ my: 2 }} />
          
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Tổng tiền:</strong> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(orderDetails.totalAmount)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Trạng thái:</strong> {orderDetails.orderStatus}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )}
      
      <Typography variant="h6" gutterBottom>
        Chọn phương thức thanh toán
      </Typography>
      
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleVnpayPayment}
            disabled={isLoading}
            sx={{ p: 2 }}
          >
            Thanh toán qua VNPay
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={handleCodPayment}
            disabled={isLoading}
            sx={{ p: 2 }}
          >
            Thanh toán khi nhận hàng (COD)
          </Button>
        </Grid>
      </Grid>
      
      <Paper sx={{ p: 3, bgcolor: '#f5f5f5' }}>
        <Typography variant="body1">
          <strong>Lưu ý:</strong> Với thanh toán qua VNPay, bạn sẽ được chuyển đến cổng thanh toán VNPay để hoàn tất giao dịch.
        </Typography>
      </Paper>
    </Box>
  );
};

export default PaymentForm; 