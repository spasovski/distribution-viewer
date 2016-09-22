import React from 'react';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';

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

export class Chart extends React.Component {
  render() {
    var margin = {top: 20, right: 100, bottom: 30, left: 100},
         width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var xScale = d3Scale.scaleLinear().domain([0, d3Array.max(dataset, d => return d.x)])
          .range([0, width]);

    var yScale = d3Scale.scaleLinear().domain([0, d3Array.max(dataset, d => return d.y)])
          .range([height, 0]);

    return (
      <div className={`chart chart-${props.chartId}`}>
        <svg>

        </svg>
      </div>
    );
  }
}

/*
Chart.propTypes = {
  chartId: React.PropTypes.number.isRequired,
  isDetail: React.PropTypes.bool.isRequired,
  showOutliers: React.PropTypes.bool.isRequired
};
*/
