import { React, useState, useEffect, createRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { Nav, NavDropdown, Link } from "react-bootstrap";
//import { NavLink, Link, Redirect, useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import moment from "moment";

import FlightService from "../Services/FlightService";

const updateFormRef = createRef();

var findFlightNumber = 0;

const handleSubmit = (e) => {
  e.preventDefault();

  // datetime example "2016-05-18T16:00:00Z"
  const data = {
    findFlightNumber: findFlightNumber,
    flightNumber: e.target.flNumber.value,
    arrivalTime: e.target.flArrivalTime.value,
    departureTime: e.target.flDepartureTime.value,
    economySeatsNum: e.target.flEconomySeatsNum.value,
    businessSeatsNum: e.target.flBusinessSeatNum.value,
    firstSeatsNum: e.target.flFirstSeatNum.value,
    departureAirport: e.target.flDepartureAirport.value,
    arrivalAirport: e.target.flArrivalAirport.value,

    firstClassPrice: e.target.flPriceFirst.value,
    businessClassPrice: e.target.flPriceBusiness,
    economyClassPrice: e.target.flPriceEconomy,
  };

  console.log("data", data);

  FlightService.updateFlight(data)
    .then((res) => {
      console.log("OK ===> ", res);
    })
    .catch((err) => {
      console.log("errr <===", err);
      console.log("data", err);
    });
  // BadgeService.editBadge({ id, name, desc, points, type, disabled })
  //   .then((res) => {
  //     console.log("success ==> ", res.data);
  //     // alert("done");
  //     popUpAlert("Done");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     popUpAlert("Something Went Wrong");
  //   });
};

const updateFormValues = (data) => {
  const {
    arrivalTime,
    departureTime,
    economySeatsNum,
    businessSeatsNum,
    firstSeatsNum,
    departureAirport,
    arrivalAirport,
    firstClassPrice,
    businessClassPrice,
    economyClassPrice,
  } = data;
  // The specified value "2021-10-12T19:54:00.000Z" does not conform to the required format.  The format is "yyyy-MM-ddThh:mm" followed by optional ":ss" or ":ss.SSS".
  updateFormRef.current.flArrivalTime.value =
    moment(arrivalTime).format("yyyy-MM-DDThh:mm");
  updateFormRef.current.flDepartureTime.value =
    moment(departureTime).format("yyyy-MM-DDThh:mm");
  updateFormRef.current.flEconomySeatsNum.value = economySeatsNum;
  updateFormRef.current.flBusinessSeatNum.value = businessSeatsNum;
  updateFormRef.current.flFirstSeatNum.value = firstSeatsNum;
  updateFormRef.current.flDepartureAirport.value = departureAirport;
  updateFormRef.current.flArrivalAirport.value = arrivalAirport;

  updateFormRef.current.flPriceFirst.value = firstClassPrice;
  updateFormRef.current.flPriceBusiness.value = businessClassPrice;
  updateFormRef.current.flPriceEconomy.value = economyClassPrice;
};

const handleFindBtn = () => {
  const flightNumber = updateFormRef.current.flNumber.value;
  FlightService.GetFlightInfo({ flightNumber: flightNumber })
    .then(({ data }) => {
      console.log("recived", data);
      findFlightNumber = data.flightNumber;
      updateFormValues(data);
    })
    .catch((err) => console.log(err));
};

const UpdateForm = () => {
  return (
    <>
      <br></br>
      <br></br>
      <br></br>

      <Form ref={updateFormRef} onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Flight Number</Form.Label>
          <div class="input-group ">
            <Form.Control
              name="flNumber"
              type="string"
              placeholder="Enter Flight Number"
            />
            <div class="input-group-append">
              <Button variant="primary" onClick={handleFindBtn}>
                Find
              </Button>
            </div>
          </div>
          <Row>
            <Col>
              <Form.Label>Arrival Time</Form.Label>
              <Form.Control
                name="flArrivalTime"
                type="datetime-local"
                placeholder="Enter Arrival Number"
              />
            </Col>
            <Col>
              <Form.Label>Departure Time</Form.Label>
              <Form.Control
                name="flDepartureTime"
                type="datetime-local"
                placeholder="Enter Departure Time"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>First Seats Number</Form.Label>
              <Form.Control
                name="flFirstSeatNum"
                type="number"
                placeholder="Enter Economy Seats Number"
              />
            </Col>
            <Col>
              <Form.Label>First Class Price</Form.Label>
              <Form.Control
                name="flPriceFirst"
                type="number"
                placeholder="Please Enter the price"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Business Seat Numbers</Form.Label>
              <Form.Control
                name="flBusinessSeatNum"
                type="number"
                placeholder="Enter Business Seat Numbers "
              />
            </Col>
            <Col>
              <Form.Label>Buissness Class Price</Form.Label>
              <Form.Control
                name="flPriceBusiness"
                type="number"
                placeholder="Please Enter the price"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Economy Seats Number</Form.Label>
              <Form.Control
                name="flEconomySeatsNum"
                type="number"
                placeholder="Enter Economy Seats Number"
              />
            </Col>
            <Col>
              <Form.Label>Economy Class Price</Form.Label>
              <Form.Control
                name="flPriceEconomy"
                type="number"
                placeholder="Please Enter the price"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Departure Airport</Form.Label>
              <Form.Control
                name="flDepartureAirport"
                type="string"
                placeholder="Please Enter the Departure Airport"
              />
            </Col>
            <Col>
              <Form.Label>Arrival Airport</Form.Label>
              <Form.Control
                name="flArrivalAirport"
                type="string"
                placeholder="Please Enter the Arival Airport"
              />
            </Col>
          </Row>

          <Button variant="primary" type="submit">
            Update Flight
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

// "economySeatsNum": 3,
// "businessSeatsNum": 5,
// "firstSeatsNum": 4,
// "departureAirport": "cairo",
// "arrivalAirport": "jedda",
// "price": 1

export default UpdateForm;
