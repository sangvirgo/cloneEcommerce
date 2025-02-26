import AddressCard from "../Checkout/AddressCard"

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

const OrderDetail = () => {
  return (
    <div className="px-5 lg:px-20">
        {address.map((item, index) => (
            <AddressCard key={index} address={item}/>   
        ))}
    </div>
  )
}

export default OrderDetail