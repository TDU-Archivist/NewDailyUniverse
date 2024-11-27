import React from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from 'react-simple-maps';
import { MainDataLoad } from './MainDataContext';

// Example data for specific locations
const WorldMap = () => {
    const {
        setPickedCountryModal,
        setPickedCountry,
        setOpenSuggestedMapTopic,
        setFullMapPickedCountry,
        setCountryDescription,
        viewAllCapitals,
    } = MainDataLoad();

    // Updated geoUrl to point to the new GeoJSON dataset
    const geoUrl = 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson';

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
                            geographies.map((geo) => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    onClick={() => {
                                        // Extracting the country name
                                        const countryName = geo.properties.ADMIN || geo.properties.name;
                                        if (countryName) {
                                            setPickedCountryModal(false);
                                            setPickedCountry(countryName);
                                            setOpenSuggestedMapTopic(false);
                                            setFullMapPickedCountry(false);
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
                                            fill: '#d3d3d3', // Grayscale color for default
                                            outline: 'none',
                                        },
                                        hover: {
                                            fill: 'red', // Red color on hover
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
                            ))
                        }
                    </Geographies>
                    {/* Render markers */}
                    {viewAllCapitals.map((location, index) => (
                        <Marker key={index} coordinates={[location.longitude, location.latitude]}>
                            <g 
                                onClick={() => {
                                    console.log(`Location: ${location.capital_name}`);
                                }} 
                                style={{ cursor: 'pointer' }}
                            >
                                {/* Star Shape */}
                                <polygon
                                    points="0,-0.5 0.14,-0.15 0.47,-0.15 0.2,0.05 0.3,0.4 0,0.2 -0.3,0.4 -0.2,0.05 -0.47,-0.15 -0.14,-0.15"
                                    fill="Salmon"
                                    stroke="red"
                                    strokeWidth={0.05}
                                />
                            </g>
                            <text
                                textAnchor="middle"
                                y={1.5}
                                style={{
                                    fontFamily: 'system-ui',
                                    fill: 'Salmon',
                                    fontSize: '0.8px',
                                    fontWeight: '600',
                                    textTransform: 'uppercase',
                                    fontFamily: '"Oswald", sans-serif',
                                }}
                            >
                                {location.capital_name}
                            </text>
                        </Marker>
                    ))}
                </ZoomableGroup>
            </ComposableMap>
        </div>
    );
};

export default WorldMap;
