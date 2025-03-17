import React from 'react';

const ExchangeRateMarquee = ({ exchangeRate }) => {
  return (
    <>
        <div className="marquee">
            {Array.isArray(exchangeRate) ? (
                exchangeRate.map((rate, index) => (
                <div key={index} className="marquee-item">
                    <h6>1 : {rate?.value} {rate?.currency}</h6>
                </div>
                ))
            ) : (
                <p>No data available</p>
            )}
        </div>
    </>
  );
};

export default ExchangeRateMarquee;
