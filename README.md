# Time-series Visualizer

App displaying computer performance metrics through graphical visualizations.

## Core technologies
- Front-end: [ReactJS](https://reactjs.org/)
- Back-end: [Go](https://golang.org/)
- Module Bundler: [Webpack 3](https://webpack.js.org/)

## Requirements
- Go installed
- NodeJS & npm installed

## Setup

`npm install -g webpack`

`npm install`

Install the [Macaron](https://go-macaron.com/) web framework:

`go get gopkg.in/macaron.v1`

## Run
### Development
Run Webpack:

`npm run dev`

Start the Go server:
`go run server.go`

### Production
Make a Webpack production build (build is placed in *dist* folder):

`npm run build`
