import { Step, StepLabel, Stepper } from "@mui/material"
import PropTypes from 'prop-types'

const steps=[
    "Placed",
    "Order Confirmed",
    "Order Shipped",
    "Out For Delivery",
    "Delivered"
]

const OrderTracker = ({activeStep}) => {
  return (
    <div className="w-full">
        <Stepper activeStep={activeStep} alternativeLabel>

            {steps.map((label, index) => (
                <Step key={index}>
                    <StepLabel sx={{color: "#9155FD", fontSize: "44px"}}>{label}</StepLabel>
                </Step>
            ))}

        </Stepper>
    </div>
  )
}

OrderTracker.propTypes= {
    activeStep: PropTypes.number.isRequired
}

export default OrderTracker