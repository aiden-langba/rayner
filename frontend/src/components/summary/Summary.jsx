import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import "./summary.css";
import axios from "axios";
import { useAuth } from "../../context/User";
import dayjs from "dayjs";

const columns = [
  { field: "attendanceid", headerName: "ID", width: 90 },
  {
    field: "attendancedate",
    headerName: "Date",
    width: 150,
    valueGetter: (params) =>
      `${dayjs(params.row.attendancedate).format("DD/MM/YYYY")}`
  },
  {
    field: "checkin",
    headerName: "Checkin",
    width: 150
  },
  {
    field: "checkout",
    headerName: "checkout",
    width: 110
  }
];

export default function Summary() {
  const [rows, setRows] = React.useState([]);
  const { user } = useAuth();
  const getAttendance = () => {
    axios
      .get(`http://localhost:4000/employee/${user.user.employeeid}/logs`)
      .then((res) => setRows(res.data));
  };
  React.useEffect(() => {
    getAttendance();
  }, []);
  console.log("rows", rows);
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
            getRowId={(row) => row.attendanceid}
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
