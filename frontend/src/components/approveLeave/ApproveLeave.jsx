import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useAuth } from "../../context/User";
import dayjs from "dayjs";
import "./appl.css";

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

export default function ApproveLeave() {
  const [rows, setRows] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const { user } = useAuth();
  const getLeave = () => {
    axios.get(`http://localhost:4000/admin/employee/leaves`).then((res) => {
      console.log("first", res);
      setRows(res.data);
    });
  };

  const columns = [
    { field: "leaveid", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      valueGetter: (params) => `${params.row.firstname} ${params.row.lastname}`
    },
    {
      field: "leavetype",
      headerName: "Type",
      width: 150
    },
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
      valueGetter: (params) =>
        `${dayjs(params.row.enddate).format("DD/MM/YYYY")}`
    },
    {
      field: "reason",
      headerName: "Reason",
      width: 110
    },
    // {
    //   field: "leavestatus",
    //   headerName: "Status",
    //   description: "This column has a value getter and is not sortable.",
    //   sortable: false,
    //   width: 200,
    //   valueGetter: (params) =>
    //     `${
    //       params.row.leavestatus || (
    //         <>
    //           <button>Approve</button>
    //           <button>Deny</button>
    //         </>
    //       )
    //     }`
    // },
    {
      field: "leavestatus",
      headerName: "Status",
      sortable: false,
      width: 250,
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
            .put(
              `http://localhost:4000/admin/employee/${params.row.leaveid}/leave`,
              {
                leavestatus: "Denied"
              }
            )
            .then((res) => getLeave());
          // return alert(JSON.stringify(thisRow, null, 4));
        };
        const onUpdate = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          const api = params.api;
          const thisRow = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );
          console.log("params.id", params);
          axios
            .put(
              `http://localhost:4000/admin/employee/${params.row.leaveid}/leave`,
              {
                leavestatus: "Approved"
              }
            )
            .then((res) => getLeave());
          // axios
          //   .delete(`http://localhost:4000/admin/employee/${params.id}`)
          //   .then((res) => getEmployees());
          // return alert(JSON.stringify(thisRow, null, 4));
          // setSelectedRow(thisRow);
        };

        return (
          params.row.leavestatus || (
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
                Approve
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
                Deny
              </button>
            </>
          )
        );
      }
    }
  ];
  React.useEffect(() => {
    getLeave();
  }, []);

  return (
    <section className="summary">
      <div className="summary-box app_leave">
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
            loading={show}
          />
        </Box>
      </div>
    </section>
  );
}
