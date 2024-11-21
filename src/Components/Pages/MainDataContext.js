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
    const [countryCurrency, setCountryCurrency] = useState(null);
    const [countryThreeTouristSpots, setCountryThreeTouristSpots] = useState([]);

    
    const [switchFullMap, setSwitchFullMap] = useState(false)
    const [openSuggestedMapTopic, setOpenSuggestedMapTopic] = useState(true);
    const [fullMapPickedCountry, setFullMapPickedCountry] = useState(false)

    const [viewAllArticles, setViewAllArticles] = useState([])
    const [viewAllWriters, setViewAllWriters] = useState([])

    const tduFetchAllArticlesAPI = process.env.REACT_APP_TDU_FETCH_ARTICLE_API;
    const tduFetchAllWrittersAPI = process.env.REACT_APP_TDU_FETCH_WRITERS_LIST_API;
    const FIAT_API_URL = `https://open.er-api.com/v6/latest/USD`; 

    const fetchCountryData = async () => {
        try {
            if (pickedCountry.toLowerCase() === 'china') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/CHN');
                const data = response.data[0];
                const countryCurrency = data?.currencies;
                const formattedData = Object.entries(countryCurrency).map(([currency, info]) => ({
                    currency,
                    name: info?.name,
                    symbol: info?.symbol,
                }));
                setCountryCurrency(formattedData);
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
                setCountryCurrency(formattedData);
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
                setCountryCurrency(formattedData);
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
                setCountryCurrency(formattedData);
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
                setCountryCurrency(formattedData);
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 'indian ocean territories') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/IO');
                const data = response.data[0];
                const countryCurrency = data?.currencies;
                const formattedData = Object.entries(countryCurrency).map(([currency, info]) => ({
                    currency,
                    name: info?.name,
                    symbol: info?.symbol,
                }));
                setCountryCurrency(formattedData);
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 'antarctica') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/AQ');
                const data = response.data[0];
                const countryCurrency = data?.currencies;
                const formattedData = Object.entries(countryCurrency).map(([currency, info]) => ({
                    currency,
                    name: info?.name,
                    symbol: info?.symbol,
                }));
                setCountryCurrency(formattedData);
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
                setCountryCurrency(formattedData);
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
                setCountryCurrency(formattedData);
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
                setCountryCurrency(formattedData);
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
                setCountryCurrency(formattedData);
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
                setCountryCurrency(formattedData);
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
                setCountryCurrency(formattedData);
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
                setCountryCurrency(formattedData);
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 'somaliland') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/SOM');
                const data = response.data[0];
                const countryCurrency = data?.currencies;
                const formattedData = Object.entries(countryCurrency).map(([currency, info]) => ({
                    currency,
                    name: info?.name,
                    symbol: info?.symbol,
                }));
                setCountryCurrency(formattedData);
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 'bosnia and herz.') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/BIH');
                const data = response.data[0];
                const countryCurrency = data?.currencies;
                const formattedData = Object.entries(countryCurrency).map(([currency, info]) => ({
                    currency,
                    name: info?.name,
                    symbol: info?.symbol,
                }));
                setCountryCurrency(formattedData);
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
                setCountryCurrency(formattedData);
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
                setCountryCurrency(formattedData);
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
                setCountryCurrency(formattedData);
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
                setCountryCurrency(formattedData);
                setCountryData(data);
            }

        } catch (err) {
            console.log("Could not retrieve country details. Please check the country name and try again.");
        }
    };
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
            // Fetch Texeract Network Transactions
            const articleData = await axios.get(tduFetchAllArticlesAPI);
            let sortedArticleData = articleData.data.sort((a, b) => 
                new Date(b.article_timestamp) - new Date(a.article_timestamp) // Descending order
            );
            setViewAllArticles(sortedArticleData);

        } catch (error) {
            console.error(error);
        }
    }
    const fetchAllWritters = async () => {
        try {
            // Fetch Texeract Network Transactions
            const articleData = await axios.get(tduFetchAllWrittersAPI);
            const articleWriterData = articleData.data
            setViewAllWriters(articleWriterData);

        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        setWebLoader(true);
        const timeoutId = setTimeout(() => {
            setWebLoader(false);
        }, 3000);
        return () => clearTimeout(timeoutId);
    }, []);


    useEffect(() => {
        if (pickedCountry) {
            fetchCountryData();
        }
        const ThreeTouristSpots = CountriesBest.countries.find(country => country.name === pickedCountry)
        setCountryThreeTouristSpots(ThreeTouristSpots);
        fetchExchangeRates();
        fetchAllArticles();
        fetchAllWritters();


        const interval = setInterval(() => {
          fetchExchangeRates();
        }, 60000); // 60000 ms = 1 minute
        
        return () => clearInterval(interval);
    }, [pickedCountry]);


    return (
        <MainDataContext.Provider value={{ 
                userLoggedIn,
                StoredUserID,
                StoredUserDataJSON,
                webLoader,
                createTDUAccount, 
                setCreateTDUAccount,
                loginTDUAccount, 
                setLoginTDUAccount,
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
                fullMapPickedCountry, 
                setFullMapPickedCountry,
                exchangeRates,
                fetchAllArticles,
                viewAllArticles,
                viewAllWriters,
            }}>
            {children}
        </MainDataContext.Provider>
    );
};

export const MainDataLoad = () => useContext(MainDataContext);