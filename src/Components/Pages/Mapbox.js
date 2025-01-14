import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MainDataLoad } from './MainDataContext';

const MapboxMap = () => {
  const mapContainerRef = useRef(null);
  const { setPickedCountryModal, setPickedCountry } = MainDataLoad();

  // Add your Mapbox access token here
  mapboxgl.accessToken = "pk.eyJ1IjoidGhlZGFpbHl1bml2ZXJzZSIsImEiOiJjbTV2cjUwOTEwMjE3MmxwaWN0NnM0N3hyIn0.JjaAyn6DJCVj-f7aAg9YEg";

  useEffect(() => {
    // Initialize map instance
    const map = new mapboxgl.Map({
      container: mapContainerRef.current, // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [0, 20], // starting position [lng, lat]
      zoom: 2, // starting zoom
      maxBounds: [
        [-180, -90], // Southwest corner of the bounds
        [180, 90],   // Northeast corner of the bounds
      ], // Prevent map from repeating
    });

    
    // Add navigation controls to the map
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Add a click handler for map features
    map.on("click", (event) => {
      const features = map.queryRenderedFeatures(event.point);

      if (features.length > 0) {
        const geo = features[0];

        // Retrieve English name (if available) or fallback to a generic property
        const regionName = geo.properties.name_en || geo.properties.name || geo.properties.NAME;

        if (regionName) {
          setPickedCountryModal(true);
          setPickedCountry(regionName);
          console.log(regionName);

          // Use the feature's geometry to zoom and center the map
          if (geo.geometry && geo.geometry.type === "Polygon") {
            const [lng, lat] = geo.geometry.coordinates[0][0]; // Get a coordinate from the polygon
            map.flyTo({
              center: [lng, lat],
              zoom: 1, // Set desired zoom level for regions
              essential: true, // Ensures the animation is smooth
            });
          } else if (geo.geometry && geo.geometry.type === "Point") {
            const [lng, lat] = geo.geometry.coordinates;
            map.flyTo({
              center: [lng, lat],
              zoom: 5, // Set desired zoom level for countries
              essential: true,
            });
          }
        } else {
          console.log("Region name not found");
        }
      }
    });

    return () => map.remove(); // Clean up map instance on component unmount
  }, [setPickedCountryModal, setPickedCountry]);

  return (
    <div
      ref={mapContainerRef}
      className="mainMapBox"
    />
  );
};

export default MapboxMap;
