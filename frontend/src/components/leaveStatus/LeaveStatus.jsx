import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useAuth } from "../../context/User";
import dayjs from "dayjs";
// import "./summary.css";

const columns = [
  { field: "leaveid", headerName: "ID", width: 90 },
  {
    field: "startdate",
    headerName: "Start date",
    width: 150,
    valueGetter: (params) =>
      `${dayjs(params.row.startdate).format("DD/MM/YYYY")}`
  },
  {
    field: "enddate",
    headerName: "End date",
    width: 150,
    valueGetter: (params) => `${dayjs(params.row.enddate).format("DD/MM/YYYY")}`
  },
  {
    field: "reason",
    headerName: "Reason",
    width: 110
  },
  {
    field: "leavestatus",
    headerName: "Status",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) => `${params.row.leavestatus || "Pending"}`
  }
];

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

export default function LeaveStatus() {
  const [rows, setRows] = React.useState([]);
  const { user } = useAuth();
  React.useEffect(() => {
    axios
      .get(`http://localhost:4000/employee/leave/${user.user.employeeid}`)
      .then((res) => {
        console.log("first", res);
        setRows(res.data);
      });
  }, []);

  return (
    <section className="summary">
      <div className="summary-box">
        <h1
          style={{
            height: "40px",
            display: "flex",
            alignItems: "center",
            padding: "10px",
            color: "rgba(0, 0, 0, 0.8)"
          }}
        >
          Attendance history
        </h1>
        <Box sx={{ height: 400, width: "100%", background: "white" }}>
          <DataGrid
            getRowId={(row) => row.leaveid}
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </Box>
      </div>
    </section>
  );
}
