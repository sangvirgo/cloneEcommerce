import { Grid } from "@mui/material"
import PropTypes from 'prop-types';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useNavigate } from "react-router-dom";

const OrderCard = ({card}) => {
    const naigate=useNavigate()
    const handleOrderDetail = () => {
        naigate(`/checkout/order/${5}`)
    }
  return (
    <div onClick={handleOrderDetail} className="p-5 shadow-md hover:shadow-3xl hover:shadow-black border border-gray-200 rounded-2xl mt-5">

        <Grid container spacing={2} sx={{justifyContent: "space-between"}}>

            <Grid item xs={6} >

                <div className="flex cursor-pointer flex-row items-center">
                    <img className="w-[11rem] h-[7rem] object-cover object-top" src={card.image} alt={card.alt}/>
                    
                    <div className="ml-5 space-y-2">
                        <p className="text-2xl">{card.name}</p>
                        <p className="opacity-50 text-[18px] font-sans">Size: {card.size}</p>
                        <p className="opacity-50 text-[18px] font-sans">Color: {card.color}</p>
                    </div>

                </div>
            </Grid>

            <Grid item xs={2} sx={{display: 'flex', flexDirection:'column', justifyContent: 'center'}} >
                <p className="text-xl">{card.price}</p>
            </Grid>


            <Grid item xs={4} sx={{display: 'flex', flexDirection:'column', justifyContent: 'center'}}>
                {card.isDelivered ? (
                    <p>
                    <LocalShippingIcon sx={{width:"25px", height:"25px"}} className="text-green-500 mr-2"/>
                    <span className="">Delivered on {card.date}</span>
                    </p>
                ) : (
                    <p>
                    <LocalShippingIcon sx={{width:"25px", height:"25px"}} className="text-red-500 mr-2"/>
                    <span className="">Expected Delivery on {card.date}</span>
                    </p>
                )}
                <p className="text-xs text-gray-500">Your item has been delivery</p>
            </Grid>

        </Grid>
        
    </div>
  )
}

OrderCard.propTypes= {
    card: PropTypes.shape({
        image: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        size: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        isDelivered: PropTypes.bool.isRequired,
    })
}

export default OrderCard