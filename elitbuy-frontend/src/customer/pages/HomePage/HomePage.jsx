import React, { useState } from "react";
import MainCarousel from "../../components/HomeCarousel/MainCarousel";
import HomeSectionCarousel from "../../components/HomeSectionCarousel/HomeSectionCarousel";
import Lottie from 'lottie-react'; // Import Lottie component
import { CloseButton } from '@chakra-ui/react'
import '../../ChatBot/styleChatBot.css'
import chatbot from '../../ChatBot/chatbot.json'

// import { mens_Tshirt } from "../../../data/men/mens_Tshirt";


const HomePage = () => {

    const [showChatbot, setShowChatbot] = useState(false);

    return (
        <div>

            <MainCarousel />

            <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
                <HomeSectionCarousel sectionName={"Men's Tshirts"} thirdLevelName={"T-shirts"} />
                <HomeSectionCarousel sectionName={"Women's Tops"} thirdLevelName={"Top"} />
                <HomeSectionCarousel sectionName={"Iphones"} thirdLevelName={"Iphone"} />
                <HomeSectionCarousel sectionName={"Men's Tshirts"} thirdLevelName={"T-shirts"} />
                <HomeSectionCarousel sectionName={"Men's Tshirts"} thirdLevelName={"T-shirts"} />
                {/* <HomeSectionCarousel sectionName={"Women's Tops"} thirdLevelName={"Top"}/>
                <HomeSectionCarousel sectionName={"Unisex Shoes"} thirdLevelName={"Shoes"}/>
                <HomeSectionCarousel sectionName={"Samsung"} thirdLevelName={"Samsung"}/>
                <HomeSectionCarousel sectionName={"Watches"} thirdLevelName={"Watches"}/> */}

            </div>

            <div>
                {!showChatbot ? (
                    <button
                        className="chatbot-btn"
                        onClick={() => {
                            setShowChatbot(true);
                            console.log("showChatbot value : ", showChatbot);
                        }}
                        style={{
                            position: "fixed",
                            bottom: "1px",
                            right: "1px",
                            padding: "10px 20px",
                            cursor: "pointer",
                            width: "10%",
                            zIndex: "9999", // Ensure the button is above other elements
                        }}
                    >
                        <Lottie
                            id="chatbot-button"
                            animationData={chatbot}
                        />
                    </button>
                ) : (
                    <div>
                        <CloseButton
                            size='md'
                            id="chatbot-button-2"
                            onClick={() => setShowChatbot(false)}
                            style={{
                                position: "fixed",
                                bottom: "380px",
                                right: "10px",
                                padding: "10px 20px",
                                paddingLeft:"5px",
                                cursor: "pointer",
                                width: "5%",
                                color: "white",
                                zIndex: "10000", // Ensure the CloseButton is above other elements
                            }}
                        />
                        <div className="">
                            
                        </div>
                        <iframe
                    
                            width="300"
                            height="430"
                            allow="microphone;"
                            src="https://console.dialogflow.com/api-client/demo/embedded/b1eedbf0-4bc0-4575-bc5e-919fb4d2fe27"
                            style={{
                                position: "fixed",
                                marginTop : "5rem",
                                bottom: "2px",
                                right: "26px",
                                cursor: "pointer",
                                zIndex: "9999", // Ensure the iframe is above other elements
                            }}

                        ></iframe>
                    </div>
                )}
            </div>




        </div>
    )
}
export default HomePage;