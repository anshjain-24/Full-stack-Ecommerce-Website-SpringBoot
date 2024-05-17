import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { MainCaraouselData } from './MainCarouselData';
import { Link } from 'react-router-dom'; 


const MainCarousel = () => {
   
    const items = MainCaraouselData.map((item, index) => (
        <Link to={item.path} key={index}> {/* Wrap each image in Link component */}
            <img className='cursor-pointer' role='presentation' src={item.image} height={540} alt="" /> {/* Adjusted height */}
        </Link>
    ));
    
    
   return( <AliceCarousel
        items={items}
        disableButtonsControls
        autoPlay
        autoPlayInterval={1000}
        infinite
        className="z-0" // Add this line to set z-index to a lower value
    />
   )
};
export default MainCarousel;