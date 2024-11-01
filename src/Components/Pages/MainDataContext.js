import React, { createContext, useContext, useState, useEffect } from 'react';
import CountriesBest from '../JSON/CountriesBest.json'
import axios from 'axios';

const MainDataContext = createContext();

export const MainDataLoadProvider = ({ children }) => {
    const [createTDUAccount, setCreateTDUAccount] = useState(false);
    const [loginTDUAccount, setLoginTDUAccount] = useState(false);
    const [pickedCountryModal, setPickedCountryModal] = useState(false);
    const [pickedCountry, setPickedCountry] = useState('');
    const [countryData, setCountryData] = useState(null);
    const [countryThreeTouristSpots, setCountryThreeTouristSpots] = useState([]);

    const fetchCountryData = async () => {
        try {

            if (pickedCountry.toLowerCase() === 'china') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/CHN');
                const data = response.data[0];
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 'ireland') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/IRL');
                const data = response.data[0];
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 'w. sahara') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/EH');
                const data = response.data[0];
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 'solomon is.') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/SB');
                const data = response.data[0];
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 's. sudan') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/SSD');
                const data = response.data[0];
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 'falkland is.') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/FK');
                const data = response.data[0];
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 'central african rep.') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/CAF');
                const data = response.data[0];
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 'dem. rep. congo') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/COD');
                const data = response.data[0];
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 'somaliland') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/SOM');
                const data = response.data[0];
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 'bosnia and herz.') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/BIH');
                const data = response.data[0];
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 'dominican rep.') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/DOM');
                const data = response.data[0];
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 'oman') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/OM');
                const data = response.data[0];
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 'fr. s. antarctic lands' || pickedCountry.toLowerCase() === 'french southern and antarctic lands') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/TF');
                const data = response.data[0];
                setCountryData(data);
            } else {
                const response = await axios.get(`https://restcountries.com/v3.1/name/${pickedCountry}`);
                const data = response.data[0];
                setCountryData(data);
            }

        } catch (err) {
            console.log("Could not retrieve country details. Please check the country name and try again.");
        }
    };
    

    useEffect(() => {
        if (pickedCountry) {
            fetchCountryData();
        }
        const ThreeTouristSpots = CountriesBest.countries.find(country => country.name === pickedCountry)
        setCountryThreeTouristSpots(ThreeTouristSpots);

    }, [pickedCountry]);


    return (
        <MainDataContext.Provider value={{ 
                createTDUAccount, 
                setCreateTDUAccount,
                loginTDUAccount, 
                setLoginTDUAccount,
                pickedCountryModal, 
                setPickedCountryModal,
                pickedCountry, 
                setPickedCountry,
                countryData,
                countryThreeTouristSpots
            }}>
            {children}
        </MainDataContext.Provider>
    );
};

export const MainDataLoad = () => useContext(MainDataContext);