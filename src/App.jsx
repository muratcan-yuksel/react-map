import React, { useState, memo, useEffect, useRef } from "react";
import "./App.css";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
  ZoomableGroup,
  Graticule,
  Line,
} from "react-simple-maps";
import ReactTooltip from "react-tooltip";
// import cities from "cities.json";
import capitals from "./capitals.json";

const App = () => {
  const [content, setContent] = useState("");
  const [countryName, setCountryName] = useState("");
  const [chosenCountry, setChosenCountry] = useState([
    {
      geometry: { coordinates: [37.35, 55.45] },
      properties: { city: "Moscow" },
    },
  ]);
  const [location, setLocation] = useState([]);
  const locationRef = useRef([]);
  const [bool, setBool] = useState(false);
  // const [country, setCountry] = useState("");
  const worldMap =
    "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

  const worldCities = capitals;
  console.log(worldCities);

  const displayCities = () => {
    let result = worldCities.features.filter(
      (e) => e.properties.iso3.toString() == content.toString()
    );
    console.log(result);
    setChosenCountry(result);
    // console.log(worldCities);
    // console.log(chosenCountry[0]);

    // console.log(content.toString());
    // addLocation();
  };

  const addLocation = () => {
    const locationArray = [...location, chosenCountry[0]];
    setLocation(locationArray);
    console.log(location);
    locationRef.current = locationArray;
    console.log(locationRef.current);
  };

  useEffect(() => {
    addLocation();

    console.log(location);
    console.log(locationRef.current);
  }, [chosenCountry]);

  return (
    <div className="App">
      <h1>React Simple Map</h1>
      {locationRef.current.length > 1 && (
        <div>
          From
          {" " +
            locationRef.current[locationRef.current.length - 2].properties
              .city}{" "}
          to
          {" " +
            locationRef.current[locationRef.current.length - 1].properties
              .city}{" "}
        </div>
      )}

      {/* {chosenCountry[0]} */}
      <ReactTooltip>{countryName} </ReactTooltip>
      <div className="mapContainer">
        {/* projection="geoAzimuthalEqualArea" can be added to ComposableMap to change the map projection */}
        <ComposableMap data-tip="">
          <ZoomableGroup zoom={1}>
            <Graticule stroke="#EAEAEC" />
            {/* each country */}
            <Geographies geography={worldMap}>
              {/* array of all the countries in the map */}
              {({ geographies }) =>
                geographies.map((e, index) => (
                  // individual country
                  <Geography
                    key={index}
                    geography={e}
                    onMouseEnter={() => {
                      // const { NAME } = e.properties;
                      setContent(e.id);
                      // console.log(e);
                      setCountryName(e.properties.name);
                    }}
                    onMouseLeave={() => {
                      setContent("");
                    }}
                    onClick={() => {
                      displayCities();
                      console.log(e);
                    }}
                    style={{
                      hover: {
                        fill: "#F53",
                        outline: "none",
                      },
                    }}
                  />
                ))
              }
            </Geographies>

            {/* <Marker coordinates={chosenCountry[0].geometry.coordinates}> */}
            <Marker coordinates={chosenCountry[0].geometry.coordinates}>
              <circle r={5} fill="yellow" stroke="white" strokeWidth={2} />
              <text
                textAnchor="middle"
                style={{
                  fontFamily: "system-ui",
                  fill: "red",
                  fontWeight: "bold",
                }}
              >
                {chosenCountry[0].properties.city}
              </text>
            </Marker>

            {/* Line from A to B */}
            {locationRef.current.length > 1 && (
              <Line
                from={[
                  locationRef.current[locationRef.current.length - 2].geometry
                    .coordinates[0],
                  locationRef.current[locationRef.current.length - 2].geometry
                    .coordinates[1],
                ]}
                to={[
                  locationRef.current[locationRef.current.length - 1].geometry
                    .coordinates[0],
                  locationRef.current[locationRef.current.length - 1].geometry
                    .coordinates[1],
                ]}
                stroke="#FF5533"
                strokeWidth={4}
                strokeLinecap="round"
              />
            )}
            <Annotation
              subject={[13.24, 52.31]}
              dx={-90}
              dy={-80}
              connectorProps={{
                stroke: "green",
                strokeWidth: 3,
                strokeLinecap: "round",
              }}
            >
              <text
                x="-8"
                textAnchor="end"
                alignmentBaseline="middle"
                fill="#ff33dd"
                fontWeight={600}
              >
                {"Berlin"}
              </text>
            </Annotation>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </div>
  );
};

export default memo(App);
