import { Grid } from "@mui/material"
import OrderCard from './OrderCard'

const orderStatus= [
    {lable:"On the way", value: "on-the-way"},
    {lable:"Delivered", value: "delivered"},
    {lable:"Cancelled", value: "cancelled"},
    {lable:"Return", value: "return"},
]

const orderData = [
    {
    image: 'https://danviet.mediacdn.vn/296231569849192448/2022/12/5/5-nhan-vat-khien-tu-ma-y-khiep-so-nhat-gia-cat-luong-chi-xep-thu-ba-tu-ma-y-1636948054-794-width800height419-1670241421327-1670241422612519516265.jpg',
    alt: 'Men’s Casual Shirt',
    name: 'Men’s Casual Shirt',
    size: 'M',
    color: 'Blue',
    price: '$15.99',
    date: '12/12/2024',
    isDelivered: true,
    },
    {
    image: 'https://danviet.mediacdn.vn/296231569849192448/2022/12/5/5-nhan-vat-khien-tu-ma-y-khiep-so-nhat-gia-cat-luong-chi-xep-thu-ba-tu-ma-y-1636948054-794-width800height419-1670241421327-1670241422612519516265.jpg',
    alt: 'Women’s Dress',
    name: 'Women’s Dress',
    size: 'S',
    color: 'Red',
    price: '$25.99',
    date: '12/1/2025',
    isDelivered: false,
    },
    {
    image: 'https://danviet.mediacdn.vn/296231569849192448/2022/12/5/5-nhan-vat-khien-tu-ma-y-khiep-so-nhat-gia-cat-luong-chi-xep-thu-ba-tu-ma-y-1636948054-794-width800height419-1670241421327-1670241422612519516265.jpg',
    alt: 'Women’s Dress',
    name: 'Women’s Dress',
    size: 'S',
    color: 'Red',
    price: '$25.99',
    date: '12/1/2025',
    isDelivered: false,
    },
    {
    image: 'https://danviet.mediacdn.vn/296231569849192448/2022/12/5/5-nhan-vat-khien-tu-ma-y-khiep-so-nhat-gia-cat-luong-chi-xep-thu-ba-tu-ma-y-1636948054-794-width800height419-1670241421327-1670241422612519516265.jpg',
    alt: 'Men’s Casual Shirt',
    name: 'Men’s Casual Shirt',
    size: 'M',
    color: 'Blue',
    price: '$15.99',
    date: '12/12/2024',
    isDelivered: true,
    },
  ];

const Order = () => {
  return (
    <div className="lg:px-20 px-5">
        <Grid container sx={{justifyContent: "space-between"}}>

            <Grid item xs={2.5} >
                <div className="h-auto shadow-2xl rounded-2xl bg-white p-5 sticky top-5">

                    <h1 className="font-semibold text-lg">Filter</h1>

                    <div className="space-y-4 mt-10">
                        <h1 className="font-semibold">ORDER STATUS</h1>

                        {orderStatus.map((status, index) => (
                            <div key={index} className="flex items-center">
                                <input type="checkbox" name={status.value} id={status.value} />
                                <label htmlFor={status.value} className="ml-2">{status.lable}</label>
                            </div>
                        ))}
                    </div>

                </div>
            </Grid>

            {/* item of filter */}
            <Grid item xs={9} >
                <div className="space-y-5">
                    {orderData.map((card, index) => (
                        <OrderCard key={index} card={card} />
                    ))}
                </div>
            </Grid>

        </Grid>
    </div>
  )
}

export default Order