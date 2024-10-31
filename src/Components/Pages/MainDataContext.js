import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const MainDataContext = createContext();

export const MainDataLoadProvider = ({ children }) => {
    const [createTDUAccount, setCreateTDUAccount] = useState(false);
    const [loginTDUAccount, setLoginTDUAccount] = useState(false);
    const [pickedCountryModal, setPickedCountryModal] = useState(false);
    const [pickedCountry, setPickedCountry] = useState('');

    const [countryData, setCountryData] = useState(null);

    const fetchCountryData = async () => {
        try {

            if (pickedCountry.toLowerCase() === 'china') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/CHN');
                const data = response.data[0];
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 's. sudan') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/SSD');
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
            } else if (pickedCountry.toLowerCase() === 'oman') {
                const response = await axios.get('https://restcountries.com/v3.1/alpha/OM');
                const data = response.data[0];
                setCountryData(data);
            } else if (pickedCountry.toLowerCase() === 'fr. s. antarctic lands' || pickedCountry.toLowerCase() === 'french southern and antarctic lands') {
                const response = await axios.get('https://restcountries.com/v3.1/name/france');
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
                countryData
            }}>
            {children}
        </MainDataContext.Provider>
    );
};

export const MainDataLoad = () => useContext(MainDataContext);