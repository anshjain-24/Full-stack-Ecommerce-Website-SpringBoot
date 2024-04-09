import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard';
import { Button } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { api } from "../../../Config/ApiConfig"

const HomeSectionCarousel = ({ sectionName, thirdLevelName }) => {
    const responsive = {
        0: { items: 1 },
        720: { items: 3 },
        1024: { items: 4.5 },
    };

    const [slideIndex, setSlideIndex] = useState(0);

    const handleOnSlideChange = (event) => {
        setSlideIndex(event.item);
    };

    const [data, setData] = useState([]); // Initialize data as an empty array

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await api.get(`product/products?colors=&sizes=&minPrice=0&maxPrice=10000&minDiscount=0&category=${thirdLevelName}&stock=null&sort=price_high&pageNumber=0&pageSize=12`);
                console.log("Product data: ", response.data);
                setData(response.data); // Set the fetched data
                // console.log("data : :  : ",response.data?.content)
            } catch (error) {
                console.error("Error fetching product data:", error);
                // Handle the error appropriately
            }
        }
       
        fetchProducts(); // Call the function to fetch products
    }, [thirdLevelName]);

    const items = data.content?.map((item, index) => (
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




