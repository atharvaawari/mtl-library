import React from 'react'
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { toast, Toaster } from "react-hot-toast";
import "./SocialDataDisplay.css";
import AddPopup from "../globalComponents/AddPopup";
import UpdateChild from "../globalComponents/UpdatePopup";

const SocialDataDisplay = React.memo(({ colsSet, selectedCategory }) => {

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
    fetchTableData('insta_fb_content');
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

        <div  style={{ marginBottom: '4rem' }}>
          <TableContainer className='table-container' component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Action</TableCell>
                  <TableCell>Mehul Insta</TableCell>
                  <TableCell>MYL Insta Hindi</TableCell>
                  <TableCell>MYL Insta English</TableCell>
                  <TableCell>MYL FB</TableCell>
                  
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.reverse().map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{item.title}</TableCell>

                    <TableCell className='btn-container'>
                      <Button
                        variant="contained"
                        className="editbtn"
                        onClick={() => openUpdate(item)}>
                        ✏️
                      </Button>
                    </TableCell>

                    <TableCell className='btn-container'>
                      <Button
                        variant="contained"
                        className={
                          JSON.parse(item.mehul_insta_published) === true &&
                            JSON.parse(item.mehul_insta_complete) === true
                            ? "success" 
                            : JSON.parse(item.mehul_insta_complete) === true
                              ? "error" 
                              : "grey" 
                        }
                      >
                        {JSON.parse(item.mehul_insta_complete) === true &&
                          JSON.parse(item.mehul_insta_published) === true
                          ? "P"
                          : JSON.parse(item.mehul_insta_complete) === true
                            ? "C"
                            : "-"}
                      </Button>
                    </TableCell>
                    {/* Add similar cells for other languages */}
                    <TableCell className='btn-container'>
                      <Button
                        variant="contained"
                        className={
                          JSON.parse(item.myl_insta_hindi_published) === true &&
                            JSON.parse(item.myl_insta_hindi_complete) === true
                            ? "success" 
                            : JSON.parse(item.myl_insta_hindi_complete) === true
                              ? "error" 
                              : "grey" 
                        }
                      >
                        {
                          JSON.parse(item.myl_insta_hindi_complete) === true &&
                            JSON.parse(item.myl_insta_hindi_published) === true
                            ? "P"
                            : JSON.parse(item.myl_insta_hindi_complete) === true
                              ? "C"
                              : "-"
                        }
                      </Button>
                    </TableCell>
                    {/* Repeat similar cells for other languages */}
                    <TableCell className='btn-container'>
                      <Button
                        variant="contained"
                        className={
                          JSON.parse(item.myl_insta_english_published) === true &&
                            JSON.parse(item.myl_insta_english_complete) === true
                            ? "success" 
                            : JSON.parse(item.myl_insta_english_complete) === true
                              ? "error" 
                              : "grey" 
                        }
                      >
                        {
                          JSON.parse(item.myl_insta_english_complete) === true &&
                            JSON.parse(item.myl_insta_english_published) === true
                            ? "P"
                            : JSON.parse(item.myl_insta_english_complete) === true
                              ? "C"
                              : "-"
                        }
                      </Button>
                    </TableCell>
                    {/* Repeat similar cells for other languages */}
                    <TableCell className='btn-container'>
                      <Button
                        variant="contained"
                        className={
                          JSON.parse(item.myl_fb_published) === true &&
                            JSON.parse(item.myl_fb_complete) === true
                            ? "success" 
                            : JSON.parse(item.myl_fb_complete) === true
                              ? "error"
                              : "grey"
                        }
                      >
                        {JSON.parse(item.myl_fb_complete) === true &&
                          JSON.parse(item.myl_fb_published) === true
                          ? "P"
                          : JSON.parse(item.myl_fb_complete) === true
                            ? "C"
                            : "-"}
                      </Button>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
    s
      {/* {showUpdate && selectedItem && (
        <Update
          item={selectedItem}
          onClose={closeUpdate}
          onUpdate={handleUpdate}
        />
      )} */}
      
      {showUpdatePopup && selectedItem && (
        <UpdateChild colsSet={colsSet} item={selectedItem} onClose={closeUpdate} onUpdate={handleUpdate} selectedCategory={selectedCategory} />
      )}
      <Toaster position="top-right"/>

    </>
  );
});

export default SocialDataDisplay
