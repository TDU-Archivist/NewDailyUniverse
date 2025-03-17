import React, { useState, useEffect } from "react";
import Map, { Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MainDataLoad } from "./MainDataContext";

const MAPBOX_TOKEN = process.env.REACT_APP_TDU_MAPBOX_PK_API;

const MapViewer = () => {
    const {
        pickedCountryModal,
        setPickedCountryModal,
        pickedCountry,
        setPickedCountry,
    } = MainDataLoad();
    
    const [viewport, setViewport] = useState({
        longitude: -0.09,
        latitude: 51.505,
        zoom: 5,
    });
    const [geoData, setGeoData] = useState(null);
    const [countryCode, setCountryCode] = useState(null);

    useEffect(() => {
        if (pickedCountry) {
            fetch(`https://restcountries.com/v3.1/name/${pickedCountry}?fullText=true`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.length > 0) {
                        setViewport((prev) => ({
                            ...prev,
                            longitude: data[0].latlng[1],
                            latitude: data[0].latlng[0],
                            zoom: 5,
                        }));

                        setCountryCode(data[0].cca2); // Use ISO alpha-2 country code
                        setGeoData({
                            type: "vector",
                            url: "mapbox://mapbox.country-boundaries-v1"
                        });
                    }
                })
                .catch((error) => console.error("Error fetching country data:", error));
        }
    }, [pickedCountry]);

    return (
        <Map
            {...viewport}
            onMove={evt => setViewport(evt.viewState)}
            mapStyle="mapbox://styles/mapbox/outdoors-v12"
            mapboxAccessToken={MAPBOX_TOKEN}
            style={{ height: "100vh", width: "100%" }}
        >
            {geoData && countryCode && (
                <Source id="country-boundaries" type="vector" url={geoData.url}>
                    {/* Highlight all countries except the picked one */}
                    <Layer
                        id="neighboring-countries"
                        source-layer="country_boundaries"
                        type="fill"
                        paint={{
                            "fill-color": "gray",
                            "fill-opacity": 0.6,
                        }}
                        filter={["!=", "iso_3166_1", countryCode]}
                    />
                    {/* Border for the picked country */}
                    <Layer
                        id="country-border"
                        source-layer="country_boundaries"
                        type="line"
                        paint={{
                            "line-color": "gray",
                            "line-width": 0.3,
                        }}
                        filter={["==", "iso_3166_1", countryCode]}
                    />
                </Source>
            )}
        </Map>
    );
};

export default MapViewer;
