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
    "South America": ["GY", "SR", "GF"],
    "South Asia": ["AF", "BD", "BT", "IN", "IR", "MV", "NP", "PK", "LK"],
    "East Asia": ["CN", "HK", "JP", "KP", "KR", "MN", "MO", "TW"],
    "Southeast Asia": ["BN", "KH", "ID", "LA", "MY", "MM", "PH", "SG", "TH", "TL", "VN"],
    "Northern Europe": ["DK", "EE", "FI", "IS", "IE", "LV", "LT", "NO", "SE", "GB"],
    "Western Europe": ["AT", "BE", "FR", "DE", "LI", "LU", "MC", "NL", "CH"],
    "Eastern Europe": ["BY", "BG", "CZ", "HU", "MD", "PL", "RO", "RU", "SK", "UA"],
    "Southern Europe": ["AL", "AD", "BA", "HR", "GR", "IT", "MT", "ME", "MK", "PT", "SM", "RS", "SI", "ES", "VA"],
    "Northern America": ["BM", "CA", "GL", "PM", "US"],
    "Central America": ["BZ", "CR", "SV", "GT", "HN", "MX", "NI", "PA"],
    "The Caribbean": ["AI", "AG", "AW", "BS", "BB", "BQ", "CU", "CW", "DM", "DO", "GD", "GP", "HT", "JM", "MQ", "MS", "PR", "BL", "KN", "LC", "MF", "VC", "SX", "TT", "TC", "VG", "VI"],
    "Andean States": ["BO", "CO", "EC", "PE", "VE"],
    "Southern Cone": ["AR", "CL", "PY", "UY"],
    "Brazil": ["BR"],
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
    "Australasia": "#DA70D6",
    "Melanesia": "#EE82EE",
    "Micronesia": "#DDA0DD",
    "Polynesia": "#FF00FF"
  };

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/light-v10",
      center: [0, 20],
      zoom: 2,
      maxBounds: [[-180, -90], [180, 90]],
      renderWorldCopies: false
    });

    map.on("load", () => {
      Object.entries(subregions).forEach(([subregion, countries]) => {
        map.addLayer({
          id: `subregion-${subregion}`,
          type: "fill",
          source: { type: "vector", url: "mapbox://mapbox.country-boundaries-v1" },
          "source-layer": "country_boundaries",
          filter: ["in", "iso_3166_1", ...countries],
          paint: { "fill-color": subregionColors[subregion], "fill-opacity": 0.5 }
        });
      });
      map.addControl(new mapboxgl.ScaleControl(), "bottom-right");
    });

    return () => map.remove();
  }, []);

  return <div ref={mapContainerRef} className="mainMapBox" />;
};

export default MapboxMap;