const express = require("express");
const cors = require("cors");
const config = require("./src/config/config");
const router = require("./src/routes");
const session = require("express-session");
const connectDatabase = require("./src/config/database");
const app = express();
//
const fs = require("fs");
app.set("view engine", "ejs");
if (!fs.existsSync("./uploads")) {
    fs.mkdirSync("./uploads");
}

app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));
//
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: config.jwtSecretKey,
  })
);
const port = config.port || 5000;
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());
app.use(express.static('public'));

app.use("/api", router);

app.listen(port, () => {
  console.log("App listening on port " + port);
  connectDatabase();
});
module.exports = app;