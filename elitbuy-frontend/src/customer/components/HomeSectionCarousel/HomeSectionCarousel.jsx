import React, { useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard';
import { Button } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const HomeSectionCarousel = ({data,sectionName}) => {
    const responsive = {
        0: { items: 1 },
        720: { items: 3 },
        1024: { items: 4.5 },
    };

    const [slideIndex, setSlideIndex] = useState(0);

    const handleOnSlideChange = (event) => {
        setSlideIndex(event.item);
    };

    const items = data.map((item, index) => (
        <HomeSectionCard key={index} product={item} />
    ));

    const renderPrevButton = ({ isDisabled }) => {
        return (
            <Button
                disabled={isDisabled || slideIndex === 0}
                variant="contained"
                className="z-50"
                sx={{
                    position: 'absolute',
                    top: '8rem',
                    left: '2rem', // move button slightly to the left
                    transform: 'translateX(-50%) rotate(-90deg)',
                }}
                aria-label='prev'
            >
                <ChevronLeftIcon sx={{ transform: 'rotate(90deg)' }} />
            </Button>
        );
    };

    const renderNextButton = ({ isDisabled }) => {
        return (
            <Button
                disabled={isDisabled || slideIndex === items.length - 1}
                variant="contained"
                className="z-50"
                sx={{
                    position: 'absolute',
                    top: '8rem',
                    right: '2rem', // move button slightly to the right
                    transform: 'translateX(50%) rotate(90deg)',
                }}
                aria-label='next'
            >
                <ChevronRightIcon sx={{ transform: 'rotate(-90deg)' }} />
            </Button>
        );
    };

    return (
        <div className=''>
            {/* <h2>{sectionName}</h2> */}
            <h2 className='text-2xl font-extrabold text-gray-800 py-5'>{sectionName}</h2>
            <div className='relative p-5'>
                <AliceCarousel
                    items={items}
                    responsive={responsive}
                    disableDotsControls
                    renderPrevButton={renderPrevButton}
                    renderNextButton={renderNextButton}
                    onSlideChanged={handleOnSlideChange}
                />
            </div>
        </div>
    );
};

export default HomeSectionCarousel;
