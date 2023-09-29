import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { toast } from "react-toastify";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  makeStyles,
  TablePagination,
  Button,
} from "@material-ui/core";
import { saveAs } from "file-saver";
import Widget from "../../component/WidgetCard";
import Grid from "@mui/material/Grid";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { useTranslation } from "react-i18next";
import "./AnimalObservationData.css";
import SoloAlert from "soloalert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 650,
    borderCollapse: "collapse",
  },
  fixedColumn: {
    position: "sticky",
    left: 0,
    zIndex: 1,
    backgroundColor: theme.palette.background.paper,
  },
  approvedRow: {
    backgroundColor: "#26de81",
    border: "3px solid #e74c3c",
    position: "relative",
  },
  pendingText: {
    position: "absolute",
    border: "3px solid #e74c3c",
    top: "50%",
    left: "59%",
    transform: "translate(-50%, -50%)",
    color: "#e74c3c",
    fontWeight: "bold",
    animation: "$blinkAnimation 1s infinite",
  },
  "@keyframes blinkAnimation": {
    "0%": { opacity: 0 },
    "50%": { opacity: 1 },
    "100%": { opacity: 0 },
  },
}));

const AnimalObservationData = () => {
  const { t, i18n } = useTranslation();
  const [dbData, setDbData] = useState([]);
  const [sortOrder, setSortOrder] = useState("newestToOldest");
  const classes = useStyles();
  const [addedDate, setAddedDate] = useState("");
  const [users, setUsers] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [isApproved, setIsApproved] = useState(false);
  const userRole = localStorage.getItem("userRole");
  // Function to check if a record is approved

  // const handleDelete = (recordId) => {
  //   api
  //     .delete(`/api/observations/${recordId}`)
  //     .then((res) => {
  //       // Handle successful deletion
  //       toast.success("Record deleted successfully");
  //       window.location.reload();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       toast.error(error.message);
  //     });
  // };
  async function handleDelete(recordId) {
    SoloAlert.confirm({
      title: "Confirm Delete",
      body: "Are you sure",
      theme: "dark",
      useTransparency: true,
      onOk: async function () {
        try {
          const result = await (
            await api.delete(`/api/observations/${recordId}`)
          ).status;
          console.log(result);

          if (result === 200) {
            SoloAlert.alert({
              title: "Welcome!",
              body: "Deletion is successful",
              icon: "success",
              theme: "dark",
              useTransparency: true,
              onOk: function () {
                window.location = "/Safe-Pass-SriLanka/dashlayout";
              },
            });
          }
        } catch (err) {
          SoloAlert.alert({
            title: "Oops!",
            body: "Something went wrong",
            icon: "error",
            theme: "dark",
            useTransparency: true,
            onOk: function () {},
          });
        }
      },
      onCancel: function () {
        SoloAlert.alert({
          title: "Oops!",
          body: "You canceled delete request",
          icon: "warning",
          theme: "dark",
          useTransparency: true,
          onOk: function () {},
        });
      },
    });
  }
  const handleApprove = (recordId) => {
    const record = dbData.find((row) => row._id === recordId);
    const updatedRecord = { ...record, isApproved: !record.isApproved };

    api
      .put(`/api/observations/${recordId}`, {
        isApproved: updatedRecord.isApproved,
      })
      .then((res) => {
        // Handle successful update
        toast.success(
          `Record ${
            updatedRecord.isApproved ? "approved" : "unapproved"
          } successfully`
        );
        // Update the record in the state
        setDbData((prevData) =>
          prevData.map((row) => (row._id === recordId ? updatedRecord : row))
        );
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  useEffect(() => {
    api
      .get("/api/observations")
      .then((res) => {
        setDbData(res.data);
        setLoading(false); // Set loading state to false once data is fetched
        return res.data;
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
        setLoading(false); // Set loading state to false on error
      });
  }, []);

  useEffect(() => {
    api
      .get("/api/observation/summary")
      .then((res) => {
        setAddedDate(res.data);
        return res.data;
      })
      .catch((error) => {
        toast.error(error.mesage);
      });
  }, []);

  useEffect(() => {
    api
      .get("/api/users")
      .then((res) => {
        setUsers(res.data);
        return res.data;
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  }, []);

  const handleSortOrderChange = (col) => {
    if (sortOrder === "newestToOldest") {
      const sortedData = [...dbData].sort(
        (a, b) => new Date(b.observationDate) - new Date(a.observationDate)
      );
      setDbData(sortedData);
      setSortOrder("oldestToNewest");
    }
    if (sortOrder === "oldestToNewest") {
      const sortedData = [...dbData].sort(
        (a, b) => new Date(a.observationDate) - new Date(b.observationDate)
      );
      setDbData(sortedData);
      setSortOrder("newestToOldest");
    }
  };

  const paginatedData = loading
    ? []
    : dbData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleDownloadCSV = () => {
    const csvData = convertToCSV(dbData); // Convert the data to CSV format
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "animal_observation_data.csv"); // Download the CSV file
  };

  const convertToCSV = (data) => {
    const headers = [
      "Animal Name",
      "Image",
      "Taxon Group",
      "Location",
      "Observation Date",
      "Observation Time",
      "Day/Night",
      "Climate Type",
      "Observation Road",
      "Road Condition",
      "Traffic Type",
    ];
    const rows = data.map((row) => [
      row.animalName,
      row.image,
      row.taxonGroup,
      `${row.location.coordinates[1]}, ${row.location.coordinates[0]}`,
      row.observationDate,
      row.observationTime,
      row.dayNight,
      row.climateType,
      row.observationRoad,
      row.roadCondition,
      row.trafficType,
    ]);
    const csvContent =
      headers.join(",") + "\n" + rows.map((row) => row.join(",")).join("\n");
    return csvContent;
  };

  return (
    <div>
      <h2
        align="center"
        style={{
          color: "#dfe6e9",
          fontFamily: "Arial, sans-serif",
          // ... other styles
        }}
      >
        Safe-Pass {t("DATABASE")}{" "}
      </h2>

      {/* Recent Deposits */}
      <Grid container spacing={2} style={{ marginBottom: 40 }}>
        <Grid item xs={4}>
          <Paper
            sx={{ p: 2, height: 240 }}
            style={{ width: 200, marginLeft: 100 }}
          >
            <Widget name="Total Entries :   " value={dbData.length} />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper
            sx={{ p: 2, height: 240 }}
            style={{ width: 215, marginLeft: 50 }}
          >
            {/* <Widget
              name="From   :      "
              value={addedDate?.firstCreated?.createdAt}
              name2="To   :      "
              value2={addedDate?.lastCreated?.createdAt}
            /> */}
            <Widget
              name="From   :      "
              value={
                addedDate &&
                addedDate.firstCreated &&
                addedDate.firstCreated.createdAt
              }
              name2="To   :      "
              value2={
                addedDate &&
                addedDate.lastCreated &&
                addedDate.lastCreated.createdAt
              }
            />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ p: 2, height: 240 }} style={{ width: 200 }}>
            <Widget name="Users :   " value={users.length} />
          </Paper>
        </Grid>
      </Grid>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {/* <input
          type="file"
          style={{
            padding: "8px 12px",
            backgroundColor: "#f2f2f2",
            marginTop: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            color: "#333",
            fontFamily: "Arial, sans-serif",
            fontSize: "14px",
            // ... other styles
          }}
        /> */}
        <button
          style={{
            padding: "8px 12px",
            backgroundColor: "#f2f2f2",
            marginLeft: "10px",
            marginTop: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            color: "#333",
            fontFamily: "Arial, sans-serif",
            fontSize: "14px",
            // ... other styles
          }}
          onClick={handleDownloadCSV}
        >
          Download as CSV
        </button>
        {/* Sorting Buttons */}
        {sortOrder === "newestToOldest" ? (
          <button
            style={{
              padding: "8px 12px",
              backgroundColor: "#f2f2f2",
              marginLeft: "70%",
              marginTop: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              color: "#333",
              fontFamily: "Arial, sans-serif",
              fontSize: "14px",
              // ... other styles
            }}
            onClick={() => handleSortOrderChange("oldestToNewest")}
          >
            Oldest to Newest
            <KeyboardDoubleArrowUpIcon />
          </button>
        ) : (
          <button
            style={{
              padding: "8px 12px",
              backgroundColor: "#f2f2f2",
              marginTop: "10px",
              marginLeft: "55%",
              border: "1px solid #ccc",
              borderRadius: "4px",
              color: "#333",
              fontFamily: "Arial, sans-serif",
              fontSize: "14px",
              // ... other styles
            }}
            onClick={() => handleSortOrderChange()}
          >
            Newest to Oldest <KeyboardDoubleArrowDownIcon />
          </button>
        )}
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell
                  className={classes.fixedColumn}
                  onClick={() => handleSortOrderChange("animalName")}
                >
                  Animal Name
                </TableCell>
                <TableCell>Image</TableCell>
                <TableCell className={classes.fixedColumn}>
                  Taxon Group
                </TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Observation Date</TableCell>
                <TableCell>Observation Time</TableCell>
                <TableCell>Day/Night</TableCell>
                <TableCell>Climate Type</TableCell>
                <TableCell>Observation Road</TableCell>
                <TableCell>Road Condition</TableCell>
                <TableCell>Traffic Type</TableCell>
                {parseInt(userRole) === 1 && <TableCell>Approval</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row) => (
                <TableRow
                  key={row._id}
                  className={row.isApproved ? "" : classes.approvedRow}
                >
                  <TableCell className={classes.fixedColumn}>
                    {row.animalName}
                  </TableCell>
                  <TableCell className={classes.fixedColumn}>
                    <img
                      src={row.image.url}
                      alt="Animal"
                      style={{ height: "30px", width: "30px" }}
                    />
                  </TableCell>
                  <TableCell>{row.taxonGroup}</TableCell>
                  <TableCell>
                    {`${row.location.coordinates[1]}, ${row.location.coordinates[0]}`}
                  </TableCell>
                  <TableCell>{row.observationDate}</TableCell>
                  <TableCell>{row.observationTime}</TableCell>
                  <TableCell>{row.dayNight}</TableCell>
                  <TableCell>{row.climateType}</TableCell>
                  <TableCell>{row.observationRoad}</TableCell>
                  <TableCell>{row.roadCondition}</TableCell>
                  <TableCell>{row.trafficType}</TableCell>
                  {parseInt(userRole) === 1 && (
                    <TableCell>
                      <Button onClick={() => handleApprove(row._id)}>
                        {row.isApproved ? (
                          <img
                            src="/images/confirm-tick.png"
                            alt="SVG delete Image"
                            className="tick-icon"
                          />
                        ) : (
                          "Pending..."
                        )}
                      </Button>
                    </TableCell>
                  )}
                  {parseInt(userRole) === 1 && (
                    <TableCell>
                      {/* <Button onClick={() => handleDelete(row._id)}>
                      Delete
                    </Button> */}
                      <img
                        src="/images/delete-icon.svg"
                        alt="SVG delete Image"
                        onClick={() => handleDelete(row._id)}
                        className="delete-icon"
                      />
                    </TableCell>
                  )}
                  {!row.isApproved && parseInt(userRole) === 0 && (
                    <TableCell className={classes.pendingText}>
                      Pending...
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "20px",
            }}
          >
            <button
              style={{
                padding: "8px 12px",
                backgroundColor: "#f2f2f2",
                marginRight: "10px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                color: "#333",
                fontFamily: "Arial, sans-serif",
                fontSize: "14px",
                // ... other styles
              }}
              onClick={() => setPage(page - 1)}
              disabled={page === 0}
            >
              Previous
            </button>
            <button
              style={{
                padding: "8px 12px",
                backgroundColor: "#f2f2f2",
                marginRight: "10px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                color: "#333",
                fontFamily: "Arial, sans-serif",
                fontSize: "14px",
                // ... other styles
              }}
              onClick={() => setPage(page + 1)}
              disabled={page >= Math.ceil(dbData.length / rowsPerPage) - 1}
            >
              Next
            </button>
          </div>
        </Paper>
      )}
    </div>
  );
};

export default AnimalObservationData;
