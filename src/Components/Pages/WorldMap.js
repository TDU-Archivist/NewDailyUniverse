import React from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { MainDataLoad } from './MainDataContext';

const WorldMap = () => {
    const { 
        setPickedCountryModal,
        setPickedCountry,
        setOpenSuggestedMapTopic,
        setFullMapPickedCountry,
        setCountryDescription,
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
                <ZoomableGroup zoom={1} minZoom={1} maxZoom={10} center={[0, 0]}>
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
                                            console.log(countryName);
                                            
                                            setOpenSuggestedMapTopic(false);
                                            setFullMapPickedCountry(false);
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
                                            fill: 'red', // Skyblue color on hover
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
                </ZoomableGroup>
            </ComposableMap>
        </div>
    );
};

export default WorldMap;
