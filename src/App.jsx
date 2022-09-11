import React, { useState, memo } from "react";
import "./App.css";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
  ZoomableGroup,
  Graticule,
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
    console.log(worldCities);
    console.log(chosenCountry[0]);
    // let arr = [];
    // worldCities.map((city) => arr.push(city.country));
    // console.log(arr);
    console.log(content.toString());
  };

  return (
    <div className="App">
      <h1>lets build</h1>
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
                      console.log(e);
                      setCountryName(e.properties.name);
                    }}
                    onMouseLeave={() => {
                      setContent("");
                    }}
                    onClick={() => {
                      displayCities();
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
            {/* markers */}
            {/* {worldCities.features.map(({ geometry, properties }) => {
              return (
                <Marker
                  key={geometry.coordinates}
                  coordinates={geometry.coordinates}
                >
                  <circle r={5} fill="yellow" stroke="white" strokeWidth={2} />
                  <text
                    textAnchor="middle"
                    style={{ fontFamily: "system-ui", fill: "orange" }}
                  >
                    {properties.city}
                  </text>
                </Marker>
              );
            })} */}

            {/* <Marker coordinates={chosenCountry[0].geometry.coordinates}> */}
            <Marker coordinates={chosenCountry[0].geometry.coordinates}>
              <circle r={5} fill="yellow" stroke="white" strokeWidth={2} />
              <text
                textAnchor="middle"
                style={{
                  fontFamily: "system-ui",
                  fill: "yellow",
                  fontWeight: "bold",
                }}
              >
                {chosenCountry[0].properties.city}
              </text>
            </Marker>
            {/* <Annotation
              subject={[worldCities[50].lat, worldCities[49].lng]}
              dx={-90}
              dy={-30}
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
                fill="#F53"
              >
                {"Paris"}
              </text>
            </Annotation> */}
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </div>
  );
};

export default memo(App);
