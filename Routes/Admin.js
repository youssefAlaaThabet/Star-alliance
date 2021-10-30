const express = require("express");
const app = express();
const db = require("../Service/DBService.js");
const { flight } = require("../Models/export");
var cors = require("cors");
require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "welcome admin" });
});
app.get("/a", async (req, res) => {
  // This is Just for Testing, And Will be removed
  new flight({
    flightNumber: 123,
    arrivalTime: "2016-05-18T16:00:00Z",
    departureTime: "2016-05-18T16:00:00Z",
    economySeatsNum: 3,
    businessSeatsNum: 2,
    firstSeatsNum: 1,
    departureAirport: "cairo",
    arrivalAirport: "jedda",
    price: 532,
  }).save();
  res.send("ok");
});

app.post("/UpdateFlight", async (req, res) => {
  const data = req.body;
  console.log(data);
  // const updatedFlight = new flight(data);
  const result = await flight.updateOne(
    { flightNumber: data.flightNumber },
    data
  );
  // if (result.modifiedCount == 0) {
  //   res.status(400).send("no rows has been updated");
  // }
  res.send(result);
});

module.exports = app;
