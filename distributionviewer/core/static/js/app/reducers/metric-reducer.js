import * as types from '../actions/action-types';

let points = [
  {p: 0, refRank: 1, b: '', c: 0},
  {p: 0, refRank: 2, b: '', c: 0},
  {p: 0, refRank: 3, b: '', c: 0},
  {p: 0, refRank: 4, b: '', c: 0},
  {p: 0, refRank: 5, b: '', c: 0},
  {p: 0, refRank: 6, b: '', c: 0},
  {p: 0, refRank: 7, b: '', c: 0},
];

const initialState = {
  isFetching: false,
  item: {},
  items: [],
  metricData: [],
  gotData: false,
  status: 200
};

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

const metricReducer = function(state = initialState, action) {
  switch(action.type) {
    case types.GETTING_METRICS:
      return Object.assign({}, state, {isFetching: true});
    case types.GET_METRICS_SUCCESS:
      return Object.assign({}, state, {isFetching: false, items: action.items});
    case types.GET_METRICS_FAILURE:
      return Object.assign({}, state, {isFetching: false, status: action.status});

    case types.GETTING_METRIC_DATA:
      return Object.assign({}, state, {isFetching: true});
    case types.GET_METRIC_DATA_SUCCESS:
      //let myPoints = buildPointsMeta(action.metricData);
      console.log('reducer metricData:', action.metricData);
      return Object.assign({}, state, {isFetching: false, metricData: action.metricData, gotData: true});
    case types.GET_METRIC_DATA_FAILURE:
      return Object.assign({}, state, {isFetching: false, status: action.status});
  }

  return state;
};

export default metricReducer;
