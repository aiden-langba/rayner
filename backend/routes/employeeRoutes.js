const express = require("express");
const employeeController = require("../controllers/employeeController");
const router = express.Router();

//routes for employees

router.route("/employee/:employeeid").get(employeeController.employeesDetails);

router
  .route("/employee/:employeeid/logs")
  .get(employeeController.employeelogs)
  .post(employeeController.employeelog);

router
  .route("/employee/:employeeid/leave")
  .get(employeeController.employeeLeave)
  .post(employeeController.applyLeave);

router.route("/login").post(employeeController.employeeLogin);

module.exports = router;
