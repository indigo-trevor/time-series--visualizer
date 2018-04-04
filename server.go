package main

// Importing dependencies
import (
	"fmt"
	"log"
	"net/http"
	"math/rand"
	"encoding/json"
	"io/ioutil"
	"os"

	"gopkg.in/macaron.v1"
)

// Declaring Hour data
type HourData struct {
	CpuPercent int `json:"CpuPercent"`
	MemoryGb 	 int `json:"MemoryGb"`
	WiFi 			 int `json:"WiFi"`
}

// Declaring Heartbeat data
type Heartbeat struct {
	CpuPercent int `json:"CpuPercent"`
	MemoryGb 	 int `json:"MemoryGb"`
}

// Main Go function
func main() {
	m := macaron.Classic()

	renderer := macaron.Renderer()
	m.Use(renderer)

	m.Get("/*", func(ctx *macaron.Context) {
		ctx.HTML(200, "homepage", nil)
	})
	// Creates hour data endpoint
	dataHour := getHourData()
	m.Get("/hour", func(ctx *macaron.Context) {
		localHourData := dataHour
		ctx.JSON(200, &localHourData)
	})
	// Creates endpoint for CPU heartbeat data
	m.Get("/heartbeat", func(w, ctx *macaron.Context) {
		localHeartbeatData := Heartbeat{
			CpuPercent:  rand.Intn(15),
			MemoryGb: random(60, 75),
		}

		ctx.JSON(200, &localHeartbeatData)
	})

	m.Use(macaron.Static("dist"))

	http.Handle("/", m)

	fmt.Println("listening on localhost:8000")

	err := http.ListenAndServe(":8000", nil)
	if err != nil {
		log.Fatal(err)
	}
}

// Function that generates a random number within a range
func random(min int, max int) int {
  return rand.Intn(max-min) + min
}
// Function that parses in cpu--hour.json file
func getHourData() []HourData {
	raw, err := ioutil.ReadFile("./data--hour.json")
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	}
	var c []HourData
	json.Unmarshal(raw, &c)
	return c
}
