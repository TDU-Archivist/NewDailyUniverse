import React, { useEffect, useState } from 'react'
import "../CSS/adminPanel.css";
import { MainDataLoad } from './MainDataContext';
import WeeklyBarGraph from './WeeklyBarGraph';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { 
    FaTimes,
    FaListAlt 

} from "react-icons/fa";

const AdminPanel = () => {
    const { 
        webLoader,
        userLoggedIn,
        StoredUserID,
        StoredUserDataJSON,
        fetchAllArticles,
        viewAllArticles,
        dataList,
    } = MainDataLoad(); 

    const weeklyData = [
        { week: 'Week 1', value: 0 },
        { week: 'Week 2', value: 0 },
        { week: 'Week 3', value: 0 },
        { week: 'Week 4', value: 0 },
    ];

    // Dashboard Section Change

    const [viewMainDashboard, setViewMainDashboard] = useState(true);
    const [viewMainUsers, setViewMainUsers] = useState(false);
    const [viewMainAds, setViewMainAds] = useState(false);
    const [viewMainPolls, setViewMainPolls] = useState(false);
    const [viewMainProducts, setViewMainProducts] = useState(false);
    const [viewMainMap, setViewMainMap] = useState(false);


    const handleViewMainDashboard = () => {
        setViewMainDashboard(true);
        setViewMainUsers(false);
        setViewMainAds(false);
        setViewMainPolls(false);
        setViewMainProducts(false);
        setViewMainMap(false);
    }


    const handleViewMainMap = () => {
        setViewMainDashboard(false);
        setViewMainUsers(false);
        setViewMainAds(false);
        setViewMainPolls(false);
        setViewMainProducts(false);
        setViewMainMap(true);
    }


    // Main Section Panel

    const [viewFullDashboardSec, setViewFullDashboardSec] = useState(true);
    const [viewAddArticleSec, setViewAddArticleSec] = useState(false);
    const [viewAddMovieReviewSec, setViewAddMovieReviewSec] = useState(false);
    const [viewAddTouristSpotSec, setViewAddTouristSpotSec] = useState(false);


    const [viewAddAirlineSec, setViewAddAirlineSec] = useState(false);
    const [viewAddAirportSec, setViewAddAirportSec] = useState(false);
    const [viewAddTelecastSec, setViewAddTelecastSec] = useState(false);
    const [viewAddMagazineSec, setViewAddMagazineSec] = useState(false);
    const [viewAddNewspaperSec, setViewAddNewspaperSec] = useState(false);
    const [viewAddRestaurantSec, setViewAddRestaurantSec] = useState(false);



    const handleViewFullDashboardSection = () => {
        setViewFullDashboardSec(true);
        setViewAddArticleSec(false);
        setViewAddMovieReviewSec(false);
        setViewAddTouristSpotSec(false);
        setViewAddAirlineSec(false);
        setViewAddAirportSec(false);
        setViewAddTelecastSec(false);
        setViewAddMagazineSec(false);
        setViewAddNewspaperSec(false);
        setViewAddRestaurantSec(false);
    }
    const handleViewAddArticleSection = () => {
        setViewFullDashboardSec(false);
        setViewAddArticleSec(true);
        setViewAddMovieReviewSec(false);
        setViewAddTouristSpotSec(false);
        setViewAddAirlineSec(false);
        setViewAddAirportSec(false);
        setViewAddTelecastSec(false);
        setViewAddMagazineSec(false);
        setViewAddNewspaperSec(false);
        setViewAddRestaurantSec(false);
    }
    const handleViewMovieReviewSection = () => {
        setViewFullDashboardSec(false);
        setViewAddArticleSec(false);
        setViewAddMovieReviewSec(true);
        setViewAddTouristSpotSec(false);
        setViewAddAirlineSec(false);
        setViewAddAirportSec(false);
        setViewAddTelecastSec(false);
        setViewAddMagazineSec(false);
        setViewAddNewspaperSec(false);
        setViewAddRestaurantSec(false);
    }
    const handleViewTouristSpotSection = () => {
        setViewFullDashboardSec(false);
        setViewAddArticleSec(false);
        setViewAddMovieReviewSec(false);
        setViewAddTouristSpotSec(true);
        setViewAddAirlineSec(false);
        setViewAddAirportSec(false);
        setViewAddTelecastSec(false);
        setViewAddMagazineSec(false);
        setViewAddNewspaperSec(false);
        setViewAddRestaurantSec(false);
    }


    const handleViewAirlineSection = () => {
        setViewFullDashboardSec(false);
        setViewAddArticleSec(false);
        setViewAddMovieReviewSec(false);
        setViewAddTouristSpotSec(false);
        setViewAddAirlineSec(true);
        setViewAddAirportSec(false);
        setViewAddTelecastSec(false);
        setViewAddMagazineSec(false);
        setViewAddNewspaperSec(false);
        setViewAddRestaurantSec(false);
    }
    const handleViewAirportSection = () => {
        setViewFullDashboardSec(false);
        setViewAddArticleSec(false);
        setViewAddMovieReviewSec(false);
        setViewAddTouristSpotSec(false);
        setViewAddAirlineSec(false);
        setViewAddAirportSec(true);
        setViewAddTelecastSec(false);
        setViewAddMagazineSec(false);
        setViewAddNewspaperSec(false);
        setViewAddRestaurantSec(false);
    }
    const handleViewTelecastSection = () => {
        setViewFullDashboardSec(false);
        setViewAddArticleSec(false);
        setViewAddMovieReviewSec(false);
        setViewAddTouristSpotSec(false);
        setViewAddAirlineSec(false);
        setViewAddAirportSec(false);
        setViewAddTelecastSec(true);
        setViewAddMagazineSec(false);
        setViewAddNewspaperSec(false);
        setViewAddRestaurantSec(false);
    }
    const handleViewMagazineSection = () => {
        setViewFullDashboardSec(false);
        setViewAddArticleSec(false);
        setViewAddMovieReviewSec(false);
        setViewAddTouristSpotSec(false);
        setViewAddAirlineSec(false);
        setViewAddAirportSec(false);
        setViewAddTelecastSec(false);
        setViewAddMagazineSec(true);
        setViewAddNewspaperSec(false);
        setViewAddRestaurantSec(false);
    }
    const handleViewNewspaperSection = () => {
        setViewFullDashboardSec(false);
        setViewAddArticleSec(false);
        setViewAddMovieReviewSec(false);
        setViewAddTouristSpotSec(false);
        setViewAddAirlineSec(false);
        setViewAddAirportSec(false);
        setViewAddTelecastSec(false);
        setViewAddMagazineSec(false);
        setViewAddNewspaperSec(true);
        setViewAddRestaurantSec(false);
    }
    const handleViewRestaurantSection = () => {
        setViewFullDashboardSec(false);
        setViewAddArticleSec(false);
        setViewAddMovieReviewSec(false);
        setViewAddTouristSpotSec(false);
        setViewAddAirlineSec(false);
        setViewAddAirportSec(false);
        setViewAddTelecastSec(false);
        setViewAddMagazineSec(false);
        setViewAddNewspaperSec(false);
        setViewAddRestaurantSec(true);
    }


    // Add Map Details Setup

    const [countryList, setCountryList] = useState([]);
    const [searchTermCountry, setSearchTermCountry] = useState("");
    const [suggestionsCountries, setSuggestionsCountries] = useState([]);
    const [suggestionsCountriesSelection, setSuggestionsCountriesSelection] = useState(false);

    const fetchSearchCountries = async () => {
        try {
          const response = await fetch("https://restcountries.com/v3.1/all");
          const data = await response.json();
          const countryNames = data.map((country) => country.name.common);
          setCountryList(countryNames);
        } catch (error) {
          console.error("Error fetching countries:", error);
        }
    };
    const handleInputSearchCountry = (e) => {
        const value = e.target.value;
        setSearchTermCountry(value);
        setSuggestionsCountriesSelection(true);
    
        if (value) {
          const filtered = countryList.filter((country) =>
            country.toLowerCase().startsWith(value.toLowerCase())
          );
          setSuggestionsCountries(filtered.slice(0, 10)); // Limit suggestions to 10
        } else {
          setSuggestionsCountries([]);
        }
    };
    const handleSuggestionCountry = (suggestion) => {
        setSearchTermCountry(suggestion);
        setSuggestionsCountries([]);
        setSuggestionsCountriesSelection(false);
    };
    useEffect(() => {
        fetchSearchCountries();
    }, []);

    const [capitalLoader, setCapitaLoader] = useState(false);
    const [capitalResponse, setCapitaResponse] = useState('');
    const [addCapitalContinent, setAddCapitalContinent] = useState('');
    const [addCapitalState, setAddCapitalState] = useState('');
    const [addCapitalName, setAddCapitalName] = useState('');
    const [addCapitalLatitude, setAddCapitalLatitude] = useState('');
    const [addCapitalLongitude, setAddCapitalLongitude] = useState('');
    const [addCapitalImage1, setAddCapitalImage1] = useState('');
    const [addCapitalImage2, setAddCapitalImage2] = useState('');
    const [addCapitalImage3, setAddCapitalImage3] = useState('');
    
    const tduAddCapitalAPI = process.env.REACT_APP_TDU_ADD_CAPITAL_API;


    const addCountryCapital = async () => {
        setCapitaLoader(true);
        if(!addCapitalName || !addCapitalLatitude || !addCapitalLongitude){
            setCapitaLoader(false);
            setArticleResponse('Please fill up all fields')
            return;
        }

        const fullHash = CryptoJS.SHA256(`${addArticleTitle}, ${addArticleWritter}, ${addArticleContent}, ${new Date()}`).toString(CryptoJS.enc.Hex);
        const shortHash = fullHash.substring(0, 5);

        const cleanSymbols = addArticleTitle.replace(/[^a-zA-Z0-9 ]/g, '');
        const articleCanonical = cleanSymbols.replace(/\s+/g, '-');

        const formAddCountryCapital = {
            tdu_code: `TDU_Capital${shortHash}`,
            tdu_continent: addCapitalContinent,
            tdu_country: searchTermCountry,
            tdu_state: addCapitalState,
            tdu_name: addCapitalName,
            tdu_latitude: addCapitalLatitude,
            tdu_longitude: addCapitalLongitude,
            tdu_image1: addCapitalImage1,
            tdu_image2: addCapitalImage2,
            tdu_image3: addCapitalImage3
        };


        try {
            const submitArticleResponse = await axios.post(tduAddCapitalAPI, formAddCountryCapital);
            const responseMessage = submitArticleResponse.data;
    
            if (responseMessage.success === 'true') {
                setCapitaLoader(false)
                setCapitaResponse(responseMessage.message);
                setSearchTermCountry('');
                setAddCapitalName('');
                setAddCapitalState('');
                setAddCapitalLatitude('');
                setAddCapitalLongitude();
                setAddCapitalImage1('');
                setAddCapitalImage2('');
                setAddCapitalImage3();

                const timeoutId = setTimeout(() => {
                    setCapitaResponse('');
                }, 3000);
                return () => clearTimeout(timeoutId);
            } 
            
            if (responseMessage.success === 'false') {
                setCapitaLoader(false)
                setCapitaResponse(responseMessage.message);
                setSearchTermCountry('');
                setAddCapitalName('');
                setAddCapitalState('');
                setAddCapitalLatitude('');
                setAddCapitalLongitude();
                setAddCapitalImage1('');
                setAddCapitalImage2('');
                setAddCapitalImage3();

                const timeoutId = setTimeout(() => {
                    setCapitaResponse('');
                }, 3000);
                return () => clearTimeout(timeoutId);
            }
    
        } catch (error) {
            console.error(error);
            setCapitaLoader(false);
        } finally {
            setCapitaLoader(false);
        }
    };

    // Add news article setup

    const [addArticleCountry, setAddArticleCountry] = useState('');
    const [addArticleType, setAddArticleType] = useState('');
    const [addArticleTitle, setAddArticleTitle] = useState('');
    const [addArticleSubTitle, setAddArticleSubtitle] = useState('');
    const [addArticleWritter, setAddArticleWritter] = useState('');
    const [addArticleImage, setAddArticleImage] = useState('');
    const [addArticleCopyright, setAddArticleCopyright] = useState('');
    const [addArticleContent, setAddArticleContent] = useState('');
    const [articleLoader, setArticleLoader] = useState(false);
    const [articleResponse, setArticleResponse] = useState('')

    const tduPublishArticleAPI = process.env.REACT_APP_TDU_ADD_ARTICLE_API;

    const handleUploadArticleImg = (event) => {
        const file = event.target.files[0];
        if (file) {
            setAddArticleImage(file?.name);
        }
    };

    const publishNewsArticle = async () => {
        setArticleLoader(true);
    
        if (!addArticleTitle || !addArticleWritter || !addArticleContent) {
            setArticleLoader(false);
            setArticleResponse('Please fill up all fields');
            return;
        }
    
        const fullHash = CryptoJS.SHA256(`${addArticleTitle}, ${addArticleWritter}, ${addArticleContent}, ${new Date()}`).toString(CryptoJS.enc.Hex);
        const shortHash = fullHash.substring(0, 20);
    
        const cleanSymbols = addArticleTitle.replace(/[^a-zA-Z0-9 ]/g, '');
        const articleCanonical = cleanSymbols.replace(/\s+/g, '-');
    
        const formPublishNewsArticle = {
            tdu_code: `TDU_Article${shortHash}`,
            tdu_country: addArticleCountry,
            tdu_type: addArticleType,
            tdu_canonical: articleCanonical,
            tdu_title: addArticleTitle,
            tdu_subtitle: addArticleSubTitle,
            tdu_writer: addArticleWritter,
            tdu_image: addArticleImage,
            tdu_copyright: addArticleCopyright,
            tdu_content: addArticleContent
        };
    
        try {
            const submitArticleResponse = await axios.post(tduPublishArticleAPI, formPublishNewsArticle);
            const responseMessage = submitArticleResponse.data;
    
            setArticleResponse(responseMessage.message);
    
            if (responseMessage.success === 'true') {
                setAddArticleTitle('');
                setAddArticleSubtitle('');
                setAddArticleImage('');
                setAddArticleContent('');
                fetchAllArticles();
            }
    
            setTimeout(() => {
                setArticleLoader(false);
                setArticleResponse('');
            }, 3000);
    
        } catch (error) {
            console.error(error);
            setArticleResponse('An error occurred while publishing the article.');
        } finally {
            setArticleLoader(false); // Ensures loader is turned off in all cases
        }
    };
    


    
    const tduAddAirlineAPI = process.env.REACT_APP_TDU_ADD_AIRLINE_API;
    const tduAddAirportAPI = process.env.REACT_APP_TDU_ADD_AIRPORT_API;
    const tduAddLiveChannelAPI = process.env.REACT_APP_TDU_ADD_LIVECHANNEL_API;
    const tduAddYoutubeAPI = process.env.REACT_APP_TDU_ADD_YOUTUBECHANNEL_API;
    const tduAddMagazineAPI = process.env.REACT_APP_TDU_ADD_MAGAZINE_API;
    const tduAddNewspaperAPI = process.env.REACT_APP_TDU_ADD_NEWSPAPER_API;
    const tduAddRestaurantAPI = process.env.REACT_APP_TDU_ADD_RESTAURANT_API;


    const [addAirlineContinent, setAddAirlineContinent] = useState('');
    const [addAirlineSubContinent, setAddAirlineSubContinent] = useState('');
    const [addAirlineCountry, setAddAirlineCountry] = useState('');
    const [addAirlineRegion, setAddAirlineRegion] = useState('');
    const [addAirlineState, setAddAirlineState] = useState('');
    const [addAirlineName, setAddAirlineName] = useState('');
    const [addAirlineLink, setAddAirlineLink] = useState('');
    const [addAirlineLogoLink, setAddAirlineLogoLink] = useState('');
    const [addAirlineImageLink, setAddAirlineImageLink] = useState('');
    const [addAirlineDescription, setAddAirlineDescription] = useState('');
    const [addAirlineLoader, setAddAirlineLoader] = useState(false);
    const [addAirlineResponse, setAddAirlineResponse] = useState('');

    const [addAirportContinent, setAddAirportContinent] = useState('');
    const [addAirportSubContinent, setAddAirportSubContinent] = useState('');
    const [addAirportCountry, setAddAirportCountry] = useState('');
    const [addAirportRegion, setAddAirportRegion] = useState('');
    const [addAirportState, setAddAirportState] = useState('');
    const [addAirportName, setAddAirportName] = useState('');
    const [addAirportLink, setAddAirportLink] = useState('');
    const [addAirportLogoLink, setAddAirportLogoLink] = useState('');
    const [addAirportIATALink, setAddAirportIATALink] = useState('');
    const [addAirportDescription, setAddAirportDescription] = useState('');
    const [addAirportLoader, setAddAirportLoader] = useState(false);
    const [addAirportResponse, setAddAirportResponse] = useState('');


    let imageContent = ''
    if ((addAirlineContinent || addAirportContinent) === 'America') {
        imageContent = require('../assets/imgs/Airlines/AmericanAirlines.png');
    }
    if ((addAirlineContinent || addAirportContinent) === 'Europe') {
        imageContent =  require('../assets/imgs/Airlines/EuropeanAirlines.png');
    } 
    if ((addAirlineContinent || addAirportContinent) === 'Africa') {
        imageContent =  require('../assets/imgs/Airlines/AfricanAirlines.png');
    } 
    if ((addAirlineContinent || addAirportContinent) === 'Asia') {
        imageContent =  require('../assets/imgs/Airlines/AsianAirlines.png');
    }
    if ((addAirlineContinent || addAirportContinent) === 'Oceania') {
        imageContent =  require('../assets/imgs/Airlines/OceanianAirlines.png');
    }
    if ((addAirlineContinent || addAirportContinent) === 'Antarctica') {
        imageContent =  require('../assets/imgs/Airlines/AntarticaAirlines.png');
    }


    const publishAirlineData = async () => {
        setAddAirlineLoader(true);

        if(!addAirlineName || !addAirlineLink || !addAirlineDescription){
            setAddAirlineLoader(false);
            setAddAirlineResponse('Please fill up all fields')
            return;
        }

        const formPublishAirline = {
            continent: addAirlineContinent,
            subcontinent: `${addAirlineSubContinent} ${addAirlineContinent}`,
            country: addAirlineCountry,
            region: addAirlineRegion,
            city: addAirlineState,
            airline_name: addAirlineName,
            airline_website: addAirlineLink,
            airline_logo: addAirlineLogoLink,
            airline_image: addAirlineImageLink,
            airline_description: addAirlineDescription,
        };

        try {
            const submitAirlineResponse = await axios.post(tduAddAirlineAPI, formPublishAirline);
            const responseMessage = submitAirlineResponse.data;
    
            if (responseMessage.success === true) {
                setAddAirlineLoader(false)
                setAddAirlineResponse(responseMessage.message);
                setAddAirlineContinent('');
                setAddAirlineSubContinent('');
                setAddAirlineCountry('');
                setAddAirlineRegion('');
                setAddAirlineState('');
                setAddAirlineName('');
                setAddAirlineLink('');
                setAddAirlineLogoLink('');
                setAddAirlineImageLink('');
                setAddAirlineDescription('');
                dataList?.fetchAllDataList();

                const timeoutId = setTimeout(() => {
                    setAddAirlineResponse('');
                }, 3000);
                return () => clearTimeout(timeoutId);
            } 
            
            if (responseMessage.success === false) {
                setAddAirlineLoader(false)
                setAddAirlineResponse(responseMessage.message);

                const timeoutId = setTimeout(() => {
                    setAddAirlineResponse('');
                }, 3000);
                return () => clearTimeout(timeoutId);
            }
    
        } catch (error) {
            console.error(error);
        }
    };
    const publishAirportData = async () => {
        setAddAirportLoader(true);

        if(!addAirportName || !addAirportLink || !addAirportIATALink){
            setAddAirportLoader(false);
            setAddAirportResponse('Please fill up all fields')
            return;
        }

        const formPublishAirport = {
            continent: addAirportContinent,
            subcontinent: `${addAirportSubContinent} ${addAirportContinent}`,
            country: addAirportCountry,
            region: addAirportRegion,
            city: addAirportState,
            airport_name: addAirportName,
            airport_website: addAirportLink,
            airport_iata: addAirportIATALink,
            airport_logo: addAirportLogoLink,
            airport_description: addAirlineDescription,
        };

        try {
            const submitAirportResponse = await axios.post(tduAddAirportAPI, formPublishAirport);
            const responseMessage = submitAirportResponse.data;
    
            if (responseMessage.success === true) {
                setAddAirportLoader(false)
                setAddAirportResponse(responseMessage.message);
                setAddAirportContinent('');
                setAddAirportSubContinent('');
                setAddAirportCountry('');
                setAddAirportRegion('');
                setAddAirportState('');
                setAddAirportName('');
                setAddAirportLink('');
                setAddAirportLogoLink('');
                setAddAirportIATALink('');
                setAddAirportDescription('');
                dataList?.fetchAllDataList();

                const timeoutId = setTimeout(() => {
                    setAddAirportResponse('');
                }, 3000);
                return () => clearTimeout(timeoutId);
            } 
            
            if (responseMessage.success === false) {
                setAddAirportLoader(false)
                setAddAirportResponse(responseMessage.message);

                const timeoutId = setTimeout(() => {
                    setAddAirportResponse('');
                }, 3000);
                return () => clearTimeout(timeoutId);
            }
    
        } catch (error) {
            console.error(error);
            setAddAirportLoader(false);
        }
    };


    const [viewDefaultLiveTelecast, setViewDefaultLiveTelecast] = useState(true);
    const [viewYoutubeChannel, setViewYoutubeChannel] = useState(false);

    const handleViewDefaultLiveTelecast = () => {
        setViewDefaultLiveTelecast(true);
        setViewYoutubeChannel(false);
    }
    const handleViewYoutubeChannel = () => {
        setViewDefaultLiveTelecast(false);
        setViewYoutubeChannel(true);
    }


    const [addLCContinent, setAddLCContinent] = useState('');
    const [addLCCountry, setAddLCCountry] = useState('');
    const [addLCRegion, setAddLCRegion] = useState('');
    const [addLCName, setAddLCName] = useState('');
    const [addLCLink, setAddLCLink] = useState('');
    const [addLCImageLogo, setAddLCImageLogo] = useState('');
    const [addLCDescription, setAddLCDescription] = useState('');

    const [addYTContinent, setAddYTContinent] = useState('');
    const [addYTCountry, setAddYTCountry] = useState('');
    const [addYTRegion, setAddYTRegion] = useState('');
    const [addYTName, setAddYTName] = useState('');
    const [addYTLink, setAddYTLink] = useState('');
    const [addYTImageLogo, setAddYTImageLogo] = useState('');
    const [addYTDescription, setAddYTDescription] = useState('');

    const [addTelecastLoader, setAddTelecastLoader] = useState(false);
    const [addTelecastResponse, setAddTelecastResponse] = useState('');


    const publishLiveChannelData = async () => {
        setAddTelecastLoader(true);

        if(!addLCName || !addLCLink || !addLCDescription){
            setAddTelecastLoader(false);
            setAddTelecastResponse('Please fill up all fields')
            return;
        }

        const formPublishLiveTelecast = {
            continent: addLCContinent,
            country: addLCCountry,
            region: addLCRegion,
            channel_name: addLCName,
            channel_website: addLCLink,
            channel_logo: addLCImageLogo,
            channel_description: addLCDescription,
        };

        try {
            const submitLiveChannelResponse = await axios.post(tduAddLiveChannelAPI, formPublishLiveTelecast);
            const responseMessage = submitLiveChannelResponse.data;
    
            if (responseMessage.success === true) {
                setAddTelecastLoader(false)
                setAddTelecastResponse(responseMessage.message);
                setAddLCContinent('');
                setAddLCCountry('');
                setAddLCRegion('');
                setAddLCName('');
                setAddLCLink('');
                setAddLCImageLogo('');
                setAddLCDescription('');
                dataList?.fetchAllDataList();

                const timeoutId = setTimeout(() => {
                    setAddTelecastResponse('');
                }, 3000);
                return () => clearTimeout(timeoutId);
            } 
            
            if (responseMessage.success === false) {
                setAddTelecastLoader(false)
                setAddTelecastResponse(responseMessage.message);

                const timeoutId = setTimeout(() => {
                    setAddTelecastResponse('');
                }, 3000);
                return () => clearTimeout(timeoutId);
            }
    
        } catch (error) {
            console.error(error);
            setAddTelecastLoader(false);
        }
    };
    const publishYoutubeData = async () => {
        setAddTelecastLoader(true);

        if(!addYTName || !addYTLink || !addYTDescription){
            setAddTelecastLoader(false);
            setAddTelecastResponse('Please fill up all fields')
            return;
        }

        const formPublishYoutube = {
            continent: addYTContinent,
            country: addYTCountry,
            region: addYTRegion,
            youtube_name: addYTName,
            youtube_website: addYTLink,
            youtube_logo: addYTImageLogo,
            youtube_description: addYTDescription,
        };

        try {
            const submitYoutubeResponse = await axios.post(tduAddYoutubeAPI, formPublishYoutube);
            const responseMessage = submitYoutubeResponse.data;
    
            if (responseMessage.success === true) {
                setAddTelecastLoader(false)
                setAddTelecastResponse(responseMessage.message);
                setAddYTContinent('');
                setAddYTCountry('');
                setAddYTRegion('');
                setAddYTName('');
                setAddYTLink('');
                setAddYTImageLogo('');
                setAddYTDescription('');
                dataList?.fetchAllDataList();

                const timeoutId = setTimeout(() => {
                    setAddTelecastResponse('');
                }, 3000);
                return () => clearTimeout(timeoutId);
            } 
            
            if (responseMessage.success === false) {
                setAddTelecastLoader(false)
                setAddTelecastResponse(responseMessage.message);

                const timeoutId = setTimeout(() => {
                    setAddTelecastResponse('');
                }, 3000);
                return () => clearTimeout(timeoutId);
            }
    
        } catch (error) {
            console.error(error);
            setAddTelecastLoader(false);
        }
    };



    const [addMagazineContinent, setAddMagazineContinent] = useState('');
    const [addMagazineCountry, setAddMagazineCountry] = useState('');
    const [addMagazineCategory, setAddMagazineCategory] = useState('');
    const [addMagazineName, setAddMagazineName] = useState('');
    const [addMagazineLink, setAddMagazineLink] = useState('');
    const [addMagazineDescription, setAddMagazineDescription] = useState('');
    const [addMagazineLoader, setAddMagazineLoader] = useState(false);
    const [addMagazineResponse, setAddMagazineResponse] = useState('');

    const publishMagazineData = async () => {
        setAddMagazineLoader(true);

        if(!addMagazineName || !addMagazineLink || !addMagazineDescription){
            setAddMagazineLoader(false);
            setAddMagazineResponse('Please fill up all fields')
            return;
        }

        const formPublishMagazine = {
            continent: addMagazineContinent,
            country: addMagazineCountry,
            magazine_category: addMagazineCategory,
            magazine_name: addMagazineName,
            magazine_website: addMagazineLink,
            magazine_description: addMagazineDescription,
        };

        try {
            const submitMagazineResponse = await axios.post(tduAddMagazineAPI, formPublishMagazine);
            const responseMessage = submitMagazineResponse.data;
    
            if (responseMessage.success === true) {
                setAddMagazineLoader(false)
                setAddMagazineResponse(responseMessage.message);
                setAddMagazineContinent('');
                setAddMagazineCountry('');
                setAddMagazineCategory('');
                setAddMagazineName('');
                setAddMagazineLink('');
                setAddMagazineDescription('');
                dataList?.fetchAllDataList();

                const timeoutId = setTimeout(() => {
                    setAddMagazineResponse('');
                }, 3000);
                return () => clearTimeout(timeoutId);
            } 
            
            if (responseMessage.success === false) {
                setAddMagazineLoader(false)
                setAddMagazineResponse(responseMessage.message);

                const timeoutId = setTimeout(() => {
                    setAddMagazineResponse('');
                }, 3000);
                return () => clearTimeout(timeoutId);
            }
    
        } catch (error) {
            console.error(error);
            setAddMagazineLoader(false);
        }
    };



    const [addNewspaperContinent, setAddNewspaperContinent] = useState('');
    const [addNewspaperSubContinent, setAddNewspaperSubContinent] = useState('');
    const [addNewspaperCountry, setAddNewspaperCountry] = useState('');
    const [addNewspaperCategory, setAddNewspaperCategory] = useState('');
    const [addNewspaperName, setAddNewspaperName] = useState('');
    const [addNewspaperLink, setAddNewspaperLink] = useState('');
    const [addNewspaperDescription, setAddNewspaperDescription] = useState('');
    const [addNewspaperLoader, setAddNewspaperLoader] = useState(false);
    const [addNewspaperResponse, setAddNewspaperResponse] = useState('');

    const publishNewspaperData = async () => {
        setAddNewspaperLoader(true);

        if(!addNewspaperName || !addNewspaperLink || !addNewspaperDescription){
            setAddNewspaperLoader(false);
            setAddNewspaperResponse('Please fill up all fields')
            return;
        }

        const formPublishNewspaper = {
            continent: addNewspaperContinent,
            subcontinent: addNewspaperSubContinent,
            country: addNewspaperCountry,
            newspaper_category: addNewspaperCategory,
            newspaper_name: addNewspaperName,
            newspaper_website: addNewspaperLink,
            newspaper_description: addNewspaperDescription,
        };

        try {
            const submitNewspaperResponse = await axios.post(tduAddNewspaperAPI, formPublishNewspaper);
            const responseMessage = submitNewspaperResponse.data;
    
            if (responseMessage.success === true) {
                setAddNewspaperLoader(false)
                setAddNewspaperResponse(responseMessage.message);
                setAddNewspaperContinent('');
                setAddNewspaperSubContinent('');
                setAddNewspaperCountry('');
                setAddNewspaperCategory('');
                setAddNewspaperName('');
                setAddNewspaperLink('');
                setAddNewspaperDescription('');
                dataList?.fetchAllDataList();

                const timeoutId = setTimeout(() => {
                    setAddNewspaperResponse('');
                }, 3000);
                return () => clearTimeout(timeoutId);
            } 
            
            if (responseMessage.success === false) {
                setAddNewspaperLoader(false)
                setAddNewspaperResponse(responseMessage.message);
                dataList?.fetchAllDataList();

                const timeoutId = setTimeout(() => {
                    setAddNewspaperResponse('');
                }, 3000);
                return () => clearTimeout(timeoutId);
            }
    
        } catch (error) {
            console.error(error);
            setAddNewspaperLoader(false);
        }
    };



    const [addRestaurantContinent, setAddRestaurantContinent] = useState('');
    const [addRestaurantSubContinent, setAddRestaurantSubContinent] = useState('');
    const [addRestaurantCountry, setAddRestaurantCountry] = useState('');
    const [addRestaurantRegion, setAddRestaurantRegion] = useState('');
    const [addRestaurantCity, setAddRestaurantCity] = useState('');
    const [addRestaurantCategory, setAddRestaurantCategory] = useState('');
    const [addRestaurantName, setAddRestaurantName] = useState('');
    const [addRestaurantLink, setAddRestaurantLink] = useState('');
    const [addRestaurantDescription, setAddRestaurantDescription] = useState('');
    const [addRestaurantLoader, setAddRestaurantLoader] = useState(false);
    const [addRestaurantResponse, setAddRestaurantResponse] = useState('');

    const publishRestaurantData = async () => {
        setAddRestaurantLoader(true);

        if(!addRestaurantName || !addRestaurantLink || !addRestaurantDescription){
            setAddRestaurantLoader(false);
            setAddRestaurantResponse('Please fill up all fields')
            return;
        }

        const formPublishRestaurant = {
            continent: addRestaurantContinent,
            subcontinent: `${addRestaurantSubContinent} ${addRestaurantContinent}`,
            country: addRestaurantCountry,
            region: addRestaurantRegion,
            city: addRestaurantCity,
            restaurant_category: addRestaurantCategory,
            restaurant_name: addRestaurantName,
            restaurant_website: addRestaurantLink,
            restaurant_description: addRestaurantDescription,
        };

        try {
            const submitRestaurantResponse = await axios.post(tduAddRestaurantAPI, formPublishRestaurant);
            const responseMessage = submitRestaurantResponse.data;
    
            if (responseMessage.success === true) {
                setAddRestaurantLoader(false)
                setAddRestaurantResponse(responseMessage.message);
                setAddRestaurantContinent('');
                setAddRestaurantSubContinent('');
                setAddRestaurantCountry('');
                setAddRestaurantRegion('');
                setAddRestaurantCity('');
                setAddRestaurantCategory('');
                setAddRestaurantName('');
                setAddRestaurantLink('');
                setAddRestaurantDescription('');
                dataList?.fetchAllDataList();

                const timeoutId = setTimeout(() => {
                    setAddRestaurantResponse('');
                }, 3000);
                return () => clearTimeout(timeoutId);
            } 
            
            if (responseMessage.success === false) {
                setAddRestaurantLoader(false)
                setAddRestaurantResponse(responseMessage.message);
                dataList?.fetchAllDataList();

                const timeoutId = setTimeout(() => {
                    setAddRestaurantResponse('');
                }, 3000);
                return () => clearTimeout(timeoutId);
            }
    
        } catch (error) {
            console.error(error);
            setAddRestaurantLoader(false);
        }
    };







    const [viewAirlineList, setViewAirlineList] = useState(false);
    const [viewAirportList, setViewAirportList] = useState(false);
    const [viewLiveChannelList, setViewLiveChannelList] = useState(false);
    const [viewMagazineList, setViewMagazineList] = useState(false);
    const [viewNewspaperList, setViewNewspaperList] = useState(false);
    const [viewRestaurantList, setViewRestaurantList] = useState(false);




    
    return (
        <div className='mainContainer adminPanel'>
            <div className={webLoader ? "allLoaderContainer active" : "allLoaderContainer disable"}>
                <div className="loaderContent">
                    <img src={require('../assets/imgs/TheDailyUniverseLogo.png')} alt="" />
                    <p>LOADING UPDATES...</p>
                </div>
            </div>
            <section className="adminPanelContainerPage">
                <div className="adminPanelContentPage">
                    <div className="admnpnlcp left">
                        <div className="admnpnlcplHeader">
                            <img src={require('../assets/imgs/TheDailyUniverseLogo.png')} alt="" />
                            <span>
                                <h5>THE DAILY UNIVERSE</h5>
                                <h6>ADMIN PANEL</h6>
                            </span>
                        </div>
                        <div className="admnpnlcplNavigations">
                            <button className={viewFullDashboardSec ? "active" : ""} onClick={handleViewFullDashboardSection}><h6>DASHBOARD</h6></button>
                            <button className={viewAddArticleSec ? "active" : ""} onClick={handleViewAddArticleSection}><h6>ADD NEWS ARTICLE</h6></button>
                            <button className={viewAddMovieReviewSec ? "active" : ""} onClick={handleViewMovieReviewSection}><h6>ADD MOVIE REVIEW</h6></button>
                            <button className={viewAddTouristSpotSec ? "active" : ""} onClick={handleViewTouristSpotSection}><h6>ADD TOURIST SPOTS</h6></button>
                            <div className="admnpnlcplnOthers">
                                <h6 id='admnpnlcplnoNavs'>OTHERS</h6>
                                <button className={viewAddAirlineSec ? "active" : ""} onClick={handleViewAirlineSection}><h6>ADD AIRLINE</h6></button>
                                <button className={viewAddAirportSec ? "active" : ""} onClick={handleViewAirportSection}><h6>ADD AIRPORT</h6></button>
                                <button className={viewAddTelecastSec ? "active" : ""} onClick={handleViewTelecastSection}><h6>ADD TELECAST CHANNEL</h6></button>
                                <button className={viewAddMagazineSec ? "active" : ""} onClick={handleViewMagazineSection}><h6>ADD MAGAZINE</h6></button>
                                <button className={viewAddNewspaperSec ? "active" : ""} onClick={handleViewNewspaperSection}><h6>ADD NEWSPAPER</h6></button>
                                <button className={viewAddRestaurantSec ? "active" : ""} onClick={handleViewRestaurantSection}><h6>ADD RESTAURANT</h6></button>
                                <button className=''><h6>ADD SPORTS TEAM</h6></button>
                                <button className=''><h6>ADD VISA GUIDE</h6></button>
                            </div>
                        </div>
                    </div>
                    <div className="admnpnlcp right">
                        {viewFullDashboardSec && <div className="admnpnlcprContainer dashboard">
                            <h4>DASHBOARD</h4>
                            <p>Welcome to the Admin Panel {StoredUserDataJSON?.username}! By accessing this panel, you agree to adhere to TDU's Content Terms and Conditions and Privacy Policies.</p>
                            <div className="admnpnlcprNavigation">
                                <button className={viewMainDashboard ? 'active' : ''} onClick={handleViewMainDashboard}>OVERVIEW</button>
                                <button>USERS</button>
                                <button>ADS</button>
                                <button>POLLS</button>
                                <button>PRODUCTS</button>
                                <button className={viewMainMap ? 'active' : ''} onClick={handleViewMainMap}>MAP</button>
                            </div>
                            {viewMainDashboard && <div className="admnpnlcprContents">
                                <div className="admnpnlcprcNumSummary">
                                    <div>
                                        <h4>0</h4>
                                        <h6>TOTAL USERS</h6>
                                    </div>
                                    <div>
                                        <h4>0</h4>
                                        <h6>PUBLISHED ARTICLES TODAY</h6>
                                    </div>
                                    <div>
                                        <h4>{viewAllArticles.length}</h4>
                                        <h6>TOTAL ARTICLES</h6>
                                    </div>
                                    <div>
                                        <h4>0</h4>
                                        <h6>TOTAL MOVIE REVIEWS</h6>
                                    </div>
                                    <div>
                                        <h4>0</h4>
                                        <h6>TOTAL DESTINATIONS</h6>
                                    </div>
                                </div>
                                <div className="admnpnlcprc graphData">
                                    <div className="admnpnlcprcgd left">
                                        <div className="admnpnlcprcgdlHeader">
                                            <h6>USER MONTHLY REGISTRATION</h6>
                                            <div>
                                                <select name="" id="">
                                                    <option value="January">January</option>
                                                    <option value="February">February</option>
                                                    <option value="March">March</option>
                                                    <option value="April">April</option>
                                                    <option value="May">May</option>
                                                    <option value="June">June</option>
                                                    <option value="July">July</option>
                                                    <option value="August">August</option>
                                                    <option value="September">September</option>
                                                    <option value="October">October</option>
                                                    <option value="November">November</option>
                                                    <option value="December">December</option>
                                                </select>
                                                <select name="" id="">
                                                    <option value="2024">2024</option>
                                                    <option value="2025">2025</option>
                                                    <option value="2026">2026</option>
                                                    <option value="2027">2027</option>
                                                    <option value="2028">2028</option>
                                                    <option value="2029">2029</option>
                                                    <option value="2030">2030</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="admnpnlcprcgdlGraph">
                                            <WeeklyBarGraph weeklyData={weeklyData} />
                                        </div>
                                    </div>
                                    <div className="admnpnlcprcgd right">
                                        <div className="admnpnlcprcgdrHeader">
                                            <h6>TODAY PUBLISHED ARTICLES</h6>
                                        </div>
                                        <div className="admnpnlcprcgdrPublished">
                                            <div className="admnpnlcprcgdrpEmpty">
                                                <span>
                                                    <p>No Articles Published Yet</p>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="admnpnlcprc sMovieReview">
                                    <h6>RECENT MOVIE REVIEWS</h6>
                                    <div className="admnpnlcprcsmrContainer">
                                        <div className="admnpnlcprcsrscEmpty">
                                            <span>
                                                <p>No Added Movie Reviews Yet</p>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="admnpnlcprc sTouristSpot">
                                    <h6>RECENTLY ADDED TOURIST DESTINATION</h6>
                                    <div className="admnpnlcprcsrsContainer">
                                        <div className="admnpnlcprcsrscEmpty">
                                            <span>
                                                <p>No Added Tourist Destination Yet</p>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                            {viewMainMap && <div className="admnpnlcprContents">
                                <div className="admnpnlcprcHeader">
                                    <h5>INSERT MAP POINT</h5>
                                </div>
                                <div className="admnpnlcprc capital">
                                    <h5>INSERT CAPITAL</h5>
                                    <div className="admnpnlcprccapitalContainer">
                                        <div className="admnpnlcprcccContents left">
                                            <div>
                                                <label htmlFor=""><h6>CONTINENT</h6></label>
                                                <select name="" id="" value={addCapitalContinent} onChange={(e) => setAddCapitalContinent(e.target.value)}>
                                                    <option value="">Select Continent</option>
                                                    <option value="Africa">Africa</option>
                                                    <option value="Asia">Asia</option>
                                                    <option value="Europe">Europe</option>
                                                    <option value="Ocenia">Ocenia</option>
                                                    <option value="North America">North America</option>
                                                    <option value="South America">South America</option>
                                                </select>
                                            </div>
                                            <div className='admnpnlcprcccCountry'>
                                                <label htmlFor=""><h6>COUNTRY</h6></label>
                                                <input type="text" placeholder='Search Country here...' value={searchTermCountry} onChange={handleInputSearchCountry}/>
                                                {suggestionsCountriesSelection && <>
                                                    {(searchTermCountry.length > 0 || searchTermCountry != '') && 
                                                        <div className="admnpnlcprcccSuggestions">
                                                        <ul>
                                                            {suggestionsCountries.map((suggestion, index) => (
                                                            <li key={index} onClick={() => handleSuggestionCountry(suggestion)}>{suggestion}</li>
                                                            ))}
                                                        </ul>
                                                        </div>
                                                    }
                                                </>}
                                            </div>
                                        </div>
                                        <div className="admnpnlcprcccContents right">
                                            <div className="admnpnlcprccccr">
                                                <div>
                                                    <label htmlFor=""><h6>STATE/CITY</h6></label>
                                                    <input type="text" placeholder='Ex. Manila City' onChange={(e) => setAddCapitalState(e.target.value)}/>
                                                </div>
                                                <div>
                                                    <label htmlFor=""><h6>CAPITAL NAME</h6></label>
                                                    <input type="text" placeholder='Ex. Manila' onChange={(e) => setAddCapitalName(e.target.value)}/>
                                                </div>
                                                <div>
                                                    <label htmlFor=""><h6>LATITUDE</h6></label>
                                                    <input type="text" onChange={(e) => setAddCapitalLatitude(e.target.value)}/>
                                                </div>
                                                <div>
                                                    <label htmlFor=""><h6>LONGTITUDE</h6></label>
                                                    <input type="text" onChange={(e) => setAddCapitalLongitude(e.target.value)}/>
                                                </div>
                                            </div>
                                            <div className="admnpnlcprccccrImg">
                                                <div>
                                                    <label htmlFor=""><h6>IMAGE LINK 1</h6></label>
                                                    <input type="text" placeholder='Insert image link only' onChange={(e) => setAddCapitalImage1(e.target.value)}/>
                                                </div>
                                                <div>
                                                    <label htmlFor=""><h6>IMAGE LINK 2</h6></label>
                                                    <input type="text" placeholder='Insert image link only' onChange={(e) => setAddCapitalImage2(e.target.value)}/>
                                                </div>
                                                <div>
                                                    <label htmlFor=""><h6>IMAGE LINK 3</h6></label>
                                                    <input type="text" placeholder='Insert image link only' onChange={(e) => setAddCapitalImage3(e.target.value)}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="admnpnlcprccapitalBtn">
                                        <p>{capitalResponse}</p>
                                        {capitalLoader ?
                                            <button><h6>ADDING...</h6></button>:
                                            <button onClick={addCountryCapital}><h6>ADD CAPITAL</h6></button>
                                        }
                                    </div>
                                </div>
                            </div>}
                        </div>}
                        {viewAddArticleSec && <div className="admnpnlcprContainer addArticle">
                            <h4>ADD NEWS ARTICLE</h4>
                            <p>Here, you can simultaneously add new articles of various types, which will be displayed on the website.</p>
                            <div className="admnpnlcprcAddArticle">
                                <div className="admnpnlcprcaa left">
                                    <div>
                                        <label htmlFor=""><h6>COUNTRY</h6></label>
                                        <select name="" id="" onChange={(e) => setAddArticleCountry(e.target.value)}>
                                            <option value="">Select Country</option>
                                            <option value="AF">Afghanistan</option>
                                            <option value="AL">Albania</option>
                                            <option value="DZ">Algeria</option>
                                            <option value="AD">Andorra</option>
                                            <option value="AO">Angola</option>
                                            <option value="AG">Antigua and Barbuda</option>
                                            <option value="AR">Argentina</option>
                                            <option value="AM">Armenia</option>
                                            <option value="AU">Australia</option>
                                            <option value="AT">Austria</option>
                                            <option value="AZ">Azerbaijan</option>
                                            <option value="BS">Bahamas</option>
                                            <option value="BH">Bahrain</option>
                                            <option value="BD">Bangladesh</option>
                                            <option value="BB">Barbados</option>
                                            <option value="BY">Belarus</option>
                                            <option value="BE">Belgium</option>
                                            <option value="BZ">Belize</option>
                                            <option value="BJ">Benin</option>
                                            <option value="BT">Bhutan</option>
                                            <option value="BO">Bolivia</option>
                                            <option value="BA">Bosnia and Herzegovina</option>
                                            <option value="BW">Botswana</option>
                                            <option value="BR">Brazil</option>
                                            <option value="BN">Brunei</option>
                                            <option value="BG">Bulgaria</option>
                                            <option value="BF">Burkina Faso</option>
                                            <option value="BI">Burundi</option>
                                            <option value="CV">Cabo Verde</option>
                                            <option value="KH">Cambodia</option>
                                            <option value="CM">Cameroon</option>
                                            <option value="CA">Canada</option>
                                            <option value="CF">Central African Republic</option>
                                            <option value="TD">Chad</option>
                                            <option value="CL">Chile</option>
                                            <option value="CN">China</option>
                                            <option value="CO">Colombia</option>
                                            <option value="KM">Comoros</option>
                                            <option value="CD">Congo, Democratic Republic of the</option>
                                            <option value="CG">Congo, Republic of the</option>
                                            <option value="CR">Costa Rica</option>
                                            <option value="CI">Côte d'Ivoire</option>
                                            <option value="HR">Croatia</option>
                                            <option value="CU">Cuba</option>
                                            <option value="CY">Cyprus</option>
                                            <option value="CZ">Czechia</option>
                                            <option value="DK">Denmark</option>
                                            <option value="DJ">Djibouti</option>
                                            <option value="DM">Dominica</option>
                                            <option value="DO">Dominican Republic</option>
                                            <option value="EC">Ecuador</option>
                                            <option value="EG">Egypt</option>
                                            <option value="SV">El Salvador</option>
                                            <option value="GQ">Equatorial Guinea</option>
                                            <option value="ER">Eritrea</option>
                                            <option value="EE">Estonia</option>
                                            <option value="SZ">Eswatini</option>
                                            <option value="ET">Ethiopia</option>
                                            <option value="FJ">Fiji</option>
                                            <option value="FI">Finland</option>
                                            <option value="FR">France</option>
                                            <option value="GA">Gabon</option>
                                            <option value="GM">Gambia</option>
                                            <option value="GE">Georgia</option>
                                            <option value="DE">Germany</option>
                                            <option value="GH">Ghana</option>
                                            <option value="GR">Greece</option>
                                            <option value="GD">Grenada</option>
                                            <option value="GT">Guatemala</option>
                                            <option value="GN">Guinea</option>
                                            <option value="GW">Guinea-Bissau</option>
                                            <option value="GY">Guyana</option>
                                            <option value="HT">Haiti</option>
                                            <option value="HN">Honduras</option>
                                            <option value="HU">Hungary</option>
                                            <option value="IS">Iceland</option>
                                            <option value="IN">India</option>
                                            <option value="ID">Indonesia</option>
                                            <option value="IR">Iran</option>
                                            <option value="IQ">Iraq</option>
                                            <option value="IE">Ireland</option>
                                            <option value="IL">Israel</option>
                                            <option value="IT">Italy</option>
                                            <option value="JM">Jamaica</option>
                                            <option value="JP">Japan</option>
                                            <option value="JO">Jordan</option>
                                            <option value="KZ">Kazakhstan</option>
                                            <option value="KE">Kenya</option>
                                            <option value="KI">Kiribati</option>
                                            <option value="KR">Korea, South</option>
                                            <option value="KW">Kuwait</option>
                                            <option value="KG">Kyrgyzstan</option>
                                            <option value="LA">Laos</option>
                                            <option value="LV">Latvia</option>
                                            <option value="LB">Lebanon</option>
                                            <option value="LS">Lesotho</option>
                                            <option value="LR">Liberia</option>
                                            <option value="LY">Libya</option>
                                            <option value="LI">Liechtenstein</option>
                                            <option value="LT">Lithuania</option>
                                            <option value="LU">Luxembourg</option>
                                            <option value="MG">Madagascar</option>
                                            <option value="MW">Malawi</option>
                                            <option value="MY">Malaysia</option>
                                            <option value="MV">Maldives</option>
                                            <option value="ML">Mali</option>
                                            <option value="MT">Malta</option>
                                            <option value="MH">Marshall Islands</option>
                                            <option value="MR">Mauritania</option>
                                            <option value="MU">Mauritius</option>
                                            <option value="MX">Mexico</option>
                                            <option value="FM">Micronesia</option>
                                            <option value="MD">Moldova</option>
                                            <option value="MC">Monaco</option>
                                            <option value="MN">Mongolia</option>
                                            <option value="ME">Montenegro</option>
                                            <option value="MA">Morocco</option>
                                            <option value="MZ">Mozambique</option>
                                            <option value="MM">Myanmar</option>
                                            <option value="NA">Namibia</option>
                                            <option value="NR">Nauru</option>
                                            <option value="NP">Nepal</option>
                                            <option value="NL">Netherlands</option>
                                            <option value="NZ">New Zealand</option>
                                            <option value="NI">Nicaragua</option>
                                            <option value="NE">Niger</option>
                                            <option value="NG">Nigeria</option>
                                            <option value="NO">Norway</option>
                                            <option value="OM">Oman</option>
                                            <option value="PK">Pakistan</option>
                                            <option value="PW">Palau</option>
                                            <option value="PA">Panama</option>
                                            <option value="PG">Papua New Guinea</option>
                                            <option value="PY">Paraguay</option>
                                            <option value="PE">Peru</option>
                                            <option value="PH">Philippines</option>
                                            <option value="PL">Poland</option>
                                            <option value="PT">Portugal</option>
                                            <option value="QA">Qatar</option>
                                            <option value="RO">Romania</option>
                                            <option value="RU">Russia</option>
                                            <option value="RW">Rwanda</option>
                                            <option value="WS">Samoa</option>
                                            <option value="SM">San Marino</option>
                                            <option value="SA">Saudi Arabia</option>
                                            <option value="SN">Senegal</option>
                                            <option value="RS">Serbia</option>
                                            <option value="SC">Seychelles</option>
                                            <option value="SL">Sierra Leone</option>
                                            <option value="SG">Singapore</option>
                                            <option value="SK">Slovakia</option>
                                            <option value="SI">Slovenia</option>
                                            <option value="SB">Solomon Islands</option>
                                            <option value="SO">Somalia</option>
                                            <option value="ZA">South Africa</option>
                                            <option value="ES">Spain</option>
                                            <option value="LK">Sri Lanka</option>
                                            <option value="SD">Sudan</option>
                                            <option value="SR">Suriname</option>
                                            <option value="SE">Sweden</option>
                                            <option value="CH">Switzerland</option>
                                            <option value="SY">Syria</option>
                                            <option value="TW">Taiwan</option>
                                            <option value="TJ">Tajikistan</option>
                                            <option value="TZ">Tanzania</option>
                                            <option value="TH">Thailand</option>
                                            <option value="TL">Timor-Leste</option>
                                            <option value="TG">Togo</option>
                                            <option value="TO">Tonga</option>
                                            <option value="TT">Trinidad and Tobago</option>
                                            <option value="TN">Tunisia</option>
                                            <option value="TR">Turkey</option>
                                            <option value="TM">Turkmenistan</option>
                                            <option value="UG">Uganda</option>
                                            <option value="UA">Ukraine</option>
                                            <option value="AE">United Arab Emirates</option>
                                            <option value="GB">United Kingdom</option>
                                            <option value="US">United States</option>
                                            <option value="UY">Uruguay</option>
                                            <option value="UZ">Uzbekistan</option>
                                            <option value="VU">Vanuatu</option>
                                            <option value="VE">Venezuela</option>
                                            <option value="VN">Vietnam</option>
                                            <option value="YE">Yemen</option>
                                            <option value="ZM">Zambia</option>
                                            <option value="ZW">Zimbabwe</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor=""><h6>ARTICLE TYPE</h6></label>
                                        <select name="" id="" onChange={(e) => setAddArticleType(e.target.value)}>
                                            <option value="">Select Type</option>
                                            <option value="Good News">Good News</option>
                                            <option value="Breaking News">Breaking News</option>
                                            <option value="Latest News">Latest News</option>
                                            <option value="Political News">Political News</option>
                                            <option value="Business News">Business News</option>
                                            <option value="Sports News">Sports News</option>
                                            <option value="ESports News">Game/ESports News</option>
                                            <option value="Showbiz News">Showbiz News</option>
                                            <option value="Climate News">Climate News</option>
                                            <option value="Tech News">Tech News</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor=""><h6>ARTICLE WRITTER</h6></label>
                                        <input type="text" placeholder='Ex. John Doe' value={addArticleWritter} onChange={(e) => setAddArticleWritter(e.target.value)}/>
                                    </div>
                                    <div>
                                        <label htmlFor=""><h6>ARTICLE IMAGE</h6></label>
                                        <input type="file" onChange={handleUploadArticleImg}/>
                                    </div>
                                    <div>
                                        <label htmlFor=""><h6>ARTICLE IMAGE CREDIT COPYRIGHT</h6></label>
                                        <input type="text" placeholder='Ex. John Doe' value={addArticleCopyright} onChange={(e) => setAddArticleCopyright(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="admnpnlcprcaa right">
                                    <div className="admnpnlcprcaarHeader">
                                        <div>
                                            <label htmlFor=""><h6>ARTICLE TITLE</h6></label>
                                            <textarea name="" id="" placeholder='Type article title here...' value={addArticleTitle} onChange={(e) => setAddArticleTitle(e.target.value)}></textarea>
                                        </div>
                                        <div>
                                            <label htmlFor=""><h6>ARTICLE SUBTITLE</h6></label>
                                            <textarea name="" id="" placeholder='Type article sub title here...' value={addArticleSubTitle} onChange={(e) => setAddArticleSubtitle(e.target.value)}></textarea>
                                        </div>
                                    </div>
                                    <div className='admnpnlcprcaarContent'>
                                        <label htmlFor=""><h6>ARTICLE CONTENT</h6></label>
                                        <textarea name="" id="" placeholder='Type the article contents here...' value={addArticleContent} onChange={(e) => setAddArticleContent(e.target.value)}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="admnpnlcprcaaBtn">
                                <p>{articleResponse}</p>
                                {articleLoader ?
                                    <button><h6>PUBLISHING...</h6></button>:
                                    <button onClick={publishNewsArticle}><h6>PUBLISH ARTICLE</h6></button>
                                }
                            </div>
                        </div>}





                        {viewAddAirlineSec && <div className="admnpnlcprContainer addAirline">
                            {!viewAirlineList ? 
                                <button id="airlineList" onClick={() => setViewAirlineList(true)}><FaListAlt /></button>:
                                <button id="airlineList" onClick={() => setViewAirlineList(false)}><FaTimes /></button>
                            }
                            <h4>ADD COUNTRY'S AIRLINES</h4>
                            <p>Here, you can simultaneously add airlines of various countries, which will be displayed on the website.</p>
                            {viewAirlineList ? <>
                                <div className="admnpnlcprDataList">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th width='20%'><p>Airline Name</p></th>
                                                <th width='15%'><p>Continent</p></th>
                                                <th width='15%'><p>Country</p></th>
                                                <th width='15%'><p>Region/State</p></th>
                                                <th width='15%'><p>City/Province</p></th>
                                                <th width='20%'><p>Command</p></th>
                                            </tr>
                                        </thead>
                                    </table>
                                    <div className="admnpnlcprDataTable">
                                        {dataList?.viewAllAirlines?.length ? 
                                            <table>
                                                <tbody>
                                                    {dataList?.viewAllAirlines?.map((details, i) => (
                                                        <tr key={i}>
                                                            <td width='20%'><p>{details?.airline_name}</p></td>
                                                            <td width='15%'><p>{details?.continent}</p></td>
                                                            <td width='15%'><p>{details?.country}</p></td>
                                                            <td width='15%'><p>{details?.region}</p></td>
                                                            <td width='15%'><p>{details?.city}</p></td>
                                                            <td width='20%' className='tdCenter'>

                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table> :
                                            <div className="admnpnlcprDataTableEmpty">
                                                <span><p>THIS LIST IS EMPTY</p></span>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </>:<>
                                <div className="admnpnlcprcAddAirline">
                                    <div className="admnpnlcprcaairline left">
                                        <div>
                                            <label htmlFor=""><h6>SELECT CONTINENT</h6></label>
                                            <select name="" id="" value={addAirlineContinent} onChange={(e) => setAddAirlineContinent(e.target.value)}>
                                                <option value="">Select Continent</option>
                                                <option value="N.America">N.America</option>
                                                <option value="S.America">S.America</option>
                                                <option value="Europe">Europe</option>
                                                <option value="Africa">Africa</option>
                                                <option value="Asia">Asia</option>
                                                <option value="Oceania">Oceania</option>
                                                <option value="Antarctica">Antarctica</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor=""><h6>SELECT SUB CONTINENT</h6></label>
                                            <select name="" id="" value={addAirlineSubContinent} onChange={(e) => setAddAirlineSubContinent(e.target.value)}>
                                                <option value="">Select Sub-Continent</option>
                                                <option value="Northern Africa">Northern Africa</option>
                                                <option value="Sub-Saharan Africa">Sub-Saharan Africa</option>
                                                <option value="Northern Asia">Northern Asia</option>
                                                <option value="Central Asia">Central Asia</option>
                                                <option value="Western Asia">Western Asia</option>
                                                <option value="South Asia">South Asia</option>
                                                <option value="East Asia">East Asia</option>
                                                <option value="Southeast Asia">Southeast Asia</option>
                                                <option value="Northern Europe">Northern Europe</option>
                                                <option value="Western Europe">Western Europe</option>
                                                <option value="Eastern Europe">Eastern Europe</option>
                                                <option value="Southern Europe">Southern Europe</option>
                                                <option value="Northern America">Northern America</option>
                                                <option value="Central America">Central America</option>
                                                <option value="The Caribbean">The Caribbean</option>
                                                <option value="Andean States">Andean States</option>
                                                <option value="Southern Cone">Southern Cone</option>
                                                <option value="Brazil">Brazil</option>
                                                <option value="The Guianas">The Guianas</option>
                                                <option value="Australasia">Australasia</option>
                                                <option value="Melanesia">Melanesia</option>
                                                <option value="Micronesia">Micronesia</option>
                                                <option value="Polynesia">Polynesia</option>
                                            </select>
                                        </div>
                                        {/* <div className="admnpnlcprcaairlinelImg">
                                            <img src={imageContent} alt="" />
                                        </div> */}
                                        <div>
                                            <label htmlFor=""><h6>COUNTRY</h6></label>
                                            <select name="" id="" value={addAirlineCountry} onChange={(e) => setAddAirlineCountry(e.target.value)}>
                                                <option value="">Select Country</option>
                                                <option value="AF">Afghanistan</option>
                                                <option value="AL">Albania</option>
                                                <option value="DZ">Algeria</option>
                                                <option value="AD">Andorra</option>
                                                <option value="AO">Angola</option>
                                                <option value="AG">Antigua and Barbuda</option>
                                                <option value="AR">Argentina</option>
                                                <option value="AM">Armenia</option>
                                                <option value="AU">Australia</option>
                                                <option value="AT">Austria</option>
                                                <option value="AZ">Azerbaijan</option>
                                                <option value="BS">Bahamas</option>
                                                <option value="BH">Bahrain</option>
                                                <option value="BD">Bangladesh</option>
                                                <option value="BB">Barbados</option>
                                                <option value="BY">Belarus</option>
                                                <option value="BE">Belgium</option>
                                                <option value="BZ">Belize</option>
                                                <option value="BJ">Benin</option>
                                                <option value="BT">Bhutan</option>
                                                <option value="BO">Bolivia</option>
                                                <option value="BA">Bosnia and Herzegovina</option>
                                                <option value="BW">Botswana</option>
                                                <option value="BR">Brazil</option>
                                                <option value="BN">Brunei</option>
                                                <option value="BG">Bulgaria</option>
                                                <option value="BF">Burkina Faso</option>
                                                <option value="BI">Burundi</option>
                                                <option value="CV">Cabo Verde</option>
                                                <option value="KH">Cambodia</option>
                                                <option value="CM">Cameroon</option>
                                                <option value="CA">Canada</option>
                                                <option value="CF">Central African Republic</option>
                                                <option value="TD">Chad</option>
                                                <option value="CL">Chile</option>
                                                <option value="CN">China</option>
                                                <option value="CO">Colombia</option>
                                                <option value="KM">Comoros</option>
                                                <option value="CD">Congo (Democratic Republic)</option>
                                                <option value="CG">Congo (Republic)</option>
                                                <option value="CR">Costa Rica</option>
                                                <option value="CI">Côte d'Ivoire</option>
                                                <option value="HR">Croatia</option>
                                                <option value="CU">Cuba</option>
                                                <option value="CY">Cyprus</option>
                                                <option value="CZ">Czechia</option>
                                                <option value="DK">Denmark</option>
                                                <option value="DJ">Djibouti</option>
                                                <option value="DM">Dominica</option>
                                                <option value="DO">Dominican Republic</option>
                                                <option value="EC">Ecuador</option>
                                                <option value="EG">Egypt</option>
                                                <option value="SV">El Salvador</option>
                                                <option value="GQ">Equatorial Guinea</option>
                                                <option value="ER">Eritrea</option>
                                                <option value="EE">Estonia</option>
                                                <option value="SZ">Eswatini</option>
                                                <option value="ET">Ethiopia</option>
                                                <option value="FJ">Fiji</option>
                                                <option value="FI">Finland</option>
                                                <option value="FR">France</option>
                                                <option value="GA">Gabon</option>
                                                <option value="GM">Gambia</option>
                                                <option value="GE">Georgia</option>
                                                <option value="DE">Germany</option>
                                                <option value="GH">Ghana</option>
                                                <option value="GR">Greece</option>
                                                <option value="GD">Grenada</option>
                                                <option value="GT">Guatemala</option>
                                                <option value="GN">Guinea</option>
                                                <option value="GW">Guinea-Bissau</option>
                                                <option value="GY">Guyana</option>
                                                <option value="HT">Haiti</option>
                                                <option value="HN">Honduras</option>
                                                <option value="HU">Hungary</option>
                                                <option value="IS">Iceland</option>
                                                <option value="IN">India</option>
                                                <option value="ID">Indonesia</option>
                                                <option value="IR">Iran</option>
                                                <option value="IQ">Iraq</option>
                                                <option value="IE">Ireland</option>
                                                <option value="IL">Israel</option>
                                                <option value="IT">Italy</option>
                                                <option value="JM">Jamaica</option>
                                                <option value="JP">Japan</option>
                                                <option value="JO">Jordan</option>
                                                <option value="KZ">Kazakhstan</option>
                                                <option value="KE">Kenya</option>
                                                <option value="KI">Kiribati</option>
                                                <option value="KP">Korea (North)</option>
                                                <option value="KR">Korea (South)</option>
                                                <option value="KW">Kuwait</option>
                                                <option value="KG">Kyrgyzstan</option>
                                                <option value="LA">Laos</option>
                                                <option value="LV">Latvia</option>
                                                <option value="LB">Lebanon</option>
                                                <option value="LS">Lesotho</option>
                                                <option value="LR">Liberia</option>
                                                <option value="LY">Libya</option>
                                                <option value="LI">Liechtenstein</option>
                                                <option value="LT">Lithuania</option>
                                                <option value="LU">Luxembourg</option>
                                                <option value="MG">Madagascar</option>
                                                <option value="MW">Malawi</option>
                                                <option value="MY">Malaysia</option>
                                                <option value="MV">Maldives</option>
                                                <option value="ML">Mali</option>
                                                <option value="MT">Malta</option>
                                                <option value="MH">Marshall Islands</option>
                                                <option value="MR">Mauritania</option>
                                                <option value="MU">Mauritius</option>
                                                <option value="MX">Mexico</option>
                                                <option value="FM">Micronesia</option>
                                                <option value="MD">Moldova</option>
                                                <option value="MC">Monaco</option>
                                                <option value="MN">Mongolia</option>
                                                <option value="ME">Montenegro</option>
                                                <option value="MA">Morocco</option>
                                                <option value="MZ">Mozambique</option>
                                                <option value="MM">Myanmar</option>
                                                <option value="NA">Namibia</option>
                                                <option value="NR">Nauru</option>
                                                <option value="NP">Nepal</option>
                                                <option value="NL">Netherlands</option>
                                                <option value="NZ">New Zealand</option>
                                                <option value="NI">Nicaragua</option>
                                                <option value="NE">Niger</option>
                                                <option value="NG">Nigeria</option>
                                                <option value="NO">Norway</option>
                                                <option value="OM">Oman</option>
                                                <option value="PK">Pakistan</option>
                                                <option value="PW">Palau</option>
                                                <option value="PA">Panama</option>
                                                <option value="PG">Papua New Guinea</option>
                                                <option value="PY">Paraguay</option>
                                                <option value="PE">Peru</option>
                                                <option value="PH">Philippines</option>
                                                <option value="PL">Poland</option>
                                                <option value="PT">Portugal</option>
                                                <option value="QA">Qatar</option>
                                                <option value="RO">Romania</option>
                                                <option value="RU">Russia</option>
                                                <option value="RW">Rwanda</option>
                                                <option value="WS">Samoa</option>
                                                <option value="SM">San Marino</option>
                                                <option value="SA">Saudi Arabia</option>
                                                <option value="SN">Senegal</option>
                                                <option value="RS">Serbia</option>
                                                <option value="SC">Seychelles</option>
                                                <option value="SL">Sierra Leone</option>
                                                <option value="SG">Singapore</option>
                                                <option value="SK">Slovakia</option>
                                                <option value="SI">Slovenia</option>
                                                <option value="SB">Solomon Islands</option>
                                                <option value="SO">Somalia</option>
                                                <option value="ZA">South Africa</option>
                                                <option value="ES">Spain</option>
                                                <option value="LK">Sri Lanka</option>
                                                <option value="SD">Sudan</option>
                                                <option value="SR">Suriname</option>
                                                <option value="SE">Sweden</option>
                                                <option value="CH">Switzerland</option>
                                                <option value="SY">Syria</option>
                                                <option value="TW">Taiwan</option>
                                                <option value="TJ">Tajikistan</option>
                                                <option value="TZ">Tanzania</option>
                                                <option value="TH">Thailand</option>
                                                <option value="TL">Timor-Leste</option>
                                                <option value="TG">Togo</option>
                                                <option value="TO">Tonga</option>
                                                <option value="TT">Trinidad and Tobago</option>
                                                <option value="TN">Tunisia</option>
                                                <option value="TR">Turkey</option>
                                                <option value="TM">Turkmenistan</option>
                                                <option value="UG">Uganda</option>
                                                <option value="UA">Ukraine</option>
                                                <option value="AE">United Arab Emirates</option>
                                                <option value="GB">United Kingdom</option>
                                                <option value="US">United States</option>
                                                <option value="UY">Uruguay</option>
                                                <option value="UZ">Uzbekistan</option>
                                                <option value="VU">Vanuatu</option>
                                                <option value="VE">Venezuela</option>
                                                <option value="VN">Vietnam</option>
                                                <option value="YE">Yemen</option>
                                                <option value="ZM">Zambia</option>
                                                <option value="ZW">Zimbabwe</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor=""><h6>REGION/STATE</h6></label>
                                            <input type="text" value={addAirlineRegion} onChange={(e) => setAddAirlineRegion(e.target.value)} placeholder='Insert here if country was not available'/>
                                        </div>
                                        <div>
                                            <label htmlFor=""><h6>CITY/PROVINCE</h6></label>
                                            <input type="text" value={addAirlineState} onChange={(e) => setAddAirlineState(e.target.value)} placeholder='Located City or Province'/>
                                        </div>
                                    </div>
                                    <div className="admnpnlcprcaairline right">
                                        <div className="admnpnlcprcaairlinerHeader">
                                            <div>
                                                <label htmlFor=""><h6>AIRLINE NAME</h6></label>
                                                <input type="text" value={addAirlineName} onChange={(e) => setAddAirlineName(e.target.value)} placeholder='Ex. AirMed International'/>
                                            </div>
                                            <div>
                                                <label htmlFor=""><h6>AIRLINE WEBSITE DIRECT LINK</h6></label>
                                                <input type="text" value={addAirlineLink} onChange={(e) => setAddAirlineLink(e.target.value)} placeholder='Insert link only.'/>
                                            </div>
                                            <div>
                                                <label htmlFor=""><h6>AIRLINE LOGO</h6></label>
                                                <input type="text" value={addAirlineLogoLink} onChange={(e) => setAddAirlineLogoLink(e.target.value)} placeholder='Insert image link only.'/>
                                            </div>
                                            <div>
                                                <label htmlFor=""><h6>AIRLINE EXTRA IMAGE</h6></label>
                                                <input type="text" value={addAirlineImageLink} onChange={(e) => setAddAirlineImageLink(e.target.value)} placeholder='Insert image link only.'/>
                                            </div>
                                        </div>
                                        <div className="admnpnlcprcaairlinerContent">
                                            <div>
                                                <label htmlFor=""><h6>AIRLINE DESCRIPTION</h6></label>
                                                <textarea name="" id="" value={addAirlineDescription} onChange={(e) => setAddAirlineDescription(e.target.value)} placeholder='Type the airline description here...'></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="admnpnlcprcaairlineBtn">
                                    <p>{addAirlineResponse}</p>
                                    {addAirlineLoader ?
                                        <button><h6>ADDING...</h6></button>:
                                        <button onClick={publishAirlineData}><h6>ADD AIRLINE</h6></button>
                                    }
                                </div>
                            </>}
                        </div>}

                        {viewAddAirportSec && <div className="admnpnlcprContainer addAirport">
                            {!viewAirportList ?
                                <button id="aiportList" onClick={() => setViewAirportList(true)}><FaListAlt /></button>:
                                <button id="aiportList" onClick={() => setViewAirportList(false)}><FaTimes /></button>
                            }
                            <h4>ADD COUNTRY'S AIRPORTS</h4>
                            <p>Here, you can simultaneously add airports of various countries, which will be displayed on the website.</p>
                            {viewAirportList ? <>
                                <div className="admnpnlcprDataList">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th width='20%'><p>Airline Name</p></th>
                                                <th width='15%'><p>Continent</p></th>
                                                <th width='15%'><p>Country</p></th>
                                                <th width='15%'><p>Region/State</p></th>
                                                <th width='15%'><p>City/Province</p></th>
                                                <th width='20%'><p>Command</p></th>
                                            </tr>
                                        </thead>
                                    </table>
                                    <div className="admnpnlcprDataTable">
                                        {dataList?.viewAllAirports?.length ? 
                                            <table>
                                                <tbody>
                                                    {dataList?.viewAllAirports?.map((details, i) => (
                                                        <tr key={i}>
                                                            <td width='20%'><p>{details?.airport_name}</p></td>
                                                            <td width='15%'><p>{details?.continent}</p></td>
                                                            <td width='15%'><p>{details?.country}</p></td>
                                                            <td width='15%'><p>{details?.region}</p></td>
                                                            <td width='15%'><p>{details?.city}</p></td>
                                                            <td width='20%' className='tdCenter'>

                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table> :
                                            <div className="admnpnlcprDataTableEmpty">
                                                <span><p>THIS LIST IS EMPTY</p></span>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </>:<>
                                <div className="admnpnlcprcAddAirport">
                                    <div className="admnpnlcprcaairport left">
                                        <div>
                                            <label htmlFor=""><h6>SELECT CONTINENT</h6></label>
                                            <select name="" id="" value={addAirportContinent} onChange={(e) => setAddAirportContinent(e.target.value)}>
                                                <option value="">Select Continent</option>
                                                <option value="N.America">N.America</option>
                                                <option value="S.America">S.America</option>
                                                <option value="Europe">Europe</option>
                                                <option value="Africa">Africa</option>
                                                <option value="Asia">Asia</option>
                                                <option value="Oceania">Oceania</option>
                                                <option value="Antarctica">Antarctica</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor=""><h6>SELECT SUB CONTINENT</h6></label>
                                            <select name="" id="" value={addAirportSubContinent} onChange={(e) => setAddAirportSubContinent(e.target.value)}>
                                                <option value="">Select Sub-Continent</option>
                                                <option value="Northern Africa">Northern Africa</option>
                                                <option value="Sub-Saharan Africa">Sub-Saharan Africa</option>
                                                <option value="Northern Asia">Northern Asia</option>
                                                <option value="Central Asia">Central Asia</option>
                                                <option value="Western Asia">Western Asia</option>
                                                <option value="South Asia">South Asia</option>
                                                <option value="East Asia">East Asia</option>
                                                <option value="Southeast Asia">Southeast Asia</option>
                                                <option value="Northern Europe">Northern Europe</option>
                                                <option value="Western Europe">Western Europe</option>
                                                <option value="Eastern Europe">Eastern Europe</option>
                                                <option value="Southern Europe">Southern Europe</option>
                                                <option value="Northern America">Northern America</option>
                                                <option value="Central America">Central America</option>
                                                <option value="The Caribbean">The Caribbean</option>
                                                <option value="Andean States">Andean States</option>
                                                <option value="Southern Cone">Southern Cone</option>
                                                <option value="Brazil">Brazil</option>
                                                <option value="The Guianas">The Guianas</option>
                                                <option value="Australasia">Australasia</option>
                                                <option value="Melanesia">Melanesia</option>
                                                <option value="Micronesia">Micronesia</option>
                                                <option value="Polynesia">Polynesia</option>
                                            </select>
                                        </div>
                                        {/* <div className="admnpnlcprcaairportlImg">
                                            <img src={imageContent} alt="" />
                                        </div> */}
                                        <div>
                                            <label htmlFor=""><h6>COUNTRY</h6></label>
                                            <select name="" id="" value={addAirportCountry} onChange={(e) => setAddAirportCountry(e.target.value)}>
                                                <option value="">Select Country</option>
                                                <option value="AF">Afghanistan</option>
                                                <option value="AL">Albania</option>
                                                <option value="DZ">Algeria</option>
                                                <option value="AD">Andorra</option>
                                                <option value="AO">Angola</option>
                                                <option value="AG">Antigua and Barbuda</option>
                                                <option value="AR">Argentina</option>
                                                <option value="AM">Armenia</option>
                                                <option value="AU">Australia</option>
                                                <option value="AT">Austria</option>
                                                <option value="AZ">Azerbaijan</option>
                                                <option value="BS">Bahamas</option>
                                                <option value="BH">Bahrain</option>
                                                <option value="BD">Bangladesh</option>
                                                <option value="BB">Barbados</option>
                                                <option value="BY">Belarus</option>
                                                <option value="BE">Belgium</option>
                                                <option value="BZ">Belize</option>
                                                <option value="BJ">Benin</option>
                                                <option value="BT">Bhutan</option>
                                                <option value="BO">Bolivia</option>
                                                <option value="BA">Bosnia and Herzegovina</option>
                                                <option value="BW">Botswana</option>
                                                <option value="BR">Brazil</option>
                                                <option value="BN">Brunei</option>
                                                <option value="BG">Bulgaria</option>
                                                <option value="BF">Burkina Faso</option>
                                                <option value="BI">Burundi</option>
                                                <option value="CV">Cabo Verde</option>
                                                <option value="KH">Cambodia</option>
                                                <option value="CM">Cameroon</option>
                                                <option value="CA">Canada</option>
                                                <option value="CF">Central African Republic</option>
                                                <option value="TD">Chad</option>
                                                <option value="CL">Chile</option>
                                                <option value="CN">China</option>
                                                <option value="CO">Colombia</option>
                                                <option value="KM">Comoros</option>
                                                <option value="CD">Congo (Democratic Republic)</option>
                                                <option value="CG">Congo (Republic)</option>
                                                <option value="CR">Costa Rica</option>
                                                <option value="CI">Côte d'Ivoire</option>
                                                <option value="HR">Croatia</option>
                                                <option value="CU">Cuba</option>
                                                <option value="CY">Cyprus</option>
                                                <option value="CZ">Czechia</option>
                                                <option value="DK">Denmark</option>
                                                <option value="DJ">Djibouti</option>
                                                <option value="DM">Dominica</option>
                                                <option value="DO">Dominican Republic</option>
                                                <option value="EC">Ecuador</option>
                                                <option value="EG">Egypt</option>
                                                <option value="SV">El Salvador</option>
                                                <option value="GQ">Equatorial Guinea</option>
                                                <option value="ER">Eritrea</option>
                                                <option value="EE">Estonia</option>
                                                <option value="SZ">Eswatini</option>
                                                <option value="ET">Ethiopia</option>
                                                <option value="FJ">Fiji</option>
                                                <option value="FI">Finland</option>
                                                <option value="FR">France</option>
                                                <option value="GA">Gabon</option>
                                                <option value="GM">Gambia</option>
                                                <option value="GE">Georgia</option>
                                                <option value="DE">Germany</option>
                                                <option value="GH">Ghana</option>
                                                <option value="GR">Greece</option>
                                                <option value="GD">Grenada</option>
                                                <option value="GT">Guatemala</option>
                                                <option value="GN">Guinea</option>
                                                <option value="GW">Guinea-Bissau</option>
                                                <option value="GY">Guyana</option>
                                                <option value="HT">Haiti</option>
                                                <option value="HN">Honduras</option>
                                                <option value="HU">Hungary</option>
                                                <option value="IS">Iceland</option>
                                                <option value="IN">India</option>
                                                <option value="ID">Indonesia</option>
                                                <option value="IR">Iran</option>
                                                <option value="IQ">Iraq</option>
                                                <option value="IE">Ireland</option>
                                                <option value="IL">Israel</option>
                                                <option value="IT">Italy</option>
                                                <option value="JM">Jamaica</option>
                                                <option value="JP">Japan</option>
                                                <option value="JO">Jordan</option>
                                                <option value="KZ">Kazakhstan</option>
                                                <option value="KE">Kenya</option>
                                                <option value="KI">Kiribati</option>
                                                <option value="KP">Korea (North)</option>
                                                <option value="KR">Korea (South)</option>
                                                <option value="KW">Kuwait</option>
                                                <option value="KG">Kyrgyzstan</option>
                                                <option value="LA">Laos</option>
                                                <option value="LV">Latvia</option>
                                                <option value="LB">Lebanon</option>
                                                <option value="LS">Lesotho</option>
                                                <option value="LR">Liberia</option>
                                                <option value="LY">Libya</option>
                                                <option value="LI">Liechtenstein</option>
                                                <option value="LT">Lithuania</option>
                                                <option value="LU">Luxembourg</option>
                                                <option value="MG">Madagascar</option>
                                                <option value="MW">Malawi</option>
                                                <option value="MY">Malaysia</option>
                                                <option value="MV">Maldives</option>
                                                <option value="ML">Mali</option>
                                                <option value="MT">Malta</option>
                                                <option value="MH">Marshall Islands</option>
                                                <option value="MR">Mauritania</option>
                                                <option value="MU">Mauritius</option>
                                                <option value="MX">Mexico</option>
                                                <option value="FM">Micronesia</option>
                                                <option value="MD">Moldova</option>
                                                <option value="MC">Monaco</option>
                                                <option value="MN">Mongolia</option>
                                                <option value="ME">Montenegro</option>
                                                <option value="MA">Morocco</option>
                                                <option value="MZ">Mozambique</option>
                                                <option value="MM">Myanmar</option>
                                                <option value="NA">Namibia</option>
                                                <option value="NR">Nauru</option>
                                                <option value="NP">Nepal</option>
                                                <option value="NL">Netherlands</option>
                                                <option value="NZ">New Zealand</option>
                                                <option value="NI">Nicaragua</option>
                                                <option value="NE">Niger</option>
                                                <option value="NG">Nigeria</option>
                                                <option value="NO">Norway</option>
                                                <option value="OM">Oman</option>
                                                <option value="PK">Pakistan</option>
                                                <option value="PW">Palau</option>
                                                <option value="PA">Panama</option>
                                                <option value="PG">Papua New Guinea</option>
                                                <option value="PY">Paraguay</option>
                                                <option value="PE">Peru</option>
                                                <option value="PH">Philippines</option>
                                                <option value="PL">Poland</option>
                                                <option value="PT">Portugal</option>
                                                <option value="QA">Qatar</option>
                                                <option value="RO">Romania</option>
                                                <option value="RU">Russia</option>
                                                <option value="RW">Rwanda</option>
                                                <option value="WS">Samoa</option>
                                                <option value="SM">San Marino</option>
                                                <option value="SA">Saudi Arabia</option>
                                                <option value="SN">Senegal</option>
                                                <option value="RS">Serbia</option>
                                                <option value="SC">Seychelles</option>
                                                <option value="SL">Sierra Leone</option>
                                                <option value="SG">Singapore</option>
                                                <option value="SK">Slovakia</option>
                                                <option value="SI">Slovenia</option>
                                                <option value="SB">Solomon Islands</option>
                                                <option value="SO">Somalia</option>
                                                <option value="ZA">South Africa</option>
                                                <option value="ES">Spain</option>
                                                <option value="LK">Sri Lanka</option>
                                                <option value="SD">Sudan</option>
                                                <option value="SR">Suriname</option>
                                                <option value="SE">Sweden</option>
                                                <option value="CH">Switzerland</option>
                                                <option value="SY">Syria</option>
                                                <option value="TW">Taiwan</option>
                                                <option value="TJ">Tajikistan</option>
                                                <option value="TZ">Tanzania</option>
                                                <option value="TH">Thailand</option>
                                                <option value="TL">Timor-Leste</option>
                                                <option value="TG">Togo</option>
                                                <option value="TO">Tonga</option>
                                                <option value="TT">Trinidad and Tobago</option>
                                                <option value="TN">Tunisia</option>
                                                <option value="TR">Turkey</option>
                                                <option value="TM">Turkmenistan</option>
                                                <option value="UG">Uganda</option>
                                                <option value="UA">Ukraine</option>
                                                <option value="AE">United Arab Emirates</option>
                                                <option value="GB">United Kingdom</option>
                                                <option value="US">United States</option>
                                                <option value="UY">Uruguay</option>
                                                <option value="UZ">Uzbekistan</option>
                                                <option value="VU">Vanuatu</option>
                                                <option value="VE">Venezuela</option>
                                                <option value="VN">Vietnam</option>
                                                <option value="YE">Yemen</option>
                                                <option value="ZM">Zambia</option>
                                                <option value="ZW">Zimbabwe</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor=""><h6>REGION/STATE</h6></label>
                                            <input type="text" value={addAirportRegion} onChange={(e) => setAddAirportRegion(e.target.value)} placeholder='Insert here if country was not available'/>
                                        </div>
                                        <div>
                                            <label htmlFor=""><h6>CITY/PROVINCE</h6></label>
                                            <input type="text" value={addAirportState} onChange={(e) => setAddAirportState(e.target.value)} placeholder='Located City or Province'/>
                                        </div>
                                    </div>
                                    <div className="admnpnlcprcaairport right">
                                        <div className="admnpnlcprcaairportrHeader">
                                            <div>
                                                <label htmlFor=""><h6>AIRPORT NAME</h6></label>
                                                <input type="text" value={addAirportName} onChange={(e) => setAddAirportName(e.target.value)} placeholder='Ex. Incheon International Airport'/>
                                            </div>
                                            <div>
                                                <label htmlFor=""><h6>AIRPORT WEBSITE DIRECT LINK</h6></label>
                                                <input type="text" value={addAirportLink} onChange={(e) => setAddAirportLink(e.target.value)} placeholder='Insert link only.'/>
                                            </div>
                                            <div>
                                                <label htmlFor=""><h6>AIRPORT - IATA CODES</h6></label>
                                                <input type="text" value={addAirportIATALink} onChange={(e) => setAddAirportIATALink(e.target.value)} placeholder='Insert IATA Code only.'/>
                                            </div>
                                            <div>
                                                <label htmlFor=""><h6>AIRPORT LOGO</h6></label>
                                                <input type="text" value={addAirportLogoLink} onChange={(e) => setAddAirportLogoLink(e.target.value)} placeholder='Insert image link only.'/>
                                            </div>
                                        </div>
                                        <div className="admnpnlcprcaairportrContent">
                                            <div>
                                                <label htmlFor=""><h6>AIRPORT DESCRIPTION</h6></label>
                                                <textarea name="" id="" placeholder='Type the airport description here...' value={addAirportDescription} onChange={(e) => setAddAirportDescription(e.target.value)}></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="admnpnlcprcaairportBtn">
                                    <p>{addAirportResponse}</p>
                                    {addAirportLoader ? 
                                        <button><h6>ADDING...</h6></button>:
                                        <button onClick={publishAirportData}><h6>ADD AIRPORT</h6></button>
                                    }
                                </div>
                            </>}
                        </div>}

                        {viewAddTelecastSec && <div className="admnpnlcprContainer addTelecastChannel">
                            {!viewLiveChannelList ?
                                <button id="channelList" onClick={() => setViewLiveChannelList(true)}><FaListAlt /></button>:
                                <button id="channelList" onClick={() => setViewLiveChannelList(false)}><FaTimes /></button>
                            }
                            <h4>ADD NEWS TELECAST AND YOUTUBE CHANNEL</h4>
                            <p>Here, you can simultaneously add live news telecast channels and youtube channel of Trusted News Agencies.</p>
                            {viewLiveChannelList ? <>
                                <div className="admnpnlcprDataList">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th width='20%'><p>Channel Name</p></th>
                                                <th width='20%'><p>Continent</p></th>
                                                <th width='20%'><p>Country</p></th>
                                                <th width='20%'><p>Region/State</p></th>
                                                <th width='20%'><p>Command</p></th>
                                            </tr>
                                        </thead>
                                    </table>
                                    <div className="admnpnlcprDataTable">
                                        {(dataList?.viewAllLiveChannels?.length || dataList?.viewAllYoutubeChannels?.length) ? <>
                                            <h6>LIVE TELECAST</h6>
                                            <table>
                                                <tbody>
                                                    {dataList?.viewAllLiveChannels?.map((details, i) => (
                                                        <tr key={i}>
                                                            <td width='20%'><p>{details?.channel_name}</p></td>
                                                            <td width='20%'><p>{details?.continent}</p></td>
                                                            <td width='20%'><p>{details?.country}</p></td>
                                                            <td width='20%'><p>{details?.region}</p></td>
                                                            <td width='20%' className='tdCenter'>

                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <h6>YOUTUBE CHANNEL</h6>
                                            <table>
                                                <tbody>
                                                    {dataList?.viewAllYoutubeChannels?.map((details, i) => (
                                                        <tr key={i}>
                                                            <td width='20%'><p>{details?.youtube_name}</p></td>
                                                            <td width='20%'><p>{details?.continent}</p></td>
                                                            <td width='20%'><p>{details?.country}</p></td>
                                                            <td width='20%'><p>{details?.region}</p></td>
                                                            <td width='20%' className='tdCenter'>

                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </>:<>
                                            <div className="admnpnlcprDataTableEmpty">
                                                <span><p>THIS LIST IS EMPTY</p></span>
                                            </div>
                                        </>}
                                    </div>
                                </div>
                            </>:<>
                                <div className="admnpnlcprctelecastNav">
                                    <button onClick={handleViewDefaultLiveTelecast} className={viewDefaultLiveTelecast ? 'active' : ''}>LIVE CHANNEL</button>
                                    <button onClick={handleViewYoutubeChannel} className={viewYoutubeChannel ? 'active' : ''}>YOUTUBE CHANNEL</button>
                                </div>
                                {viewDefaultLiveTelecast && <>
                                    <div className="admnpnlcprcAddLiveChannel">
                                        <div className="admnpnlcprcalivechannel left">
                                            <div>
                                                <label htmlFor=""><h6>SELECT CONTINENT</h6></label>
                                                <select name="" id="" value={addLCContinent} onChange={(e) => setAddLCContinent(e.target.value)}>
                                                    <option value="">Select Continent</option>
                                                    <option value="N.America">N.America</option>
                                                    <option value="S.America">S.America</option>
                                                    <option value="Europe">Europe</option>
                                                    <option value="Africa">Africa</option>
                                                    <option value="Asia">Asia</option>
                                                    <option value="Oceania">Oceania</option>
                                                    <option value="Antarctica">Antarctica</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor=""><h6>COUNTRY</h6></label>
                                                <select name="" id="" value={addLCCountry} onChange={(e) => setAddLCCountry(e.target.value)}>
                                                    <option value="">Select Country</option>
                                                    <option value="AF">Afghanistan</option>
                                                    <option value="AL">Albania</option>
                                                    <option value="DZ">Algeria</option>
                                                    <option value="AD">Andorra</option>
                                                    <option value="AO">Angola</option>
                                                    <option value="AG">Antigua and Barbuda</option>
                                                    <option value="AR">Argentina</option>
                                                    <option value="AM">Armenia</option>
                                                    <option value="AU">Australia</option>
                                                    <option value="AT">Austria</option>
                                                    <option value="AZ">Azerbaijan</option>
                                                    <option value="BS">Bahamas</option>
                                                    <option value="BH">Bahrain</option>
                                                    <option value="BD">Bangladesh</option>
                                                    <option value="BB">Barbados</option>
                                                    <option value="BY">Belarus</option>
                                                    <option value="BE">Belgium</option>
                                                    <option value="BZ">Belize</option>
                                                    <option value="BJ">Benin</option>
                                                    <option value="BT">Bhutan</option>
                                                    <option value="BO">Bolivia</option>
                                                    <option value="BA">Bosnia and Herzegovina</option>
                                                    <option value="BW">Botswana</option>
                                                    <option value="BR">Brazil</option>
                                                    <option value="BN">Brunei</option>
                                                    <option value="BG">Bulgaria</option>
                                                    <option value="BF">Burkina Faso</option>
                                                    <option value="BI">Burundi</option>
                                                    <option value="CV">Cabo Verde</option>
                                                    <option value="KH">Cambodia</option>
                                                    <option value="CM">Cameroon</option>
                                                    <option value="CA">Canada</option>
                                                    <option value="CF">Central African Republic</option>
                                                    <option value="TD">Chad</option>
                                                    <option value="CL">Chile</option>
                                                    <option value="CN">China</option>
                                                    <option value="CO">Colombia</option>
                                                    <option value="KM">Comoros</option>
                                                    <option value="CD">Congo (Democratic Republic)</option>
                                                    <option value="CG">Congo (Republic)</option>
                                                    <option value="CR">Costa Rica</option>
                                                    <option value="CI">Côte d'Ivoire</option>
                                                    <option value="HR">Croatia</option>
                                                    <option value="CU">Cuba</option>
                                                    <option value="CY">Cyprus</option>
                                                    <option value="CZ">Czechia</option>
                                                    <option value="DK">Denmark</option>
                                                    <option value="DJ">Djibouti</option>
                                                    <option value="DM">Dominica</option>
                                                    <option value="DO">Dominican Republic</option>
                                                    <option value="EC">Ecuador</option>
                                                    <option value="EG">Egypt</option>
                                                    <option value="SV">El Salvador</option>
                                                    <option value="GQ">Equatorial Guinea</option>
                                                    <option value="ER">Eritrea</option>
                                                    <option value="EE">Estonia</option>
                                                    <option value="SZ">Eswatini</option>
                                                    <option value="ET">Ethiopia</option>
                                                    <option value="FJ">Fiji</option>
                                                    <option value="FI">Finland</option>
                                                    <option value="FR">France</option>
                                                    <option value="GA">Gabon</option>
                                                    <option value="GM">Gambia</option>
                                                    <option value="GE">Georgia</option>
                                                    <option value="DE">Germany</option>
                                                    <option value="GH">Ghana</option>
                                                    <option value="GR">Greece</option>
                                                    <option value="GD">Grenada</option>
                                                    <option value="GT">Guatemala</option>
                                                    <option value="GN">Guinea</option>
                                                    <option value="GW">Guinea-Bissau</option>
                                                    <option value="GY">Guyana</option>
                                                    <option value="HT">Haiti</option>
                                                    <option value="HN">Honduras</option>
                                                    <option value="HU">Hungary</option>
                                                    <option value="IS">Iceland</option>
                                                    <option value="IN">India</option>
                                                    <option value="ID">Indonesia</option>
                                                    <option value="IR">Iran</option>
                                                    <option value="IQ">Iraq</option>
                                                    <option value="IE">Ireland</option>
                                                    <option value="IL">Israel</option>
                                                    <option value="IT">Italy</option>
                                                    <option value="JM">Jamaica</option>
                                                    <option value="JP">Japan</option>
                                                    <option value="JO">Jordan</option>
                                                    <option value="KZ">Kazakhstan</option>
                                                    <option value="KE">Kenya</option>
                                                    <option value="KI">Kiribati</option>
                                                    <option value="KP">Korea (North)</option>
                                                    <option value="KR">Korea (South)</option>
                                                    <option value="KW">Kuwait</option>
                                                    <option value="KG">Kyrgyzstan</option>
                                                    <option value="LA">Laos</option>
                                                    <option value="LV">Latvia</option>
                                                    <option value="LB">Lebanon</option>
                                                    <option value="LS">Lesotho</option>
                                                    <option value="LR">Liberia</option>
                                                    <option value="LY">Libya</option>
                                                    <option value="LI">Liechtenstein</option>
                                                    <option value="LT">Lithuania</option>
                                                    <option value="LU">Luxembourg</option>
                                                    <option value="MG">Madagascar</option>
                                                    <option value="MW">Malawi</option>
                                                    <option value="MY">Malaysia</option>
                                                    <option value="MV">Maldives</option>
                                                    <option value="ML">Mali</option>
                                                    <option value="MT">Malta</option>
                                                    <option value="MH">Marshall Islands</option>
                                                    <option value="MR">Mauritania</option>
                                                    <option value="MU">Mauritius</option>
                                                    <option value="MX">Mexico</option>
                                                    <option value="FM">Micronesia</option>
                                                    <option value="MD">Moldova</option>
                                                    <option value="MC">Monaco</option>
                                                    <option value="MN">Mongolia</option>
                                                    <option value="ME">Montenegro</option>
                                                    <option value="MA">Morocco</option>
                                                    <option value="MZ">Mozambique</option>
                                                    <option value="MM">Myanmar</option>
                                                    <option value="NA">Namibia</option>
                                                    <option value="NR">Nauru</option>
                                                    <option value="NP">Nepal</option>
                                                    <option value="NL">Netherlands</option>
                                                    <option value="NZ">New Zealand</option>
                                                    <option value="NI">Nicaragua</option>
                                                    <option value="NE">Niger</option>
                                                    <option value="NG">Nigeria</option>
                                                    <option value="NO">Norway</option>
                                                    <option value="OM">Oman</option>
                                                    <option value="PK">Pakistan</option>
                                                    <option value="PW">Palau</option>
                                                    <option value="PA">Panama</option>
                                                    <option value="PG">Papua New Guinea</option>
                                                    <option value="PY">Paraguay</option>
                                                    <option value="PE">Peru</option>
                                                    <option value="PH">Philippines</option>
                                                    <option value="PL">Poland</option>
                                                    <option value="PT">Portugal</option>
                                                    <option value="QA">Qatar</option>
                                                    <option value="RO">Romania</option>
                                                    <option value="RU">Russia</option>
                                                    <option value="RW">Rwanda</option>
                                                    <option value="WS">Samoa</option>
                                                    <option value="SM">San Marino</option>
                                                    <option value="SA">Saudi Arabia</option>
                                                    <option value="SN">Senegal</option>
                                                    <option value="RS">Serbia</option>
                                                    <option value="SC">Seychelles</option>
                                                    <option value="SL">Sierra Leone</option>
                                                    <option value="SG">Singapore</option>
                                                    <option value="SK">Slovakia</option>
                                                    <option value="SI">Slovenia</option>
                                                    <option value="SB">Solomon Islands</option>
                                                    <option value="SO">Somalia</option>
                                                    <option value="ZA">South Africa</option>
                                                    <option value="ES">Spain</option>
                                                    <option value="LK">Sri Lanka</option>
                                                    <option value="SD">Sudan</option>
                                                    <option value="SR">Suriname</option>
                                                    <option value="SE">Sweden</option>
                                                    <option value="CH">Switzerland</option>
                                                    <option value="SY">Syria</option>
                                                    <option value="TW">Taiwan</option>
                                                    <option value="TJ">Tajikistan</option>
                                                    <option value="TZ">Tanzania</option>
                                                    <option value="TH">Thailand</option>
                                                    <option value="TL">Timor-Leste</option>
                                                    <option value="TG">Togo</option>
                                                    <option value="TO">Tonga</option>
                                                    <option value="TT">Trinidad and Tobago</option>
                                                    <option value="TN">Tunisia</option>
                                                    <option value="TR">Turkey</option>
                                                    <option value="TM">Turkmenistan</option>
                                                    <option value="UG">Uganda</option>
                                                    <option value="UA">Ukraine</option>
                                                    <option value="AE">United Arab Emirates</option>
                                                    <option value="GB">United Kingdom</option>
                                                    <option value="US">United States</option>
                                                    <option value="UY">Uruguay</option>
                                                    <option value="UZ">Uzbekistan</option>
                                                    <option value="VU">Vanuatu</option>
                                                    <option value="VE">Venezuela</option>
                                                    <option value="VN">Vietnam</option>
                                                    <option value="YE">Yemen</option>
                                                    <option value="ZM">Zambia</option>
                                                    <option value="ZW">Zimbabwe</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor=""><h6>REGION/STATE</h6></label>
                                                <input type="text" value={addLCRegion} onChange={(e) => setAddLCRegion(e.target.value)} placeholder='Insert here if country was not available'/>
                                            </div>
                                        </div>
                                        <div className="admnpnlcprcalivechannel right">
                                            <div className="admnpnlcprcalivechannelrHeader">
                                                <div>
                                                    <label htmlFor=""><h6>NEWS CHANNEL NAME</h6></label>
                                                    <input type="text" value={addLCName} onChange={(e) => setAddLCName(e.target.value)} placeholder='Ex. CNN'/>
                                                </div>
                                                <div>
                                                    <label htmlFor=""><h6>NEWS CHANNEL WEBSITE DIRECT LINK</h6></label>
                                                    <input type="text" value={addLCLink} onChange={(e) => setAddLCLink(e.target.value)} placeholder='Insert link only.'/>
                                                </div>
                                                <div>
                                                    <label htmlFor=""><h6>NEWS CHANNEL LOGO</h6></label>
                                                    <input type="text" value={addLCImageLogo} onChange={(e) => setAddLCImageLogo(e.target.value)} placeholder='Insert image link only.'/>
                                                </div>
                                            </div>
                                            <div className="admnpnlcprcalivechannelrContent">
                                                <div>
                                                    <label htmlFor=""><h6>NEWS CHANNEL DESCRIPTION</h6></label>
                                                    <textarea name="" id="" value={addLCDescription} onChange={(e) => setAddLCDescription(e.target.value)} placeholder='Type the news channel description here...'></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="admnpnlcprcalivechannelBtn">
                                        <p>{addTelecastResponse}</p>
                                        {addTelecastLoader ?
                                            <button><h6>ADDING...</h6></button>:
                                            <button onClick={publishLiveChannelData}><h6>ADD LIVE CHANNEL</h6></button>
                                        }
                                    </div>
                                </>}
                                {viewYoutubeChannel && <>
                                    <div className="admnpnlcprcAddYoutubeChannel">
                                        <div className="admnpnlcprcayoutubechannel left">
                                            <div>
                                                <label htmlFor=""><h6>SELECT CONTINENT</h6></label>
                                                <select name="" id="" value={addYTContinent} onChange={(e) => setAddYTContinent(e.target.value)}>
                                                    <option value="">Select Continent</option>
                                                    <option value="N.America">N.America</option>
                                                    <option value="S.America">S.America</option>
                                                    <option value="Europe">Europe</option>
                                                    <option value="Africa">Africa</option>
                                                    <option value="Asia">Asia</option>
                                                    <option value="Oceania">Oceania</option>
                                                    <option value="Antarctica">Antarctica</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor=""><h6>COUNTRY</h6></label>
                                                <select name="" id="" value={addYTCountry} onChange={(e) => setAddYTCountry(e.target.value)}>
                                                    <option value="">Select Country</option>
                                                    <option value="AF">Afghanistan</option>
                                                    <option value="AL">Albania</option>
                                                    <option value="DZ">Algeria</option>
                                                    <option value="AD">Andorra</option>
                                                    <option value="AO">Angola</option>
                                                    <option value="AG">Antigua and Barbuda</option>
                                                    <option value="AR">Argentina</option>
                                                    <option value="AM">Armenia</option>
                                                    <option value="AU">Australia</option>
                                                    <option value="AT">Austria</option>
                                                    <option value="AZ">Azerbaijan</option>
                                                    <option value="BS">Bahamas</option>
                                                    <option value="BH">Bahrain</option>
                                                    <option value="BD">Bangladesh</option>
                                                    <option value="BB">Barbados</option>
                                                    <option value="BY">Belarus</option>
                                                    <option value="BE">Belgium</option>
                                                    <option value="BZ">Belize</option>
                                                    <option value="BJ">Benin</option>
                                                    <option value="BT">Bhutan</option>
                                                    <option value="BO">Bolivia</option>
                                                    <option value="BA">Bosnia and Herzegovina</option>
                                                    <option value="BW">Botswana</option>
                                                    <option value="BR">Brazil</option>
                                                    <option value="BN">Brunei</option>
                                                    <option value="BG">Bulgaria</option>
                                                    <option value="BF">Burkina Faso</option>
                                                    <option value="BI">Burundi</option>
                                                    <option value="CV">Cabo Verde</option>
                                                    <option value="KH">Cambodia</option>
                                                    <option value="CM">Cameroon</option>
                                                    <option value="CA">Canada</option>
                                                    <option value="CF">Central African Republic</option>
                                                    <option value="TD">Chad</option>
                                                    <option value="CL">Chile</option>
                                                    <option value="CN">China</option>
                                                    <option value="CO">Colombia</option>
                                                    <option value="KM">Comoros</option>
                                                    <option value="CD">Congo (Democratic Republic)</option>
                                                    <option value="CG">Congo (Republic)</option>
                                                    <option value="CR">Costa Rica</option>
                                                    <option value="CI">Côte d'Ivoire</option>
                                                    <option value="HR">Croatia</option>
                                                    <option value="CU">Cuba</option>
                                                    <option value="CY">Cyprus</option>
                                                    <option value="CZ">Czechia</option>
                                                    <option value="DK">Denmark</option>
                                                    <option value="DJ">Djibouti</option>
                                                    <option value="DM">Dominica</option>
                                                    <option value="DO">Dominican Republic</option>
                                                    <option value="EC">Ecuador</option>
                                                    <option value="EG">Egypt</option>
                                                    <option value="SV">El Salvador</option>
                                                    <option value="GQ">Equatorial Guinea</option>
                                                    <option value="ER">Eritrea</option>
                                                    <option value="EE">Estonia</option>
                                                    <option value="SZ">Eswatini</option>
                                                    <option value="ET">Ethiopia</option>
                                                    <option value="FJ">Fiji</option>
                                                    <option value="FI">Finland</option>
                                                    <option value="FR">France</option>
                                                    <option value="GA">Gabon</option>
                                                    <option value="GM">Gambia</option>
                                                    <option value="GE">Georgia</option>
                                                    <option value="DE">Germany</option>
                                                    <option value="GH">Ghana</option>
                                                    <option value="GR">Greece</option>
                                                    <option value="GD">Grenada</option>
                                                    <option value="GT">Guatemala</option>
                                                    <option value="GN">Guinea</option>
                                                    <option value="GW">Guinea-Bissau</option>
                                                    <option value="GY">Guyana</option>
                                                    <option value="HT">Haiti</option>
                                                    <option value="HN">Honduras</option>
                                                    <option value="HU">Hungary</option>
                                                    <option value="IS">Iceland</option>
                                                    <option value="IN">India</option>
                                                    <option value="ID">Indonesia</option>
                                                    <option value="IR">Iran</option>
                                                    <option value="IQ">Iraq</option>
                                                    <option value="IE">Ireland</option>
                                                    <option value="IL">Israel</option>
                                                    <option value="IT">Italy</option>
                                                    <option value="JM">Jamaica</option>
                                                    <option value="JP">Japan</option>
                                                    <option value="JO">Jordan</option>
                                                    <option value="KZ">Kazakhstan</option>
                                                    <option value="KE">Kenya</option>
                                                    <option value="KI">Kiribati</option>
                                                    <option value="KP">Korea (North)</option>
                                                    <option value="KR">Korea (South)</option>
                                                    <option value="KW">Kuwait</option>
                                                    <option value="KG">Kyrgyzstan</option>
                                                    <option value="LA">Laos</option>
                                                    <option value="LV">Latvia</option>
                                                    <option value="LB">Lebanon</option>
                                                    <option value="LS">Lesotho</option>
                                                    <option value="LR">Liberia</option>
                                                    <option value="LY">Libya</option>
                                                    <option value="LI">Liechtenstein</option>
                                                    <option value="LT">Lithuania</option>
                                                    <option value="LU">Luxembourg</option>
                                                    <option value="MG">Madagascar</option>
                                                    <option value="MW">Malawi</option>
                                                    <option value="MY">Malaysia</option>
                                                    <option value="MV">Maldives</option>
                                                    <option value="ML">Mali</option>
                                                    <option value="MT">Malta</option>
                                                    <option value="MH">Marshall Islands</option>
                                                    <option value="MR">Mauritania</option>
                                                    <option value="MU">Mauritius</option>
                                                    <option value="MX">Mexico</option>
                                                    <option value="FM">Micronesia</option>
                                                    <option value="MD">Moldova</option>
                                                    <option value="MC">Monaco</option>
                                                    <option value="MN">Mongolia</option>
                                                    <option value="ME">Montenegro</option>
                                                    <option value="MA">Morocco</option>
                                                    <option value="MZ">Mozambique</option>
                                                    <option value="MM">Myanmar</option>
                                                    <option value="NA">Namibia</option>
                                                    <option value="NR">Nauru</option>
                                                    <option value="NP">Nepal</option>
                                                    <option value="NL">Netherlands</option>
                                                    <option value="NZ">New Zealand</option>
                                                    <option value="NI">Nicaragua</option>
                                                    <option value="NE">Niger</option>
                                                    <option value="NG">Nigeria</option>
                                                    <option value="NO">Norway</option>
                                                    <option value="OM">Oman</option>
                                                    <option value="PK">Pakistan</option>
                                                    <option value="PW">Palau</option>
                                                    <option value="PA">Panama</option>
                                                    <option value="PG">Papua New Guinea</option>
                                                    <option value="PY">Paraguay</option>
                                                    <option value="PE">Peru</option>
                                                    <option value="PH">Philippines</option>
                                                    <option value="PL">Poland</option>
                                                    <option value="PT">Portugal</option>
                                                    <option value="QA">Qatar</option>
                                                    <option value="RO">Romania</option>
                                                    <option value="RU">Russia</option>
                                                    <option value="RW">Rwanda</option>
                                                    <option value="WS">Samoa</option>
                                                    <option value="SM">San Marino</option>
                                                    <option value="SA">Saudi Arabia</option>
                                                    <option value="SN">Senegal</option>
                                                    <option value="RS">Serbia</option>
                                                    <option value="SC">Seychelles</option>
                                                    <option value="SL">Sierra Leone</option>
                                                    <option value="SG">Singapore</option>
                                                    <option value="SK">Slovakia</option>
                                                    <option value="SI">Slovenia</option>
                                                    <option value="SB">Solomon Islands</option>
                                                    <option value="SO">Somalia</option>
                                                    <option value="ZA">South Africa</option>
                                                    <option value="ES">Spain</option>
                                                    <option value="LK">Sri Lanka</option>
                                                    <option value="SD">Sudan</option>
                                                    <option value="SR">Suriname</option>
                                                    <option value="SE">Sweden</option>
                                                    <option value="CH">Switzerland</option>
                                                    <option value="SY">Syria</option>
                                                    <option value="TW">Taiwan</option>
                                                    <option value="TJ">Tajikistan</option>
                                                    <option value="TZ">Tanzania</option>
                                                    <option value="TH">Thailand</option>
                                                    <option value="TL">Timor-Leste</option>
                                                    <option value="TG">Togo</option>
                                                    <option value="TO">Tonga</option>
                                                    <option value="TT">Trinidad and Tobago</option>
                                                    <option value="TN">Tunisia</option>
                                                    <option value="TR">Turkey</option>
                                                    <option value="TM">Turkmenistan</option>
                                                    <option value="UG">Uganda</option>
                                                    <option value="UA">Ukraine</option>
                                                    <option value="AE">United Arab Emirates</option>
                                                    <option value="GB">United Kingdom</option>
                                                    <option value="US">United States</option>
                                                    <option value="UY">Uruguay</option>
                                                    <option value="UZ">Uzbekistan</option>
                                                    <option value="VU">Vanuatu</option>
                                                    <option value="VE">Venezuela</option>
                                                    <option value="VN">Vietnam</option>
                                                    <option value="YE">Yemen</option>
                                                    <option value="ZM">Zambia</option>
                                                    <option value="ZW">Zimbabwe</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor=""><h6>REGION/STATE</h6></label>
                                                <input type="text" value={addYTRegion} onChange={(e) => setAddYTRegion(e.target.value)} placeholder='Insert here if country was not available'/>
                                            </div>
                                        </div>
                                        <div className="admnpnlcprcayoutubechannel right">
                                            <div className="admnpnlcprcayoutubechannelrHeader">
                                                <div>
                                                    <label htmlFor=""><h6>NEWS YOUTUBE NAME</h6></label>
                                                    <input type="text" value={addYTName} onChange={(e) => setAddYTName(e.target.value)} placeholder='Ex. CNN YouTube'/>
                                                </div>
                                                <div>
                                                    <label htmlFor=""><h6>NEWS YOUTUBE CHANNEL DIRECT LINK</h6></label>
                                                    <input type="text" value={addYTLink} onChange={(e) => setAddYTLink(e.target.value)} placeholder='Insert link only.'/>
                                                </div>
                                                <div>
                                                    <label htmlFor=""><h6>NEWS CHANNEL YOUTUBE LOGO</h6></label>
                                                    <input type="text" value={addYTImageLogo} onChange={(e) => setAddYTImageLogo(e.target.value)} placeholder='Insert image link only.'/>
                                                </div>
                                            </div>
                                            <div className="admnpnlcprcayoutubechannelrContent">
                                                <div>
                                                    <label htmlFor=""><h6>NEWS CHANNEL DESCRIPTION</h6></label>
                                                    <textarea name="" id="" value={addYTDescription} onChange={(e) => setAddYTDescription(e.target.value)} placeholder='Type the news channel description here...'></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="admnpnlcprcayoutubechannelBtn">
                                        <p>{addTelecastResponse}</p>
                                        {addTelecastLoader ?
                                            <button><h6>ADDING...</h6></button>:
                                            <button onClick={publishYoutubeData}><h6>ADD YOUTUBE</h6></button>
                                        }
                                    </div>
                                </>}
                            </>}
                        </div>}
                        
                        {viewAddMagazineSec && <div className="admnpnlcprContainer addMagazine">
                            {!viewMagazineList ?
                                <button id="magazineList" onClick={() => setViewMagazineList(true)}><FaListAlt /></button>:
                                <button id="magazineList" onClick={() => setViewMagazineList(false)}><FaTimes /></button>
                            }
                            <h4>ADD ONLINE MAGAZINES</h4>
                            <p>Here, you can simultaneously add lastest magazines from local to famous magazine around the world.</p>
                            {viewMagazineList ? <>
                                <div className="admnpnlcprDataList">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th width='20%'><p>Magazine Name</p></th>
                                                <th width='20%'><p>Category</p></th>
                                                <th width='20%'><p>Continent</p></th>
                                                <th width='20%'><p>Country</p></th>
                                                <th width='20%'><p>Command</p></th>
                                            </tr>
                                        </thead>
                                    </table>
                                    <div className="admnpnlcprDataTable">
                                        {dataList?.viewAllMagazines?.length ? <>
                                            <table>
                                                <tbody>
                                                    {dataList?.viewAllMagazines?.map((details, i) => (
                                                        <tr key={i}>
                                                            <td width='20%'><p>{details?.magazine_name}</p></td>
                                                            <td width='20%'><p>{details?.magazine_category}</p></td>
                                                            <td width='20%'><p>{details?.continent}</p></td>
                                                            <td width='20%'><p>{details?.country}</p></td>
                                                            <td width='20%' className='tdCenter'>

                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </>:<>
                                            <div className="admnpnlcprDataTableEmpty">
                                                <span><p>THIS LIST IS EMPTY</p></span>
                                            </div>
                                        </>}
                                    </div>
                                </div>
                            </>:<>
                                <div className="admnpnlcprcAddMagazine">
                                    <div className="admnpnlcprcamagazine left">
                                        <div>
                                            <label htmlFor=""><h6>SELECT CONTINENT</h6></label>
                                            <select name="" id="" value={addMagazineContinent} onChange={(e) => setAddMagazineContinent(e.target.value)}>
                                                <option value="">Select Continent</option>
                                                <option value="N.America">N.America</option>
                                                <option value="S.America">S.America</option>
                                                <option value="Europe">Europe</option>
                                                <option value="Africa">Africa</option>
                                                <option value="Asia">Asia</option>
                                                <option value="Oceania">Oceania</option>
                                                <option value="Antarctica">Antarctica</option>  
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor=""><h6>COUNTRY</h6></label>
                                            <select name="" id="" value={addMagazineCountry} onChange={(e) => setAddMagazineCountry(e.target.value)}>
                                                <option value="">Select Country</option>
                                                <option value="AF">Afghanistan</option>
                                                <option value="AL">Albania</option>
                                                <option value="DZ">Algeria</option>
                                                <option value="AD">Andorra</option>
                                                <option value="AO">Angola</option>
                                                <option value="AG">Antigua and Barbuda</option>
                                                <option value="AR">Argentina</option>
                                                <option value="AM">Armenia</option>
                                                <option value="AU">Australia</option>
                                                <option value="AT">Austria</option>
                                                <option value="AZ">Azerbaijan</option>
                                                <option value="BS">Bahamas</option>
                                                <option value="BH">Bahrain</option>
                                                <option value="BD">Bangladesh</option>
                                                <option value="BB">Barbados</option>
                                                <option value="BY">Belarus</option>
                                                <option value="BE">Belgium</option>
                                                <option value="BZ">Belize</option>
                                                <option value="BJ">Benin</option>
                                                <option value="BT">Bhutan</option>
                                                <option value="BO">Bolivia</option>
                                                <option value="BA">Bosnia and Herzegovina</option>
                                                <option value="BW">Botswana</option>
                                                <option value="BR">Brazil</option>
                                                <option value="BN">Brunei</option>
                                                <option value="BG">Bulgaria</option>
                                                <option value="BF">Burkina Faso</option>
                                                <option value="BI">Burundi</option>
                                                <option value="CV">Cabo Verde</option>
                                                <option value="KH">Cambodia</option>
                                                <option value="CM">Cameroon</option>
                                                <option value="CA">Canada</option>
                                                <option value="CF">Central African Republic</option>
                                                <option value="TD">Chad</option>
                                                <option value="CL">Chile</option>
                                                <option value="CN">China</option>
                                                <option value="CO">Colombia</option>
                                                <option value="KM">Comoros</option>
                                                <option value="CD">Congo (Democratic Republic)</option>
                                                <option value="CG">Congo (Republic)</option>
                                                <option value="CR">Costa Rica</option>
                                                <option value="CI">Côte d'Ivoire</option>
                                                <option value="HR">Croatia</option>
                                                <option value="CU">Cuba</option>
                                                <option value="CY">Cyprus</option>
                                                <option value="CZ">Czechia</option>
                                                <option value="DK">Denmark</option>
                                                <option value="DJ">Djibouti</option>
                                                <option value="DM">Dominica</option>
                                                <option value="DO">Dominican Republic</option>
                                                <option value="EC">Ecuador</option>
                                                <option value="EG">Egypt</option>
                                                <option value="SV">El Salvador</option>
                                                <option value="GQ">Equatorial Guinea</option>
                                                <option value="ER">Eritrea</option>
                                                <option value="EE">Estonia</option>
                                                <option value="SZ">Eswatini</option>
                                                <option value="ET">Ethiopia</option>
                                                <option value="FJ">Fiji</option>
                                                <option value="FI">Finland</option>
                                                <option value="FR">France</option>
                                                <option value="GA">Gabon</option>
                                                <option value="GM">Gambia</option>
                                                <option value="GE">Georgia</option>
                                                <option value="DE">Germany</option>
                                                <option value="GH">Ghana</option>
                                                <option value="GR">Greece</option>
                                                <option value="GD">Grenada</option>
                                                <option value="GT">Guatemala</option>
                                                <option value="GN">Guinea</option>
                                                <option value="GW">Guinea-Bissau</option>
                                                <option value="GY">Guyana</option>
                                                <option value="HT">Haiti</option>
                                                <option value="HN">Honduras</option>
                                                <option value="HU">Hungary</option>
                                                <option value="IS">Iceland</option>
                                                <option value="IN">India</option>
                                                <option value="ID">Indonesia</option>
                                                <option value="IR">Iran</option>
                                                <option value="IQ">Iraq</option>
                                                <option value="IE">Ireland</option>
                                                <option value="IL">Israel</option>
                                                <option value="IT">Italy</option>
                                                <option value="JM">Jamaica</option>
                                                <option value="JP">Japan</option>
                                                <option value="JO">Jordan</option>
                                                <option value="KZ">Kazakhstan</option>
                                                <option value="KE">Kenya</option>
                                                <option value="KI">Kiribati</option>
                                                <option value="KP">Korea (North)</option>
                                                <option value="KR">Korea (South)</option>
                                                <option value="KW">Kuwait</option>
                                                <option value="KG">Kyrgyzstan</option>
                                                <option value="LA">Laos</option>
                                                <option value="LV">Latvia</option>
                                                <option value="LB">Lebanon</option>
                                                <option value="LS">Lesotho</option>
                                                <option value="LR">Liberia</option>
                                                <option value="LY">Libya</option>
                                                <option value="LI">Liechtenstein</option>
                                                <option value="LT">Lithuania</option>
                                                <option value="LU">Luxembourg</option>
                                                <option value="MG">Madagascar</option>
                                                <option value="MW">Malawi</option>
                                                <option value="MY">Malaysia</option>
                                                <option value="MV">Maldives</option>
                                                <option value="ML">Mali</option>
                                                <option value="MT">Malta</option>
                                                <option value="MH">Marshall Islands</option>
                                                <option value="MR">Mauritania</option>
                                                <option value="MU">Mauritius</option>
                                                <option value="MX">Mexico</option>
                                                <option value="FM">Micronesia</option>
                                                <option value="MD">Moldova</option>
                                                <option value="MC">Monaco</option>
                                                <option value="MN">Mongolia</option>
                                                <option value="ME">Montenegro</option>
                                                <option value="MA">Morocco</option>
                                                <option value="MZ">Mozambique</option>
                                                <option value="MM">Myanmar</option>
                                                <option value="NA">Namibia</option>
                                                <option value="NR">Nauru</option>
                                                <option value="NP">Nepal</option>
                                                <option value="NL">Netherlands</option>
                                                <option value="NZ">New Zealand</option>
                                                <option value="NI">Nicaragua</option>
                                                <option value="NE">Niger</option>
                                                <option value="NG">Nigeria</option>
                                                <option value="NO">Norway</option>
                                                <option value="OM">Oman</option>
                                                <option value="PK">Pakistan</option>
                                                <option value="PW">Palau</option>
                                                <option value="PA">Panama</option>
                                                <option value="PG">Papua New Guinea</option>
                                                <option value="PY">Paraguay</option>
                                                <option value="PE">Peru</option>
                                                <option value="PH">Philippines</option>
                                                <option value="PL">Poland</option>
                                                <option value="PT">Portugal</option>
                                                <option value="QA">Qatar</option>
                                                <option value="RO">Romania</option>
                                                <option value="RU">Russia</option>
                                                <option value="RW">Rwanda</option>
                                                <option value="WS">Samoa</option>
                                                <option value="SM">San Marino</option>
                                                <option value="SA">Saudi Arabia</option>
                                                <option value="SN">Senegal</option>
                                                <option value="RS">Serbia</option>
                                                <option value="SC">Seychelles</option>
                                                <option value="SL">Sierra Leone</option>
                                                <option value="SG">Singapore</option>
                                                <option value="SK">Slovakia</option>
                                                <option value="SI">Slovenia</option>
                                                <option value="SB">Solomon Islands</option>
                                                <option value="SO">Somalia</option>
                                                <option value="ZA">South Africa</option>
                                                <option value="ES">Spain</option>
                                                <option value="LK">Sri Lanka</option>
                                                <option value="SD">Sudan</option>
                                                <option value="SR">Suriname</option>
                                                <option value="SE">Sweden</option>
                                                <option value="CH">Switzerland</option>
                                                <option value="SY">Syria</option>
                                                <option value="TW">Taiwan</option>
                                                <option value="TJ">Tajikistan</option>
                                                <option value="TZ">Tanzania</option>
                                                <option value="TH">Thailand</option>
                                                <option value="TL">Timor-Leste</option>
                                                <option value="TG">Togo</option>
                                                <option value="TO">Tonga</option>
                                                <option value="TT">Trinidad and Tobago</option>
                                                <option value="TN">Tunisia</option>
                                                <option value="TR">Turkey</option>
                                                <option value="TM">Turkmenistan</option>
                                                <option value="UG">Uganda</option>
                                                <option value="UA">Ukraine</option>
                                                <option value="AE">United Arab Emirates</option>
                                                <option value="GB">United Kingdom</option>
                                                <option value="US">United States</option>
                                                <option value="UY">Uruguay</option>
                                                <option value="UZ">Uzbekistan</option>
                                                <option value="VU">Vanuatu</option>
                                                <option value="VE">Venezuela</option>
                                                <option value="VN">Vietnam</option>
                                                <option value="YE">Yemen</option>
                                                <option value="ZM">Zambia</option>
                                                <option value="ZW">Zimbabwe</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor=""><h6>MAGAZINE CATEGORY</h6></label>
                                            <select name="" id="" value={addMagazineCategory} onChange={(e) => setAddMagazineCategory(e.target.value)}>
                                                <option value="">Select Category</option>
                                                <option value="Art Magazine">Art Magazine</option>
                                                <option value="Boat Magazine">Boat Magazine</option>
                                                <option value="Business Magazine">Business Magazine</option>
                                                <option value="Car Magazine">Car Magazine</option>
                                                <option value="Children Magazine">Children Magazine</option>
                                                <option value="Computer Magazine">Computer Magazine</option>
                                                <option value="Cooking Magazine">Cooking Magazine</option>
                                                <option value="Cruise Magazine">Cruise Magazine</option>
                                                <option value="Education Magazine">Education Magazine</option>
                                                <option value="Entertainment Magazine">Entertainment Magazine</option>
                                                <option value="Fashion Magazine">Fashion Magazine</option>
                                                <option value="Finance and Money Magazine">Finance and Money Magazine</option>
                                                <option value="Health Magazine">Health Magazine</option>
                                                <option value="History Magazine">History Magazine</option>
                                                <option value="Home Magazine">Home Magazine</option>
                                                <option value="Music Magazine">Music Magazine</option>
                                                <option value="Pet Magazine">Pet Magazine</option>
                                                <option value="Photography Magazine">Photography Magazine</option>
                                                <option value="Sports Magazine">Sports Magazine</option>
                                                <option value="Travel Magazine">Travel Magazine</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="admnpnlcprcamagazine right">
                                        <div className="admnpnlcprcamagazinerHeader">
                                            <div>
                                                <label htmlFor=""><h6>MAGAZINE NAME</h6></label>
                                                <input type="text" value={addMagazineName} onChange={(e) => setAddMagazineName(e.target.value)} placeholder='Ex. Times Magazine'/>
                                            </div>
                                            <div>
                                                <label htmlFor=""><h6>MAGAZINE WEBSITE DIRECT LINK</h6></label>
                                                <input type="text" value={addMagazineLink} onChange={(e) => setAddMagazineLink(e.target.value)} placeholder='Insert link only.'/>
                                            </div>
                                        </div>
                                        <div className="admnpnlcprcamagazinerContent">
                                            <div>
                                                <label htmlFor=""><h6>MAGAZINE DESCRIPTION</h6></label>
                                                <textarea name="" id="" value={addMagazineDescription} placeholder='Type the magazine description here...' onChange={(e) => setAddMagazineDescription(e.target.value)}></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="admnpnlcprcamagazineBtn">
                                    <p>{addMagazineResponse}</p>
                                    {addMagazineLoader ?
                                        <button><h6>ADDING...</h6></button>:
                                        <button onClick={publishMagazineData}><h6>ADD MAGAZINE</h6></button>
                                    }
                                </div>
                            </>}
                        </div>}

                        {viewAddNewspaperSec && <div className="admnpnlcprContainer addNewspaper">
                            {!viewNewspaperList ?
                                <button id="newspaperList" onClick={() => setViewNewspaperList(true)}><FaListAlt /></button>:
                                <button id="newspaperList" onClick={() => setViewNewspaperList(false)}><FaTimes /></button>
                            }
                            <h4>ADD ONLINE NEWSPAPER</h4>
                            <p>Here, you can simultaneously add lastest newspaper from local to famous newspaper publisher around the world.</p>
                            {viewNewspaperList ? <>
                                <div className="admnpnlcprDataList">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th width='20%'><p>Newspaper Name</p></th>
                                                <th width='20%'><p>Category</p></th>
                                                <th width='20%'><p>Continent</p></th>
                                                <th width='20%'><p>Country</p></th>
                                                <th width='20%'><p>Command</p></th>
                                            </tr>
                                        </thead>
                                    </table>
                                    <div className="admnpnlcprDataTable">
                                        {dataList?.viewAllNewspapers?.length ? <>
                                            <table>
                                                <tbody>
                                                    {dataList?.viewAllNewspapers?.map((details, i) => (
                                                        <tr key={i}>
                                                            <td width='20%'><p>{details?.newspaper_name}</p></td>
                                                            <td width='20%'><p>{details?.newspaper_category}</p></td>
                                                            <td width='20%'><p>{details?.continent}</p></td>
                                                            <td width='20%'><p>{details?.country}</p></td>
                                                            <td width='20%' className='tdCenter'>

                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </>:<>
                                            <div className="admnpnlcprDataTableEmpty">
                                                <span><p>THIS LIST IS EMPTY</p></span>
                                            </div>
                                        </>}
                                    </div>
                                </div>
                            </>:<>
                                <div className="admnpnlcprcAddNewspaper">
                                    <div className="admnpnlcprcanewspaper left">
                                        <div>
                                            <label htmlFor=""><h6>SELECT CONTINENT</h6></label>
                                            <select name="" id="" value={addNewspaperContinent} onChange={(e) => setAddNewspaperContinent(e.target.value)}>
                                                <option value="">Select Continent</option>
                                                <option value="N.America">N.America</option>
                                                <option value="S.America">S.America</option>
                                                <option value="Europe">Europe</option>
                                                <option value="Africa">Africa</option>
                                                <option value="Asia">Asia</option>
                                                <option value="Oceania">Oceania</option>
                                                <option value="Antarctica">Antarctica</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor=""><h6>SELECT SUB CONTINENT</h6></label>
                                            <select name="" id="" value={addNewspaperSubContinent} onChange={(e) => addNewspaperSubContinent(e.target.value)}>
                                                <option value="">Select Sub-Continent</option>
                                                <option value="Northern Africa">Northern Africa</option>
                                                <option value="Sub-Saharan Africa">Sub-Saharan Africa</option>
                                                <option value="Northern Asia">Northern Asia</option>
                                                <option value="Central Asia">Central Asia</option>
                                                <option value="Western Asia">Western Asia</option>
                                                <option value="South Asia">South Asia</option>
                                                <option value="East Asia">East Asia</option>
                                                <option value="Southeast Asia">Southeast Asia</option>
                                                <option value="Northern Europe">Northern Europe</option>
                                                <option value="Western Europe">Western Europe</option>
                                                <option value="Eastern Europe">Eastern Europe</option>
                                                <option value="Southern Europe">Southern Europe</option>
                                                <option value="Northern America">Northern America</option>
                                                <option value="Central America">Central America</option>
                                                <option value="The Caribbean">The Caribbean</option>
                                                <option value="Andean States">Andean States</option>
                                                <option value="Southern Cone">Southern Cone</option>
                                                <option value="Brazil">Brazil</option>
                                                <option value="The Guianas">The Guianas</option>
                                                <option value="Australasia">Australasia</option>
                                                <option value="Melanesia">Melanesia</option>
                                                <option value="Micronesia">Micronesia</option>
                                                <option value="Polynesia">Polynesia</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor=""><h6>COUNTRY</h6></label>
                                            <select name="" id="" value={addNewspaperCountry} onChange={(e) => setAddNewspaperCountry(e.target.value)}>
                                                <option value="">Select Country</option>
                                                <option value="AF">Afghanistan</option>
                                                <option value="AL">Albania</option>
                                                <option value="DZ">Algeria</option>
                                                <option value="AD">Andorra</option>
                                                <option value="AO">Angola</option>
                                                <option value="AG">Antigua and Barbuda</option>
                                                <option value="AR">Argentina</option>
                                                <option value="AM">Armenia</option>
                                                <option value="AU">Australia</option>
                                                <option value="AT">Austria</option>
                                                <option value="AZ">Azerbaijan</option>
                                                <option value="BS">Bahamas</option>
                                                <option value="BH">Bahrain</option>
                                                <option value="BD">Bangladesh</option>
                                                <option value="BB">Barbados</option>
                                                <option value="BY">Belarus</option>
                                                <option value="BE">Belgium</option>
                                                <option value="BZ">Belize</option>
                                                <option value="BJ">Benin</option>
                                                <option value="BT">Bhutan</option>
                                                <option value="BO">Bolivia</option>
                                                <option value="BA">Bosnia and Herzegovina</option>
                                                <option value="BW">Botswana</option>
                                                <option value="BR">Brazil</option>
                                                <option value="BN">Brunei</option>
                                                <option value="BG">Bulgaria</option>
                                                <option value="BF">Burkina Faso</option>
                                                <option value="BI">Burundi</option>
                                                <option value="CV">Cabo Verde</option>
                                                <option value="KH">Cambodia</option>
                                                <option value="CM">Cameroon</option>
                                                <option value="CA">Canada</option>
                                                <option value="CF">Central African Republic</option>
                                                <option value="TD">Chad</option>
                                                <option value="CL">Chile</option>
                                                <option value="CN">China</option>
                                                <option value="CO">Colombia</option>
                                                <option value="KM">Comoros</option>
                                                <option value="CD">Congo (Democratic Republic)</option>
                                                <option value="CG">Congo (Republic)</option>
                                                <option value="CR">Costa Rica</option>
                                                <option value="CI">Côte d'Ivoire</option>
                                                <option value="HR">Croatia</option>
                                                <option value="CU">Cuba</option>
                                                <option value="CY">Cyprus</option>
                                                <option value="CZ">Czechia</option>
                                                <option value="DK">Denmark</option>
                                                <option value="DJ">Djibouti</option>
                                                <option value="DM">Dominica</option>
                                                <option value="DO">Dominican Republic</option>
                                                <option value="EC">Ecuador</option>
                                                <option value="EG">Egypt</option>
                                                <option value="SV">El Salvador</option>
                                                <option value="GQ">Equatorial Guinea</option>
                                                <option value="ER">Eritrea</option>
                                                <option value="EE">Estonia</option>
                                                <option value="SZ">Eswatini</option>
                                                <option value="ET">Ethiopia</option>
                                                <option value="FJ">Fiji</option>
                                                <option value="FI">Finland</option>
                                                <option value="FR">France</option>
                                                <option value="GA">Gabon</option>
                                                <option value="GM">Gambia</option>
                                                <option value="GE">Georgia</option>
                                                <option value="DE">Germany</option>
                                                <option value="GH">Ghana</option>
                                                <option value="GR">Greece</option>
                                                <option value="GD">Grenada</option>
                                                <option value="GT">Guatemala</option>
                                                <option value="GN">Guinea</option>
                                                <option value="GW">Guinea-Bissau</option>
                                                <option value="GY">Guyana</option>
                                                <option value="HT">Haiti</option>
                                                <option value="HN">Honduras</option>
                                                <option value="HU">Hungary</option>
                                                <option value="IS">Iceland</option>
                                                <option value="IN">India</option>
                                                <option value="ID">Indonesia</option>
                                                <option value="IR">Iran</option>
                                                <option value="IQ">Iraq</option>
                                                <option value="IE">Ireland</option>
                                                <option value="IL">Israel</option>
                                                <option value="IT">Italy</option>
                                                <option value="JM">Jamaica</option>
                                                <option value="JP">Japan</option>
                                                <option value="JO">Jordan</option>
                                                <option value="KZ">Kazakhstan</option>
                                                <option value="KE">Kenya</option>
                                                <option value="KI">Kiribati</option>
                                                <option value="KP">Korea (North)</option>
                                                <option value="KR">Korea (South)</option>
                                                <option value="KW">Kuwait</option>
                                                <option value="KG">Kyrgyzstan</option>
                                                <option value="LA">Laos</option>
                                                <option value="LV">Latvia</option>
                                                <option value="LB">Lebanon</option>
                                                <option value="LS">Lesotho</option>
                                                <option value="LR">Liberia</option>
                                                <option value="LY">Libya</option>
                                                <option value="LI">Liechtenstein</option>
                                                <option value="LT">Lithuania</option>
                                                <option value="LU">Luxembourg</option>
                                                <option value="MG">Madagascar</option>
                                                <option value="MW">Malawi</option>
                                                <option value="MY">Malaysia</option>
                                                <option value="MV">Maldives</option>
                                                <option value="ML">Mali</option>
                                                <option value="MT">Malta</option>
                                                <option value="MH">Marshall Islands</option>
                                                <option value="MR">Mauritania</option>
                                                <option value="MU">Mauritius</option>
                                                <option value="MX">Mexico</option>
                                                <option value="FM">Micronesia</option>
                                                <option value="MD">Moldova</option>
                                                <option value="MC">Monaco</option>
                                                <option value="MN">Mongolia</option>
                                                <option value="ME">Montenegro</option>
                                                <option value="MA">Morocco</option>
                                                <option value="MZ">Mozambique</option>
                                                <option value="MM">Myanmar</option>
                                                <option value="NA">Namibia</option>
                                                <option value="NR">Nauru</option>
                                                <option value="NP">Nepal</option>
                                                <option value="NL">Netherlands</option>
                                                <option value="NZ">New Zealand</option>
                                                <option value="NI">Nicaragua</option>
                                                <option value="NE">Niger</option>
                                                <option value="NG">Nigeria</option>
                                                <option value="NO">Norway</option>
                                                <option value="OM">Oman</option>
                                                <option value="PK">Pakistan</option>
                                                <option value="PW">Palau</option>
                                                <option value="PA">Panama</option>
                                                <option value="PG">Papua New Guinea</option>
                                                <option value="PY">Paraguay</option>
                                                <option value="PE">Peru</option>
                                                <option value="PH">Philippines</option>
                                                <option value="PL">Poland</option>
                                                <option value="PT">Portugal</option>
                                                <option value="QA">Qatar</option>
                                                <option value="RO">Romania</option>
                                                <option value="RU">Russia</option>
                                                <option value="RW">Rwanda</option>
                                                <option value="WS">Samoa</option>
                                                <option value="SM">San Marino</option>
                                                <option value="SA">Saudi Arabia</option>
                                                <option value="SN">Senegal</option>
                                                <option value="RS">Serbia</option>
                                                <option value="SC">Seychelles</option>
                                                <option value="SL">Sierra Leone</option>
                                                <option value="SG">Singapore</option>
                                                <option value="SK">Slovakia</option>
                                                <option value="SI">Slovenia</option>
                                                <option value="SB">Solomon Islands</option>
                                                <option value="SO">Somalia</option>
                                                <option value="ZA">South Africa</option>
                                                <option value="ES">Spain</option>
                                                <option value="LK">Sri Lanka</option>
                                                <option value="SD">Sudan</option>
                                                <option value="SR">Suriname</option>
                                                <option value="SE">Sweden</option>
                                                <option value="CH">Switzerland</option>
                                                <option value="SY">Syria</option>
                                                <option value="TW">Taiwan</option>
                                                <option value="TJ">Tajikistan</option>
                                                <option value="TZ">Tanzania</option>
                                                <option value="TH">Thailand</option>
                                                <option value="TL">Timor-Leste</option>
                                                <option value="TG">Togo</option>
                                                <option value="TO">Tonga</option>
                                                <option value="TT">Trinidad and Tobago</option>
                                                <option value="TN">Tunisia</option>
                                                <option value="TR">Turkey</option>
                                                <option value="TM">Turkmenistan</option>
                                                <option value="UG">Uganda</option>
                                                <option value="UA">Ukraine</option>
                                                <option value="AE">United Arab Emirates</option>
                                                <option value="GB">United Kingdom</option>
                                                <option value="US">United States</option>
                                                <option value="UY">Uruguay</option>
                                                <option value="UZ">Uzbekistan</option>
                                                <option value="VU">Vanuatu</option>
                                                <option value="VE">Venezuela</option>
                                                <option value="VN">Vietnam</option>
                                                <option value="YE">Yemen</option>
                                                <option value="ZM">Zambia</option>
                                                <option value="ZW">Zimbabwe</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor=""><h6>NEWSPAPER CATEGORY</h6></label>
                                            <select name="" id="" value={addNewspaperCategory} onChange={(e) => setAddNewspaperCategory(e.target.value)}>
                                                <option value="">Select Category</option>
                                                <option value="Alternative Newspaper">Alternative Newspaper</option>
                                                <option value="College Newspaper">College Newspaper</option>
                                                <option value="Local Newspaper">Local Newspaper</option>
                                                <option value="World Newspaper">World Newspaper</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="admnpnlcprcanewspaper right">
                                        <div className="admnpnlcprcanewspaperrHeader">
                                            <div>
                                                <label htmlFor=""><h6>NEWSPAPER NAME</h6></label>
                                                <input type="text" value={addNewspaperName} onChange={(e) => setAddNewspaperName(e.target.value)} placeholder='Ex. Times Magazine'/>
                                            </div>
                                            <div>
                                                <label htmlFor=""><h6>NEWSPAPER WEBSITE DIRECT LINK</h6></label>
                                                <input type="text" value={addNewspaperLink} onChange={(e) => setAddNewspaperLink(e.target.value)} placeholder='Insert link only.'/>
                                            </div>
                                        </div>
                                        <div className="admnpnlcprcanewspaperrContent">
                                            <div>
                                                <label htmlFor=""><h6>NEWSPAPER DESCRIPTION</h6></label>
                                                <textarea name="" id="" value={addNewspaperDescription} placeholder='Type the newspaper description here...' onChange={(e) => setAddNewspaperDescription(e.target.value)}></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="admnpnlcprcanewspaperBtn">
                                    <p>{addNewspaperResponse}</p>
                                    {addNewspaperLoader ?
                                        <button><h6>ADDING...</h6></button>:
                                        <button onClick={publishNewspaperData}><h6>ADD NEWSPAPER</h6></button>
                                    }
                                </div>
                            </>}
                        </div>}

                        {viewAddRestaurantSec && <div className="admnpnlcprContainer addRestaurant">
                            {!viewRestaurantList ?
                                <button id="restaurantList" onClick={() => setViewRestaurantList(true)}><FaListAlt /></button>:
                                <button id="restaurantList" onClick={() => setViewRestaurantList(false)}><FaTimes /></button>
                            }
                            <h4>ADD RESTAURANT</h4>
                            <p>Here, you can simultaneously add reataurant from local to famous 5 star restaurant around the world.</p>
                            {viewRestaurantList ? <>
                                <div className="admnpnlcprDataList">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th width='20%'><p>Restaurant Name</p></th>
                                                <th width='20%'><p>Category</p></th>
                                                <th width='20%'><p>Continent</p></th>
                                                <th width='20%'><p>Country</p></th>
                                                <th width='20%'><p>Command</p></th>
                                            </tr>
                                        </thead>
                                    </table>
                                    <div className="admnpnlcprDataTable">
                                        {dataList?.viewAllRestaurants?.length ? <>
                                            <table>
                                                <tbody>
                                                    {dataList?.viewAllRestaurants?.map((details, i) => (
                                                        <tr key={i}>
                                                            <td width='20%'><p>{details?.restaurant_name}</p></td>
                                                            <td width='20%'><p>{details?.restaurant_category}</p></td>
                                                            <td width='20%'><p>{details?.continent}</p></td>
                                                            <td width='20%'><p>{details?.country}</p></td>
                                                            <td width='20%' className='tdCenter'>

                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </>:<>
                                            <div className="admnpnlcprDataTableEmpty">
                                                <span><p>THIS LIST IS EMPTY</p></span>
                                            </div>
                                        </>}
                                    </div>
                                </div>
                            </>:<>
                                <div className="admnpnlcprcAddRestaurant">
                                    <div className="admnpnlcprcarestaurant left">
                                        <div>
                                            <label htmlFor=""><h6>SELECT CONTINENT</h6></label>
                                            <select name="" id="" value={addRestaurantContinent} onChange={(e) => setAddRestaurantContinent(e.target.value)}>
                                                <option value="">Select Continent</option>
                                                <option value="N.America">N.America</option>
                                                <option value="S.America">S.America</option>
                                                <option value="Europe">Europe</option>
                                                <option value="Africa">Africa</option>
                                                <option value="Asia">Asia</option>
                                                <option value="Oceania">Oceania</option>
                                                <option value="Antarctica">Antarctica</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor=""><h6>SELECT SUB CONTINENT</h6></label>
                                            <select name="" id="" value={addRestaurantSubContinent} onChange={(e) => setAddRestaurantSubContinent(e.target.value)}>
                                            <option value="">Select Sub-Continent</option>
                                                <option value="Northern Africa">Northern Africa</option>
                                                <option value="Sub-Saharan Africa">Sub-Saharan Africa</option>
                                                <option value="Northern Asia">Northern Asia</option>
                                                <option value="Central Asia">Central Asia</option>
                                                <option value="Western Asia">Western Asia</option>
                                                <option value="South Asia">South Asia</option>
                                                <option value="East Asia">East Asia</option>
                                                <option value="Southeast Asia">Southeast Asia</option>
                                                <option value="Northern Europe">Northern Europe</option>
                                                <option value="Western Europe">Western Europe</option>
                                                <option value="Eastern Europe">Eastern Europe</option>
                                                <option value="Southern Europe">Southern Europe</option>
                                                <option value="Northern America">Northern America</option>
                                                <option value="Central America">Central America</option>
                                                <option value="The Caribbean">The Caribbean</option>
                                                <option value="Andean States">Andean States</option>
                                                <option value="Southern Cone">Southern Cone</option>
                                                <option value="Brazil">Brazil</option>
                                                <option value="The Guianas">The Guianas</option>
                                                <option value="Australasia">Australasia</option>
                                                <option value="Melanesia">Melanesia</option>
                                                <option value="Micronesia">Micronesia</option>
                                                <option value="Polynesia">Polynesia</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor=""><h6>COUNTRY</h6></label>
                                            <select name="" id="" value={addRestaurantCountry} onChange={(e) => setAddRestaurantCountry(e.target.value)}>
                                                <option value="">Select Country</option>
                                                <option value="AF">Afghanistan</option>
                                                <option value="AL">Albania</option>
                                                <option value="DZ">Algeria</option>
                                                <option value="AD">Andorra</option>
                                                <option value="AO">Angola</option>
                                                <option value="AG">Antigua and Barbuda</option>
                                                <option value="AR">Argentina</option>
                                                <option value="AM">Armenia</option>
                                                <option value="AU">Australia</option>
                                                <option value="AT">Austria</option>
                                                <option value="AZ">Azerbaijan</option>
                                                <option value="BS">Bahamas</option>
                                                <option value="BH">Bahrain</option>
                                                <option value="BD">Bangladesh</option>
                                                <option value="BB">Barbados</option>
                                                <option value="BY">Belarus</option>
                                                <option value="BE">Belgium</option>
                                                <option value="BZ">Belize</option>
                                                <option value="BJ">Benin</option>
                                                <option value="BT">Bhutan</option>
                                                <option value="BO">Bolivia</option>
                                                <option value="BA">Bosnia and Herzegovina</option>
                                                <option value="BW">Botswana</option>
                                                <option value="BR">Brazil</option>
                                                <option value="BN">Brunei</option>
                                                <option value="BG">Bulgaria</option>
                                                <option value="BF">Burkina Faso</option>
                                                <option value="BI">Burundi</option>
                                                <option value="CV">Cabo Verde</option>
                                                <option value="KH">Cambodia</option>
                                                <option value="CM">Cameroon</option>
                                                <option value="CA">Canada</option>
                                                <option value="CF">Central African Republic</option>
                                                <option value="TD">Chad</option>
                                                <option value="CL">Chile</option>
                                                <option value="CN">China</option>
                                                <option value="CO">Colombia</option>
                                                <option value="KM">Comoros</option>
                                                <option value="CD">Congo (Democratic Republic)</option>
                                                <option value="CG">Congo (Republic)</option>
                                                <option value="CR">Costa Rica</option>
                                                <option value="CI">Côte d'Ivoire</option>
                                                <option value="HR">Croatia</option>
                                                <option value="CU">Cuba</option>
                                                <option value="CY">Cyprus</option>
                                                <option value="CZ">Czechia</option>
                                                <option value="DK">Denmark</option>
                                                <option value="DJ">Djibouti</option>
                                                <option value="DM">Dominica</option>
                                                <option value="DO">Dominican Republic</option>
                                                <option value="EC">Ecuador</option>
                                                <option value="EG">Egypt</option>
                                                <option value="SV">El Salvador</option>
                                                <option value="GQ">Equatorial Guinea</option>
                                                <option value="ER">Eritrea</option>
                                                <option value="EE">Estonia</option>
                                                <option value="SZ">Eswatini</option>
                                                <option value="ET">Ethiopia</option>
                                                <option value="FJ">Fiji</option>
                                                <option value="FI">Finland</option>
                                                <option value="FR">France</option>
                                                <option value="GA">Gabon</option>
                                                <option value="GM">Gambia</option>
                                                <option value="GE">Georgia</option>
                                                <option value="DE">Germany</option>
                                                <option value="GH">Ghana</option>
                                                <option value="GR">Greece</option>
                                                <option value="GD">Grenada</option>
                                                <option value="GT">Guatemala</option>
                                                <option value="GN">Guinea</option>
                                                <option value="GW">Guinea-Bissau</option>
                                                <option value="GY">Guyana</option>
                                                <option value="HT">Haiti</option>
                                                <option value="HN">Honduras</option>
                                                <option value="HU">Hungary</option>
                                                <option value="IS">Iceland</option>
                                                <option value="IN">India</option>
                                                <option value="ID">Indonesia</option>
                                                <option value="IR">Iran</option>
                                                <option value="IQ">Iraq</option>
                                                <option value="IE">Ireland</option>
                                                <option value="IL">Israel</option>
                                                <option value="IT">Italy</option>
                                                <option value="JM">Jamaica</option>
                                                <option value="JP">Japan</option>
                                                <option value="JO">Jordan</option>
                                                <option value="KZ">Kazakhstan</option>
                                                <option value="KE">Kenya</option>
                                                <option value="KI">Kiribati</option>
                                                <option value="KP">Korea (North)</option>
                                                <option value="KR">Korea (South)</option>
                                                <option value="KW">Kuwait</option>
                                                <option value="KG">Kyrgyzstan</option>
                                                <option value="LA">Laos</option>
                                                <option value="LV">Latvia</option>
                                                <option value="LB">Lebanon</option>
                                                <option value="LS">Lesotho</option>
                                                <option value="LR">Liberia</option>
                                                <option value="LY">Libya</option>
                                                <option value="LI">Liechtenstein</option>
                                                <option value="LT">Lithuania</option>
                                                <option value="LU">Luxembourg</option>
                                                <option value="MG">Madagascar</option>
                                                <option value="MW">Malawi</option>
                                                <option value="MY">Malaysia</option>
                                                <option value="MV">Maldives</option>
                                                <option value="ML">Mali</option>
                                                <option value="MT">Malta</option>
                                                <option value="MH">Marshall Islands</option>
                                                <option value="MR">Mauritania</option>
                                                <option value="MU">Mauritius</option>
                                                <option value="MX">Mexico</option>
                                                <option value="FM">Micronesia</option>
                                                <option value="MD">Moldova</option>
                                                <option value="MC">Monaco</option>
                                                <option value="MN">Mongolia</option>
                                                <option value="ME">Montenegro</option>
                                                <option value="MA">Morocco</option>
                                                <option value="MZ">Mozambique</option>
                                                <option value="MM">Myanmar</option>
                                                <option value="NA">Namibia</option>
                                                <option value="NR">Nauru</option>
                                                <option value="NP">Nepal</option>
                                                <option value="NL">Netherlands</option>
                                                <option value="NZ">New Zealand</option>
                                                <option value="NI">Nicaragua</option>
                                                <option value="NE">Niger</option>
                                                <option value="NG">Nigeria</option>
                                                <option value="NO">Norway</option>
                                                <option value="OM">Oman</option>
                                                <option value="PK">Pakistan</option>
                                                <option value="PW">Palau</option>
                                                <option value="PA">Panama</option>
                                                <option value="PG">Papua New Guinea</option>
                                                <option value="PY">Paraguay</option>
                                                <option value="PE">Peru</option>
                                                <option value="PH">Philippines</option>
                                                <option value="PL">Poland</option>
                                                <option value="PT">Portugal</option>
                                                <option value="QA">Qatar</option>
                                                <option value="RO">Romania</option>
                                                <option value="RU">Russia</option>
                                                <option value="RW">Rwanda</option>
                                                <option value="WS">Samoa</option>
                                                <option value="SM">San Marino</option>
                                                <option value="SA">Saudi Arabia</option>
                                                <option value="SN">Senegal</option>
                                                <option value="RS">Serbia</option>
                                                <option value="SC">Seychelles</option>
                                                <option value="SL">Sierra Leone</option>
                                                <option value="SG">Singapore</option>
                                                <option value="SK">Slovakia</option>
                                                <option value="SI">Slovenia</option>
                                                <option value="SB">Solomon Islands</option>
                                                <option value="SO">Somalia</option>
                                                <option value="ZA">South Africa</option>
                                                <option value="ES">Spain</option>
                                                <option value="LK">Sri Lanka</option>
                                                <option value="SD">Sudan</option>
                                                <option value="SR">Suriname</option>
                                                <option value="SE">Sweden</option>
                                                <option value="CH">Switzerland</option>
                                                <option value="SY">Syria</option>
                                                <option value="TW">Taiwan</option>
                                                <option value="TJ">Tajikistan</option>
                                                <option value="TZ">Tanzania</option>
                                                <option value="TH">Thailand</option>
                                                <option value="TL">Timor-Leste</option>
                                                <option value="TG">Togo</option>
                                                <option value="TO">Tonga</option>
                                                <option value="TT">Trinidad and Tobago</option>
                                                <option value="TN">Tunisia</option>
                                                <option value="TR">Turkey</option>
                                                <option value="TM">Turkmenistan</option>
                                                <option value="UG">Uganda</option>
                                                <option value="UA">Ukraine</option>
                                                <option value="AE">United Arab Emirates</option>
                                                <option value="GB">United Kingdom</option>
                                                <option value="US">United States</option>
                                                <option value="UY">Uruguay</option>
                                                <option value="UZ">Uzbekistan</option>
                                                <option value="VU">Vanuatu</option>
                                                <option value="VE">Venezuela</option>
                                                <option value="VN">Vietnam</option>
                                                <option value="YE">Yemen</option>
                                                <option value="ZM">Zambia</option>
                                                <option value="ZW">Zimbabwe</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor=""><h6>REGION/STATE</h6></label>
                                            <input type="text" value={addRestaurantRegion} onChange={(e) => setAddRestaurantRegion(e.target.value)} placeholder='Insert here if country was not available'/>
                                        </div>
                                        <div>
                                            <label htmlFor=""><h6>CITY/PROVINCE</h6></label>
                                            <input type="text" value={addRestaurantCity} onChange={(e) => setAddRestaurantCity(e.target.value)} placeholder='Located City or Province'/>
                                        </div>
                                        <div>
                                            <label htmlFor=""><h6>RESTAURANT CATEGORY</h6></label>
                                            <select name="" id="" value={addRestaurantCategory} onChange={(e) => setAddRestaurantCategory(e.target.value)}>
                                                <option value="">Select Category</option>
                                                <option value="Expensive Res">Expensive Restaurants</option>
                                                <option value="Famous Res">Famous Restaurants</option>
                                                <option value="Classic Res">Classic Restaurants</option>
                                                <option value="Unique Res">Unique Restaurants</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="admnpnlcprcarestaurant right">
                                        <div className="admnpnlcprcarestaurantrHeader">
                                            <div>
                                                <label htmlFor=""><h6>RESTAURANT NAME</h6></label>
                                                <input type="text" value={addRestaurantName} onChange={(e) => setAddRestaurantName(e.target.value)} placeholder='Ex. Vue De Monde'/>
                                            </div>
                                            <div>
                                                <label htmlFor=""><h6>RESTAURANT WEBSITE DIRECT LINK</h6></label>
                                                <input type="text" value={addRestaurantLink} onChange={(e) => setAddRestaurantLink(e.target.value)} placeholder='Insert link only.'/>
                                            </div>
                                        </div>
                                        <div className="admnpnlcprcarestaurantrContent">
                                            <div>
                                                <label htmlFor=""><h6>RESTAURANT DESCRIPTION</h6></label>
                                                <textarea name="" id="" value={addRestaurantDescription} placeholder='Type the restaurant description here...' onChange={(e) => setAddRestaurantDescription(e.target.value)}></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="admnpnlcprcarestaurantBtn">
                                    <p>{addRestaurantResponse}</p>
                                    {addRestaurantLoader ?
                                        <button><h6>ADDING...</h6></button>:
                                        <button onClick={publishRestaurantData}><h6>ADD RESTAURANT</h6></button>
                                    }
                                </div>
                            </>}
                        </div>}




                    </div>
                </div>
            </section>
        </div>
    )
}

export default AdminPanel