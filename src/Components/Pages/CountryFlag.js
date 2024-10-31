// src/CountryFlag.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CountryFlag = ({ countryName }) => {
    const [flagUrl, setFlagUrl] = useState('');

    useEffect(() => {
        const fetchCountryFlag = async () => {
            try {
                const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);

                if(countryName.toLowerCase() === 'china'){
                    setFlagUrl('https://flagcdn.com/w320/cn.png'); // Flag of China
                } else {
                    setFlagUrl(response.data[0].flags.png); // Get the flag URL
                }
                

            } catch (error) {
                 if (countryName.toLowerCase() === 's. sudan') {
                    setFlagUrl('https://flagcdn.com/w320/ss.png');
                } else if (countryName.toLowerCase() === 'central african rep.') {
                    setFlagUrl('https://flagcdn.com/w320/cf.png');
                } else if (countryName.toLowerCase() === 'dem. rep. congo') {
                    setFlagUrl('https://flagcdn.com/w320/cd.png');
                } else if (countryName.toLowerCase() === 'fr. s. antarctic lands') {
                    setFlagUrl('https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Flag_of_the_French_Southern_and_Antarctic_Lands.svg/2560px-Flag_of_the_French_Southern_and_Antarctic_Lands.svg.png');
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
