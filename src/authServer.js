require("dotenv").config();
const express = require("express");
var path = require("path");
var fs = require("fs"); //file system
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const {
  user,
  reservation,
  flight,
  creditCard,
  companion,
} = require("../Models/export");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/b", function (req, res) {
  res.send({ message: "hello from auth Server" });
});

const db = require("../Service/DBService.js");

let refreshTokens = [];

app.post("/getaToken", (req, res) => {
  console.log("getaToken");
  console.log(req.cookies.refreshToken);
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    console.log("user", user);
    const payload = { userId: user.userId, isAdmin: user.isAdmin };
    const accessToken = generateAccessToken(payload);
    console.log("new Access token", accessToken);
    res.cookie("accessToken", accessToken, {
      path: "/",
      httpOnly: false,
    });
    res.json({ accessToken: accessToken });
  });
});

app.delete("/logout", (req, res) => {
  // remove the user's refresh token from the collection
  // console.log("before", refreshTokens);
  refreshTokens = refreshTokens.filter((token) => token !== req.body.rtoken);
  // console.log("after", refreshTokens);

  // clear the tokens cookies
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.sendStatus(204);
});

app.post("/login", async (req, res) => {
  // console.log("login");
  // console.log(req.body);
  // console.log(req);
  // set cookies to specific path
  // res.cookie("server", "cook", {
  //   path: "/login",
  //   httpOnly: true,
  // });
  // res.cookie("server", j"cok");

  const username = req.body.username;
  const password = req.body.password;
  // Authenticate User
  const loggingUser = await user.findOne({ username: username });
  if (!loggingUser) return res.status(401).send("Wrong username");

  if (!bcrypt.compareSync(password, loggingUser.password)) {
    console.log("wrong password", loggingUser.password, password);
    return res.status(401).send("Wrong password");
  }
  // const payload = loggingUser._doc;
  const payload = { userId: loggingUser.id, isAdmin: loggingUser.isAdmin };

  console.log("payload", payload);
  const accessToken = generateAccessToken(payload);
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);

  refreshTokens.push(refreshToken);

  res.cookie("accessToken", accessToken, {
    path: "/",
    httpOnly: false,
  });
  res.cookie("refreshToken", refreshToken, {
    path: "/getaToken",
    httpOnly: false,
  });
  res.json({
    accessToken: accessToken,
    refreshToken: refreshToken,
    isAdmin: loggingUser.isAdmin,
    userId: loggingUser.id,
    name: loggingUser.firstName,
  });
});

function generateAccessToken(user) {
  // TODO: change expiresIn
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5s" });
}

// app.listen(port, () => console.log(`Auth Server at localhost:${port}`));
module.exports = app;
