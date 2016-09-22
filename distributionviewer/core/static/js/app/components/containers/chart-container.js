import React from 'react';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import axios from 'axios';

import { ChartAxisContainer } from './chart-axis-container';
import ChartLineContainer from './chart-line-container';
import * as metricApi from '../../api/metric-api';
import store from '../../store';
import {
  getMetricSuccess, getMetricFailure
} from '../../actions/metric-actions';

// TODO: Clean up imports, this was from much redux testing.

var dataset = [
  {x: 0, y: 5},
  {x: 1, y: 8},
  {x: 2, y: 13},
  {x: 3, y: 12},
  {x: 4, y: 16},
  {x: 5, y: 21},
  {x: 6, y: 18},
  {x: 7, y: 23},
  {x: 8, y: 24},
  {x: 9, y: 28},
  {x: 10, y: 35},
  {x: 11, y: 30},
  {x: 12, y: 32},
  {x: 13, y: 36},
  {x: 14, y: 40},
  {x: 15, y: 38},
];

export default class ChartContainer extends React.Component {
  render() {
    let margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 300 - margin.left - margin.right,
        height = 250 - margin.top - margin.bottom;

    let data = dataset;

    let xScale = d3Scale.scaleLinear()
                  .domain([0, d3Array.max(data, d => d.x)])
                  .range([0, width]);

    let yScale = d3Scale.scaleLinear()
                  .domain([0, d3Array.max(data, d => d.y)])
                  .range([height, 0]);

    return (
      <div className={`chart chart-${this.props.chartId}`}>
        <svg width={width + margin.left + margin.right}
             height={height + margin.top + margin.bottom}>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <ChartAxisContainer chartId={this.props.chartId} axisType="x" scale={xScale} size={height} />
            <ChartAxisContainer chartId={this.props.chartId} axisType="y" scale={yScale} size={width} />
            <ChartLineContainer chartId={this.props.chartId} xScale={xScale} yScale={yScale} data={data} />
          </g>
        </svg>
      </div>
    );
  }
}

/*
ChartContainer.propTypes = {
  chartId: React.PropTypes.number.isRequired,
};
*/
