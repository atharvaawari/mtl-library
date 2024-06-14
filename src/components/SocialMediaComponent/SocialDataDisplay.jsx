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

  const reversedTableData = [...tableData].reverse();

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

  // const statusFields = [
  //   {
  //     key: 'mehul_insta',
  //     languages: [
  //       { key: 'mehul_insta_published', completeKey: 'mehul_insta_complete' },
  //     ]
  //   },
  //   {
  //     key: 'myl_insta',
  //     languages: [
  //       { key: 'myl_insta_hindi_published', completeKey: 'myl_insta_hindi_complete', label: 'Hindi' },
  //       { key: 'myl_insta_english_published', completeKey: 'myl_insta_english_complete', label: 'English' },
  //     ]
  //   },
  //   {
  //     key: 'myl_fb',
  //     languages: [
  //       { key: 'myl_fb_published', completeKey: 'myl_fb_complete' },
  //     ]
  //   },
  // ];

  // const getStatusClass = (published, complete) => {
  //   if (published && complete) return 'success';
  //   if (complete) return 'error';
  //   return 'grey';
  // };

  // const getStatusLabel = (published, complete) => {
  //   if (published && complete) return 'P';
  //   if (complete) return 'C';
  //   return '-';
  // };

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

      <div style={{ marginBottom: '4rem' }}>
        <TableContainer className='table-container' component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Action</TableCell>
                {colsSet.map((language, index) => (
                  <TableCell key={index}>{language.replace(/_/g, ' ')}</TableCell>
                ))}
                <TableCell>File Link</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reversedTableData.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell className="btn-container">
                    <Button
                      variant="contained"
                      className="editbtn"
                      onClick={() => openUpdate(item)}
                    >
                      ✏️
                    </Button>
                  </TableCell>
                  {colsSet.map((language, index) => {
                    const publishedKey = `${language.toLowerCase()}_published`;
                    const completeKey = `${language.toLowerCase()}_complete`;
                    return (
                      <TableCell className="btn-container" key={index}>
                        <Button
                          variant="contained"
                          className={getStatusClass(
                            JSON.parse(item[publishedKey]),
                            JSON.parse(item[completeKey])
                          )}
                        >
                          {getStatusLabel(
                            JSON.parse(item[publishedKey]),
                            JSON.parse(item[completeKey])
                          )}
                        </Button>
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    {item.file_link && item.file_link.trim() !== '' && (
                      <a
                        style={{ border: '1px solid black', padding: '8px 10px' }}
                        href={item.file_link}
                      >
                        {item.file_link.substring(0, 12)}
                      </a>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {showUpdatePopup && selectedItem && (
        <UpdateChild colsSet={colsSet} item={selectedItem} onClose={closeUpdate} onUpdate={handleUpdate} selectedCategory={selectedCategory} />
      )}
      <Toaster position="top-right" />

    </>
  );
});

export default SocialDataDisplay
