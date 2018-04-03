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

// Declaring CPU data
type Cpu struct {
	Id      int `json:"id"`
	Percent int `json:"percent"`
}

// Main Go function
func main() {
	m := macaron.Classic()

	renderer := macaron.Renderer()
	m.Use(renderer)

	m.Get("/*", func(ctx *macaron.Context) {
		ctx.HTML(200, "homepage", nil)
	})
	// For CPU hour data endpoint
	cpusHour := getCpusHour()
	m.Get("/cpu/hour", func(ctx *macaron.Context) {
		cpuHour := cpusHour
		ctx.JSON(200, &cpuHour)
	})
	// Creates endpoint for CPU heartbeat data
	m.Get("/cpu", func(w, ctx *macaron.Context) {
		localCpu := Cpu{
			Id: 1,
			Percent:  rand.Intn(15),
		}

		ctx.JSON(200, &localCpu)
	})

	m.Use(macaron.Static("dist"))

	http.Handle("/", m)

	fmt.Println("listening on localhost:8000")

	err := http.ListenAndServe(":8000", nil)
	if err != nil {
		log.Fatal(err)
	}
}

// Function that parses in cpu--hour.json file
func getCpusHour() []Cpu {
	raw, err := ioutil.ReadFile("./cpu--hour.json")
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	}
	var c []Cpu
	json.Unmarshal(raw, &c)
	return c
}
