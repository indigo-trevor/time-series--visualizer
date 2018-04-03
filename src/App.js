import React, { Component } from "react";
import axios from 'axios';
import {Line} from 'react-chartjs-2';

const API = '/cpu';

const chartCpu = {
  labels: [0,1,2,3,4,5],
  datasets: [{
    data: [0],
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

const chartOptions = {
  legend: {
    display: false
  },
  scales: {
    xAxes: [{
      display: true,
      gridLines: {
        color: 'rgba(238,238,238,1)',
        lineWidth: 0.5,
        zeroLineColor: 'rgba(238,238,238,1)'
      },
      ticks: {
        display: false,
        maxTicksLimit: 6
      }
    }],
    yAxes: [{
      display: true,
      gridLines: {
        color: 'rgba(238,238,238,1)',
        lineWidth: 0.5,
        zeroLineColor: 'rgba(238,238,238,1)'
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

const Button = (props) => (
  <button id="update-chart" onClick={props.handleOnClick}>Update</button>
);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: chartCpu,
      chartOptions:chartOptions,
      updated: false,
      cpu: [],
      cpuKey: []
    }
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    this.fetchCpuData()
    console.log(this.state.chartOptions)
  }

  fetchCpuData() {
    axios.get(API)
      .then(res => {
        var cpu = [];
        var cpuKey = [];
        var cpuResponse = res.data;
        var cpuCounter = new Date().toLocaleTimeString();
        // Show latest 60 values only as there are 60 seconds in a minute :) (last time I checked)
        if (this.state.cpu.length >= 60) {
          var cpuTempArray = this.state.cpu;
          var cpuTempKeyArray = this.state.cpuKey;
          cpuTempArray.splice(0, 1);
          cpuTempKeyArray.splice(0, 1);
          this.setState({cpu: cpuTempArray });
          this.setState({cpuKey: cpuTempKeyArray });
        } else {
          this.setState({ cpu: this.state.cpu.concat(cpuResponse.percent) })
          this.setState({ cpuKey: this.state.cpuKey.concat(cpuCounter) })
        }
        this.handleUpdate();
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
            <div className="chart-title-container">
              <h2>CPU</h2>
            </div>
            <div className="chart-label-container chart-label-container--top">
              <p>% utilization </p>
              <p>100%</p>
            </div>
            <Line data={this.state.chartData} options={this.state.chartOptions}/>
            <div className="chart-label-container chart-label-container--bottom">
              <p>60 seconds</p>
              <p>0</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
