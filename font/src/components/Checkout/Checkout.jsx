import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import DeliveryAddressForm from './DeliveryAddressForm';
import OrderSummary from './OrderSummary';

const steps = ["Login", 'Delivery Address', 'Order Summary', 'Payment'];

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const querySearch = new URLSearchParams(location.search);
  const stepFromUrl = querySearch.get("step");
  const orderId = querySearch.get("orderId");

  // Đảm bảo step nằm trong khoảng hợp lệ (0 đến steps.length - 1)
  const initialStep = stepFromUrl 
    ? Math.min(Math.max(parseInt(stepFromUrl) - 1, 0), steps.length - 1) 
    : 0;
  
  const [activeStep, setActiveStep] = React.useState(initialStep);

  // Cập nhật URL khi activeStep thay đổi
  React.useEffect(() => {
    // Giữ lại orderId nếu có khi thay đổi step
    const newParams = new URLSearchParams();
    newParams.set("step", activeStep + 1);
    
    // Chỉ thêm orderId vào URL nếu nó tồn tại
    if (orderId) {
      newParams.set("orderId", orderId);
    }
    
    // Lấy orderId từ query hiện tại nếu step là 3 (Order Summary)
    const currentOrderId = querySearch.get("orderId");
    if (activeStep === 2 && currentOrderId) {
      newParams.set("orderId", currentOrderId);
    }
    
    navigate(`/checkout?${newParams.toString()}`, { replace: true });
  }, [activeStep, navigate, orderId, querySearch]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => Math.min(prevActiveStep + 1, steps.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  };

  // Kiểm tra nếu đang ở bước Order Summary nhưng không có orderId thì quay lại bước trước
  React.useEffect(() => {
    if (activeStep === 2 && !querySearch.get("orderId")) {
      console.log("No order ID found for Order Summary, returning to previous step");
      setActiveStep(1);
    }
  }, [activeStep, querySearch]);

  return (
    <div className='px-10 lg:px-20'>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>

            <div className='mt-10'>
              {activeStep === 1 ? <DeliveryAddressForm/> : <OrderSummary/>}
            </div>
          </React.Fragment>
        )}
      </Box>
    </div>
  );
}