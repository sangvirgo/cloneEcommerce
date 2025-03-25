import CartItem from "./CartItem"
import {Button} from '@mui/material'
import "./Cart.css"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getCart } from "../../State/Cart/Action"

const Cart = () => {
    const navigate=useNavigate()
    const dispatch = useDispatch()
    const {cart, loading, error} = useSelector(store => store.cart)

    
    const handleCheckout = () => {
        console.log('Navigating to checkout with step=2');
        navigate('/checkout?step=2');
    };
    
    useEffect(() => {
        dispatch(getCart())
    }, [dispatch])

    return (
        <div>
            {loading ? (
                <div className="text-center py-10">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
                    <p className="mt-2">Đang tải giỏ hàng...</p>
                </div>
            ) : error ? (
                <div className="text-center py-10 text-red-500">
                    <p>Đã xảy ra lỗi: {error}</p>
                    <p className="text-sm">Vui lòng thử lại sau</p>
                </div>
            ) : (
                <div className="lg:grid grid-cols-3 lg:px-16 relative mt-3">
                    <div className="col-span-2">
                        {cart && cart.cartItems && cart.cartItems.length > 0 ? (
                            cart.cartItems.map((item) => (
                                <CartItem key={item.id} item={item} />
                            ))
                        ) : (
                            <div className="text-center py-10">
                                <p className="text-gray-500">Giỏ hàng trống</p>
                                <Button 
                                    onClick={() => navigate('/')}
                                    className="mt-4"
                                    variant='contained'
                                    sx={{bgcolor: "#ab00ff"}}
                                >
                                    Tiếp tục mua sắm
                                </Button>
                            </div>
                        )}
                    </div>

                    {cart && cart.cartItems && cart.cartItems.length > 0 && (
                        <div className="px-5 sticky top-0 h-[40vh] border_checkout ml-10">
                            <div className="mx-7">
                                <div className="flex flex-row justify-center align-center py-3">
                                    <p className="uppercase font-bold opacity-60 text-xl">Chi tiết giá</p>
                                </div>
                                <hr />
                                <div className="space-y-3 font-semibold mb-10">
                                    <div className="flex justify-between pt-3 text-black">
                                        <span>Giá gốc</span>
                                        <span>${cart.totalPrice}</span>
                                    </div>

                                    <div className="flex justify-between pt-3">
                                        <span>Giảm giá</span>
                                        <span className="text-green-600">-${cart.totalDiscountedPrice}</span>
                                    </div>

                                    <div className="flex justify-between pt-3">
                                        <span>Phí vận chuyển</span>
                                        <span className="text-green-600">Miễn phí</span>
                                    </div>

                                    <div className="flex justify-between pt-3 font-bold text-2xl border-t border-gray-500">
                                        <span>Tổng cộng</span>
                                        <span className="text-green-600">${cart.total}</span>
                                    </div>
                                </div>

                                <Button 
                                    onClick={handleCheckout}
                                    className="w-full mt-5"
                                    variant='contained'
                                    sx={{p:"2.5rem", py:"1rem", bgcolor: "#ab00ff"}}
                                >
                                    Thanh toán
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Cart