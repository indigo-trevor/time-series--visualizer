import React, { Component } from "react";
import axios from 'axios';
import {Line} from 'react-chartjs-2';

const API = '/cpu';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.options = {
      type: 'line',
      data: {
        labels: ['1', '2', '3', '4', '5'],
        datasets: [{
          label: "My First dataset",
          backgroundColor: 'rgba(52, 152, 219, 0.75)',
          data: [
            5, 10, 15, 30, 50
          ]
        }]
      },
      options: {
        title: {
          display: false
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            type: "linear",
            display: true,
            position: "left"
          }]
        },
        responsive: true
      }
    }
    this.state = {
      cpu: []
    };
  }

  componentDidMount() {
    this.canvas = document.querySelector('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.chart = new Chart(this.ctx, this.options)
    axios.get(API)
      .then(res => {
        const cpu = res.data;
        this.setState({ cpu });
        console.log(cpu)
      });
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>Time-series Visualization</h1>
              <canvas />
            </div>
          </div>
        </div>
      </div>
    )
  }

}
