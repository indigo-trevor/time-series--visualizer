import React, { Component } from "react";
import axios from 'axios';
import {Line} from 'react-chartjs-2';

const API = '/cpu';

const chart1 = {
  labels: [0],
  datasets: [{
    data: [0],
    backgroundColor: [
      '#4DB6AC'
    ]
  }]
};

const Button = (props) => (
  <button id="update-chart" onClick={props.handleOnClick}>Update</button>
);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: chart1,
      updated: false,
      cpu: [],
      cpuKey: []
    }
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    this.fetchCpuData()
  }

  fetchCpuData() {
    axios.get(API)
      .then(res => {
        const cpuResponse = res.data;
        const cpu = [];
        const cpuKey = [];
        for (var i = 0; i < cpuResponse.length; i++) {
          cpu.push(cpuResponse[i].percent);
          cpuKey.push(cpuResponse[i].id);
        }
        this.setState({ cpu });
        this.setState({ cpuKey });
        this.handleUpdate();
      });
  }
  // Update CPU Chart Values
  handleUpdate() {
    var updatedChartData  = {};
    updatedChartData = chart1;
    updatedChartData.datasets[0].data = this.state.cpu
    updatedChartData.labels = this.state.cpuKey
    const chartData = updatedChartData;
    // Batching both updates to state in the same call to this.setState
    this.setState({chartData, updated: !this.state.updated});
    // for updated, read from what is currently set as updated in state and do the opposite - creating a toggle
    console.log(chartData)
    setTimeout(function() { this.handleUpdate(); }.bind(this), 3000);
  }


  render() {
    return(
      <div>
        <Line data={this.state.chartData} />
        <Button handleOnClick={this.handleUpdate} />
      </div>
    );
  }

}
