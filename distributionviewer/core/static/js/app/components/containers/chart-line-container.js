import React from 'react';
import * as d3Shape from 'd3-shape';
import * as d3Selection from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import { connect } from 'react-redux';

import ChartLine from '../views/chart-line';
import * as metricApi from '../../api/metric-api';


class ChartLineContainer extends React.Component {
  componentWillUpdate() {
    let props = this.props;
    let data = props.metricData[props.chartId];
    if (!data) return;

    // -----
    let margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 300 - margin.left - margin.right,
        height = 250 - margin.top - margin.bottom;

    let xScale = d3Scale.scaleLinear()
                  .domain([0, d3Array.max(this.props.points, d => d.x)])
                  .range([0, width]);

    let yScale = d3Scale.scaleLinear()
                  .domain([0, d3Array.max(this.props.points, d => d.y)])
                  .range([height, 0]);
    // -----

    let line = d3Shape.line()
                .x(d => {return xScale(d.x);})
                .y(d => {return yScale(d.y);});


    d3Selection.select(`.chart-${props.chartId} .line`).datum(props.points).attr('d', line);
    console.log('data used:', props.metricData[props.chartId]);
  }

  render() {
    return (<ChartLine />);
  }
}

const mapStateToProps = function(store) {
  return {
    metricData: store.metricState.metricData
  };
};

export default connect(mapStateToProps)(ChartLineContainer);
