const { json, urlencoded } = require("express");
const express = require("express");
const app = express();
const port = 4000;
const db = require("./config/database");
const employeeRoutes = require("./routes/employeeRoutes");
const adminRoutes = require("./routes/adminRoutes");
const cors = require("cors");

app.use(cors());
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
