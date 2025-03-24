import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MainDataLoad } from './MainDataContext';

const MapboxMap = () => {
  const mapContainerRef = useRef(null);
  const { setPickedCountryModal, setPickedCountry } = MainDataLoad();

  mapboxgl.accessToken = process.env.REACT_APP_TDU_MAPBOX_PK_API;

  const subregions = {
    "Northern Africa": ["DZ", "EG", "LY", "MA", "SD", "TN", "EH"],
    "Sub-Saharan Africa": ["AO", "BJ", "BW", "BF", "BI", "CM", "CV", "CF", "TD", "KM", "CG", "CD", "DJ", "GQ", "ER", "SZ", "ET", "GA", "GM", "GH", "GN", "GW", "CI", "KE", "LS", "LR", "MG", "MW", "ML", "MR", "MZ", "NA", "NE", "NG", "RW", "ST", "SN", "SL", "SO", "ZA", "SS", "TZ", "TG", "UG", "ZM", "ZW"],
    "Northern Asia": ["RU"],
    "Central Asia": ["KZ", "KG", "TJ", "TM", "UZ"],
    "Western Asia": ["AM", "AZ", "BH", "CY", "GE", "IQ", "IL", "JO", "KW", "LB", "OM", "PS", "QA", "SA", "SY", "TR", "AE", "YE"],
    "South Asia": ["AF", "BD", "BT", "IN", "IR", "MV", "NP", "PK", "LK"],
    "East Asia": ["CN", "HK", "JP", "KP", "KR", "MN", "MO", "TW"],
    "Southeast Asia": ["BN", "KH", "ID", "LA", "MY", "MM", "PH", "SG", "TH", "TL", "VN"],
    "Northern Europe": ["DK", "EE", "FI", "IS", "IE", "LV", "LT", "NO", "SE", "GB", "SJ"],
    "Western Europe": ["AT", "BE", "FR", "DE", "LI", "LU", "MC", "NL", "CH"],
    "Eastern Europe": ["BY", "BG", "CZ", "HU", "MD", "PL", "RO", "RU", "SK", "UA"],
    "Southern Europe": ["AL", "AD", "BA", "HR", "GR", "IT", "MT", "ME", "MK", "PT", "SM", "RS", "SI", "ES", "VA"],
    "Northern America": ["BM", "CA", "GL", "PM", "US"],
    "Central America": ["BZ", "CR", "SV", "GT", "HN", "MX", "NI", "PA"],
    "The Caribbean": ["AI", "AG", "AW", "BS", "BB", "BQ", "CU", "CW", "DM", "DO", "GD", "GP", "HT", "JM", "MQ", "MS", "PR", "BL", "KN", "LC", "MF", "VC", "SX", "TT", "TC", "VG", "VI"],
    "Andean States": ["BO", "CO", "EC", "PE", "VE"],
    "Southern Cone": ["AR", "CL", "PY", "UY"],
    "Brazil": ["BR"],
    "The Guianas": ["GY", "SR", "GF"],
    "Australasia": ["AU", "NZ"],
    "Melanesia": ["FJ", "NC", "PG", "SB", "VU"],
    "Micronesia": ["FM", "GU", "KI", "MH", "NR", "MP", "PW"],
    "Polynesia": ["AS", "CK", "PF", "NU", "WS", "TO", "TV", "WF"]
  };

  const subregionColors = {
    "Northern Africa": "#FFD700",
    "Sub-Saharan Africa": "#FFB6C1",
    "Northern Asia": "#ADD8E6",
    "Central Asia": "#87CEEB",
    "Western Asia": "#4682B4",
    "South Asia": "#5F9EA0",
    "East Asia": "#00CED1",
    "Southeast Asia": "#20B2AA",
    "Northern Europe": "#32CD32",
    "Western Europe": "#98FB98",
    "Eastern Europe": "#00FA9A",
    "Southern Europe": "#3CB371",
    "Northern America": "#1E90FF",
    "Central America": "#6495ED",
    "The Caribbean": "#4169E1",
    "Andean States": "#8A2BE2",
    "Southern Cone": "#9370DB",
    "Brazil": "#BA55D3",
    "The Guianas": "#DA75D9",
    "Australasia": "#DA70D6",
    "Melanesia": "#EE82EE",
    "Micronesia": "#DDA0DD",
    "Polynesia": "#FF00FF"
  };

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [0, 20],
      zoom: 2,
      maxBounds: [[-180, -90], [180, 90]],
      renderWorldCopies: false
    });

    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Add region coloring
    map.on("load", () => {
      Object.entries(subregions).forEach(([subregion, countries]) => {
        map.addLayer({
          id: `subregion-${subregion}`,
          type: "fill",
          source: { type: "vector", url: "mapbox://mapbox.country-boundaries-v1" },
          "source-layer": "country_boundaries",
          filter: ["in", "iso_3166_1", ...countries],
          paint: { 
            "fill-color": subregionColors[subregion], 
            "fill-opacity": 0.6,  
            "fill-outline-color": "#000000" 
          }
        });
      });

      map.addLayer({
        id: "country-fills",
        type: "fill",
        source: { type: "vector", url: "mapbox://mapbox.country-boundaries-v1" },
        "source-layer": "country_boundaries",
        paint: {
          "fill-color": "transparent",
          "fill-opacity": 0.6,
          "fill-outline-color": "#000000"
        }
      });

      map.addLayer({
        id: "country-borders",
        type: "line",
        source: { type: "vector", url: "mapbox://mapbox.country-boundaries-v1" },
        "source-layer": "country_boundaries",
        paint: {
          "line-color": "gray",
          "line-width": 0.5
        }
      });
      // Ensure country labels stay visible
      map.moveLayer("country-label");
    });


    let hoveredCountryId = null;
    
    map.on("mousemove", (event) => {
      const features = map.queryRenderedFeatures(event.point, { layers: ["country-fills"] });
      if (features.length > 0) {
        const countryName = features[0].properties.name_en;
        const countryCode = features[0].properties.iso_3166_1;
        map.getCanvas().style.cursor = "pointer";

        map.setPaintProperty("country-fills", "fill-opacity", [
          "case",
          ["==", ["get", "iso_3166_1"], countryCode],
          1,
          0.6
        ]);

        if (hoveredCountryId !== countryCode) {
          hoveredCountryId = countryCode;
          map.setLayoutProperty("country-label", "text-field", [
            "case",
            ["==", ["get", "iso_3166_1"], countryCode],
            ["concat", ["get", "name_en"]],
            ["get", "name_en"]
          ]);
          map.setLayoutProperty("country-label", "text-size", [
            "case",
            ["==", ["get", "iso_3166_1"], countryCode],
            20,
            14
          ]);
        }
      }
    });

    map.on("mouseleave", "country-fills", () => {
      map.getCanvas().style.cursor = "";
      map.setPaintProperty("country-fills", "fill-opacity", 0.5);
      map.setLayoutProperty("country-label", "text-field", ["get", "name_en"]);
      map.setLayoutProperty("country-label", "text-size", 14);
      hoveredCountryId = null;
    });









    // Click handler for countries
    map.on("click", (event) => {
      const features = map.queryRenderedFeatures(event.point);

      if (features.length > 0) {
        const geo = features[0];

        const regionName = geo.properties.name_en || geo.properties.name || geo.properties.NAME;
        const countryCode = geo.properties.iso_3166_1; // Get ISO country code
        
        if (countryCode) {
          // Find the subregion of the clicked country
          let subregionName = "Unknown Subregion";
          for (const [subregion, countries] of Object.entries(subregions)) {
            if (countries.includes(countryCode)) {
              subregionName = subregion;
              break;
            }
          }

          if (regionName) {
            setPickedCountryModal(true);
            setPickedCountry(regionName);
            console.log(`Country: ${regionName}, Subregion: ${subregionName}`);

            if (geo.geometry && geo.geometry.type === "Polygon") {
              const [lng, lat] = geo.geometry.coordinates[0][0];
              map.flyTo({
                center: [lng, lat],
                zoom: 3,
                essential: true,
              });
            } else if (geo.geometry && geo.geometry.type === "Point") {
              const [lng, lat] = geo.geometry.coordinates;
              map.flyTo({
                center: [lng, lat],
                zoom: 5,
                essential: true,
              });
            }
          } else {
            console.log("Region name not found");
            setPickedCountryModal(false);
          }
          
        } else {
          setPickedCountryModal(false);
        }
      }
    });

    return () => map.remove();
  }, [setPickedCountryModal, setPickedCountry]);

  return <div ref={mapContainerRef} className="mainMapBox" />;
};

export default MapboxMap;
