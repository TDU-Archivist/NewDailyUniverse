import React from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { MainDataLoad } from './MainDataContext';

const MapViewer = () => {
    const { setPickedCountryModal, setPickedCountry } = MainDataLoad();
    const geoUrl = 'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/PHL/PHL-admin1.json';

    return (
        <div className="country-container" style={{ width: '100%', height: '500px' }}>
            <ComposableMap
                projectionConfig={{ scale: 200 }} // Adjust scale as needed
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
                                        const regionName = geo.properties.name || geo.properties.NAME;
                                        if (regionName) {
                                            setPickedCountryModal(true);
                                            setPickedCountry(regionName);
                                        } else {
                                            console.log('Region name not found');
                                        }
                                    }}
                                    style={{
                                        default: {
                                            fill: '#d3d3d3',
                                            outline: 'none',
                                        },
                                        hover: {
                                            fill: 'red',
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


export default MapViewer;