# Time-series Visualizer

App displaying computer performance metrics through graphical visualizations.

## Core technologies
- Front-end: [ReactJS](https://reactjs.org/)
- Back-end: [Go](https://golang.org/)
- Module Bundler: [Webpack 3](https://webpack.js.org/)

## Requirements
- Install [Go](https://golang.org/doc/install)
- Install [NodeJS](https://nodejs.org/en/download/)
- Install [npm](https://www.npmjs.com/get-npm)

## Setup

1. Make sure you place this project directory within your [__$GOPATH__](https://golang.org/doc/code.html#GOPATH)
2. NPM installations

  `npm install -g webpack`

  `npm install`

3. Install the [Macaron](https://go-macaron.com/) web framework:

  `go get gopkg.in/macaron.v1`

## Run
### Development
1. (Webpack development build) Open terminal and run:

`npm run dev`

2. (Go server for development) Open second terminal a run:

`go run server.go`

3. To view app, navigate to: __http://localhost:8000/__ 

### Production
1. (Webpack production build) Open terminal and run:

`npm run build`

*Packaged up build is placed in __dist__ folder (git-ignored)*
