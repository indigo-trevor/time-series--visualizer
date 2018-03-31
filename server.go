package main

// Importing dependencies
import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"gopkg.in/macaron.v1"
)

// Declaring CPU data
type Cpu struct {
	ID      int `json:"id"`
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

	// Sets variable to function that parses in cpu.json file
	cpus := getCpus()

	// Creates endpoint for CPU data
	m.Get("/cpu", func(ctx *macaron.Context) {
		cpu := cpus
		ctx.JSON(200, &cpu)
	})

	m.Use(macaron.Static("dist"))

	http.Handle("/", m)

	fmt.Println("listening on localhost:8000")

	err := http.ListenAndServe(":8000", nil)
	if err != nil {
		log.Fatal(err)
	}
}

// Function that parses in cpu.json file
func getCpus() []Cpu {
	raw, err := ioutil.ReadFile("./cpu.json")
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	}
	var c []Cpu
	json.Unmarshal(raw, &c)
	return c
}
