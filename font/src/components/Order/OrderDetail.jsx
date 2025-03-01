import AddressCard from "../Checkout/AddressCard"
import ConfirmOrderCard from "./ConfirmOrderCard";
import OrderTracker from "./OrderTracker"

const address= [
    {
        firstName: 'John',
        lastName: 'Doe',  
        streetAddress: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        mobile: '123-456-7890',
      },
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
  seller: 'ABC Fashion',
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
  seller: 'XYZ Fashion',
  },
];

const OrderDetail = () => {
  return (
    <div className="px-5 lg:px-20">
        <div>
          {address.map((item, index) => (
              <AddressCard key={index} address={item}/>   
          ))}
        </div>


        <div className="py-20">
            <OrderTracker activeStep={3}/>
        </div>

        <div>
          {orderData.map((card, index) => (
              <ConfirmOrderCard key={index} card={card}/>   
          ))}
        </div>


    </div>
  )
}

export default OrderDetail