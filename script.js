const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Authenticate user on login
app.post("/", function(req, res) {
  const user = req.body.email;
  const pass = req.body.password;

  axios.get("https://api.jsonbin.io/v3/b/645375769d312622a3573aae", {
    headers: {
      "X-Master-Key": "$2b$10$JzSYvU8PVI5HewovGwvL/uCMh.LsojB4HZP0LuNcKshGUFgv3qlIC"
    }
  })
  .then(response => {
    const data = response.data.record;
    console.log(data);
    var data1 =[data];
    const validUser = data1.find(u => u.username === user && u.password === pass);

    if (validUser) {
      res.sendFile(__dirname + "/index.html");
    } else {
      res.send("User not found");
    }
  })
  .catch(error => {
    console.error(error);
    res.send("Error reading data from server");
  });
});

// Append new user to json file and redirect to login page
app.post("/signup", function(req, res) {
  const user = req.body.email;
  const pass = req.body.password;

  axios.put("https://api.jsonbin.io/v3/b/645375769d312622a3573aae", {
    "username": user,
    "password": pass
  }, {
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": "$2b$10$JzSYvU8PVI5HewovGwvL/uCMh.LsojB4HZP0LuNcKshGUFgv3qlIC"
    }
  })
  .then(response => {
    res.sendFile(__dirname + "/login.html");
  })
  .catch(error => {
    console.error(error);
    res.send("Error writing data to server");
  });
});

app.get("/register", function(req, res) {
  res.sendFile(__dirname + "/register.html");
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/login.html");
});

app.get("/shop", function(req, res) {
  res.sendFile(__dirname + "/shop.html");
});

app.get("/contact", function(req, res) {
  res.sendFile(__dirname + "/contact.html");
});
app.get("/account", function(req, res) {
  res.sendFile(__dirname + "/account.html");
});
app.get("/index", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.listen(3000, function() {
  console.log("server started");
});



