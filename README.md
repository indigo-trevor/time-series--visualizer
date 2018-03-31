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
(Webpack development build) Open terminal and run:

`npm run dev`

(Go server for development) Open second terminal a run:

`go run server.go`

### Production
(Webpack production build) Open terminal and run:

`npm run build`

*Packaged up build is placed in __dist__ folder*
