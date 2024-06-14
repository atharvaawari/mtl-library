import React, { useState } from 'react'
import "../Popup.css";
import IconButton from "@mui/material/IconButton";

const ButtonPopup = ({ item, onClose }) => {


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

  //  const handleUpdate = () => {
  //    onUpdate(updatedItem); // Send updated item to parent component
  //    onClose(); // Close the popup
  //    setUpdatedItem((prevItem) => [...prevItem, updatedItem]);
  //  };



  return (
    <div>
      <>
        <div style={popupStyles}>
          <div className="popup-content">
            <div>
              <IconButton type="button" onClick={onClose} style={closeBtnStyle}>
                X
              </IconButton>
            </div>
            <div style={popupContentStyles}>
              {console.log(item)}

              {/* <input
                type="checkbox"
                id={`${language.toLowerCase()}_complete`}
                name={`${language.toLowerCase()}_complete`}
                checked={formData[`${language.toLowerCase()}_complete`]}
                onChange={handleChange}
              />
              <label htmlFor={`${language.toLowerCase()}_complete`}>Complete</label> */}

              <h3>{item.title}</h3>
              <p>Complete: {item.isComplete ? "Yes" : "No"}</p>
              <p>Published: {item.isPublished ? "Yes" : "No"}</p>
              <div>
                <label htmlFor="file_link">File Link</label>
                <input
                  type="text"
                  id="file_link"
                  name="file_link"
                  onChange={handleChange}
                />
              </div>
            </div>

          </div>
        </div>
      </>
    </div>
  )
}

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


export default ButtonPopup
