import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { MainCaraouselData } from './MainCarouselData';


const MainCarousel = () => {
   
    const items = MainCaraouselData.map((item)=> <img className='cursor-pointer' role='presentation' 
    src = {item.image} height={5400} alt="" />)
    
    
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