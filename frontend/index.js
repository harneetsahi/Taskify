// import axios from "axios";
//
// const axios = require("axios");

const firstNum = document.querySelector(".firstNum");
const secondNum = document.querySelector(".secondNum");
// const btn = document.querySelector("button");

const result = document.querySelector(".result");

function sendRequest() {
  const url = "http://localhost:3000/sumend";

  axios.post(url, {
    a: firstNum.value,
    b: secondNum.value,
  });

  console.log(a + b);
}
