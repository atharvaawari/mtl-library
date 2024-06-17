import React, { useState } from 'react'
import "../Popup.css";
import IconButton from "@mui/material/IconButton";
import { toast, Toaster } from "react-hot-toast";


const ButtonPopup = ({ item, selectedLanguage, onClose, onUpdate }) => {

  const [updatedItem, setUpdatedItem] = useState(item);

  const handleChange = (e) => {
    const { name, type, checked } = e.target;

    setUpdatedItem((prevItem) => ({
      ...prevItem,
      [name]: type === "checkbox" ? String(checked) : e.target.value,
    }));
  };

  const handleUpdate = () => {
    onUpdate(updatedItem); 
    onClose(); 
    setUpdatedItem((prevItem) => [...prevItem, updatedItem]);

    toast.success('Data inserted successfully!', {
      position: 'top-right',
  });
  };

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
              <div>
                <label htmlFor={`${selectedLanguage.toLowerCase()}_complete`}>1.{selectedLanguage}</label>
      
                <br />  
                <input
                  type="checkbox"
                  id={`${selectedLanguage.toLowerCase()}_complete`}
                  name={`${selectedLanguage.toLowerCase()}_complete`}
                  onChange={handleChange}
                  checked={JSON.parse(updatedItem[`${selectedLanguage.toLowerCase()}_complete`]) === true}
                />
                 
                <label htmlFor={`${selectedLanguage.toLowerCase()}_complete`}>Complete</label>

                <input
                  type="checkbox"
                  id={`${selectedLanguage.toLowerCase()}_published`}
                  name={`${selectedLanguage.toLowerCase()}_published` }
                  onChange={handleChange}
                  checked={JSON.parse(updatedItem[`${selectedLanguage.toLowerCase()}_published`]) === true}
                />
                <label htmlFor={`${selectedLanguage.toLowerCase()}_published`}>Published</label>
                <br />
              </div>
              <div>
                <label htmlFor={`${selectedLanguage.toLowerCase()}_link`}>{selectedLanguage} Link </label>
                <input
                  type="text"
                  id={`${selectedLanguage.toLowerCase()}_link`}
                  name={`${selectedLanguage.toLowerCase()}_link`}
                  onChange={handleChange}
                  value={updatedItem[`${selectedLanguage.toLowerCase()}_link`]}
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
  width: "350px",
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
