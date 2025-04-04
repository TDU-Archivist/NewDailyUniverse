// src/CountryFlag.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MainDataLoad } from './MainDataContext';

const CountryFlag = ({ countryName }) => {
    const { setPickedCountryModal, setPickedCountry } = MainDataLoad();
    const [flagUrl, setFlagUrl] = useState('');

    useEffect(() => {
        const fetchCountryFlag = async () => {
            try {
                const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
                if(countryName.toLowerCase() === 'china'){
                    setFlagUrl('https://flagcdn.com/w320/cn.png');
                } else {
                    setFlagUrl(response.data[0].flags.png); // Get the flag URL
                }
            } catch {
                if (countryName.toLowerCase() === 's. sudan') {
                    setFlagUrl('https://flagcdn.com/w320/ss.png');
                } else if(countryName.toLowerCase() === 'hong kong s.a.r.'){
                    setFlagUrl('https://flagcdn.com/w320/hk.png');
                } else if(countryName.toLowerCase() === 'oman'){
                    setFlagUrl('https://flagcdn.com/w320/om.png');
                } else if (countryName.toLowerCase() === 'central african rep.') {
                    setFlagUrl('https://flagcdn.com/w320/cf.png');
                } else if (countryName.toLowerCase() === 'bosnia and herz.') {
                    setFlagUrl('https://flagcdn.com/w320/ba.png');
                } else if (countryName.toLowerCase() === 'dem. rep. congo') {
                    setFlagUrl('https://flagcdn.com/w320/cd.png');
                } else if (countryName.toLowerCase() === 'myanmar (burma)') {
                    setFlagUrl('https://flagcdn.com/w320/mm.png');
                } else if (countryName.toLowerCase() === 'falkland islands (islas malvinas)') {
                    setFlagUrl('https://flagcdn.com/w320/fk.png');
                } else if (countryName.toLowerCase() === 'west bank') {
                    setFlagUrl('https://flagcdn.com/w320/ps.png');
                } else if (countryName.toLowerCase() === 'gaza strip') {
                    setFlagUrl('https://flagcdn.com/w320/ps.png');
                } else if (countryName.toLowerCase() === 'fr. s. antarctic lands') {
                    setFlagUrl('https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Flag_of_the_French_Southern_and_Antarctic_Lands.svg/2560px-Flag_of_the_French_Southern_and_Antarctic_Lands.svg.png');
                } else if(countryName.toLowerCase() === 'somaliland'){
                    setFlagUrl('https://upload.wikimedia.org/wikipedia/commons/4/4d/Flag_of_Somaliland.svg');
                } else {
                    setPickedCountryModal(false);
                    setPickedCountry('')
                }
                // console.error("Error fetching the country flag:", error);
                // setFlagUrl(''); // Clear the flag URL if there's an error
            }
        };

        fetchCountryFlag();
    }, [countryName]);

    return (
        <>
            {flagUrl ? (
                <img src={flagUrl} alt={`Flag of ${countryName}`}/>
            ) : (
                <p>Loading flag...</p>
            )}
        </>
    );
};

export default CountryFlag;
