import React, { Component } from "react";
import axios from 'axios';
import {Line} from 'react-chartjs-2';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const apiCpuHeartbeat = '/cpu';
const apiCpuHour = '/cpu/hour';

// CPU Chart data
const chartCpu = {
  labels: [0,1,2,3,4,5],
  datasets: [{
    data: [0,0,0,0,0,0],
    backgroundColor: [
      'rgba(247,148,30,0.5)'
    ],
    pointRadius: 0,
    lineTension: 0,
    borderWidth: 1,
    borderColor: 'rgba(247,148,30,1)',
    pointBorderColor: 'rgba(247,148,30,1)',
    pointBackgroundColor: 'rgba(247,148,30,0.5)'
  }]
};

// CPU Chart options
const chartOptions = {
  legend: {
    display: false
  },
  legendCallback: function(chart) {
    console.log(chart.data)
  },
  scales: {
    xAxes: [{
      display: true,
      gridLines: {
        color: 'rgba(247,148,30,0.5)',
        lineWidth: 0.5,
        zeroLineColor: 'rgba(247,148,30,0.5)'
      },
      ticks: {
        display: false,
        steps: 6,
        maxTicksLimit: 6
      }
    }],
    yAxes: [{
      display: true,
      gridLines: {
        color: 'rgba(247,148,30,0.5)',
        lineWidth: 0.5,
        zeroLineColor: 'rgba(247,148,30,0.5)'
      },
      ticks: {
        display: false,
        beginAtZero: true,
        steps: 10,
        stepValue: 5,
        max: 100
      }
    }]
  }
};

// Declaring button component that toggles the showing of Hour data
const Button = (props) => (
  <button id="update-chart" onClick={props.handleOnClick}>View Hour Data</button>
);

// Css transition implementation that shows and hides Cpu chart
class ToggleCpu extends React.Component {
  render() {
    return <ReactCSSTransitionGroup
            component={CpuChart}
            transitionName="toggle"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}>
            {this.props.hidden ? null : <div className="col-6 chart-container chart-container--cpu">{this.props.children}</div>}
      </ReactCSSTransitionGroup>

  }
}
// Function that ensures only the Cpu component it shown and removes containing span element
function CpuChart(props) {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
}

// Main App component
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: chartCpu,
      chartOptions:chartOptions,
      updated: false,
      cpu: [],
      cpuHour: [],
      cpuKey: [],
      cpuViewingHour: false,
      cpuLabel: '60 seconds',
      hidden:true,
      isCpuViewingHourOn: false
    }
    this.onClick = this.onClick.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.viewCpuHour = this.viewCpuHour.bind(this);
    this.viewCpuMinute = this.viewCpuMinute.bind(this);
  }

  // On click, toggle display of Cpu Chart
  onClick() {
    this.setState((prevState, props) => ({
      hidden: !(prevState.hidden)
    }))
  }

  // On mount, initiate heartbeat call
  componentDidMount() {
    this.fetchCpuData()
  }

  fetchCpuData() {
    axios.get(apiCpuHeartbeat)
      .then(res => {
        var cpu = [];
        var cpuKey = [];
        var cpuResponse = res.data;
        var cpuCounter = new Date().toLocaleTimeString();
        // The below logic conditionally manipulates the data coming from the backend
        if (this.state.cpu.length == 60) {
          // For viewing minute data, restrict data array to 60
          var cpuTempArray = this.state.cpu;
          var cpuTempKeyArray = this.state.cpuKey;
          cpuTempArray.splice(0, 1);
          cpuTempKeyArray.splice(0, 1);
          this.setState({cpu: cpuTempArray });
          this.setState({cpuKey: cpuTempKeyArray });
        } else if (this.state.cpu.length >= 3600) {
          // For viewing hour data, restrict data array to 3600
          var cpuTempArray = this.state.cpu;
          var cpuTempKeyArray = this.state.cpuKey;
          var cpuOverMax = (this.state.cpu.length - 3600);
          if (cpuOverMax > 1) {
            cpuTempArray.splice(0, cpuOverMax);
            cpuTempKeyArray.splice(0, cpuOverMax);
          } else {
            cpuTempArray.splice(0, 1);
            cpuTempKeyArray.splice(0, 1);
          }
          this.setState({cpu: cpuTempArray });
          this.setState({cpuKey: cpuTempKeyArray });
        } else {
          this.setState({ cpu: this.state.cpu.concat(cpuResponse.percent) })
          this.setState({ cpuKey: this.state.cpuKey.concat(cpuCounter) })
        }
        // Trigger chart data/options update function
        this.handleUpdate();
      });
  }
  // Update CPU Chart Values showing the past minute
  viewCpuMinute() {
    this.setState({isCpuViewingHourOn: false });
    console.log("viewing minute data")
    this.setState({ cpuLabel: '60 seconds' })
    var cpuTempArray = this.state.cpu;
    var cpuTempKeyArray = this.state.cpuKey;
    var cpuOverMax = (this.state.cpu.length - 60);
    if (cpuOverMax > 1) {
      cpuTempArray.splice(0, cpuOverMax);
      cpuTempKeyArray.splice(0, cpuOverMax);
    } else {
      cpuTempArray.splice(0, 1);
      cpuTempKeyArray.splice(0, 1);
    }
    this.setState({cpu: cpuTempArray });
    this.setState({cpuKey: cpuTempKeyArray });

  }
  // Update CPU Chart Values showing the past hour
  viewCpuHour() {
    this.setState({isCpuViewingHourOn: true });
    console.log("viewing hour data")
    this.setState({ cpuLabel: 'Past Hour' })
    axios.get(apiCpuHour)
    .then(res => {
      var cpuResponseHour = res.data;
      var cpu = this.state.cpu;
      var cpuKey = this.state.cpuKey;
      for (var i = 0; i < cpuResponseHour.length; i++) {
        var d = new Date();
        var seconds = d.getSeconds()
        d.setSeconds(seconds - i);
        cpu.unshift(cpuResponseHour[i].percent)
        cpuKey.unshift(d.toLocaleTimeString('en-US'))
      }
      this.setState({cpu: cpu });
      this.setState({cpuKey: cpuKey });
      var updatedChartData  = {};
      updatedChartData = chartCpu;
      updatedChartData.datasets[0].data = this.state.cpu
      updatedChartData.labels = this.state.cpuKey
      const chartData = updatedChartData;
      // Set updated chart data state
      this.setState({chartData, updated: !this.state.updated});
    });
  }
  // Update CPU Chart Values
  handleUpdate() {
    var updatedChartData  = {};
    updatedChartData = chartCpu;
    updatedChartData.datasets[0].data = this.state.cpu
    updatedChartData.labels = this.state.cpuKey
    const chartData = updatedChartData;
    // Set updated chart data state
    this.setState({chartData,  updated: !this.state.updated});
    // Trigger fetchCpuData function every second
    setTimeout(function() { this.fetchCpuData(); }.bind(this), 1000);
  }

  render() {
    return(
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div onClick={this.onClick}>Show CPU</div>
            <button onClick={this.viewCpuHour} disabled={this.state.isCpuViewingHourOn}>
              View hour
            </button>
            <button onClick={this.viewCpuMinute} disabled={!this.state.isCpuViewingHourOn}>
              View minute
            </button>
          </div>
        </div>
        <div className="row">
          <ToggleCpu hidden={this.state.hidden}>
            <div className="chart-title-container">
              <h2>CPU</h2>
            </div>
            <div className="chart-label-container chart-label-container--top">
              <p>% utilization </p>
              <p>100%</p>
            </div>
            <Line data={this.state.chartData} options={this.state.chartOptions}/>
            <div className="chart-label-container chart-label-container--bottom">
              <p>{this.state.cpuLabel}</p>
              <p>0</p>
            </div>
          </ToggleCpu>
        </div>
      </div>
    );
  }

}
