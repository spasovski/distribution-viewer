import React from 'react';
import * as d3Axis from 'd3-axis';
import * as d3Selection from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import { connect } from 'react-redux';

import ChartAxis from '../views/chart-axis';
import store from '../../store';


const buildPointsMeta = (dataPoints) => {
  let pointsMeta = [];

  for (let i = 0; i < dataPoints.length; i++) {
    pointsMeta.push({
      x: dataPoints[i]['refRank'] || parseFloat(dataPoints[i]['b']),
      y: dataPoints[i]['c'] * 100,
      p: dataPoints[i]['p'] * 100,
      label: dataPoints[i]['b']
    });
  }

  return pointsMeta;
}

class ChartAxisContainer extends React.Component {
  componentDidUpdate() {
    let props = this.props;
    let axisGenerator = props.axisType === 'x' ? d3Axis.axisBottom : d3Axis.axisLeft;
    let data = buildPointsMeta(props.metricData[props.chartId]);
    console.log('chartId in axis is', props.chartId);
    if (!data) return;

    // -----
    let margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 300 - margin.left - margin.right,
        height = 250 - margin.top - margin.bottom;

    let xScale = d3Scale.scaleLinear()
                  .domain([0, d3Array.max(data, d => d.x)])
                  .range([0, width]);

    let yScale = d3Scale.scaleLinear()
                  .domain([0, d3Array.max(data, d => d.y)])
                  .range([height, 0]);
    // -----

    // let axis = axisGenerator(props.scale)
    //             .tickSizeInner(-props.size)
    //             .tickSizeOuter(0)
    //             .tickPadding(10);

    let axisElm = d3Selection.select(`.chart-${props.chartId} .${props.axisType}.axis`);

    if (props.axisType === 'x') {
      let axis = axisGenerator(xScale)
                  .tickSizeInner(-props.size)
                  .tickSizeOuter(0)
                  .tickPadding(10);
      axisElm.attr('transform', `translate(0, ${props.size})`).call(axis);
    } else {
      let axis = axisGenerator(yScale)
                  .tickSizeInner(-props.size)
                  .tickSizeOuter(0)
                  .tickPadding(10);
      axisElm.call(axis);
    }
  }

  render() {
    return (<ChartAxis axisType={this.props.axisType} />);
  }
}

const mapStateToProps = function(store) {
  return {
    metricData: store.metricState.metricData
  };
};

export default connect(mapStateToProps)(ChartAxisContainer);
