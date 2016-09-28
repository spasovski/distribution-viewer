import React from 'react';
import { connect } from 'react-redux';

import { ChartMenu } from '../views/chart-menu';
import * as metricApi from '../../api/metric-api';


class ChartMenuContainer extends React.Component {
  componentDidMount() {
    metricApi.getMetrics();
  }

  render() {
    return (
      <ChartMenu items={this.props.items} />
    );
  }
}

ChartMenuContainer.propTypes = {
  items: React.PropTypes.array.isRequired,
}

const mapStateToProps = function(store) {
  return {
    isFetching: store.metricState.isFetching,
    items: store.metricState.items,
    status: store.metricState.status
  };
}

export default connect(mapStateToProps)(ChartMenuContainer);
