const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Authenticate user on login
app.post("/", function(req, res) {
  const user = req.body.email;
  const pass = req.body.password;
  var validUser="";
  fs.readFile('data.json', 'utf8', (err, jsonString) => {
    if (err) {
      console.error(err);
    } else {
      const data = jsonString.trim() !== '' ? JSON.parse(jsonString) : [];
      // console.log(data);
      validUser = data.find(u=>u.username === user && u.password === pass);
    }
    if(validUser){
      res.sendFile(__dirname+"/index.html");
    }
    else{
      res.send("User not found");
    }
  });
});

// Append new user to json file and redirect to login page
app.post("/signup", function(req, res) {
  const user = req.body.email;
  const pass = req.body.password;

  fs.readFile("data.json", "utf8", (err, jsonString) => {
    if (err) {
      console.error(err);
      res.send("Error reading data file");
      return;
    }

    const data = JSON.parse(jsonString);

    // Check if user already exists
    const existingUser = data.find(u => u.username === user);
    if (existingUser) {
      res.send("User already exists. Please login.");
      return;
    }

    // Add new user to data array
    data.push({ username: user, password: pass });

    // Write updated data back to file
    fs.writeFile("data.json", JSON.stringify(data), "utf8", err => {
      if (err) {
        console.error(err);
        res.send("Error writing data file");
        return;
      }

      res.sendFile(__dirname + "/login.html");
    });
  });
});

app.get("/register", function(req, res) {
  res.sendFile(__dirname + "/register.html");
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/login.html");
});

app.listen(3000, function() {
  console.log("server started");
});
