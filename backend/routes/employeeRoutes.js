const express = require("express");
const employeeController = require("../controllers/employeeController");
const router = express.Router();

//routes for employees

router.route("/:employeeid").get(employeeController.employeesDetails);

router
  .route("/:employeeid/logs")
  .get(employeeController.employeelogs)
  .post(employeeController.employeelog)
  .put(employeeController.employeeout);

router.route("/leave").post(employeeController.applyLeave);
router.get("/leave/:employeeid", employeeController.employeeLeave);
router.route("/login").post(employeeController.employeeLogin);

module.exports = router;
