import { IconButton, Button } from "@mui/material"
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import "./Cart.css"
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux'
import { removeItemToCart, updateItemToCart } from "../../State/Cart/Action";

const CartItem = ({ item }) => {
    const dispatch = useDispatch();
  
    const handleIncreaseQuantity = () => {
      dispatch(updateItemToCart({
        itemId: item.id,
        quantity: item.quantity + 1
      }));
    };
  
    const handleDecreaseQuantity = () => {
      if (item.quantity > 1) {
        dispatch(updateItemToCart({
          itemId: item.id,
          quantity: item.quantity - 1
        }));
      }
    };
  
    const handleRemoveItem = () => {
      dispatch(removeItemToCart(item.id));
    };
  
    return (
      <div className="p-5 rounded-md border_custom">
        <div className="flex items-center">
          <div className="w-[10rem] h-[5rem] lg:w-[15rem] lg:h-[9rem]">
            <img 
              className="w-full h-full object-cover object-top" 
              src={item.imageUrl} 
              alt={item.productName}
            />
          </div>
  
          <div className="ml-5 space-y-1">
            <p className="font-semibold">{item.productName}</p>
            <p className="opacity-70">Size: {item.size}</p>
            <p className="opacity-70 mt-2">Product ID: {item.productId}</p>
  
            <div className="flex items-center space-x-5 mt-4">
              <p className='font-semibold'>${item.price-item.discountedPrice}</p>
              <p className='opacity-50 line-through'>${item.price}</p>
              <p className='text-green-500 font-semibold'>
                {item.discountPercent}% off
              </p>
            </div>
          </div>
        </div>
  
        <div className="lg:flex items-center lg:space-x-10 pt-4">
          <div className="flex items-center space-x-2">
            <IconButton onClick={handleDecreaseQuantity} sx={{color: "red"}}>
              <RemoveCircleOutlineIcon/>
            </IconButton>
  
            <span className="py-1 px-7 border rounded-sm">{item.quantity}</span>
  
            <IconButton onClick={handleIncreaseQuantity} sx={{color: "green"}}>
              <AddCircleOutlineIcon/>
            </IconButton>
          </div>
  
          <div>
            <Button onClick={handleRemoveItem} sx={{color: "red"}}>
              Xóa
            </Button>
          </div>
        </div>
      </div>
    )
  }

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    productId: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    size: PropTypes.string.isRequired,
    discountedPrice: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    productName: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    discountPercent: PropTypes.number.isRequired
  }).isRequired,
};

export default CartItem