import React from "react";
import MainCarousel from "../../components/HomeCarousel/MainCarousel";
import HomeSectionCarousel from "../../components/HomeSectionCarousel/HomeSectionCarousel";
import { mens_Tshirt } from "../../../data/men/mens_Tshirt";

const HomePage = () => {
    return (
        <div>
            
            <MainCarousel/>

            <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
                <HomeSectionCarousel data={mens_Tshirt} sectionName={"Men's Tshirts"}/>
                <HomeSectionCarousel data={mens_Tshirt} sectionName={"Men's Shoes"}/>   
                <HomeSectionCarousel data={mens_Tshirt} sectionName={"Hoodies"}/>
                <HomeSectionCarousel data={mens_Tshirt} sectionName={"Women's Saari"}/>
                <HomeSectionCarousel data={mens_Tshirt} sectionName={"Women's Dresses"}/>
                
            </div>

        </div>
    )
}
export default HomePage;