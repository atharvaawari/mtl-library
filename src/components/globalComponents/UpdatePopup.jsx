import React, { useState } from "react";
import "../Popup.css";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-hot-toast";

const UpdatePopup = ({ item, onClose, onUpdate, colsSet }) => {


  // State to hold the updated item
  const [updatedItem, setUpdatedItem] = useState(item);

  const handleChange = (e) => {
    const { name, type, checked } = e.target;

    // Update the updatedItem state based on input type
    setUpdatedItem((prevItem) => ({
      ...prevItem,
      [name]: type === "checkbox" ? String(checked) : e.target.value,
    }));
  };

  const handleUpdate = () => {
    onUpdate(updatedItem); // Send updated item to parent component
    onClose(); // Close the popup
    setUpdatedItem((prevItem) => [...prevItem, updatedItem]);

    toast.success('Data inserted successfully!', {
      position: 'top-right',
    });
  };

  return (
    <>
      <div style={popupStyles}>
        <div className="popup-content">
          <div>
            <IconButton type="button" onClick={onClose} style={closeBtnStyle}>
              X
            </IconButton>
          </div>
          <div style={popupContentStyles}>
            <label htmlFor="title">title</label>
            <input
              type="text"
              name="title"
              value={updatedItem.title}
              onChange={handleChange}
              placeholder="Title"
            />
            {colsSet.map((language, index) => (
              <div key={index}>
                <label htmlFor={`${language.toLowerCase()}_complete`}>{index + 1}. {language}</label>
                <br />
                <input
                  type="checkbox"
                  id={`${language.toLowerCase()}_complete`}
                  name={`${language.toLowerCase()}_complete`}
                  onChange={handleChange}
                  checked={JSON.parse(updatedItem[`${language.toLowerCase()}_complete`]) === true}
                />
                
                <label htmlFor={`${language.toLowerCase()}_complete`}>Complete</label>

                <input
                  type="checkbox"
                  id={`${language.toLowerCase()}_published`}
                  name={`${language.toLowerCase()}_published`}
                  onChange={handleChange}
                  checked={JSON.parse(updatedItem[`${language.toLowerCase()}_published`]) === true}
                />
                <label htmlFor={`${language.toLowerCase()}_published`}>Published</label>
                <br />
              </div>
            ))}
            <div>
              <label htmlFor="file_link">File Link</label>
              <input
                type="text"
                id="file_link"
                name="file_link"
                onChange={handleChange}
                value={updatedItem.file_link}
              />
            </div>
          </div>
          <div className="btn-box">
            <button onClick={handleUpdate}>Update</button>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </>
  );
};

// Styles for the popup
const popupStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "100",
};

const popupContentStyles = {
  backgroundColor: "white",
  borderRadius: "10px",
  textAlign: "left",
  width: "500px",
  height: "400px",
  overflowY: "scroll",
};

const closeBtnStyle = {
  float: "right",
  marginBottom: "1rem",
  padding: "0",
  cursor: "pointer",
  width: "fit-content",
  margin: "0 0 25px 0",
};

export default UpdatePopup;
