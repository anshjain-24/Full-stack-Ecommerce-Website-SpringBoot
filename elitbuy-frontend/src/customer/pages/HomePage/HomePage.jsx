import React from "react";
import MainCarousel from "../../components/HomeCarousel/MainCarousel";
import HomeSectionCarousel from "../../components/HomeSectionCarousel/HomeSectionCarousel";
// import { mens_Tshirt } from "../../../data/men/mens_Tshirt";


const HomePage = () => {

    

    return (
        <div>
            
            <MainCarousel/>

            <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
                <HomeSectionCarousel sectionName={"Men's Tshirts"} thirdLevelName={"T-shirts"}/>
                <HomeSectionCarousel sectionName={"Men's Tshirts"} thirdLevelName={"T-shirts"}/>
                <HomeSectionCarousel sectionName={"Men's Tshirts"} thirdLevelName={"T-shirts"}/>
                <HomeSectionCarousel sectionName={"Men's Tshirts"} thirdLevelName={"T-shirts"}/>
                <HomeSectionCarousel sectionName={"Men's Tshirts"} thirdLevelName={"T-shirts"}/>
                {/* <HomeSectionCarousel sectionName={"Women's Tops"} thirdLevelName={"Top"}/>
                <HomeSectionCarousel sectionName={"Unisex Shoes"} thirdLevelName={"Shoes"}/>
                <HomeSectionCarousel sectionName={"Samsung"} thirdLevelName={"Samsung"}/>
                <HomeSectionCarousel sectionName={"Watches"} thirdLevelName={"Watches"}/> */}
                
            </div>

        </div>
    )
}
export default HomePage;