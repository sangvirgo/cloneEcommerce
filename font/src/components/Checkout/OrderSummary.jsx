import AddressCard from "./AddressCard"
import Cart from "../Cart/Cart"

const OrderSummary = () => {
  const address= [{
    firstName: "John",
    lastName: "Doe",
    streetAddress: "123 Main St", 
    city: "New York",
    state: "NY",
    zipCode: "10001",
    mobile: "123-456-7890",
  }]

  return (
    <div>
      {address.map((item, index) => (
        <AddressCard key={index} address={item} />
      ))}

      <Cart/>
    </div>
  )
}

export default OrderSummary