import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const MainDataContext = createContext();

export const MainDataLoadProvider = ({ children }) => {
    const [createTDUAccount, setCreateTDUAccount] = useState(false);
    const [loginTDUAccount, setLoginTDUAccount] = useState(false);
    const [pickedCountryModal, setPickedCountryModal] = useState(false);
    const [pickedCountry, setPickedCountry] = useState('');


    return (
        <MainDataContext.Provider value={{ 
                createTDUAccount, 
                setCreateTDUAccount,
                loginTDUAccount, 
                setLoginTDUAccount,
                pickedCountryModal, 
                setPickedCountryModal,
                pickedCountry, 
                setPickedCountry
            }}>
            {children}
        </MainDataContext.Provider>
    );
};

export const MainDataLoad = () => useContext(MainDataContext);