import PropTypes from 'prop-types';

const HomeSectionCard = ({product}) => {
    return (
        <div className="mx-2 cursor-pointer group">
            <div className="flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
                <div className="h-[13rem] w-full">
                    <img 
                        src={product.imageUrl} 
                        alt="HanTin" 
                        className="object-cover object-top w-full h-full"
                    />
                </div>

                <div className="p-4 w-full">
                    <h3 className="text-lg font-medium text-gray-900">{product.brand}</h3>
                    <p className="mt-2 text-sm text-gray-500">{product.title}</p>
                </div>
            </div>
        </div>
    );
};

HomeSectionCard.propTypes = {
    product: PropTypes.shape({
        imageUrl: PropTypes.string.isRequired,
        brand: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
};

export default HomeSectionCard;
