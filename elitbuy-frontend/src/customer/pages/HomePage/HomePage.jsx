import React, { useState, useEffect } from "react";
import MainCarousel from "../../components/HomeCarousel/MainCarousel";
import HomeSectionCarousel from "../../components/HomeSectionCarousel/HomeSectionCarousel";
import Lottie from 'lottie-react'; // Import Lottie component
import { CloseButton } from '@chakra-ui/react'
import '../../ChatBot/styleChatBot.css'
import chatbot from '../../ChatBot/chatbot.json'
import logo from '../../../../src/data/Images/EBLogo.png'
import EBLogo from '../../../../src/data/Images/EBLogo.png'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from "../../../State/Auth/Action";

const HomePage = () => {
    const [showChatbot, setShowChatbot] = useState(false);
    const [displayChatbot, setDisplayChatbot] = useState(false);
    const [displayImageAndText, setDisplayImageAndText] = useState(false);

    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { auth } = useSelector(store => store)

    useEffect(() => {
        if (jwt) {
          dispatch(getUser(jwt))
        }
      }, [jwt, auth.jwt])
    
    
      useEffect(() => {
        if (auth.user) {
          console.log("got user data his is is, : ",auth.user?.fname);
          fetchRecommendations(auth.user?.id); 
        }
      }, [auth.user])

    useEffect(() => {
        const timer = setTimeout(() => {
            setDisplayChatbot(true);
        }, 10); // 2 seconds delay

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (showChatbot) {
            const timer = setTimeout(() => {
                setDisplayImageAndText(true);
            }, 700); // 2 seconds delay

            return () => clearTimeout(timer);
        } else {
            // Reset displayImageAndText state when chatbot is closed
            setDisplayImageAndText(false);
        }
    }, [showChatbot]);

    const [categoryNames, setCategoryNames] = useState([]);

    useEffect(() => {
        // Fetch data from the API endpoint
        fetch("http://localhost:5000/api/trending_categories")
            .then(response => response.json())
            .then(data => {
                // Extract category names from the API response
                const names = data.map(item => item.name);
                setCategoryNames(names);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);


    const [recommendedCategories, setRecommendedCategories] = useState([]);

     // Function to fetch recommendations for the logged-in user
     const fetchRecommendations = (userId) => {
        // Fetch data from the API endpoint
        fetch(`http://localhost:5000/recommendations/${userId}`)
            .then(response => response.json())
            .then(data => {
                // Update state with the received data
                setRecommendedCategories(data);
            })
            .catch(error => {
                console.error('Error fetching recommendations:', error);
            });
    };


    return (
        <div>
            <MainCarousel />
            <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
                {/* Render HomeSectionCarousel components for recommended categories */}
                {recommendedCategories.map(name => (
                    <HomeSectionCarousel sectionName={"For You"} thirdLevelName={name} />
                ))}
            </div>
            <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
                {/* Render HomeSectionCarousel components dynamically */}
                {categoryNames.map(name => (
                    <HomeSectionCarousel sectionName={"Currently Trending"} thirdLevelName={name} />
                ))}
            </div>

            <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
                <HomeSectionCarousel sectionName={"Women's Tops"} thirdLevelName={"Top"} />
                <HomeSectionCarousel sectionName={"Iphones"} thirdLevelName={"Iphone"} />
                <HomeSectionCarousel sectionName={"Men's Tshirts"} thirdLevelName={"T-shirts"} />
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
                    displayChatbot && (
                        <div style={{ position: "relative", zIndex: "10001" }}>
                            <CloseButton
                                size='md'
                                id="chatbot-button-2"
                                onClick={() => setShowChatbot(false)}
                                style={{
                                    position: "fixed",
                                    bottom: "380px",
                                    right: "10px",
                                    padding: "10px 20px",
                                    paddingLeft: "5px",
                                    cursor: "pointer",
                                    width: "5%",
                                    color: "white",
                                    zIndex: "10000", // Ensure the CloseButton is above other elements
                                }}
                            />

                            {displayImageAndText && (
                                <>
                                    <div style={{ position: "fixed", zIndex: "10002", bottom: "418px", right: "310px", backgroundColor: "#2A3045", color: "#2A3045" }}>
                                        <div>
                                            <img className="h-2 w-2" src={EBLogo} alt="logo" style={{ position: "fixed", zIndex: "10003", width: "50px", height: "auto" }} />
                                        </div>
                                    </div>
                                    <div style={{ position: "fixed", zIndex: "10002", bottom: "320px", right: "26px", backgroundColor: "white", fontSize: "23px", color: "white" }}>
                                        elitebuy............................................
                                    </div>
                                </>
                            )}

                            <iframe
                                width="300"
                                height="430"
                                allow="microphone;"
                                src="https://console.dialogflow.com/api-client/demo/embedded/b1eedbf0-4bc0-4575-bc5e-919fb4d2fe27"
                                style={{
                                    position: "fixed",
                                    marginTop: "5rem",
                                    bottom: "2px",
                                    right: "26px",
                                    cursor: "pointer",
                                    zIndex: "9999", // Ensure the iframe is above other elements
                                }}
                            ></iframe>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

export default HomePage;
