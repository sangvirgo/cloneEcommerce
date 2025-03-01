import { Box, Grid } from "@mui/material"
import PropTypes from 'prop-types';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { deepPurple } from "@mui/material/colors";

const ConfirmOrderCard = ({card}) => {
  return (
    <div className="p-5 shadow-md hover:shadow-3xl hover:shadow-black border border-gray-200 rounded-2xl mt-5">

        <Grid container spacing={2} sx={{justifyContent: "space-between"}}>

            <Grid item xs={6} >

                <div className="flex cursor-pointer flex-row items-center">
                    <img className="w-[11rem] h-[7rem]  object object-top" src={card.image} alt={card.alt}/>
                    
                    <div className="ml-5 space-y-2">
                        <p className="text-2xl">{card.name}</p>
                        <div className="flex space-x-5">
                            <p className="opacity-50 text-[18px] font-sans">Size: {card.size}</p>
                            <p className="opacity-50 text-[18px] font-sans">Color: {card.color}</p>
                        </div>
                        <p className="opacity-50 text-[18px] font-sans">Seller: {card.seller}</p>
                        <p className="text-[20px] font-semibold">{card.price}</p>
                    </div>

                </div>
            </Grid>



            <Grid item xs={2} sx={{display: "flex", flexDirection: "column", justifyContent: "center", fontSize: "18px"}}>
                <Box className="flex flex-row items-center cursor-pointer" sx={{color: deepPurple[500]}}>
                    <StarBorderIcon sx={{width:"25px", height:"25px"}} className=" mr-2"/>
                    <p className="">Rate & Reviews Product</p>
                </Box>
            </Grid>

        </Grid>
        
    </div>
  )
}

ConfirmOrderCard.propTypes= {
    card: PropTypes.shape({
        image: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        size: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        isDelivered: PropTypes.bool.isRequired,
        seller: PropTypes.string.isRequired
    })
}

export default ConfirmOrderCard