import React, { useState, useEffect } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button
} from "@mui/material";
import UpdateChild from "./UpdateChild";
import { toast } from "react-hot-toast";
import AddChildPopup from "./AddChildPopup";


const ContentHub = ({ nestedData, currentItemId }) => {

  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);


  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const addChildData = (newData) => {
    setTableData([...tableData, newData]);
  };

  const incChildCount = async (id) => {
    const updatedArray = tableData.map((item) =>
      item.id === id ? { ...item, child_count: item.child_count + 1 } : item

    );
    setTableData(updatedArray);
  };

  const openUpdate = (currentItemId) => {
    setSelectedItem(currentItemId);
    setShowUpdate(true);
  };

  const closeUpdate = () => {
    setSelectedItem(null);
    setShowUpdate(false);
  };

  const handleUpdate = async (updatedData) => {
    const updatedArray = tableData.map((item) =>
      item.id === updatedData.id ? updatedData : item
    );

    try {
      const response = await fetch("http://localhost:3001/update-content-child", {
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

  useEffect(() => {
    setTableData(nestedData);
  }, [nestedData]);

  return (
    <>
      {tableData && (

        <>
          <div style={ {width:"100%", display: "flex", justifyContent:"center", padding:".7rem"}}>

            <Button
              variant="contained"
              onClick={() => togglePopup()}>
              add
            </Button>
          </div>

          <Table size="small" aria-label="nested table">
            <TableHead>
              <TableRow>
                {/* Add more table headers as needed */}
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Hindi</TableCell>
                <TableCell>English</TableCell>
                <TableCell>Bangla</TableCell>
                <TableCell>Bangla</TableCell>
                <TableCell>Tamil</TableCell>
                <TableCell>Malayalam</TableCell>
                <TableCell>Portuguese</TableCell>
                <TableCell>Spanish</TableCell>
                <TableCell>Kannada</TableCell>
                <TableCell>Odia</TableCell>
                <TableCell>Insta</TableCell>
                <TableCell>FB</TableCell>
                <TableCell>Action</TableCell>


              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((nestedVideo) => (
                <TableRow key={nestedVideo.id}>
                  <TableCell>{nestedVideo.id}</TableCell>
                  <TableCell>{nestedVideo.title}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      className={
                        JSON.parse(nestedVideo.hindi_published) === true &&
                          JSON.parse(nestedVideo.hindi_complete) === true
                          ? "success"
                          : JSON.parse(nestedVideo.hindi_complete) === true
                            ? "error"
                            : "grey"
                      }>
                      {JSON.parse(nestedVideo.hindi_complete) === true &&
                        JSON.parse(nestedVideo.hindi_published) === true
                        ? "P"
                        : JSON.parse(nestedVideo.hindi_complete) === true
                          ? "C"
                          : "-"}
                    </Button>
                  </TableCell>

                  {/* Add similar cells for other languages */}
                  <TableCell>
                    <Button
                      variant="contained"
                      className={
                        JSON.parse(nestedVideo.english_published) === true &&
                          JSON.parse(nestedVideo.english_complete) === true
                          ? "success"
                          : JSON.parse(nestedVideo.english_complete) === true
                            ? "error"
                            : "grey"
                      }>
                      {JSON.parse(nestedVideo.english_complete) === true &&
                        JSON.parse(nestedVideo.english_published) === true
                        ? "P"
                        : JSON.parse(nestedVideo.english_complete) === true
                          ? "C"
                          : "-"}
                    </Button>
                  </TableCell>

                  {/* Repeat similar cells for other languages */}
                  <TableCell>
                    <Button
                      variant="contained"
                      className={
                        JSON.parse(nestedVideo.bangla_published) === true &&
                          JSON.parse(nestedVideo.bangla_complete) === true
                          ? "success"
                          : JSON.parse(nestedVideo.bangla_complete) === true
                            ? "error"
                            : "grey"
                      }>
                      {JSON.parse(nestedVideo.bangla_complete) === true &&
                        JSON.parse(nestedVideo.bangla_published) === true
                        ? "P"
                        : JSON.parse(nestedVideo.bangla_complete) === true
                          ? "C"
                          : "-"}
                    </Button>
                  </TableCell>

                  {/* Repeat similar cells for other languages */}
                  <TableCell>
                    <Button
                      variant="contained"
                      className={
                        JSON.parse(nestedVideo.telugu_complete) === true &&
                          JSON.parse(nestedVideo.telugu_published) === true
                          ? "success"
                          : JSON.parse(nestedVideo.telugu_complete) === true
                            ? "error"
                            : "grey"
                      }>
                      {JSON.parse(nestedVideo.telugu_complete) === true &&
                        JSON.parse(nestedVideo.telugu_published) === true
                        ? "P"
                        : JSON.parse(nestedVideo.telugu_complete) === true
                          ? "C"
                          : "-"}
                    </Button>
                  </TableCell>

                  {/* Repeat similar cells for other languages */}
                  <TableCell>
                    <Button
                      variant="contained"
                      className={
                        JSON.parse(nestedVideo.tamil_complete) === true &&
                          JSON.parse(nestedVideo.tamil_published) === true
                          ? "success"
                          : JSON.parse(nestedVideo.tamil_complete) === true
                            ? "error"
                            : "grey"
                      }>
                      {JSON.parse(nestedVideo.tamil_complete) === true &&
                        JSON.parse(nestedVideo.tamil_published) === true
                        ? "P"
                        : JSON.parse(nestedVideo.tamil_complete) === true
                          ? "C"
                          : "-"}
                    </Button>
                  </TableCell>

                  {/* Repeat similar cells for other languages */}
                  <TableCell>
                    <Button
                      variant="contained"
                      className={
                        JSON.parse(nestedVideo.malayalam_complete) === true &&
                          JSON.parse(nestedVideo.malayalam_published) === true
                          ? "success"
                          : JSON.parse(nestedVideo.malayalam_complete) === true
                            ? "error"
                            : "grey"
                      }>
                      {JSON.parse(nestedVideo.malayalam_complete) === true &&
                        JSON.parse(nestedVideo.malayalam_published) === true
                        ? "P"
                        : JSON.parse(nestedVideo.malayalam_complete) === true
                          ? "C"
                          : "-"}
                    </Button>
                  </TableCell>

                  {/* Repeat similar cells for other languages */}
                  <TableCell>
                    <Button
                      variant="contained"
                      className={
                        JSON.parse(nestedVideo.portuguese_complete) === true &&
                          JSON.parse(nestedVideo.portuguese_published) === true
                          ? "success"
                          : JSON.parse(nestedVideo.portuguese_complete) === true
                            ? "error"
                            : "grey"
                      }>
                      {JSON.parse(nestedVideo.portuguese_complete) === true &&
                        JSON.parse(nestedVideo.portuguese_published) === true
                        ? "P"
                        : JSON.parse(nestedVideo.portuguese_complete) === true
                          ? "C"
                          : "-"}
                    </Button>
                  </TableCell>

                  {/* Repeat similar cells for other languages */}
                  <TableCell>
                    <Button
                      variant="contained"
                      className={
                        JSON.parse(nestedVideo.spanish_complete) === true &&
                          JSON.parse(nestedVideo.spanish_published) === true
                          ? "success"
                          : JSON.parse(nestedVideo.spanish_complete) === true
                            ? "error"
                            : "grey"
                      }>
                      {JSON.parse(nestedVideo.spanish_complete) === true &&
                        JSON.parse(nestedVideo.spanish_published) === true
                        ? "P"
                        : JSON.parse(nestedVideo.spanish_complete) === true
                          ? "C"
                          : "-"}
                    </Button>
                  </TableCell>

                  {/* Repeat similar cells for other languages */}
                  <TableCell>
                    <Button
                      variant="contained"
                      className={
                        JSON.parse(nestedVideo.kannada_complete) === true &&
                          JSON.parse(nestedVideo.kannada_published) === true
                          ? "success"
                          : JSON.parse(nestedVideo.kannada_complete) === true
                            ? "error"
                            : "grey"
                      }>
                      {JSON.parse(nestedVideo.kannada_complete) === true &&
                        JSON.parse(nestedVideo.kannada_published) === true
                        ? "P"
                        : JSON.parse(nestedVideo.kannada_complete) === true
                          ? "C"
                          : "-"}
                    </Button>
                  </TableCell>

                  {/* Repeat similar cells for other languages */}
                  <TableCell>
                    <Button
                      variant="contained"
                      className={
                        JSON.parse(nestedVideo.odia_complete) === true &&
                          JSON.parse(nestedVideo.odia_published) === true
                          ? "success"
                          : JSON.parse(nestedVideo.odia_complete) === true
                            ? "error"
                            : "grey"
                      }>
                      {JSON.parse(nestedVideo.odia_complete) === true &&
                        JSON.parse(nestedVideo.odia_published) === true
                        ? "P"
                        : JSON.parse(nestedVideo.odia_complete) === true
                          ? "C"
                          : "-"}
                    </Button>
                  </TableCell>


                  {/* Repeat similar cells for other languages */}
                  <TableCell>
                    <Button
                      variant="contained"
                      className={
                        JSON.parse(nestedVideo.insta_complete) === true &&
                          JSON.parse(nestedVideo.insta_published) === true
                          ? "success"
                          : JSON.parse(nestedVideo.insta_complete) === true
                            ? "error"
                            : "grey"
                      }>
                      {JSON.parse(nestedVideo.insta_complete) === true &&
                        JSON.parse(nestedVideo.insta_published) === true
                        ? "P"
                        : JSON.parse(nestedVideo.insta_complete) === true
                          ? "C"
                          : "-"}
                    </Button>
                  </TableCell>

                  {/* Repeat similar cells for other languages */}
                  <TableCell>
                    <Button
                      variant="contained"
                      className={
                        JSON.parse(nestedVideo.fb_complete) === true &&
                          JSON.parse(nestedVideo.fb_published) === true
                          ? "success"
                          : JSON.parse(nestedVideo.fb_complete) === true
                            ? "error"
                            : "grey"
                      }>
                      {JSON.parse(nestedVideo.fb_complete) === true &&
                        JSON.parse(nestedVideo.fb_published) === true
                        ? "P"
                        : JSON.parse(nestedVideo.fb_complete) === true
                          ? "C"
                          : "-"}
                    </Button>
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="contained"
                      className="editbtn"
                      onClick={() => openUpdate(nestedVideo)}>
                      ✏️
                    </Button>
                  </TableCell>


                </TableRow>

              ))}
            </TableBody>
          </Table>
          {showUpdate && selectedItem && (
            <UpdateChild
              item={selectedItem}
              onClose={closeUpdate}
              onUpdate={handleUpdate}
            />
          )}
        </>
      )}
      {isPopupOpen && (
        <AddChildPopup
          onClose={togglePopup}
          addChildData={addChildData}
          parent_id={currentItemId}
          incChildCount={incChildCount}
        />
      )}
    </>
  );
};

export default ContentHub;
