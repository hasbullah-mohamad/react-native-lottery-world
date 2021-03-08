import moment from 'moment';
// import CONFIG from '../config';

// const { SETTINGS } = CONFIG;

const AppHelper = {
  isRecentlyUpdated(updated_at) {
    const date = new Date();
    // const date = new Date(todayDate - SETTINGS.DIFFERENCE_IN_MILISECONDS);
    return updated_at.indexOf(moment(date).format('DD-MM-YYYY')) === 0;
  },
  convertChartData(stats) {
    const keys = Object.keys(stats);
    const data = [];
    for (let i = 0; i < keys.length; i++) {
      data.push({ name: keys[i], v: stats[keys[i]] });
    }
    data.sort((a, b) => a.name - b.name);

    const mainData = [];
    for (let i = 0; i < data.length; i++) {
      const tempData = [];
      tempData.push(data[i]);
      mainData.push(tempData);
    }
    return mainData;
  }
};

export default AppHelper;
