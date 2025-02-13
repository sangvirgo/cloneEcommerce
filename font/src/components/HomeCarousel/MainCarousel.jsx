import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { MainCarouselData } from './MainCarouselData';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const MainCarousel = () => {
    const items = MainCarouselData.map((item) => (
        <img 
            key={item.id} 
            className='cursor-pointer w-full object-cover' 
            src={item.image} 
            role='presentation' 
            alt=""
        />
    ));

    const renderPrevButton = ({ isDisabled }) => {
        return (
            <button 
                className={`absolute left-2 top-1/2 -translate-y-1/2 bg-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg z-10 ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100'}`}
            >
                <span className="transform rotate-180">
                    <ArrowForwardIosIcon />
                </span>
            </button>
        );
    };

    const renderNextButton = ({ isDisabled }) => {
        return (
            <button 
                className={`absolute right-2 top-1/2 -translate-y-1/2 bg-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg z-10 ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100'}`}
            >
                <ArrowForwardIosIcon />
            </button>
        );
    };

    return (
        <div className="relative">
            <AliceCarousel
                mouseTracking
                items={items}
                autoPlay
                autoPlayInterval={2000}
                infinite
                disableDotsControls
                renderNextButton={renderNextButton}
                renderPrevButton={renderPrevButton}
                // Remove disableButtonsControls to show the buttons
            />
        </div>
    );
};

export default MainCarousel;