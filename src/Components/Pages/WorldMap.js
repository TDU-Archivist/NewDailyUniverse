import React, {useState, useEffect} from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from 'react-simple-maps';
import { MainDataLoad } from './MainDataContext';

// Example data for specific locations
const WorldMap = () => {
    const {
        setPickedCountryModal,
        pickedCountry,
        setPickedCountry,
        setOpenSuggestedMapTopic,
        setFullMapPickedCountry,
        setCountryDescription,
        viewAllCapitals,
        clickedCountry, 
        setClickedCountry,
        viewPickCapital, 
        setViewPickCapital,
        viewCountryCapital, 
        setViewCountryCapital,
    } = MainDataLoad();

    // Updated geoUrl to point to the new GeoJSON dataset
    const geoUrl = 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson';


    const handleViewCountryCapita = (countryName) => {
        setViewPickCapital(true)
        const setCapital = viewAllCapitals.find(location => 
            location.country === countryName || 
            location.country_sub === countryName
        )
        setViewCountryCapital(setCapital);
    }





    return (
        <div className="map-container" style={{ width: '100%', height: '500px' }}>
            <ComposableMap
                projectionConfig={{ scale: 140 }}
                width={800}
                height={500}
                style={{ width: '100%', height: 'auto' }}
            >
                <ZoomableGroup zoom={1} minZoom={1} maxZoom={20} center={[0, 0]}>
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                const countryName = geo.properties.ADMIN || geo.properties.name;

                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        onClick={() => {
                                            if (countryName) {
                                                setClickedCountry(countryName); // Set clicked country
                                                setPickedCountryModal(false);
                                                setPickedCountry(countryName);
                                                setOpenSuggestedMapTopic(false);
                                                setFullMapPickedCountry(false);
                                                handleViewCountryCapita(countryName)
                                                console.log(countryName);

                                                const timeoutId = setTimeout(() => {
                                                    setPickedCountryModal(true);
                                                    setOpenSuggestedMapTopic(true);
                                                    setFullMapPickedCountry(true);
                                                }, 500);
                                                return () => clearTimeout(timeoutId);
                                            } else {
                                                console.log("Country name not found");
                                            }
                                        }}
                                        style={{
                                            default: {
                                                fill: clickedCountry === countryName ? 'red' : '#d3d3d3', // Red if clicked, gray otherwise
                                                outline: 'none',
                                            },
                                            hover: {
                                                fill: 'red', // Red on hover
                                                outline: 'none',
                                                cursor: 'pointer',
                                            },
                                            pressed: {
                                                fill: 'red',
                                                outline: 'none',
                                                cursor: 'pointer',
                                            },
                                        }}
                                    />
                                );
                            })
                        }
                    </Geographies>
                    {/* Render markers */}
                    {viewPickCapital  &&
                        <Marker coordinates={[viewCountryCapital.longitude, viewCountryCapital.latitude]}>
                            <g 
                                onClick={() => {
                                    console.log(`Location: ${viewCountryCapital.capital_name}`);
                                }} 
                                style={{ cursor: 'pointer' }}
                            >
                                {/* Star Shape */}
                                <polygon
                                    points="0,-0.5 0.14,-0.15 0.47,-0.15 0.2,0.05 0.3,0.4 0,0.2 -0.3,0.4 -0.2,0.05 -0.47,-0.15 -0.14,-0.15"
                                    fill="Salmon"
                                    stroke="white"
                                    strokeWidth={0.1}
                                />
                            </g>
                            <text
                                textAnchor="middle"
                                y={1.2}
                                style={{
                                    fontFamily: 'system-ui',
                                    fill: 'white',
                                    fontSize: '0.6px',
                                    fontWeight: '600',
                                    textTransform: 'uppercase',
                                    fontFamily: '"Oswald", sans-serif',
                                    textShadow: '0 0 30px gray'
                                }}
                            >
                                {viewCountryCapital.capital_name}
                            </text>
                        </Marker>
                    }
                </ZoomableGroup>
            </ComposableMap>
        </div>
    );
};

export default WorldMap;
