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
import './DataDisplay.css';
import ButtonPopup from "./globalComponents/ButtonPopup";

const DataDisplay = React.memo(({ colsSet, selectedCategory }) => {

  const [currentItemId, setCurrentItemId] = useState(0)
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [nestedData, setNestedData] = useState(null);
  const [addPopUp, setAddPopUp] = useState(false);
  const [showButtonPopup, setShowButtonPopup] = useState(false);
  const [selectLanguage, setSelectedLanguage] = useState(null);



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


  const toggleButtonPopup = () => {
    setShowButtonPopup(!showButtonPopup);
  };

  const handleButtonPopup = (language, item) => {
    toggleButtonPopup()
    setSelectedLanguage(language);
    setSelectedItem(item);
  };

  const toggleAddPopUp = () => {
    setAddPopUp(!addPopUp)

  }

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
        // toast.success("Data updated successfully!", {
        //   position: "top-right",
        // });
        
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

  const addData = (newData) => {
    const newEntry = { id: tableData[tableData.length - 1].id + 1, ...newData };
    setTableData([...tableData, { id: tableData[tableData.length - 1].id + 1, ...newData }]);
    setCurrentItemId(newEntry.id)
    // console.log(tableData[tableData.length - 1].id + 1)
    // console.log([...tableData, { id: tableData[tableData.length - 1].id + 1, ...newData }])
    // setCurrentItemId([...tableData, { id: tableData[tableData.length - 1].id + 1, ...newData }])  
    // console.log( "currentItemId"  ,currentItemId)
  };

  const getStatusClass = (published, complete) => {
    if (published && complete) return 'success';
    if (complete) return 'error';
    return 'grey';
  };

  const getStatusLabel = (published, complete) => {
    if (published && complete) return 'P';
    if (complete) return 'C';
    return '-';
  };

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
                <TableRow className="headding-item">
                  <TableCell >ID</TableCell>
                  <TableCell className="headding-item" style={{ minWidth: '170px', textAlign: "center" }}>Title</TableCell>
                  <TableCell className="headding-item">Action</TableCell>
                  <TableCell className="headding-item"></TableCell>
                  {colsSet.map((language, index) => (
                    <TableCell
                      className="headding-item"
                      key={index}>
                      {language.replace(/_/g, ' ')}
                    </TableCell>
                  ))}
                  <TableCell className="headding-item">File Link</TableCell>
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
                      {colsSet.map((language, index) => {
                        const publishedKey = `${language.toLowerCase()}_published`;
                        const completeKey = `${language.toLowerCase()}_complete`;
                        const isPublished = item[publishedKey] ? JSON.parse(item[publishedKey]) : false;
                        const isComplete = item[completeKey] ? JSON.parse(item[completeKey]) : false;
                        return (
                          <TableCell className="btn-container" key={index}>
                            <Button
                              onClick={() => handleButtonPopup(language, item)}
                              variant="contained"
                              className={getStatusClass(isPublished, isComplete)}
                            >
                             {getStatusLabel(isPublished, isComplete)}
                            </Button>
                          </TableCell>
                        );
                      })}
                      <TableCell>
                        {item.file_link && item.file_link.trim() !== "" && (
                          <a style={{ border: "1px solid black", padding: "8px 10px" }} href={item.file_link}>
                            {item.file_link.substring(0, 12)}
                          </a>
                        )}
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
          
        </div>
      ))}

      {showButtonPopup && (
        <ButtonPopup 
        onClose={toggleButtonPopup} 
        item={selectedItem} 
        selectedLanguage={selectLanguage} 
        onUpdate={handleUpdate} 
        selectedCategory={selectedCategory}
        />
      )}

      {showUpdate && selectedItem && (
        <Update
          item={selectedItem}
          onClose={closeUpdate}
          onUpdate={handleUpdate}
          selectedCategory={selectedCategory}
        />
      )}
      <Toaster position="top-right" />
    </>
    
  );
});

export default DataDisplay;
