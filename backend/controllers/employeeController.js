const db = require("../config/database");
const bcrypt = require("bcrypt");
const express = require("express");

exports.employeesDetails = (req, res) => {
  const sql = `select * from employee where email = '${req.params.employeeid}'`;
  console.log("sql", sql);
  db.query(sql)
    .then((results) => res.send(results.rows))
    .catch((e) => console.log(e));
};

exports.employeelogs = (req, res) => {
  const sql = `Select * from attendance where employeeid = ${req.params.employeeid}`;
  db.query(sql)
    .then((results) => res.send(results.rows))
    .catch((e) => console.log(e));
};

exports.employeelog = (req, res) => {
  const keys = Object.keys(req.body);
  const values = Object.values(req.body);
  const sql = ` insert into  attendance (${keys})  values (${values.map(
    (item) => `'${item}'`
  )})`;
  db.query(sql)
    .then(() => res.send("Employee LOGGED"))
    .catch((e) => res.status(401).send(e));
};
exports.employeeout = (req, res) => {
  const sql = `update attendance set checkout='${req.body.checkout}' where employeeid='${req.params.employeeid}'`;
  db.query(sql)
    .then(() => res.send("Employee LOGGED"))
    .catch((e) => console.log(e));
};

exports.employeeLeave = (req, res) => {
  const sql = `Select * from leave where employeeid = ${req.params.employeeid}`;
  db.query(sql)
    .then((results) => res.send(results.rows))
    .catch((e) => console.log(e));
};

exports.applyLeave = (req, res) => {
  const keys = Object.keys(req.body);
  const values = Object.values(req.body);
  const sql = ` insert into  leave (${keys})  values (${values.map(
    (item) => `'${item}'`
  )})`;
  db.query(sql)
    .then(() => res.send("Leave applied"))
    .catch((e) => console.log(e));
};

exports.employeeLogin = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send({ msg: "Empty fields" });
  db.query(
    `select employeeid, firstname, email, password from employee where lower(email) like lower('${email}')`
  )
    .then(async (results) => {
      const validPassword = await bcrypt.compare(
        password,
        results.rows[0].password
      );
      if (validPassword) {
        res
          .status(200)
          .send({ msg: "Valid password", employee: results.rows[0] });
      } else {
        res.status(400).send({ msg: "Wrong credentials" });
      }
    })
    .catch(() => res.status(400).send({ msg: "Wrong credentials" }));
};
