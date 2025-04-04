import { Alert, AlertTitle } from "@mui/material"
import { useParams } from "react-router-dom"
import OrderTracker from "../Order/OrderTracker"
import CartItem from "../Cart/CartItem"
import { useEffect, useState } from "react"
import { api } from "../../config/ApiConfig"
import { CircularProgress } from "@mui/material";



const PaymentSuccess = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [orderDetails, setOrderDetails] = useState(null);
    const {orderId }= useParams();

    console.log('orderId', orderId)

    useEffect(() => {
        const fetchOrderDetails = async () => {
            if(!orderId) return;
            setIsLoading(true);

            try {
                const {data} = await api.get('/api/order/user');
                console.log('data of order: ', data)
                setOrderDetails(data);
                setError(false);
            } catch (e) {
                setError("Failed to fetch order details", e);
            } finally{
                setIsLoading(false);
            }
        }

        fetchOrderDetails();
    }, [orderId])


      if (isLoading) {
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
    <div className="px-2 lg:px-36">
        
        <div className="flex flex-col justify-center items-center">

            <Alert
            variant="filled"
            severity="success"
            sx={{md: 6, width: "fit-content", marginTop: "20px", marginBottom: "20px"}}
            >
                <AlertTitle>Order Success</AlertTitle>
                Congratulation! Your order has been successfully placed. 
            </Alert>
        </div>

        <OrderTracker activeStep={1}/>

        {
            orderDetails?.[0]?.orderItems?.map((item, index) => (
                <div key={index} className="my-4">
                    <CartItem item={item} key={index} isReview={true} />
                </div>
            ))
        }

    </div>
  )
}
export default PaymentSuccess