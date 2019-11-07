import React, { Component } from "react";
import './App.css';
import * as d3 from 'd3';

const width = "90vw";
const height = "100vh";
const margin = {top: 20, right: 5, bottom: 20, left: 35};

class D3Component extends Component {
    // state = {
    //   highs: null, // svg path command for all the high temps
    //   lows: null, // svg path command for low temps,
    //   // d3 helpers
    //   xScale: d3.scaleTime().range([margin.left, width - margin.right]),
    //   yScale: d3.scaleLinear().range([height - margin.bottom, margin.top]),
    //   lineGenerator: d3.line(),
    // };
    //
    // xAxis = d3.axisBottom().scale(this.state.xScale).tickFormat(d3.timeFormat('%b'));
    // yAxis = d3.axisLeft().scale(this.state.yScale).tickFormat(d => `${d}℉`);


  render() {

    return (
      <svg className="svg_animation" width={width} height={height}>
      </svg>
    );
  }
}

export default D3Component;
