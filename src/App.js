import React, { Component } from "react";
import axios from 'axios';
import {Line} from 'react-chartjs-2';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const apiHeartbeat = '/heartbeat';
const apiHour = '/hour';
const cpuColor = 'rgba(17,125,187,1)';
const cpuColorDimmed = 'rgba(17,125,187,0.5)';
const memoryColor = 'rgba(139,18,174,1)';
const memoryColorDimmed = 'rgba(139,18,174,0.5)';
const wifiColor = 'rgba(247,148,30,1)';
const wifiColorDimmed = 'rgba(247,148,30,0.5)';
const discColor = 'rgba(77,166,12,1)';
const discColorDimmed = 'rgba(77,166,12,0.5)';

// START: Declaring chart's default data options
const chartCpu = {
  labels: [0,1,2,3,4,5],
  datasets: [{
    data: [0,0,0,0,0,0],
    backgroundColor: [
      cpuColorDimmed
    ],
    pointRadius: 0,
    lineTension: 0,
    borderWidth: 1,
    borderColor: cpuColor,
    pointBorderColor: cpuColor,
    pointBackgroundColor: cpuColorDimmed
  }]
};
const chartMemory = {
  labels: [0,1,2,3,4,5],
  datasets: [{
    data: [0,0,0,0,0,0],
    backgroundColor: [
      memoryColorDimmed
    ],
    pointRadius: 0,
    lineTension: 0,
    borderWidth: 1,
    borderColor: memoryColor,
    pointBorderColor: memoryColor,
    pointBackgroundColor: memoryColorDimmed
  }]
};
const chartWifi = {
  labels: [0,1,2,3,4,5],
  datasets: [{
    data: [0,0,0,0,0,0],
    backgroundColor: [
      wifiColorDimmed
    ],
    pointRadius: 0,
    lineTension: 0,
    borderWidth: 1,
    borderColor: wifiColor,
    pointBorderColor: wifiColor,
    pointBackgroundColor: wifiColorDimmed
  }]
};
const chartDisc = {
  labels: [0,1,2,3,4,5],
  datasets: [{
    data: [0,0,0,0,0,0],
    backgroundColor: [
      discColorDimmed
    ],
    pointRadius: 0,
    lineTension: 0,
    borderWidth: 1,
    borderColor: discColor,
    pointBorderColor: discColor,
    pointBackgroundColor: discColorDimmed
  }]
};
// END: Declaring chart's default data options
// START: Declaring chart's default config options
const chartOptionsCpu = {
  legend: {
    display: false
  },
  scales: {
    xAxes: [{
      display: true,
      gridLines: {
        color: cpuColorDimmed,
        lineWidth: 0.5,
        zeroLineColor: cpuColorDimmed
      },
      ticks: {
        display: false,
        steps: 10,
        maxTicksLimit: 10
      }
    }],
    yAxes: [{
      display: true,
      gridLines: {
        color: cpuColorDimmed,
        lineWidth: 0.5,
        zeroLineColor: cpuColorDimmed
      },
      ticks: {
        display: false,
        beginAtZero: true,
        steps: 10,
        stepValue: 10,
        max: 100
      }
    }]
  }
};
const chartOptionsMemory = {
  legend: {
    display: false
  },
  scales: {
    xAxes: [{
      display: true,
      gridLines: {
        color: memoryColorDimmed,
        lineWidth: 0.5,
        zeroLineColor: memoryColorDimmed
      },
      ticks: {
        display: false,
        steps: 10,
        maxTicksLimit: 10
      }
    }],
    yAxes: [{
      display: true,
      gridLines: {
        color: memoryColorDimmed,
        lineWidth: 0.5,
        zeroLineColor: memoryColorDimmed
      },
      ticks: {
        display: false,
        beginAtZero: true,
        steps: 10,
        stepValue: 1.7,
        max: 17
      }
    }]
  }
};
const chartOptionsWifi = {
  legend: {
    display: false
  },
  scales: {
    xAxes: [{
      display: true,
      gridLines: {
        color: wifiColorDimmed,
        lineWidth: 0.5,
        zeroLineColor: wifiColorDimmed
      },
      ticks: {
        display: false,
        steps: 10,
        maxTicksLimit: 10
      }
    }],
    yAxes: [{
      display: true,
      gridLines: {
        color: wifiColorDimmed,
        lineWidth: 0.5,
        zeroLineColor: wifiColorDimmed
      },
      ticks: {
        display: false,
        beginAtZero: true,
        steps: 10,
        stepValue: 10,
        max: 100
      }
    }]
  }
};
const chartOptionsDisc = {
  legend: {
    display: false
  },
  scales: {
    xAxes: [{
      display: true,
      gridLines: {
        color: discColorDimmed,
        lineWidth: 0.5,
        zeroLineColor: discColorDimmed
      },
      ticks: {
        display: false,
        steps: 10,
        maxTicksLimit: 10
      }
    }],
    yAxes: [{
      display: true,
      gridLines: {
        color: discColorDimmed,
        lineWidth: 0.5,
        zeroLineColor: discColorDimmed
      },
      ticks: {
        display: false,
        beginAtZero: true,
        steps: 10,
        stepValue: 10,
        max: 100
      }
    }]
  }
};
// END: Declaring chart's default config options
// START: Declaring each chart component using ReactCSSTransitionGroup
class ToggleCpu extends React.Component {
  render() {
    return <ReactCSSTransitionGroup
            component={ShowElement}
            transitionName="toggle"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}>
            {this.props.hiddenCpu ? null : <div className="chart chart--cpu">{this.props.children}</div>}
      </ReactCSSTransitionGroup>
  }
}
class ToggleMemory extends React.Component {
  render() {
    return <ReactCSSTransitionGroup
            component={ShowElement}
            transitionName="toggle"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}>
            {this.props.hiddenMemory ? null : <div className="chart chart--memory">{this.props.children}</div>}
      </ReactCSSTransitionGroup>
  }
}
class ToggleWifi extends React.Component {
  render() {
    return <ReactCSSTransitionGroup
            component={ShowElement}
            transitionName="toggle"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}>
            {this.props.hiddenWifi ? null : <div className="chart chart--wifi">{this.props.children}</div>}
      </ReactCSSTransitionGroup>
  }
}
class ToggleDisc extends React.Component {
  render() {
    return <ReactCSSTransitionGroup
            component={ShowElement}
            transitionName="toggle"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}>
            {this.props.hiddenDisc ? null : <div className="chart chart--disc">{this.props.children}</div>}
      </ReactCSSTransitionGroup>
  }
}
class ToggleTimeFilter extends React.Component {
  render() {
    return <ReactCSSTransitionGroup
            component={ShowElement}
            transitionName="toggle"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}>
            {this.props.hiddenTimeFilter ? null : <div className="time-filter">{this.props.children}</div>}
      </ReactCSSTransitionGroup>
  }
}
// END: Declaring each chart component using ReactCSSTransitionGroup
// START: The below function ensures that there is no <span> wrapper around the ReactCSSTransitionGroup elements
function ShowElement(props) {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
}
// END: The below function ensures that there is no <span> wrapper around the ReactCSSTransitionGroup elements
// START: Main App component
export default class App extends Component {
// START: Constructor. State declarations
  constructor(props) {
    super(props);
    this.state = {
      chartDataCpu: chartCpu,
      chartDataMemory: chartMemory,
      chartDataWifi: chartWifi,
      chartDataDisc: chartDisc,
      chartOptionsCpu: chartOptionsCpu,
      chartOptionsMemory: chartOptionsMemory,
      chartOptionsWifi: chartOptionsWifi,
      chartOptionsDisc: chartOptionsDisc,
      updated: false,
      cpu: [],
      cpuKey: [],
      memory: [],
      memoryKey: [],
      wifi: [],
      wifiKey: [],
      disc: [],
      discKey: [],
      chartLabel: '60 seconds',
      hiddenCpu:true,
      hiddenMemory:true,
      hiddenWifi:true,
      hiddenDisc:true,
      hiddenTimeFilter:true,
      isViewingHourOn: false
    }
    // Set binding functions
    this.onClickCpu = this.onClickCpu.bind(this);
    this.onClickMemory = this.onClickMemory.bind(this);
    this.onClickWifi = this.onClickWifi.bind(this);
    this.onClickDisc = this.onClickDisc.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.viewHourData = this.viewHourData.bind(this);
    this.viewMinuteData = this.viewMinuteData.bind(this);
  }
// END: Constructor. State declarations
// START: On click, toggle display aligning chart
  onClickCpu() {
    this.setState((prevState, props) => ({
      hiddenCpu: !(prevState.hiddenCpu)
    }))
  }
  onClickMemory() {
    this.setState((prevState, props) => ({
      hiddenMemory: !(prevState.hiddenMemory)
    }))
  }
  onClickWifi() {
    this.setState((prevState, props) => ({
      hiddenWifi: !(prevState.hiddenWifi)
    }))
  }
  onClickDisc() {
    this.setState((prevState, props) => ({
      hiddenDisc: !(prevState.hiddenDisc)
    }))
  }
// END: On click, toggle display aligning chart
// START: On mount, initiate heartbeat call
  componentDidMount() {
    this.fetchHeartbeatData()
  }
// END: On mount, initiate heartbeat call
// START: Heartbeat API call.  This is where we fetch the heartbeat data from the backend and manipulate it into local variables.
  fetchHeartbeatData() {
    axios.get(apiHeartbeat)
      .then(res => {
        var cpu = [];
        var cpuKey = [];
        var memory = [];
        var memoryKey = [];
        var wifi = [];
        var wifiKey = [];
        var disc = [];
        var discKey = [];
        var heartbeatResponse = res.data;
        var heartbeatCounter = new Date().toLocaleTimeString();
        // Converting Memory data down one decimal
        heartbeatResponse.MemoryGb = (heartbeatResponse.MemoryGb * .1);
        // The below logic conditionally manipulates the data coming from the heartbeat call
        if (this.state.cpu.length == 60) {
          // For viewing minute data, restrict data array to 60
          var cpuTempArray = this.state.cpu;
          var cpuTempKeyArray = this.state.cpuKey;
          var memoryTempArray = this.state.memory;
          var memoryTempKeyArray = this.state.memoryKey;
          var wifiTempArray = this.state.wifi;
          var wifiTempKeyArray = this.state.wifiKey;
          var discTempArray = this.state.disc;
          var discTempKeyArray = this.state.discKey;
          cpuTempArray.splice(0, 1);
          cpuTempKeyArray.splice(0, 1);
          memoryTempArray.splice(0, 1);
          memoryTempKeyArray.splice(0, 1);
          wifiTempArray.splice(0, 1);
          wifiTempKeyArray.splice(0, 1);
          discTempArray.splice(0, 1);
          discTempKeyArray.splice(0, 1);
          this.setState({cpu: cpuTempArray });
          this.setState({cpuKey: cpuTempKeyArray });
          this.setState({memory: memoryTempArray });
          this.setState({memoryKey: memoryTempKeyArray });
          this.setState({wifi: wifiTempArray });
          this.setState({wifiKey: wifiTempKeyArray });
          this.setState({disc: discTempArray });
          this.setState({discKey: discTempKeyArray });
        } else if (this.state.cpu.length >= 3600) {
          // For viewing hour data, restrict data array to 3600
          var cpuTempArray = this.state.cpu;
          var cpuTempKeyArray = this.state.cpuKey;
          var memoryTempArray = this.state.memory;
          var memoryTempKeyArray = this.state.memoryKey;
          var wifiTempArray = this.state.wifi;
          var wifiTempKeyArray = this.state.wifiKey;
          var discTempArray = this.state.disc;
          var discTempKeyArray = this.state.discKey;
          var cpuOverMax = (this.state.cpu.length - 3600);
          var memoryOverMax = (this.state.memory.length - 3600);
          var wifiOverMax = (this.state.wifi.length - 3600);
          var discOverMax = (this.state.disc.length - 3600);
          // If length of array is over 3600, splice the ammount over 3600 from the array
          if (cpuOverMax > 1) {
            cpuTempArray.splice(0, cpuOverMax);
            cpuTempKeyArray.splice(0, cpuOverMax);
            memoryTempArray.splice(0, memoryOverMax);
            memoryTempKeyArray.splice(0, memoryOverMax);
            wifiTempArray.splice(0, wifiOverMax);
            wifiTempKeyArray.splice(0, wifiOverMax);
            discTempArray.splice(0, discOverMax);
            discTempKeyArray.splice(0, discOverMax);
          } else{
            cpuTempArray.splice(0, 1);
            cpuTempKeyArray.splice(0, 1);
            memoryTempArray.splice(0, 1);
            memoryTempKeyArray.splice(0, 1);
            wifiTempArray.splice(0, 1);
            wifiTempKeyArray.splice(0, 1);
            discTempArray.splice(0, 1);
            discTempKeyArray.splice(0, 1);
          }
          // Updated states
          this.setState({cpu: cpuTempArray });
          this.setState({cpuKey: cpuTempKeyArray });
          this.setState({memory: memoryTempArray });
          this.setState({memoryKey: memoryTempKeyArray });
          this.setState({wifi: wifiTempArray });
          this.setState({wifiKey: wifiTempKeyArray });
          this.setState({disc: discTempArray });
          this.setState({discKey: discTempKeyArray });
        } else {
          this.setState({ cpu: this.state.cpu.concat(heartbeatResponse.CpuPercent) })
          this.setState({ cpuKey: this.state.cpuKey.concat(heartbeatCounter) })
          this.setState({ memory: this.state.memory.concat(heartbeatResponse.MemoryGb) })
          this.setState({ memoryKey: this.state.memoryKey.concat(heartbeatCounter) })
          this.setState({ wifi: this.state.wifi.concat(heartbeatResponse.WiFi) })
          this.setState({ wifiKey: this.state.wifiKey.concat(heartbeatCounter) })
          this.setState({ disc: this.state.disc.concat(heartbeatResponse.Disc) })
          this.setState({ discKey: this.state.discKey.concat(heartbeatCounter) })
        }
        // Trigger chart data/options update function
        this.handleUpdate();
      });
  }
// END: Heartbeat API call.  This is where we fetch the heartbeat data from the backend and manipulate it into local variables.
// START: Update chart values to showing the last minute (60 seconds)
  viewMinuteData() {
    // Update chart labels and disabled button states
    this.setState({isViewingHourOn: false });
    this.setState({ chartLabel: '60 seconds' })
    // Set local variables to current states
    var cpuTempArray = this.state.cpu;
    var cpuTempKeyArray = this.state.cpuKey;
    var memoryTempArray = this.state.memory;
    var memoryTempKeyArray = this.state.memoryKey;
    var wifiTempArray = this.state.wifi;
    var wifiTempKeyArray = this.state.wifiKey;
    var discTempArray = this.state.disc;
    var discTempKeyArray = this.state.discKey;
    var cpuOverMax = (this.state.cpu.length - 60);
    var memoryOverMax = (this.state.memory.length - 60);
    var wifiOverMax = (this.state.wifi.length - 60);
    var discOverMax = (this.state.disc.length - 60);
    // If length of array is over 60, splice the ammount over 60 from the array
    if (cpuOverMax > 1) {
      cpuTempArray.splice(0, cpuOverMax);
      cpuTempKeyArray.splice(0, cpuOverMax);
      memoryTempArray.splice(0, memoryOverMax);
      memoryTempKeyArray.splice(0, memoryOverMax);
      wifiTempArray.splice(0, wifiOverMax);
      wifiTempKeyArray.splice(0, wifiOverMax);
      discTempArray.splice(0, discOverMax);
      discTempKeyArray.splice(0, discOverMax);
    } else {
      cpuTempArray.splice(0, 1);
      cpuTempKeyArray.splice(0, 1);
      memoryTempArray.splice(0, 1);
      memoryTempKeyArray.splice(0, 1);
      wifiTempArray.splice(0, 1);
      wifiTempKeyArray.splice(0, 1);
      discTempArray.splice(0, 1);
      discTempKeyArray.splice(0, 1);
    }
    // Updated states
    this.setState({cpu: cpuTempArray });
    this.setState({cpuKey: cpuTempKeyArray });
    this.setState({memory: memoryTempArray });
    this.setState({memoryKey: memoryTempKeyArray });
    this.setState({wifi: wifiTempArray });
    this.setState({wifiKey: wifiTempKeyArray });
    this.setState({disc: discTempArray });
    this.setState({discKey: discTempKeyArray });
  }
// END: Update chart values to showing the last minute (60 seconds)
// START: Update chart values to showing the last hour
  viewHourData() {
    // Update chart labels and disabled button states
    this.setState({isViewingHourOn: true });
    this.setState({ chartLabel: 'Past Hour' })
    // Initiate api call that fetches data from the past Hour
    axios.get(apiHour)
    .then(res => {
      var hourResponse = res.data;
      var cpu = this.state.cpu;
      var cpuKey = this.state.cpuKey;
      var memory = this.state.memory;
      var memoryKey = this.state.memoryKey;
      var wifi = this.state.wifi;
      var wifiKey = this.state.wifiKey;
      var disc = this.state.disc;
      var discKey = this.state.discKey;
      // Loops through the api hour call, setting the Key values for the chart based off of length of data recieved
      for (var i = 0; i < hourResponse.length; i++) {
        // Converting Memory data down one decimal
        hourResponse[i].MemoryGb = (hourResponse[i].MemoryGb * .1);
        // Sets the key value to the current time iterating backwards by 1 second
        var d = new Date();
        var seconds = d.getSeconds();
        d.setSeconds(seconds - i);
        // Places the hour data at the front of the array
        cpu.unshift(hourResponse[i].CpuPercent);
        memory.unshift(hourResponse[i].MemoryGb);
        wifi.unshift(hourResponse[i].WiFi);
        disc.unshift(hourResponse[i].Disc);
        // Places the hour keys at the front of the array
        cpuKey.unshift(d.toLocaleTimeString('en-US'))
        memoryKey.unshift(d.toLocaleTimeString('en-US'))
        wifiKey.unshift(d.toLocaleTimeString('en-US'))
        discKey.unshift(d.toLocaleTimeString('en-US'))
      }
      // Updates states
      this.setState({cpu: cpu });
      this.setState({cpuKey: cpuKey });
      this.setState({memory: memory });
      this.setState({memoryKey: memoryKey });
      this.setState({wifi: wifi });
      this.setState({wifiKey: wifiKey });
      this.setState({disc: disc });
      this.setState({discKey: discKey });
      // Declaring local chart data for manipulation below
      var updatedDataCpu  = {};
      var updatedDataMemory  = {};
      var updatedDataWifi  = {};
      var updatedDataDisc  = {};
      // Setting charts data to inititial chart data and options
      updatedDataCpu = chartCpu;
      updatedDataMemory = chartMemory;
      updatedDataWifi = chartWifi;
      updatedDataDisc = chartDisc;
      // Updating charts datasets
      updatedDataCpu.datasets[0].data = this.state.cpu;
      updatedDataMemory.datasets[0].data = this.state.memory;
      updatedDataWifi.datasets[0].data = this.state.wifi;
      updatedDataDisc.datasets[0].data = this.state.disc;
      // Updating charts labels
      updatedDataCpu.labels = this.state.cpuKey;
      updatedDataMemory.labels = this.state.memoryKey;
      updatedDataWifi.labels = this.state.wifiKey;
      updatedDataDisc.labels = this.state.discKey;
      const chartDataCpu = updatedDataCpu;
      const chartDataMemory = updatedDataMemory;
      const chartDataWifi = updatedDataWifi;
      const chartDataDisc = updatedDataDisc;
      // Set updated chart data state
      this.setState({chartDataCpu, chartDataMemory, chartDataWifi, chartDataDisc, updated: !this.state.updated});
    });
  }
// END: Update chart values to showing the last hour
// START: Fuction that handles that update of each chart instance
  handleUpdate() {
    // Declaring local chart data for manipulation below
    var updatedDataCpu  = {};
    var updatedDataMemory  = {};
    var updatedDataWifi  = {};
    var updatedDataDisc  = {};
    // Setting charts data to inititial chart data and options
    updatedDataCpu = chartCpu;
    updatedDataMemory = chartMemory;
    updatedDataWifi = chartWifi;
    updatedDataDisc = chartDisc;
    // Updating charts datasets
    updatedDataCpu.datasets[0].data = this.state.cpu;
    updatedDataMemory.datasets[0].data = this.state.memory;
    updatedDataWifi.datasets[0].data = this.state.wifi;
    updatedDataDisc.datasets[0].data = this.state.disc;
    // Updating charts labels
    updatedDataCpu.labels = this.state.cpuKey;
    updatedDataMemory.labels = this.state.memoryKey;
    updatedDataWifi.labels = this.state.wifiKey;
    updatedDataDisc.labels = this.state.discKey;
    const chartDataCpu = updatedDataCpu;
    const chartDataMemory = updatedDataMemory;
    const chartDataWifi = updatedDataWifi;
    const chartDataDisc = updatedDataDisc;
    // Set updated chart data state
    this.setState({chartDataCpu, chartDataMemory, chartDataWifi, chartDataDisc, updated: !this.state.updated});
    // Trigger fetchHeartbeatData function every second
    setTimeout(function() { this.fetchHeartbeatData(); }.bind(this), 1000);
  }
// END: Fuction that handles that update of each chart instance
// START: Rendering of html
  render() {
    return(
      <div className="app-container">
        <section className="section section--hero">
          <div className="section-inner">
            <h1>Time-series Visualizer</h1>
          </div>
        </section>
        <section className="section section--sub-nav">
          <div className="section-inner">
            <div className="filter">
              <div className="type-filter">
                <button className={`button--filter button--filter--cpu ${!this.state.hiddenCpu ? "is-active" : ""}`} onClick={this.onClickCpu}>CPU<div></div></button>
                <button className={`button--filter button--filter--memory ${!this.state.hiddenMemory ? "is-active" : ""}`} onClick={this.onClickMemory}>Memory<div></div></button>
                <button className={`button--filter button--filter--wifi ${!this.state.hiddenWifi ? "is-active" : ""}`} onClick={this.onClickWifi}>Wifi<div></div></button>
                <button className={`button--filter button--filter--disc ${!this.state.hiddenDisc ? "is-active" : ""}`} onClick={this.onClickDisc}>Disc<div></div></button>
              </div>
              <ToggleTimeFilter hiddenTimeFilter={(this.state.hiddenCpu && this.state.hiddenMemory && this.state.hiddenWifi && this.state.hiddenDisc )}>
                <button className="button--filter button--filter--time" onClick={this.viewHourData} disabled={this.state.isViewingHourOn}>
                View hour
                </button>
                <button className="button--filter button--filter--time" onClick={this.viewMinuteData} disabled={!this.state.isViewingHourOn}>
                View minute
                </button>
              </ToggleTimeFilter>
            </div>
          </div>
        </section>
        <section className="section section--charts">
          <div className="section-inner">
            <ToggleCpu hiddenCpu={this.state.hiddenCpu}>
              <div className="chart-title-container">
                <h2>CPU</h2>
              </div>
              <div className="chart-label-container chart-label-container--top">
                <p>% utilization </p>
                <p>100%</p>
              </div>
              <Line data={this.state.chartDataCpu} options={this.state.chartOptionsCpu}/>
              <div className="chart-label-container chart-label-container--bottom">
                <p>{this.state.chartLabel}</p>
                <p>0</p>
              </div>
            </ToggleCpu>
            <ToggleMemory hiddenMemory={this.state.hiddenMemory}>
              <div className="chart-title-container">
                <h2>Memory</h2>
              </div>
              <div className="chart-label-container chart-label-container--top">
                <p>Memory usage</p>
                <p>17 GB</p>
              </div>
              <Line data={this.state.chartDataMemory} options={this.state.chartOptionsMemory}/>
              <div className="chart-label-container chart-label-container--bottom">
                <p>{this.state.chartLabel}</p>
                <p>0</p>
              </div>
            </ToggleMemory>
            <ToggleWifi hiddenWifi={this.state.hiddenWifi}>
              <div className="chart-title-container">
                <h2>Wi-Fi</h2>
              </div>
              <div className="chart-label-container chart-label-container--top">
                <p>Throughput</p>
                <p>100 Kbps</p>
              </div>
              <Line data={this.state.chartDataWifi} options={this.state.chartOptionsWifi}/>
              <div className="chart-label-container chart-label-container--bottom">
                <p>{this.state.chartLabel}</p>
                <p>0</p>
              </div>
            </ToggleWifi>
            <ToggleDisc hiddenDisc={this.state.hiddenDisc}>
              <div className="chart-title-container">
                <h2>Disc 0 (C:)</h2>
              </div>
              <div className="chart-label-container chart-label-container--top">
                <p>Active time</p>
                <p>100%</p>
              </div>
              <Line data={this.state.chartDataDisc} options={this.state.chartOptionsDisc}/>
              <div className="chart-label-container chart-label-container--bottom">
                <p>{this.state.chartLabel}</p>
                <p>0</p>
              </div>
            </ToggleDisc>
          </div>
        </section>
      </div>
    );
  }
// END: Rendering of html
}
// END: Main App component
