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

  axios.get("https://api.jsonbin.io/v3/b/64538b428e4aa6225e9616ae", {
    headers: {
      "X-Master-Key": "$2b$10$JzSYvU8PVI5HewovGwvL/uCMh.LsojB4HZP0LuNcKshGUFgv3qlIC"
    }
  })
  .then(response => {
    const data = response.data.record;
    console.log(data);
    const validUser = data.find(u => u.username === user && u.password === pass);

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
  var newdata={
    "username": user,
    "password": pass
  };
  axios.get("https://api.jsonbin.io/v3/b/64538b428e4aa6225e9616ae", {
    headers: {
      "X-Master-Key": "$2b$10$JzSYvU8PVI5HewovGwvL/uCMh.LsojB4HZP0LuNcKshGUFgv3qlIC"
    }
  })
  .then(response => {
    var data = response.data.record;
    data.push(newdata);
    // console.log(data);
    axios.put("https://api.jsonbin.io/v3/b/64538b428e4aa6225e9616ae",data, {
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
  })
  .catch(error => {
    console.error(error);
    res.send("Error");
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



