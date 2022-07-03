const express = require("express");
const adminController = require("../controllers/adminController");
const router = express.Router();

router
  .route("/employees")
  .get(adminController.listEmployees)
  .post(adminController.createEmployee);

router.route("/employee/leaves").get(adminController.listEmployeesLeave);

router
  .route("/employee/:employeeid")
  .put(adminController.updateEmployee)
  .delete(adminController.deleteEmployee);

router.route("/employee/:employeeid/leave").put(adminController.approveLeave);

router.route("/login").post(adminController.adminLogin);

module.exports = router;
