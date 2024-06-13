import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Collapse,
  Box,
  TextField,
} from "@mui/material";
import Update from "./Update";
import Popup from "./Popup";
import AddChildPopup from "./AddChildPopup";
import ContentHub from "./ContentChildSection";
import { toast, Toaster } from "react-hot-toast";

const DataDisplay = React.memo(({ colsSet, selectedCategory }) => {

  const [currentItemId, setCurrentItemId] = useState(0)
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [nestedData, setNestedData] = useState(null);
  const [addPopUp, setAddPopUp] = useState(false);


  const toggleAddPopUp = () => {
    setAddPopUp(!addPopUp)
  }

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
    fetchTableData('content_house');

  }, [selectedCategory, currentItemId]);


  const openUpdate = (item) => {
    setSelectedItem(item);
    setShowUpdate(true);
  };

  const closeUpdate = () => {
    setSelectedItem(null);
    setShowUpdate(false);
  };

  const [expandedRow, setExpandedRow] = useState(null);

  const handleExpandClick = async (idx, itemId) => {
    let data;
    if (expandedRow === idx) {
      setExpandedRow(null);
    } else {

      // if (!nestedData[itemId]) {
      try {
        const response = await fetch(
          `http://localhost:3001/get-content-child-data?id=${itemId}`
        );
        if (response.ok) {
          data = await response.json();

          setNestedData(data);
        } else {
          console.error("Failed to fetch nested data");
        }
      } catch (error) {
        console.error("Error fetching nested data:", error);
      }
      // }

      setExpandedRow(idx);
    }
  };

  const handleUpdate = async (updatedData) => {
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
        console.log("Form submitted successfully!");
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    setTableData(updatedArray);
    closeUpdate();
  };



  const groupedData = tableData.reduce((acc, curr) => {

    const channel = curr.channel;
    if (!acc[channel]) {
      acc[channel] = [];
    }

    acc[channel].push(curr);

    return acc;
  }, {});

  // const addData = (newData) => {
  //     const newEntry = { id: tableData[tableData.length - 1].id + 1, ...newData };
  //     setTableData([...tableData, { id: tableData[tableData.length - 1].id + 1, ...newData }]);
  //     console.log(tableData[tableData.length - 1].id + 1)
  //     console.log([...tableData, { id: tableData[tableData.length - 1].id + 1, ...newData }])
  //     setCurrentItemId([...tableData, { id: tableData[tableData.length - 1].id + 1, ...newData }])  
  //     console.log( "currentItemId"  ,currentItemId)
  //   };

  // const addData = async (newData) => {
  //   const newEntry = { id: tableData[tableData.length - 1].id + 1, ...newData };
  //   setTableData((prevTableData) => [...prevTableData, newEntry]);
  //   setCurrentItemId(newEntry.id);
  //   console.log("newEntry.id", newEntry.id)
  //   console.log("currentItemId", currentItemId)
  // };

  return (
    <>
      <div>
        <Button
          variant="contained"
          color="primary"
          sx={{ margin: "2rem auto", display: "block" }}
          onClick={toggleAddPopUp}>
          Add
        </Button>
        {addPopUp && (
          <Popup
            onClose={toggleAddPopUp}
            addData={addData}
            selectedCategory={selectedCategory}
            colsSet={colsSet}
          />
        )}
      </div>
      {Object.keys(groupedData).map((channel, index) => (
        <div key={index} style={{ marginBottom: "2rem" }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell style={{ minWidth: '100px' }}>Title</TableCell>
                  <TableCell>Action</TableCell>
                  <TableCell></TableCell>
                  <TableCell>Hindi</TableCell>
                  <TableCell>English</TableCell>
                  <TableCell>Bangla</TableCell>
                  <TableCell>Telugu</TableCell>
                  <TableCell>Tamil</TableCell>
                  <TableCell>Malayalam</TableCell>
                  <TableCell>Portuguese</TableCell>
                  <TableCell>Spanish</TableCell>
                  <TableCell>Kannada</TableCell>
                  <TableCell>Odia</TableCell>
                  <TableCell>Insta</TableCell>
                  <TableCell>FB</TableCell>
                  <TableCell>File Link</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {groupedData[channel].reverse().map((item, idx) => (
                  <React.Fragment key={idx}>
                    <TableRow>

                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{item.title}</TableCell>

                      <TableCell>
                        <Button
                          variant="contained"
                          className="editbtn"
                          onClick={() => openUpdate(item)}>
                          ✏️
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          onClick={() => handleExpandClick(idx, item.id)}>
                          {expandedRow === idx ? "Collapse" : "Expand"}
                          { }
                          {
                            item.child_count > 0
                              ? <span className="red-batch">{item.child_count}</span>
                              : ''
                          }

                        </Button>
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

                      {/* Add similar cells for other languages */}
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

                      {/* Repeat similar cells for other languages */}
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

                      {/* Repeat similar cells for other languages */}
                      <TableCell>
                        <Button
                          variant="contained"
                          className={
                            JSON.parse(item.telugu_complete) === true &&
                              JSON.parse(item.telugu_published) === true
                              ? "success"
                              : JSON.parse(item.telugu_complete) === true
                                ? "error"
                                : "grey"
                          }>
                          {JSON.parse(item.telugu_complete) === true &&
                            JSON.parse(item.telugu_published) === true
                            ? "P"
                            : JSON.parse(item.telugu_complete) === true
                              ? "C"
                              : "-"}
                        </Button>
                      </TableCell>

                      {/* Repeat similar cells for other languages */}
                      <TableCell>
                        <Button
                          variant="contained"
                          className={
                            JSON.parse(item.tamil_complete) === true &&
                              JSON.parse(item.tamil_published) === true
                              ? "success"
                              : JSON.parse(item.tamil_complete) === true
                                ? "error"
                                : "grey"
                          }>
                          {JSON.parse(item.tamil_complete) === true &&
                            JSON.parse(item.tamil_published) === true
                            ? "P"
                            : JSON.parse(item.tamil_complete) === true
                              ? "C"
                              : "-"}
                        </Button>
                      </TableCell>

                      {/* Repeat similar cells for other languages */}
                      <TableCell>
                        <Button
                          variant="contained"
                          className={
                            JSON.parse(item.malayalam_complete) === true &&
                              JSON.parse(item.malayalam_published) === true
                              ? "success"
                              : JSON.parse(item.malayalam_complete) === true
                                ? "error"
                                : "grey"
                          }>
                          {JSON.parse(item.malayalam_complete) === true &&
                            JSON.parse(item.malayalam_published) === true
                            ? "P"
                            : JSON.parse(item.malayalam_complete) === true
                              ? "C"
                              : "-"}
                        </Button>
                      </TableCell>

                      {/* Repeat similar cells for other languages */}
                      <TableCell>
                        <Button
                          variant="contained"
                          className={
                            JSON.parse(item.portuguese_complete) === true &&
                              JSON.parse(item.portuguese_published) === true
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

                      {/* Repeat similar cells for other languages */}
                      <TableCell>
                        <Button
                          variant="contained"
                          className={
                            JSON.parse(item.spanish_complete) === true &&
                              JSON.parse(item.spanish_published) === true
                              ? "success"
                              : JSON.parse(item.spanish_complete) === true
                                ? "error"
                                : "grey"
                          }>
                          {JSON.parse(item.spanish_complete) === true &&
                            JSON.parse(item.spanish_published) === true
                            ? "P"
                            : JSON.parse(item.spanish_complete) === true
                              ? "C"
                              : "-"}
                        </Button>
                      </TableCell>

                      {/* Repeat similar cells for other languages */}
                      <TableCell>
                        <Button
                          variant="contained"
                          className={
                            JSON.parse(item.kannada_complete) === true &&
                              JSON.parse(item.kannada_published) === true
                              ? "success"
                              : JSON.parse(item.kannada_complete) === true
                                ? "error"
                                : "grey"
                          }>
                          {JSON.parse(item.kannada_complete) === true &&
                            JSON.parse(item.kannada_published) === true
                            ? "P"
                            : JSON.parse(item.kannada_complete) === true
                              ? "C"
                              : "-"}
                        </Button>
                      </TableCell>

                      {/* Repeat similar cells for other languages */}
                      <TableCell>
                        <Button
                          variant="contained"
                          className={
                            JSON.parse(item.odia_complete) === true &&
                              JSON.parse(item.odia_published) === true
                              ? "success"
                              : JSON.parse(item.odia_complete) === true
                                ? "error"
                                : "grey"
                          }>
                          {JSON.parse(item.odia_complete) === true &&
                            JSON.parse(item.odia_published) === true
                            ? "P"
                            : JSON.parse(item.odia_complete) === true
                              ? "C"
                              : "-"}
                        </Button>
                      </TableCell>

                      {/* Repeat similar cells for other languages */}
                      <TableCell>
                        <Button
                          variant="contained"
                          className={
                            JSON.parse(item.insta_complete) === true &&
                              JSON.parse(item.insta_published) === true
                              ? "success"
                              : JSON.parse(item.insta_complete) === true
                                ? "error"
                                : "grey"
                          }>
                          {JSON.parse(item.insta_complete) === true &&
                            JSON.parse(item.insta_published) === true
                            ? "P"
                            : JSON.parse(item.insta_complete) === true
                              ? "C"
                              : "-"}
                        </Button>
                      </TableCell>

                      {/* Repeat similar cells for other languages */}
                      <TableCell>
                        <Button
                          variant="contained"
                          className={
                            JSON.parse(item.fb_complete) === true &&
                              JSON.parse(item.fb_published) === true
                              ? "success"
                              : JSON.parse(item.fb_complete) === true
                                ? "error"
                                : "grey"
                          }>
                          {JSON.parse(item.fb_complete) === true &&
                            JSON.parse(item.fb_published) === true
                            ? "P"
                            : JSON.parse(item.fb_complete) === true
                              ? "C"
                              : "-"}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <a style={{ border: "1px solid black", padding: "8px 10px" }} href={item.file_link}>Link</a>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={14}>
                        <Collapse
                          in={expandedRow === idx}
                          timeout="auto"
                          unmountOnExit>
                          <Box margin={1}>
                            <ContentHub nestedData={nestedData} currentItemId={currentItemId} />
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Toaster position="top-right" />
        </div>
      ))}

      {showUpdate && selectedItem && (
        <Update
          item={selectedItem}
          onClose={closeUpdate}
          onUpdate={handleUpdate}
        />
      )}
    </>

  );
});

export default DataDisplay;
