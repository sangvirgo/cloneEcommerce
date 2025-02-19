import './App.css'
import Footer from './components/Footer/Footer'
// import HomePage from './components/HomePage'
import Navigation from './components/Navigation/Navigation'
// import Product from './components/Product/Product'
import ProductDetails from './components/ProductDetails/ProductDetails'

function App() {
  return (
    <div className="">
      <Navigation />

    <div>
      {/* <HomePage /> */}
      {/* <Product /> */}
      <ProductDetails />
    </div>

    <Footer />
    </div>

  )
}

export default App
