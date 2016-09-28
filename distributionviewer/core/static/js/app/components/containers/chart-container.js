import React from 'react';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import axios from 'axios';
import {connect} from 'react-redux';

import ChartAxisContainer from './chart-axis-container';
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

//<ChartLineContainer chartId={this.props.chartId} xScale={this.xScale} yScale={this.yScale} data={this.data} />

class ChartContainer extends React.Component {
  constructor(props) {
    super(props);

    this.data = [];
    this.margin = {top: 20, right: 20, bottom: 30, left: 40},
    this.width = 300 - this.margin.left - this.margin.right,
    this.height = 250 - this.margin.top - this.margin.bottom;
  }

  buildPointsMeta(dataPoints) {
    let pointsMeta = [];

    if (dataPoints) {
      for (let i = 0; i < dataPoints.length; i++) {
        pointsMeta.push({
          x: dataPoints[i]['refRank'] || parseFloat(dataPoints[i]['b']),
          y: dataPoints[i]['c'] * 100,
          p: dataPoints[i]['p'] * 100,
          label: dataPoints[i]['b']
        });
      }
    }

    return pointsMeta;
  }

  componentDidUpdate() {
    this.data = this.buildPointsMeta(this.props.metricData[this.props.chartId]);
    console.log('built data is:', this.data);

    this.xScale = d3Scale.scaleLinear()
                  .domain([0, d3Array.max(this.data, d => d.x)])
                  .range([0, this.width]);

    this.yScale = d3Scale.scaleLinear()
                  .domain([0, d3Array.max(this.data, d => d.y)])
                  .range([this.height, 0]);
    console.log('store state:', store.getState());
  }

  render() {
    return (
      <div className={`chart chart-${this.props.chartId}`}>
        <svg width={this.width + this.margin.left + this.margin.right}
             height={this.height + this.margin.top + this.margin.bottom}>
          <g transform={`translate(${this.margin.left}, ${this.margin.top})`}>
            <ChartAxisContainer chartId={this.props.chartId} scale={this.props.xScale} axisType="x" size={this.height} />
            <ChartAxisContainer chartId={this.props.chartId} scale={this.props.yScale} axisType="y" size={this.width} />
            <ChartLineContainer chartId={this.props.chartId} xScale={this.xScale} yScale={this.yScale} data={this.data} />
          </g>
        </svg>
      </div>
    );
  }
}

const mapStateToProps = function(store) {
  return {
    gotData: store.metricState.gotData,
    metricData: store.metricState.metricData
  };
};

export default connect(mapStateToProps)(ChartContainer);

/*
ChartContainer.propTypes = {
  chartId: React.PropTypes.number.isRequired,
};
*/
