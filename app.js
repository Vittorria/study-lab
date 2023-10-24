require("dotenv").config();
const express = require("express");
const app = require("express")();
const lib = require("./lib");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get('/start', function(req, res) {
  const binNum = "11111010101";
  const octVysledek = lib.binToOct(binNum);

  res.send(`Cislo v binarni soustave: ${binNum} => stejne cislo v osmickove soustave: ${octVysledek}`);
});

/// default handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

module.exports = app;
