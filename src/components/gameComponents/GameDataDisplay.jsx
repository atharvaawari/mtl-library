import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Link,
} from "@mui/material";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import "../../FormComponent.css";
import AddPopup from "../globalComponents/AddPopup";
import UpdateChild from "../globalComponents/UpdatePopup";
import ButtonPopup from '../globalComponents/ButtonPopup';
import { Toaster } from "react-hot-toast";

const GameDataDisplay = React.memo(({ colsSet, selectedCategory }) => {
  const [tableData, setTableData] = useState([]);
  const [addPopup, setAddPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
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
    fetchTableData('game_video');
  }, [selectedCategory]);



  const addData = (newData) => {
    const newEntry = { id: tableData.length + 1, ...newData };
    setTableData([...tableData, newEntry]);
  };

  const toggleButtonPopup = () => {
    setShowButtonPopup(!showButtonPopup);
  };

  const handleButtonPopup = (language, item) => {
    toggleButtonPopup()
    setSelectedLanguage(language);
    setSelectedItem(item);
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
                    const link = `${language.toLowerCase()}_link`;
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

                          {
                            item[link]
                              ? <Link href={item[link]} target="_blank" rel="noopener noreferrer" className="black-batch"
                                sx={{
                                  fontSize: '12px',
                                  fontWeight: '900',
                                  color: 'white',
                                  '& .MuiSvgIcon-root': { fontSize: '12px' },
                                }}
                              >
                                <OpenInNewIcon /></Link>
                              : ''
                          }
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
        <UpdateChild colsSet={colsSet} item={selectedItem} onClose={closeUpdate} onUpdate={submitUpdate} selectedCategory={selectedCategory} />
      )}

      {showButtonPopup && (
        <ButtonPopup onClose={toggleButtonPopup} item={selectedItem} selectedLanguage={selectLanguage} onUpdate={submitUpdate} />
      )}

      <Toaster position="top-right" />
    </>
  );
});

export default GameDataDisplay;
