import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import "../../FormComponent.css";
import AddPopup from "../globalComponents/AddPopup";
import UpdateChild from "../globalComponents/UpdatePopup";
import { toast, Toaster } from "react-hot-toast";

const GameDataDisplay = React.memo(({ colsSet, selectedCategory }) => {
  const [tableData, setTableData] = useState([]);
  const [addPopup, setAddPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchTableData = async (tablename) => {
    try {
      const url = `http://localhost:3001/content-data?category=${selectedCategory}&tablename=${tablename}`;

      const response = await fetch(url);
      const data = await response.json();
      
      setTableData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchTableData('game_video');
  }, [selectedCategory]);


  const addData = (newData) => {
    const newEntry = { id: tableData.length + 1, ...newData };
    setTableData([...tableData, newEntry]);
  };

  const toggleAddPopup = () => {
    setAddPopup(!addPopup);
  };

  const closeUpdate = () => {
    setSelectedItem(null);
    setShowUpdatePopup(false);
  };

  const openUpdate = (item) => {
    setSelectedItem(item);
    setShowUpdatePopup(true);
  };

  const submitUpdate = async (updatedData) => {
    const updatedArray = tableData.map((item) =>
      item.id === updatedData.id ? updatedData : item
    );

    try {
      const response = await fetch("http://localhost:3001/update-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
        
      if (response.ok) {
        toast.success("Data updated successfully!", {
          position: "top-right",
        });
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    setTableData(updatedArray);
    closeUpdate();
  };


  

  return (
    <>
      <div>
        <Button
          variant="contained"
          color="primary"
          sx={{ margin: "2rem auto", display: "block" }}
          onClick={toggleAddPopup}>
          Add
        </Button>
        {addPopup && (
          <AddPopup
            onClose={toggleAddPopup}
            addData={addData}
            selectedCategory={selectedCategory}
            colsSet={colsSet}
          />
        )}
      </div>
      <div className="table-container" style={{ marginBottom: "4rem" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell style={{ minWidth: "100px" }}>Title</TableCell>
                <TableCell>Hindi</TableCell>
                <TableCell>English</TableCell>
                <TableCell>Bangla</TableCell>
                <TableCell>Portuguese</TableCell>
                <TableCell>Action</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.reverse().map((item, idx) => ( 
                <TableRow key={idx} className="MuiTableRow-root css-1q1u3t4-MuiTableRow-root">
                  <TableCell className="MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-1ex1afd-MuiTableCell-root">
                    {idx + 1}
                  </TableCell>
                  <TableCell className="MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-1ex1afd-MuiTableCell-root">
                    {item.title}
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="contained"
                      className={
                        JSON.parse(item.hindi_published) === true &&
                        JSON.parse(item.hindi_complete) === true
                          ? "success"
                          : JSON.parse(item.hindi_complete) === true
                          ? "error"
                          : "grey"
                      }>
                      {JSON.parse(item.hindi_complete) === true &&
                      JSON.parse(item.hindi_published) === true
                        ? "P"
                        : JSON.parse(item.hindi_complete) === true
                        ? "C"
                        : "-"}
                    </Button>
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="contained"
                      className={
                        JSON.parse(item.english_published) === true &&
                        JSON.parse(item.english_complete) === true
                          ? "success"
                          : JSON.parse(item.english_complete) === true
                          ? "error"
                          : "grey"
                      }>
                      {JSON.parse(item.english_complete) === true &&
                      JSON.parse(item.english_published) === true
                        ? "P"
                        : JSON.parse(item.english_complete) === true
                        ? "C"
                        : "-"}
                    </Button>
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="contained"
                      className={
                        JSON.parse(item.bangla_published) === true &&
                        JSON.parse(item.bangla_complete) === true
                          ? "success"
                          : JSON.parse(item.bangla_complete) === true
                          ? "error"
                          : "grey"
                      }>
                      {JSON.parse(item.bangla_complete) === true &&
                      JSON.parse(item.bangla_published) === true
                        ? "P"
                        : JSON.parse(item.bangla_complete) === true
                        ? "C"
                        : "-"}
                    </Button>
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="contained"
                      className={
                        JSON.parse(item.portuguese_published) === true &&
                        JSON.parse(item.portuguese_complete) === true
                          ? "success"
                          : JSON.parse(item.portuguese_complete) === true
                          ? "error"
                          : "grey"
                      }>
                      {JSON.parse(item.portuguese_complete) === true &&
                      JSON.parse(item.portuguese_published) === true
                        ? "P"
                        : JSON.parse(item.portuguese_complete) === true
                        ? "C"
                        : "-"}
                    </Button>
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="contained"
                      className="editbtn"
                      onClick={() => openUpdate(item)}>
                      ✏️
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {showUpdatePopup && selectedItem && (
        <UpdateChild colsSet={colsSet} item={selectedItem} onClose={closeUpdate} onUpdate={submitUpdate} selectedCategory={selectedCategory} />
      )}
      <Toaster position="top-right" />
    </>
  );
});

export default GameDataDisplay;
