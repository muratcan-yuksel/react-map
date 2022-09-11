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
import cities from "cities.json";

const App = () => {
  const [content, setContent] = useState("");
  const [alpha, setAlpha] = useState({});
  const [country, setCountry] = useState("");
  const worldMap =
    "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

  const worldCities = cities;
  console.log(worldCities);

  // const searchCountry=()=>{
  //   worldCities.filter(e=>e.properties.Alpha-2)
  // }
  //need to get country abbreviation
  //but for some reason, the returned format is not chooseable(or I don't know how)
  //So I loop over the object at question in geographies (which is a country)
  //and get the country abbreviation from there
  const getCountryAbbr = () => {
    for (const [key, value] of Object.entries(alpha)) {
      console.log(`${key}: ${value}`);
      console.log(value);
      setCountry(value);
    }
  };

  return (
    <div className="App">
      <h1>lets build</h1>
      <ReactTooltip>{content} </ReactTooltip>
      <div className="mapContainer">
        {/* projection="geoAzimuthalEqualArea" can be added to ComposableMap to change the map projection */}
        <ComposableMap data-tip="">
          <ZoomableGroup zoom={1}>
            <Graticule stroke="#EAEAEC" />
            {/* each country */}
            <Geographies geography={worldMap}>
              {/* array of all the countries in the map */}
              {({ geographies }) =>
                geographies.map((e) => (
                  // individual country
                  <Geography
                    key={e.id}
                    geography={e}
                    onMouseEnter={() => {
                      // const { NAME } = e.properties;
                      setContent(e.properties.name);
                      console.log(e.properties);
                      setAlpha(e.properties);
                    }}
                    onMouseLeave={() => {
                      setContent("");
                    }}
                    onClick={() => {
                      getCountryAbbr();
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
            {/* {worldCities.splice(25, 46).map(({ name, lat, lng, country }) => {
              return (
                <Marker key={lat} coordinates={[lat, lng]}>
                  <circle r={5} fill="yellow" stroke="white" strokeWidth={2} />
                  <text
                    textAnchor="middle"
                    style={{ fontFamily: "system-ui", fill: "orange" }}
                  >
                    {name}
                  </text>
                </Marker>
              );
            })} */}
            <Annotation
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
            </Annotation>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </div>
  );
};

export default memo(App);
