const { json, urlencoded } = require("express");
const express = require("express");
// const ejs = require("ejs");
const app = express();
const port = 4000;
const db = require("./config/database");
const employeeRoutes = require("./routes/employeeRoutes");
const adminRoutes = require("./routes/adminRoutes");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");

app.use(express.static("public"));
// app.use(json())

app.set("view engine", "ejs");
app.use(json(), urlencoded({ extended: true }));

app.use("/employee", employeeRoutes);
app.use("/admin", adminRoutes);

//database
db.connect()
  .then(() => {
    console.log("Database connected");
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch((err) => console.log("Error: " + err));
