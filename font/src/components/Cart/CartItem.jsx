import { IconButton, Button } from "@mui/material"
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import "./Cart.css"

const CartItem = () => {
  return (
    <div className="p-5 rounded-md border_custom">

        <div className="flex items-center">

            <div className="w-[10rem] h-[5rem] lg:w-[15rem] lg:h-[9rem]">
                <img className="w-full h-full object-cover object-top" src="https://nguoiduatin.mediacdn.vn/thumb_w/930/media/luong-quoc-tiep/2020/11/09/han-tin-duoc-luu-danh-thien-co-khong-chi-boi-bach-chien-bach-thang.jpg" alt=""/>
            </div>

            <div className="ml-5 space-y-1">

                <p className="font-semibold">Men Slim Mid Rise Black Jeans</p>
                <p className="opacity-70">Size: L</p>
                <p className="opacity-70 mt-2">Seller: Sang Sang</p>

                <div className="flex items-center space-x-5 mt-4">
                    <p className='font-semibold'>$199</p>
                    <p className='opacity-50 line-through'>$211</p>
                    <p className='text-green-500 font-semibold'>5% off</p>
                </div>
            </div>

        </div>


        {/* button */}
        <div className="lg:flex items-center lg:space-x-10 pt-4">

            <div className="flex items-center space-x-2">
                <IconButton sx={{color: "red"}}>
                    <RemoveCircleOutlineIcon/>
                </IconButton>

                <span className="py-1 px-7 border rounded-sm">1</span>

                <IconButton sx={{color: "green"}}>
                    <AddCircleOutlineIcon/>
                </IconButton>
            </div>

            <div>
                <Button sx={{color: "red"}}>
                    Remove
                </Button>
            </div>
            
        </div>

    </div>
  )
}

export default CartItem