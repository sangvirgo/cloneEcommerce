import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const HomeSectionCarousel = () => {
    const responsive = {
        0: { items: 1 },
        720: { items: 3 },
        1024: { items: 5.5 },
    };

    const items = [1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => <HomeSectionCard key={index} />);

    const renderPrevButton = ({ isDisabled }) => {
        return (
            <button 
                className={`absolute left-0 top-1/2 -translate-y-1/2 bg-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg z-10 ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100'}`}
            >
                <span className="transform rotate-180"><ArrowForwardIosIcon/></span>
            </button>
        );
    };

    const renderNextButton = ({ isDisabled }) => {
        return (
            <button 
                className={`absolute right-0 top-1/2 -translate-y-1/2 bg-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg z-10 ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100'}`}
            >
                <ArrowForwardIosIcon/>
            </button>
        );
    };

    return (
        <div className="relative px-4 sm:px-8 py-5 border border-black">
            <AliceCarousel
                mouseTracking
                items={items}
                responsive={responsive}
                controlsStrategy="alternate"
                renderPrevButton={renderPrevButton}
                renderNextButton={renderNextButton}
                disableDotsControls
            />
        </div>
    );
};

export default HomeSectionCarousel;