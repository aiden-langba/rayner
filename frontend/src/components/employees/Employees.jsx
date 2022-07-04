import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import "./emp.css";
import axios from "axios";

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
//   { id: 10, lastName: "Roxie", firstName: "Harvey", age: 65 },
//   { id: 11, lastName: "Roxie", firstName: "Harvey", age: 65 },
//   { id: 12, lastName: "Roxie", firstName: "Harvey", age: 65 },
//   { id: 13, lastName: "Roxie", firstName: "Harvey", age: 65 },
//   { id: 14, lastName: "Roxie", firstName: "Harvey", age: 65 },
//   { id: 15, lastName: "Roxie", firstName: "Harvey", age: 65 },
//   { id: 16, lastName: "Roxie", firstName: "Harvey", age: 65 }
// ];

export default function Employees() {
  const [rows, setRows] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const getEmployees = () => {
    axios.get("http://localhost:4000/admin/employees").then((res) => {
      setRows(res.data);
      setLoading(false);
    });
  };
  React.useEffect(() => {
    setLoading(true);
    getEmployees();
  }, []);
  const columns = [
    { field: "employeeid", headerName: "id", width: 90 },
    {
      field: "firstname",
      headerName: "First name",
      width: 150
    },
    {
      field: "lastname",
      headerName: "Last name",
      width: 150
    },
    {
      field: "email",
      headerName: "email",
      width: 110
    },
    {
      field: "dob",
      headerName: "DOB",
      width: 110
    },
    {
      field: "phoneno",
      headerName: "Phone no",
      type: "number",
      width: 110
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 100
    },
    {
      field: "address",
      headerName: "Addess",
      width: 110
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking

          const api = params.api;
          const thisRow = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );
          console.log("params.id", params.id);
          axios
            .delete(`http://localhost:4000/admin/employee/${params.id}`)
            .then((res) => getEmployees());
          // return alert(JSON.stringify(thisRow, null, 4));
        };
        const onUpdate = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          setShow(true);
          const api = params.api;
          const thisRow = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );
          console.log("params.id", params.id);
          // axios
          //   .delete(`http://localhost:4000/admin/employee/${params.id}`)
          //   .then((res) => getEmployees());
          // return alert(JSON.stringify(thisRow, null, 4));
          setSelectedRow(thisRow);
        };

        return (
          <>
            <button
              onClick={onUpdate}
              style={{
                background: "#299bec",
                color: "white",
                padding: "2px 5px",
                border: "none",
                marginRight: "3px",
                cursor: "pointer"
              }}
            >
              Edit
            </button>
            <button
              onClick={onClick}
              style={{
                background: "#f33232",
                color: "white",
                padding: "2px 5px",
                border: "none",
                cursor: "pointer"
              }}
            >
              Del
            </button>
          </>
        );
      }
    }
    // {
    //   field: "gender",
    //   headerName: "Full name",
    //   description: "This column has a value getter and is not sortable.",
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.row.firstName || ""} ${params.row.lastName || ""}`
    // }
  ];

  return (
    <section className="summary">
      <div className="summary-box emp">
        <h1
          style={{
            height: "40px",
            display: "flex",
            alignItems: "center",
            padding: "10px",
            color: "rgba(0, 0, 0, 0.8)"
          }}
        >
          Employees
        </h1>
        <Box sx={{ height: 400, width: "100%", background: "white" }}>
          {rows && (
            <DataGrid
              getRowId={(row) => row.employeeid}
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              loading={loading}
            />
          )}
        </Box>
        <UpdateEmployee
          show={show}
          selectedRow={selectedRow}
          close={() => setShow(false)}
          refresh={() => getEmployees()}
        />
      </div>
    </section>
  );
}

const UpdateEmployee = ({ show, selectedRow, close, refresh }) => {
  const [employee, setEmployee] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
    dob: "",
    phoneno: "",
    address: ""
  });
  React.useEffect(() => {
    if (show) setEmployee(selectedRow);
  }, [show, selectedRow]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployee({
      ...employee,
      [name]: value
    });
  };

  const onClick = (e) => {
    console.log("selectedRow", selectedRow);
    e.preventDefault();
    axios
      .put(
        `http://localhost:4000/admin/employee/${selectedRow.employeeid}`,
        employee
      )
      .then(() => {
        refresh();
        close();
      });
  };
  if (!show) return <></>;
  return (
    <div className="updateemp">
      <section className="leave emp">
        <form action="" className="shadow">
          <h1
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            Add employee{" "}
            <button
              className="close"
              onClick={close}
              style={{
                background: "red",
                color: "white",
                width: "40px",
                height: "40px",
                fontSize: "larger"
              }}
            >
              &times;
            </button>
          </h1>

          <div className="form-body">
            <label htmlFor="fname">First name</label>
            <input
              type="text"
              name="firstname"
              id="fname"
              value={employee.firstname}
              onChange={handleChange}
            />
            <label htmlFor="lname">Last name </label>
            <input
              type="text"
              name="lastname"
              id="lname"
              value={employee.lastname}
              onChange={handleChange}
            />
            <label htmlFor="email">Email </label>
            <input
              type="email"
              name="email"
              id="email"
              value={employee.email}
              onChange={handleChange}
            />
            <label htmlFor="gender">Gender </label>
            <input
              type="text"
              name="gender"
              id="gender"
              value={employee.gender}
              onChange={handleChange}
            />
            <label htmlFor="dob">Date of birth </label>
            <input
              type="date"
              name="dob"
              id="dob"
              value={employee.dob}
              onChange={handleChange}
            />
            <label htmlFor="pno">Phone number </label>
            <input
              type="text"
              name="phoneno"
              id="pno"
              value={employee.phoneno}
              onChange={handleChange}
            />
            <label htmlFor="addr">Address </label>
            <textarea
              name="address"
              id="addr"
              value={employee.address}
              onChange={handleChange}
            />
          </div>
          <button type="submit" onClick={onClick}>
            Update
          </button>
        </form>
      </section>
    </div>
  );
};
