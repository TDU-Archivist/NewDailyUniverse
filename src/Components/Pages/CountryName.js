import React, { useEffect, useState } from 'react';

const CountryName = ({ code }) => {
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!code) return;

    const fetchCountry = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        if (!response.ok) {
          throw new Error('Invalid code');
        }
        const data = await response.json();
        setCountry(data[0]?.name?.common || 'Unknown');
      } catch (err) {
        setError('Country not found');
      }
    };

    fetchCountry();
  }, [code]);

  if (error) return <span>{error}</span>;
  if (!country) return <span>Loading...</span>;

  return <>{country}</>;
};

export default CountryName;