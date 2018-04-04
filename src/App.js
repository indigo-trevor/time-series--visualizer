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
const wifiColor = 'rgba(167,79,1,1)';
const wifiColorDimmed = 'rgba(167,79,1,0.5)';

// CPU Chart data
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

// Memory Chart data
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

// Wifi Chart data
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

// CPU Chart options
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

// Memory Chart options
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

// Wifi Chart options
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

// Css transition implementation that shows and hides Cpu chart
class ToggleCpu extends React.Component {
  render() {
    return <ReactCSSTransitionGroup
            component={CpuChart}
            transitionName="toggle"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}>
            {this.props.hiddenCpu ? null : <div className="col-6 chart-container chart-container--cpu">{this.props.children}</div>}
      </ReactCSSTransitionGroup>

  }
}

// Css transition implementation that shows and hides Memory chart
class ToggleMemory extends React.Component {
  render() {
    return <ReactCSSTransitionGroup
            component={MemoryChart}
            transitionName="toggle"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}>
            {this.props.hiddenMemory ? null : <div className="col-6 chart-container chart-container--memory">{this.props.children}</div>}
      </ReactCSSTransitionGroup>

  }
}

// Css transition implementation that shows and hides Wifi chart
class ToggleWifi extends React.Component {
  render() {
    return <ReactCSSTransitionGroup
            component={WifiChart}
            transitionName="toggle"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}>
            {this.props.hiddenWifi ? null : <div className="col-6 chart-container chart-container--wifi">{this.props.children}</div>}
      </ReactCSSTransitionGroup>

  }
}

// Function that ensures only the Cpu component it shown and removes containing span element
function CpuChart(props) {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
}

// Function that ensures only the Memory component it shown and removes containing span element
function MemoryChart(props) {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
}

// Function that ensures only the Wifi component it shown and removes containing span element
function WifiChart(props) {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
}

// Main App component
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartDataCpu: chartCpu,
      chartDataMemory: chartMemory,
      chartDataWifi: chartWifi,
      chartOptionsCpu: chartOptionsCpu,
      chartOptionsMemory: chartOptionsMemory,
      chartOptionsWifi: chartOptionsWifi,
      updated: false,
      cpu: [],
      cpuKey: [],
      memory: [],
      memoryKey: [],
      wifi: [],
      wifiKey: [],
      chartLabel: '60 seconds',
      hiddenCpu:true,
      hiddenMemory:true,
      hiddenWifi:true,
      isViewingHourOn: false
    }
    this.onClickCpu = this.onClickCpu.bind(this);
    this.onClickMemory = this.onClickMemory.bind(this);
    this.onClickWifi = this.onClickWifi.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.viewHourData = this.viewHourData.bind(this);
    this.viewMinuteData = this.viewMinuteData.bind(this);
  }

  // On click, toggle display of Cpu Chart
  onClickCpu() {
    this.setState((prevState, props) => ({
      hiddenCpu: !(prevState.hiddenCpu)
    }))
  }

  // On click, toggle display of Memory Chart
  onClickMemory() {
    this.setState((prevState, props) => ({
      hiddenMemory: !(prevState.hiddenMemory)
    }))
  }

  // On click, toggle display of Wifi Chart
  onClickWifi() {
    this.setState((prevState, props) => ({
      hiddenWifi: !(prevState.hiddenWifi)
    }))
  }

  // On mount, initiate heartbeat call
  componentDidMount() {
    this.fetchHeartbeatData()
  }

  fetchHeartbeatData() {
    axios.get(apiHeartbeat)
      .then(res => {
        var cpu = [];
        var cpuKey = [];
        var memory = [];
        var memoryKey = [];
        var wifi = [];
        var wifiKey = [];
        var heartbeatResponse = res.data;
        var heartbeatCounter = new Date().toLocaleTimeString();
        // Converting Memory data down one decimal
        heartbeatResponse.MemoryGb = (heartbeatResponse.MemoryGb * .1);
        // The below logic conditionally manipulates the data coming from the backend
        if (this.state.cpu.length == 60) {
          // For viewing minute data, restrict data array to 60
          var cpuTempArray = this.state.cpu;
          var cpuTempKeyArray = this.state.cpuKey;
          var memoryTempArray = this.state.memory;
          var memoryTempKeyArray = this.state.memoryKey;
          var wifiTempArray = this.state.wifi;
          var wifiTempKeyArray = this.state.wifiKey;
          cpuTempArray.splice(0, 1);
          cpuTempKeyArray.splice(0, 1);
          memoryTempArray.splice(0, 1);
          memoryTempKeyArray.splice(0, 1);
          wifiTempArray.splice(0, 1);
          wifiTempKeyArray.splice(0, 1);
          this.setState({cpu: cpuTempArray });
          this.setState({cpuKey: cpuTempKeyArray });
          this.setState({memory: memoryTempArray });
          this.setState({memoryKey: memoryTempKeyArray });
          this.setState({wifi: wifiTempArray });
          this.setState({wifiKey: wifiTempKeyArray });
        } else if (this.state.cpu.length >= 3600) {
          // For viewing hour data, restrict data array to 3600
          var cpuTempArray = this.state.cpu;
          var cpuTempKeyArray = this.state.cpuKey;
          var memoryTempArray = this.state.memory;
          var memoryTempKeyArray = this.state.memoryKey;
          var wifiTempArray = this.state.wifi;
          var wifiTempKeyArray = this.state.wifiKey;
          var cpuOverMax = (this.state.cpu.length - 3600);
          var memoryOverMax = (this.state.memory.length - 3600);
          var wifiOverMax = (this.state.wifi.length - 3600);
          if (cpuOverMax > 1) {
            cpuTempArray.splice(0, cpuOverMax);
            cpuTempKeyArray.splice(0, cpuOverMax);
            memoryTempArray.splice(0, memoryOverMax);
            memoryTempKeyArray.splice(0, memoryOverMax);
            wifiTempArray.splice(0, wifiOverMax);
            wifiTempKeyArray.splice(0, wifiOverMax);
          } else{
            cpuTempArray.splice(0, 1);
            cpuTempKeyArray.splice(0, 1);
            memoryTempArray.splice(0, 1);
            memoryTempKeyArray.splice(0, 1);
            wifiTempArray.splice(0, 1);
            wifiTempKeyArray.splice(0, 1);
          }
          this.setState({cpu: cpuTempArray });
          this.setState({cpuKey: cpuTempKeyArray });
          this.setState({memory: memoryTempArray });
          this.setState({memoryKey: memoryTempKeyArray });
          this.setState({wifi: wifiTempArray });
          this.setState({wifiKey: wifiTempKeyArray });
        } else {
          this.setState({ cpu: this.state.cpu.concat(heartbeatResponse.CpuPercent) })
          this.setState({ cpuKey: this.state.cpuKey.concat(heartbeatCounter) })
          this.setState({ memory: this.state.memory.concat(heartbeatResponse.MemoryGb) })
          this.setState({ memoryKey: this.state.memoryKey.concat(heartbeatCounter) })
          this.setState({ wifi: this.state.wifi.concat(heartbeatResponse.WiFi) })
          this.setState({ wifiKey: this.state.wifiKey.concat(heartbeatCounter) })
        }
        // Trigger chart data/options update function
        this.handleUpdate();
      });
  }
  // Update CPU Chart Values showing the past minute
  viewMinuteData() {
    this.setState({isViewingHourOn: false });
    console.log("viewing minute data")
    this.setState({ chartLabel: '60 seconds' })
    var cpuTempArray = this.state.cpu;
    var cpuTempKeyArray = this.state.cpuKey;
    var memoryTempArray = this.state.memory;
    var memoryTempKeyArray = this.state.memoryKey;
    var wifiTempArray = this.state.wifi;
    var wifiTempKeyArray = this.state.wifiKey;
    var cpuOverMax = (this.state.cpu.length - 60);
    var memoryOverMax = (this.state.memory.length - 60);
    var wifiOverMax = (this.state.wifi.length - 60);
    if (cpuOverMax > 1) {
      cpuTempArray.splice(0, cpuOverMax);
      cpuTempKeyArray.splice(0, cpuOverMax);
      memoryTempArray.splice(0, memoryOverMax);
      memoryTempKeyArray.splice(0, memoryOverMax);
      wifiTempArray.splice(0, wifiOverMax);
      wifiTempKeyArray.splice(0, wifiOverMax);
    } else {
      cpuTempArray.splice(0, 1);
      cpuTempKeyArray.splice(0, 1);
      memoryTempArray.splice(0, 1);
      memoryTempKeyArray.splice(0, 1);
      wifiTempArray.splice(0, 1);
      wifiTempKeyArray.splice(0, 1);
    }
    this.setState({cpu: cpuTempArray });
    this.setState({cpuKey: cpuTempKeyArray });
    this.setState({memory: memoryTempArray });
    this.setState({memoryKey: memoryTempKeyArray });
    this.setState({wifi: wifiTempArray });
    this.setState({wifiKey: wifiTempKeyArray });
  }

  // Update CPU Chart Values showing the past hour
  viewHourData() {
    this.setState({isViewingHourOn: true });
    console.log("viewing hour data")
    this.setState({ chartLabel: 'Past Hour' })
    axios.get(apiHour)
    .then(res => {
      var hourResponse = res.data;
      var cpu = this.state.cpu;
      var cpuKey = this.state.cpuKey;
      var memory = this.state.memory;
      var memoryKey = this.state.memoryKey;
      var wifi = this.state.wifi;
      var wifiKey = this.state.wifiKey;
      for (var i = 0; i < hourResponse.length; i++) {
        var d = new Date();
        var seconds = d.getSeconds();
        // Converting Memory data down one decimal
        hourResponse[i].MemoryGb = (hourResponse[i].MemoryGb * .1);
        d.setSeconds(seconds - i);
        cpu.unshift(hourResponse[i].CpuPercent)
        memory.unshift(hourResponse[i].MemoryGb)
        wifi.unshift(hourResponse[i].WiFi)
        cpuKey.unshift(d.toLocaleTimeString('en-US'))
        memoryKey.unshift(d.toLocaleTimeString('en-US'))
        wifiKey.unshift(d.toLocaleTimeString('en-US'))
      }
      this.setState({cpu: cpu });
      this.setState({cpuKey: cpuKey });
      this.setState({memory: memory });
      this.setState({memoryKey: memoryKey });
      this.setState({wifi: wifi });
      this.setState({wifiKey: wifiKey });
      var updatedDataCpu  = {};
      var updatedDataMemory  = {};
      var updatedDataWifi  = {};
      updatedDataCpu = chartCpu;
      updatedDataMemory = chartMemory;
      updatedDataWifi = chartWifi;
      updatedDataCpu.datasets[0].data = this.state.cpu;
      updatedDataMemory.datasets[0].data = this.state.memory;
      updatedDataWifi.datasets[0].data = this.state.wifi;
      updatedDataCpu.labels = this.state.cpuKey;
      updatedDataMemory.labels = this.state.memoryKey;
      updatedDataWifi.labels = this.state.wifiKey;
      const chartDataCpu = updatedDataCpu;
      const chartDataMemory = updatedDataMemory;
      const chartDataWifi = updatedDataWifi;
      // Set updated chart data state
      this.setState({chartDataCpu, chartDataMemory, chartDataWifi, updated: !this.state.updated});
    });
  }

  // Update chart
  handleUpdate() {
    var updatedDataCpu  = {};
    var updatedDataMemory  = {};
    var updatedDataWifi  = {};
    updatedDataCpu = chartCpu;
    updatedDataMemory = chartMemory;
    updatedDataWifi = chartWifi;
    updatedDataCpu.datasets[0].data = this.state.cpu;
    updatedDataMemory.datasets[0].data = this.state.memory;
    updatedDataWifi.datasets[0].data = this.state.wifi;
    updatedDataCpu.labels = this.state.cpuKey;
    updatedDataMemory.labels = this.state.memoryKey;
    updatedDataWifi.labels = this.state.wifiKey;
    const chartDataCpu = updatedDataCpu;
    const chartDataMemory = updatedDataMemory;
    const chartDataWifi = updatedDataWifi;
    // Set updated chart data state
    this.setState({chartDataCpu, chartDataMemory, chartDataWifi, updated: !this.state.updated});
    // Trigger fetchHeartbeatData function every second
    setTimeout(function() { this.fetchHeartbeatData(); }.bind(this), 1000);
  }

  render() {
    return(
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div onClick={this.onClickCpu}>Show CPU</div>
            <div onClick={this.onClickMemory}>Show Memory</div>
            <div onClick={this.onClickWifi}>Show Wifi</div>
            <button onClick={this.viewHourData} disabled={this.state.isViewingHourOn}>
              View hour
            </button>
            <button onClick={this.viewMinuteData} disabled={!this.state.isViewingHourOn}>
              View minute
            </button>
          </div>
        </div>
        <div className="row">
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
              <p>Memory usage </p>
              <p>17 GB</p>
            </div>
            <Line data={this.state.chartDataMemory} options={this.state.chartOptionsMemory}/>
            <div className="chart-label-container chart-label-container--bottom">
              <p>{this.state.chartLabel}</p>
              <p>0</p>
            </div>
          </ToggleMemory>
          <div class="w-100"></div>
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
        </div>
      </div>
    );
  }

}
