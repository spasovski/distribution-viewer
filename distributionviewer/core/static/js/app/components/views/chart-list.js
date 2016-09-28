import React from 'react';

import ChartContainer from '../containers/chart-container';


export default class ChartList extends React.Component {
  render() {
    return (
      <section className="chart-list">
        {this.props.items.map(chart => {
          return (
            <div className="chart-item-wrapper" key={chart.id}>
              <h2>{chart.name}</h2>
              <ChartContainer isDetail={false} chartId={chart.id} showOutliers={false} />
            </div>
          );
        })}
      </section>
    );
  }
}

ChartList.propTypes = {
  items: React.PropTypes.array.isRequired
};
