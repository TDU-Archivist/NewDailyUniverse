import React, { createContext, useContext, useState, useEffect } from 'react';
import CountriesBest from '../JSON/CountriesBest.json'
import axios from 'axios';

const MainDataContext = createContext();

export const MainDataLoadProvider = ({ children }) => {
    const userLoggedIn = localStorage.getItem('isLoggedIn');
    const StoredUserID = localStorage.getItem('tduProfileUserID');
    const StoredUserData = localStorage.getItem('tduProfileAccount')
    const StoredUserDataJSON = JSON.parse(StoredUserData)
    

    const [webLoader, setWebLoader] = useState(false);
    const [createTDUAccount, setCreateTDUAccount] = useState(false);
    const [loginTDUAccount, setLoginTDUAccount] = useState(false);
    const [pickedCountryModal, setPickedCountryModal] = useState(false);
    const [pickedCountry, setPickedCountry] = useState('');
    const [exchangeRates, setExchangeRates] = useState({});
    const [countryData, setCountryData] = useState(null);
    const [countryDescription, setCountryDescription] = useState(null);
    const [countryCurrency, setCountryCurrency] = useState([]);
    const [countryThreeTouristSpots, setCountryThreeTouristSpots] = useState([]);

    const [clickedCountry, setClickedCountry] = useState(null);
    const [viewPickCapital, setViewPickCapital] = useState(false);
    const [viewCountryCapital, setViewCountryCapital] = useState([]);

    
    const [switchFullMap, setSwitchFullMap] = useState(false);
    const [openSuggestedMapTopic, setOpenSuggestedMapTopic] = useState(true);
    const [fullMapPickedCountry, setFullMapPickedCountry] = useState(false);

    const [viewAllArticles, setViewAllArticles] = useState([]);
    const [viewAllCapitals, setViewAllCapitals] = useState([]);
    const [viewAllWriters, setViewAllWriters] = useState([]);
    const [viewAllAirlines, setViewAllAirlines] = useState([]);
    const [viewAllAirports, setViewAllAirports] = useState([]);
    const [viewAllLiveChannels, setViewAllLiveChannels] = useState([]);
    const [viewAllYoutubeChannels, setViewAllYoutubeChannels] = useState([]);
    const [viewAllMagazines, setViewAllMagazines] = useState([]);
    const [viewAllNewspapers, setViewAllNewspapers] = useState([]);
    const [viewAllRestaurants, setViewAllRestaurants] = useState([]);

    const tduFetchAllArticlesAPI = process.env.REACT_APP_TDU_FETCH_ARTICLE_API;
    const tduFetchAllCapitalsAPI = process.env.REACT_APP_TDU_FETCH_CAPITALS_API;
    const tduFetchAllWrittersAPI = process.env.REACT_APP_TDU_FETCH_WRITERS_LIST_API;
    const tduFetchAllAirlinesAPI = process.env.REACT_APP_TDU_FETCH_AIRLINES_API;
    const tduFetchAllAirportsAPI = process.env.REACT_APP_TDU_FETCH_AIRPORTS_API;
    const tduFetchAllLiveChannelsAPI = process.env.REACT_APP_TDU_FETCH_LIVECHANNELS_API;
    const tduFetchAllYoutubeChannelsAPI = process.env.REACT_APP_TDU_FETCH_YOUTUBECHANNELS_API;
    const tduFetchAllMagazinesAPI = process.env.REACT_APP_TDU_FETCH_MAGAZINES_API;
    const tduFetchAllNewspapersAPI = process.env.REACT_APP_TDU_FETCH_NEWSPAPERS_API;
    const tduFetchAllRestaurantsAPI = process.env.REACT_APP_TDU_FETCH_RESTAURANTS_API;
    const FIAT_API_URL = `https://open.er-api.com/v6/latest/USD`; 

    const fetchCountryData = async () => {
        try {
            if (pickedCountry.toLowerCase() === 'antarctica') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/AQ');
                const data = response.data[0];
                setCountryData(data);
                setCountryCurrency([]);
            } else if (pickedCountry.toLowerCase() === 'china') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/CHN');
                const data = response.data[0];
                const countryCurrency = data?.currencies;
                const formattedData = Object.entries(countryCurrency).map(([currency, info]) => ({
                    currency,
                    name: info?.name,
                    symbol: info?.symbol,
                }));
                setCountryCurrency(formattedData || [0]);
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 'ireland') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/IRL');
                const data = response.data[0];
                const countryCurrency = data?.currencies;
                const formattedData = Object.entries(countryCurrency).map(([currency, info]) => ({
                    currency,
                    name: info?.name,
                    symbol: info?.symbol,
                }));
                setCountryCurrency(formattedData || [0]);
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 'hong kong s.a.r.') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/HK');
                const data = response.data[0];
                const countryCurrency = data?.currencies;
                const formattedData = Object.entries(countryCurrency).map(([currency, info]) => ({
                    currency,
                    name: info?.name,
                    symbol: info?.symbol,
                }));
                setCountryCurrency(formattedData || [0]);
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 'gabon') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/GA');
                const data = response.data[0];
                const countryCurrency = data?.currencies;
                const formattedData = Object.entries(countryCurrency).map(([currency, info]) => ({
                    currency,
                    name: info?.name,
                    symbol: info?.symbol,
                }));
                setCountryCurrency(formattedData || [0]);
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 'republic of congo') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/CG');
                const data = response.data[0];
                const countryCurrency = data?.currencies;
                const formattedData = Object.entries(countryCurrency).map(([currency, info]) => ({
                    currency,
                    name: info?.name,
                    symbol: info?.symbol,
                }));
                setCountryCurrency(formattedData || [0]);
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 'baykonur cosmodrome') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/KZ');
                const data = response.data[0];
                const countryCurrency = data?.currencies;
                const formattedData = Object.entries(countryCurrency).map(([currency, info]) => ({
                    currency,
                    name: info?.name,
                    symbol: info?.symbol,
                }));
                setCountryCurrency(formattedData || [0]);
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 'siachen glacier') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/IN');
                const data = response.data[0];
                const countryCurrency = data?.currencies;
                const formattedData = Object.entries(countryCurrency).map(([currency, info]) => ({
                    currency,
                    name: info?.name,
                    symbol: info?.symbol,
                }));
                setCountryCurrency(formattedData || [0]);
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 'british indian ocean territory') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/IO');
                const data = response.data[0];
                const countryCurrency = data?.currencies;
                const formattedData = Object.entries(countryCurrency).map(([currency, info]) => ({
                    currency,
                    name: info?.name,
                    symbol: info?.symbol,
                }));
                setCountryCurrency(formattedData || [0]);
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 'indian ocean territories') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/CCK');
                const data = response.data[0];
                const countryCurrency = data?.currencies;
                const formattedData = Object.entries(countryCurrency).map(([currency, info]) => ({
                    currency,
                    name: info?.name,
                    symbol: info?.symbol,
                }));
                setCountryCurrency(formattedData || [0]);
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 'south georgia and south sandwich islands') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/GS');
                const data = response.data[0];
                const countryCurrency = data?.currencies;
                const formattedData = Object.entries(countryCurrency).map(([currency, info]) => ({
                    currency,
                    name: info?.name,
                    symbol: info?.symbol,
                }));
                setCountryCurrency(formattedData || [0]);
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 'w. sahara') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/EH');
                const data = response.data[0];
                const countryCurrency = data?.currencies;
                const formattedData = Object.entries(countryCurrency).map(([currency, info]) => ({
                    currency,
                    name: info?.name,
                    symbol: info?.symbol,
                }));
                setCountryCurrency(formattedData || [0]);
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 'solomon is.') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/SB');
                const data = response.data[0];
                const countryCurrency = data?.currencies;
                const formattedData = Object.entries(countryCurrency).map(([currency, info]) => ({
                    currency,
                    name: info?.name,
                    symbol: info?.symbol,
                }));
                setCountryCurrency(formattedData || [0]);
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 's. sudan') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/SSD');
                const data = response.data[0];
                const countryCurrency = data?.currencies;
                const formattedData = Object.entries(countryCurrency).map(([currency, info]) => ({
                    currency,
                    name: info?.name,
                    symbol: info?.symbol,
                }));
                setCountryCurrency(formattedData || [0]);
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 'falkland is.') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/FK');
                const data = response.data[0];
                const countryCurrency = data?.currencies;
                const formattedData = Object.entries(countryCurrency).map(([currency, info]) => ({
                    currency,
                    name: info?.name,
                    symbol: info?.symbol,
                }));
                setCountryCurrency(formattedData || [0]);
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 'central african rep.') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/CAF');
                const data = response.data[0];
                const countryCurrency = data?.currencies;
                const formattedData = Object.entries(countryCurrency).map(([currency, info]) => ({
                    currency,
                    name: info?.name,
                    symbol: info?.symbol,
                }));
                setCountryCurrency(formattedData || [0]);
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 'dem. rep. congo') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/COD');
                const data = response.data[0];
                const countryCurrency = data?.currencies;
                const formattedData = Object.entries(countryCurrency).map(([currency, info]) => ({
                    currency,
                    name: info?.name,
                    symbol: info?.symbol,
                }));
                setCountryCurrency(formattedData || [0]);
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 'somaliland') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/SO');
                const data = response.data[0];
                const somalilandData = {
                    name: {common: 'Somaliland', official: 'Republic of Somaliland'},
                    area: 176120,
                    population: 6200000,
                    capital: ['Hargeisa'],
                    flags: {png: `https://upload.wikimedia.org/wikipedia/commons/4/4d/Flag_of_Somaliland.svg`,}
                }
                const countryCurrency = data?.currencies;
                const formattedData = Object.entries(countryCurrency).map(([currency, info]) => ({
                    currency,
                    name: info?.name,
                    symbol: info?.symbol,
                }));
                setCountryCurrency(formattedData || [0]);
                setCountryData(somalilandData);
            } else if (pickedCountry.toLowerCase() === 'northern cyprus') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/TR');
                const data = response.data[0];
                const somalilandData = {
                    name: {common: 'Northern Cyprus', official: 'Turkish Republic of Northern Cyprus'},
                    area: 3355,
                    population: 382836,
                    capital: ['Nicosia'],
                    flags: {png: `https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Flag_of_the_Turkish_Republic_of_Northern_Cyprus.svg/1920px-Flag_of_the_Turkish_Republic_of_Northern_Cyprus.svg.png`,}
                }
                const countryCurrency = data?.currencies;
                const formattedData = Object.entries(countryCurrency).map(([currency, info]) => ({
                    currency,
                    name: info?.name,
                    symbol: info?.symbol,
                }));
                setCountryCurrency(formattedData || [0]);
                setCountryData(somalilandData);
            } else if (pickedCountry.toLowerCase() === 'bosnia and herz.') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/BIH');
                const data = response.data[0];
                const countryCurrency = data?.currencies;
                const formattedData = Object.entries(countryCurrency).map(([currency, info]) => ({
                    currency,
                    name: info?.name,
                    symbol: info?.symbol,
                }));
                setCountryCurrency(formattedData || [0]);
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 'dominican rep.') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/DOM');
                const data = response.data[0];
                const countryCurrency = data?.currencies;
                const formattedData = Object.entries(countryCurrency).map(([currency, info]) => ({
                    currency,
                    name: info?.name,
                    symbol: info?.symbol,
                }));
                setCountryCurrency(formattedData || [0]);
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 'oman') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/OM');
                const data = response.data[0];
                const countryCurrency = data?.currencies;
                const formattedData = Object.entries(countryCurrency).map(([currency, info]) => ({
                    currency,
                    name: info?.name,
                    symbol: info?.symbol,
                }));
                setCountryCurrency(formattedData || [0]);
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 'fr. s. antarctic lands' || pickedCountry.toLowerCase() === 'french southern and antarctic lands') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/TF');
                const data = response.data[0];
                const countryCurrency = data?.currencies;
                const formattedData = Object.entries(countryCurrency).map(([currency, info]) => ({
                    currency,
                    name: info?.name,
                    symbol: info?.symbol,
                }));
                setCountryCurrency(formattedData || [0]);
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 'guinea') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/GN');
                const data = response.data[0];
                const countryCurrency = data?.currencies;
                const formattedData = Object.entries(countryCurrency).map(([currency, info]) => ({
                    currency,
                    name: info?.name,
                    symbol: info?.symbol,
                }));
                setCountryCurrency(formattedData || [0]);
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 'niue') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/NU');
                const data = response.data[0];
                const countryCurrency = data?.currencies;
                const formattedData = Object.entries(countryCurrency).map(([currency, info]) => ({
                    currency,
                    name: info?.name,
                    symbol: info?.symbol,
                }));
                setCountryCurrency(formattedData || [0]);
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 'guinea bissau') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/GW');
                const data = response.data[0];
                const countryCurrency = data?.currencies;
                const formattedData = Object.entries(countryCurrency).map(([currency, info]) => ({
                    currency,
                    name: info?.name,
                    symbol: info?.symbol,
                }));
                setCountryCurrency(formattedData || [0]);
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 'myanmar (burma)') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/MM');
                const data = response.data[0];
                const countryCurrency = data?.currencies;
                const formattedData = Object.entries(countryCurrency).map(([currency, info]) => ({
                    currency,
                    name: info?.name,
                    symbol: info?.symbol,
                }));
                setCountryCurrency(formattedData || [0]);
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 'falkland islands (islas malvinas)') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/FK');
                const data = response.data[0];
                const countryCurrency = data?.currencies;
                const formattedData = Object.entries(countryCurrency).map(([currency, info]) => ({
                    currency,
                    name: info?.name,
                    symbol: info?.symbol,
                }));
                setCountryCurrency(formattedData || [0]);
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 'west bank') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/PS');
                const data = response.data[0];
                const countryCurrency = data?.currencies;
                const formattedData = Object.entries(countryCurrency).map(([currency, info]) => ({
                    currency,
                    name: info?.name,
                    symbol: info?.symbol,
                }));
                setCountryCurrency(formattedData || [0]);
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 'gaza strip') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/PS');
                const data = response.data[0];
                const countryCurrency = data?.currencies;
                const formattedData = Object.entries(countryCurrency).map(([currency, info]) => ({
                    currency,
                    name: info?.name,
                    symbol: info?.symbol,
                }));
                setCountryCurrency(formattedData || [0]);
                setCountryData(data);
            } else {
                const response = await axios.get(`https://restcountries.com/v3.1/name/${pickedCountry}`);
                const data = response.data[0];
                const countryCurrency = data?.currencies;
                const formattedData = Object.entries(countryCurrency).map(([currency, info]) => ({
                    currency,
                    name: info?.name,
                    symbol: info?.symbol,
                }));
                setCountryCurrency(formattedData || [0]);
                setCountryData(data);
            } 
        } catch (err) {
            setPickedCountryModal(false);
            setPickedCountry('')
        }
    };
    const fetchAllCapitals = async () => {
        try {
            // Fetch Texeract Network Transactions
            const capitalDataFetch = await axios.get(tduFetchAllCapitalsAPI);
            const capitalData = capitalDataFetch.data
            setViewAllCapitals(capitalData);

        } catch (error) {
            console.error(error);
        }
    }
    const fetchExchangeRates = async () => {
        try {
            // Fetch fiat currency rates
            const fiatResponse = await axios.get(FIAT_API_URL);
            const exchangeRates = fiatResponse.data.rates
            const formattedData = Object.entries(exchangeRates).map(([currency, value]) => ({
                currency,
                value: parseFloat(value.toFixed(2)), // Rounds and keeps as a number
            }));

            setExchangeRates(formattedData);
          
        } catch (err) {
          console.log('Failed to fetch exchange rates');
        }
    };
    const fetchAllArticles = async () => {
        try {
            const [articlesResponse, writersResponse] = await Promise.all([
                axios.get(tduFetchAllArticlesAPI),
                axios.get(tduFetchAllWrittersAPI)
            ]);
    
            const sortedArticleData = articlesResponse.data.sort((a, b) => 
                new Date(b.article_timestamp) - new Date(a.article_timestamp) // Descending order
            );
    
            setViewAllArticles(sortedArticleData);
            setViewAllWriters(writersResponse.data);
        } catch (error) {
            console.error(error);
        }
    };
    const fetchAllDataList = async () => {
        try {
            const [
                airlinesResponse, 
                airportsResponse, 
                liveChannelsResponse, 
                youtubeChannelsResponse, 
                magazinesResponse, 
                newspaperResponse,
                restaurantResponse,
            ] = await Promise.all([
                axios.get(tduFetchAllAirlinesAPI),
                axios.get(tduFetchAllAirportsAPI),
                axios.get(tduFetchAllLiveChannelsAPI),
                axios.get(tduFetchAllYoutubeChannelsAPI),
                axios.get(tduFetchAllMagazinesAPI),
                axios.get(tduFetchAllNewspapersAPI),
                axios.get(tduFetchAllRestaurantsAPI),
            ]);
    
            setViewAllAirlines(airlinesResponse.data);
            setViewAllAirports(airportsResponse.data);
            setViewAllLiveChannels(liveChannelsResponse.data);
            setViewAllYoutubeChannels(youtubeChannelsResponse.data);
            setViewAllMagazines(magazinesResponse.data);
            setViewAllNewspapers(newspaperResponse.data);
            setViewAllRestaurants(restaurantResponse.data);
        } catch (error) {
            console.error(error);
        }
    };


    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [url, setUrl] = useState("");
    const [thumbnail, setThumbnail] = useState(null);

    const endpoints = [
        { key: "news", url: "https://www.reddit.com/r/worldnews/new.json" },
        { key: "sports", url: "https://www.reddit.com/r/sports/hot.json" },
        { key: "entertainment1", url: "https://www.reddit.com/r/entertainment/hot.json" },
        { key: "entertainment2", url: "https://www.reddit.com/r/entertainment/new.json" },
        { key: "business", url: "https://www.reddit.com/r/FinanceNews/hot.json" }
    ];

    const fetchDataAndUpdateLocalStorage = async ({ key, url }) => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            const fetchedData = json.data?.children.map(item => ({
                subreddit: item.data.subreddit,
                thumbnail: item.data.thumbnail,
                title: item.data.title,
                url: item.data.url
            })) || []; // Extract only the required fields
    
            setData((prevState) => ({ ...prevState, [key]: fetchedData }));
            localStorage.setItem(key, JSON.stringify(fetchedData));
        } catch (error) {
            console.error(`Error fetching data for ${key}:`, error);
        }
    };

    const fetchData = async () => {
        setIsLoading(true);
        await Promise.all(endpoints.map(fetchDataAndUpdateLocalStorage));
        setIsLoading(false);
    };

    const fetchPublicData = async () => {
        setWebLoader(true);

        try {
            await Promise.all([
                fetchData(),
                fetchAllCapitals(),
                fetchExchangeRates(),
                fetchAllArticles(),
                fetchAllDataList(),
            ]);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setWebLoader(false);
        }
    };



    
    useEffect(() => {
        if (pickedCountry) {
            fetchCountryData();
        }
        const ThreeTouristSpots = CountriesBest.countries.find(country => country.name === pickedCountry)
        setCountryThreeTouristSpots(ThreeTouristSpots);


        const interval = setInterval(() => {
          fetchExchangeRates();
        }, 60000); // 60000 ms = 1 minute
        
        return () => clearInterval(interval);
    }, [pickedCountry]);

    useEffect(() => {
        fetchPublicData();

        const intervalId = setInterval(() => {
            localStorage.clear();
            fetchData();
        }, 6 * 60 * 60 * 1000); // 6 hours

        return () => clearInterval(intervalId); // Clean up on unmount
    }, []);


    const allDataContext = {
        userLoggedIn,
        StoredUserID,
        StoredUserDataJSON,
        webLoader,
        setWebLoader,
        createTDUAccount, 
        setCreateTDUAccount,
        loginTDUAccount, 
        setLoginTDUAccount,
        clickedCountry, 
        setClickedCountry,
        pickedCountryModal, 
        setPickedCountryModal,
        pickedCountry, 
        setPickedCountry,
        countryData,
        countryDescription, 
        setCountryDescription,
        countryCurrency,
        countryThreeTouristSpots,
        switchFullMap, 
        setSwitchFullMap,
        openSuggestedMapTopic, 
        setOpenSuggestedMapTopic,
        viewPickCapital, 
        setViewPickCapital,
        viewCountryCapital, 
        setViewCountryCapital,
        fullMapPickedCountry, 
        setFullMapPickedCountry,
        exchangeRates,
        fetchAllArticles,
        viewAllArticles,
        viewAllCapitals,
        viewAllWriters,
        data,
        dataList: {
            viewAllAirlines,
            viewAllAirports,
            viewAllLiveChannels,
            viewAllYoutubeChannels,
            viewAllMagazines,
            viewAllNewspapers,
            viewAllRestaurants,
            fetchAllDataList
        }
    }
    



    return (
        <MainDataContext.Provider value={allDataContext}>
            {children}
        </MainDataContext.Provider>
    );
};

export const MainDataLoad = () => useContext(MainDataContext);