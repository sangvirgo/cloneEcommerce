import CartItem from "./CartItem"
import {Button} from '@mui/material'
import "./Cart.css"
import { useNavigate } from "react-router-dom"


const Cart = () => {
    const navigate=useNavigate()

    const handleCheckout = () => {
        console.log('Navigating to checkout with step=2');
        navigate('/checkout?step=2');
      };

  return (
    <div>
        <div className="lg:grid grid-cols-3 lg:px-16 relative mt-3">
        <div className="col-span-2 ">
           {[1, 1, 1, 1].map((item, index) => (
                <CartItem  key={index} />
           ))}  
        </div>



        <div className="px-5 sticky top-0 h-[40vh] border_checkout ml-10">
            <div className="mx-7">
            <div className="flex flex-row justify-center align-center py-3">
                <p className="uppercase font-bold opacity-60 text-xl">Price details</p>
            </div>
            <hr />
            <div className="space-y-3 font-semibold mb-10">

                <div className="flex justify-between pt-3 text-black">
                    <span>Price</span>
                    <span>$149</span>
                </div>

                <div className="flex justify-between pt-3 ">
                    <span>Discount</span>
                    <span className="text-green-600">-$70</span>
                </div>

                <div className="flex justify-between pt-3 ">
                    <span>Delivery Charge</span>
                    <span className="text-green-600">Free</span>
                </div>

                <div className="flex justify-between pt-3 font-bold text-2xl border-t border-gray-500">
                    <span>Total Amount</span>
                    <span className="text-green-600">$149</span>
                </div>

            </div>

                <Button onClick={handleCheckout} className="w-full mt-5" variant='contained' sx={{p:"2.5rem", py:"1rem", bgcolor: "#ab00ff"}} >
                    Check out
                </Button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Cart