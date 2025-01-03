import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MainDataLoad } from './MainDataContext';

const MapboxMap = () => {
  const mapContainerRef = useRef(null);

  // Add your Mapbox access token here
  mapboxgl.accessToken = "YOUR_MAPBOX_ACCESS_TOKEN";

  // Example data: Capital cities with coordinates
  const capitalCities = [
    { country: "USA", capital: "Washington, D.C.", coordinates: [-77.0369, 38.9072] },
    { country: "Canada", capital: "Ottawa", coordinates: [-75.6972, 45.4215] },
    { country: "France", capital: "Paris", coordinates: [2.3522, 48.8566] },
    { country: "Japan", capital: "Tokyo", coordinates: [139.6917, 35.6895] },
    { country: "Australia", capital: "Canberra", coordinates: [149.131, -35.282] },
  ];

  useEffect(() => {
    // Initialize map instance
    const map = new mapboxgl.Map({
      container: mapContainerRef.current, // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [0, 20], // starting position [lng, lat]
      zoom: 2, // starting zoom
    });

    // Add navigation controls to the map
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Add markers for each capital city
    capitalCities.forEach((city) => {
      new mapboxgl.Marker()
        .setLngLat(city.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // Add popups
            .setHTML(`<h3>${city.capital}</h3><p>${city.country}</p>`)
        )
        .addTo(map);
    });

    return () => map.remove(); // Clean up map instance on component unmount
  }, []);

  return (
    <div
      ref={mapContainerRef}
      style={{ width: "100%", height: "500px" }}
    />
  );
};

export default MapboxMap;