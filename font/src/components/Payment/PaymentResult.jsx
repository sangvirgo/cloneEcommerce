import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, Paper, Button, CircularProgress, Grid, Divider } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { api } from '../../config/ApiConfig';

const PaymentResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [orderID, setOrderID] = useState(null);

  useEffect(() => {
    const processPaymentResult = async () => {
      const searchParams = new URLSearchParams(location.search);
      const vnp_ResponseCode = searchParams.get('vnp_ResponseCode');
      const vnp_TxnRef = searchParams.get('vnp_TxnRef');
      const orderId = searchParams.get('orderId');
      setOrderID(orderId);

      if (!vnp_ResponseCode || !orderId) {
        setError('Thông tin thanh toán không hợp lệ');
        setIsLoading(false);
        return;
      }
      
      try {
        // Gửi thông tin thanh toán về server để xử lý
        const response = await api.post('/api/payment/vnpay-callback', null, {
          params: Object.fromEntries(searchParams)
        });
        
        setResult({
          success: vnp_ResponseCode == '00',
          orderId: orderId,
          transactionId: vnp_TxnRef,
          responseCode: vnp_ResponseCode,
          message: vnp_ResponseCode == '00' ? 'Thanh toán thành công' : 'Thanh toán thất bại',
          data: response.data
        });

        // if (vnp_ResponseCode == '00') {
        //   await api.delete("/api/cart/clear")
        // }

      } catch (err) {
        console.error('Error processing payment result:', err);
        setError('Lỗi khi xử lý kết quả thanh toán');
      } finally {
        setIsLoading(false);
      }
    };

    processPaymentResult();
  }, [location.search]);

  const handleGoToOrderDetails = () => {
    navigate(`/payment/detail/${orderID}`);
  };

  const handleGoToHome = () => {
    navigate('/');
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: '800px', margin: '0 auto', p: 4 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <ErrorOutlineIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Lỗi xử lý thanh toán
          </Typography>
          <Typography variant="body1" paragraph>
            {error}
          </Typography>
          <Button variant="contained" onClick={handleGoToHome} sx={{ mt: 2 }}>
            Quay lại trang chủ
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: '800px', margin: '0 auto', p: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          {result.success ? (
            <CheckCircleOutlineIcon sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
          ) : (
            <ErrorOutlineIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
          )}
          <Typography variant="h4" gutterBottom>
            {result.success ? 'Thanh toán thành công' : 'Thanh toán thất bại'}
          </Typography>
          <Typography variant="body1">
            {result.message}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Mã đơn hàng:</strong>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              #{result.orderId}
            </Typography>
          </Grid>
          
          {result.transactionId && (
            <>
              <Grid item xs={6}>
                <Typography variant="body1">
                  <strong>Mã giao dịch:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">
                  {result.transactionId}
                </Typography>
              </Grid>
            </>
          )}
          
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Mã phản hồi:</strong>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              {result.responseCode}
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleGoToOrderDetails}
          >
            Xem chi tiết đơn hàng
          </Button>
          <Button 
            variant="outlined" 
            onClick={handleGoToHome}
          >
            Quay lại trang chủ
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default PaymentResult; 