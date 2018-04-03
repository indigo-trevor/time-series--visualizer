package main

// Importing dependencies
import (
	"fmt"
	"log"
	"net/http"
	"math/rand"
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

	// Creates endpoint for CPU data
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

// Function that parses in cpu.json file
