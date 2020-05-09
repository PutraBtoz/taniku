import jawaTimur from 'assets/geo-data/jawa-timur-simplified-topo.json';
// import data from 'assets/geo-data/data.json';
import { scaleLinear } from 'd3-scale';
import React, { Component } from 'react';
import axios from 'axios';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Markers,
  ZoomableGroup,
} from 'react-simple-maps';
import { getColor } from 'utils/colors';
import ReactTooltip from "react-tooltip";

const cityScale = scaleLinear()
  .domain([0, 1000])
  .range([2, 100]);

const rounded = num => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};

class BubbleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data,
    };
  }

  // componentDidMount() {
  //   // axios.get(`http://localhost:4000/api/gis`)
  //   // .then(res => this.setState({data: res.data}))
  //   console.log("AAA",data)
  // }

  render() {
    const { setTooltipContent, dataGis } = this.props
    const primaryColor = getColor('primary');
    const secondaryColor = getColor('secondary');
    const darkColor = getColor('pressed');

    return (
      <ComposableMap
        projectionConfig={{ scale: 1555 }}
        width={980}
        height={551}
        style={{
          width: '100%',
          height: 'auto',
        }}
      >
        <ZoomableGroup center={[118, -3]} >
          <Geographies geography={jawaTimur}>
            {(geographies, projection) =>
              geographies.map(
                (geography, i) =>
                  geography.id !== 'ATA' && (
                    <Geography
                      key={i}
                      data-tip data-for="map"
                      onMouseEnter={() => {
                        const { provinsi } = geography.properties;
                        setTooltipContent(provinsi);
                      }}
                      // onMouseLeave={() => {
                      //   setTooltipContent("");
                      // }}
                      geography={geography}
                      projection={projection}
                      style={{
                        default: {
                          fill: secondaryColor,
                          stroke: secondaryColor,
                          strokeWidth: 0.75,
                          outline: 'none',
                        },
                        hover: {
                          fill: darkColor,
                          stroke: darkColor,
                          strokeWidth: 0.75,
                          outline: 'none',
                        },
                        pressed: {
                          fill: primaryColor,
                          stroke: primaryColor,
                          strokeWidth: 0.75,
                          outline: 'none',
                        },
                      }}
                    />
                  ),
              )
            }
          </Geographies> 
          {/* <Markers>
            {this.state.data.map((city, i) => (
              <Marker key={i} marker={city}>
                <circle
                  data-tip data-for="map"
                  cx={0}
                  cy={0}
                  r={cityScale(city.population)}
                  fill="red"
                  stroke={primaryColor}
                  strokeWidth="1"
                  onMouseEnter={() => {
                    const { name, population } = city;
                    // console.log(`${name} - ${population} konsul`);
                    setTooltipContent(`${name} - ${population} konsul`);
                  }}
                  // onMouseLeave={() => {
                  //   setTooltipContent("");
                  // }}
                  // id={"Tooltip-" + i}
                  // onClick={() => console.log(city.population)}
                />
              </Marker>
            ))}
          </Markers> */}
          <Markers>
            {dataGis.map((city, i) => (
              <Marker key={i} marker={city}>
                <circle
                  data-tip data-for="map"
                  cx={0}
                  cy={0}
                  r={cityScale(city.population)}
                  fill="red"
                  stroke={primaryColor}
                  strokeWidth="1"
                  onMouseEnter={() => {
                    const { name, population } = city;
                    // console.log(`${name} - ${population} konsul`);
                    setTooltipContent(`${name} - ${population} konsul`);
                  }}
                  // onMouseLeave={() => {
                  //   setTooltipContent("");
                  // }}
                  // id={"Tooltip-" + i}
                  // onClick={() => console.log(city.population)}
                />
              </Marker>
            ))}
          </Markers>
        </ZoomableGroup>
      </ComposableMap>
    );
  }
}

export default BubbleMap;
