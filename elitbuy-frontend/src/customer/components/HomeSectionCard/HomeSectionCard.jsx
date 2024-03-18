import React from "react";
import { useNavigate } from "react-router-dom";

const HomeSectionCard = ({ product }) => {
     const navigate = useNavigate();
    return (

        <div onClick={()=> navigate(`/product/${5}`)} className='cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg 
    overflow-hidden w-[15rem] mx-3'>

            <div className='h-[13rem] w-[10rem]'>

                <img className='objet-cover object-top w-full h-full'
                    src={product.imageUrl} alt="" />
            </div>

            <div className='p-4'>

                <h3 className='m-4 text-lg font-medium text-gray-9000 items-center'> {product.brand} </h3>
                <p className='m-2 text-sm text-gray-500 items-center'>{product.title}</p>
            </div>

        </div>

    )
};
export default HomeSectionCard;