import "./ProductCard.css" 
import PropTypes from 'prop-types';

const ProductCard = ({product}) => {
  return (
    <div>
        <div className="product-card w-[15rem] m-3 transition-all cursor-pointer hover:shadow-lg">
            <div className="h-[20rem] ">
                <img className="h-full w-full object-cover object-center" src={product.imageUrl} alt="Product" />
            </div>


            <div className="textPart bg-white p-3">
                <div>
                    <h2 className="font-bold opacity-60 text-2xl">{product.brand}</h2>
                    <p>{product.title}</p>
                </div>

                <div className="flex justify-between items-center mt-3">
                    <p className="font-semibold">${product.discountedPrice}</p>
                    <p className="line-through opacity-50">${product.price}</p>
                    <p className="text-green-400 font-semibold">{product.discountPersent}% off</p>

                </div>


            </div>  
        </div>
    </div>
  )
}

ProductCard.propTypes = {
    product: PropTypes.shape({
        imageUrl: PropTypes.string.isRequired,
        brand: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        discountedPrice: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        discountPersent: PropTypes.number.isRequired,
    }).isRequired,
}

export default ProductCard