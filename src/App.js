import React, { Component } from "react";
import axios from 'axios';
const API = '/cpu';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cpu: []
    };
  }
  componentDidMount() {
    axios.get(API)
      .then(res => {
        const cpu = res.data;
        console.log(cpu)
        this.setState({ cpu });
      });
  }
  render() {
    return (
      <div style={{ fontFamily: 'Roboto, sans-serif', textAlign: 'center' }}>
        <h1>Trevor Robinson</h1>
        <p>Edit <code>src/App.js</code> to get started</p>
      </div>
    );
  }

}
