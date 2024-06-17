import React, { useState } from "react";
import "./Popup.css";
import IconButton from '@mui/material/IconButton';
import { toast } from 'react-hot-toast';


const UpdatePopup = ({ item, onClose, onUpdate }) => {
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

  // Handle update action
  const handleUpdate = () => {

    onUpdate(updatedItem); // Send updated item to parent component
    onClose(); // Close the popup
    setUpdatedItem((prevItem) => ([
      ...prevItem,
      updatedItem]));

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
            <label htmlFor="telugu">1. Hindi</label>
            <br />
            <label>
              <input
                type="checkbox"
                name="hindi_complete"
                checked={JSON.parse(updatedItem.hindi_complete) === true}
                onChange={handleChange}
              />
              Complete
            </label>
            <label>
              <input
                type="checkbox"
                name="hindi_published"
                checked={JSON.parse(updatedItem.hindi_published) === true}
                onChange={handleChange}
              />
              Published
            </label>
            <br />
            <label htmlFor="telugu">2. English</label>
            <br />
            <label>
              <input
                type="checkbox"
                name="english_complete"
                checked={JSON.parse(updatedItem.english_complete) === true}
                onChange={handleChange}
              />
              Complete
            </label>
            <label>
              <input
                type="checkbox"
                name="english_published"
                checked={JSON.parse(updatedItem.english_published) === true}
                onChange={handleChange}
              />
              Published
            </label>
            <br />
            <label htmlFor="telugu">3. Bangla</label>
            <br />
            <label>
              <input
                type="checkbox"
                name="bangla_complete"
                checked={JSON.parse(updatedItem.bangla_complete) === true}
                onChange={handleChange}
              />
              Complete
            </label>
            <label>
              <input
                type="checkbox"
                name="bangla_published"
                checked={JSON.parse(updatedItem.bangla_published) === true}
                onChange={handleChange}
              />
              Published
            </label>
            <br />
            <label htmlFor="telugu">4. Telugu</label>
            <br />
            <label>
              <input
                type="checkbox"
                name="telugu_complete"
                checked={JSON.parse(updatedItem.telugu_complete) === true}
                onChange={handleChange}
              />
              Complete
            </label>
            <label>
              <input
                type="checkbox"
                name="telugu_published"
                checked={JSON.parse(updatedItem.telugu_published) === true}
                onChange={handleChange}
              />
              Published
            </label>
            <br />

            <label htmlFor="tamil">5. Tamil</label>
            <br />
            <label>
              <input
                type="checkbox"
                name="tamil_complete"
                checked={JSON.parse(updatedItem.tamil_complete) === true}
                onChange={handleChange}
              />
              Complete
            </label>
            <label>
              <input
                type="checkbox"
                name="tamil_published"
                checked={JSON.parse(updatedItem.tamil_published) === true}
                onChange={handleChange}
              />
              Published
            </label>
            <br />

            <label htmlFor="malayalam">5. Malayalam</label>
            <br />
            <label>
              <input
                type="checkbox"
                name="malayalam_complete"
                checked={JSON.parse(updatedItem.malayalam_complete) === true}
                onChange={handleChange}
              />
              Complete
            </label>
            <label>
              <input
                type="checkbox"
                name="malayalam_published"
                checked={JSON.parse(updatedItem.malayalam_published) === true}
                onChange={handleChange}
              />
              Published
            </label>
            <br />


            <label htmlFor="spanish">7. Spanish</label>
            <br />
            <label>
              <input
                type="checkbox"
                name="spanish_complete"
                checked={JSON.parse(updatedItem.spanish_complete) === true}
                onChange={handleChange}
              />
              Complete
            </label>
            <label>
              <input
                type="checkbox"
                name="spanish_published"
                checked={JSON.parse(updatedItem.spanish_published) === true}
                onChange={handleChange}
              />
              Published
            </label>
            <br />


            <label htmlFor="portuguese">8. Portuguese</label>
            <br />
            <label>
              <input
                type="checkbox"
                name="portuguese_complete"
                checked={JSON.parse(updatedItem.portuguese_complete) === true}
                onChange={handleChange}
              />
              Complete
            </label>
            <label>
              <input
                type="checkbox"
                name="portuguese_published"
                checked={JSON.parse(updatedItem.portuguese_published) === true}
                onChange={handleChange}
              />
              Published
            </label>
            <br />


            <label htmlFor="kannada">9. Kannada</label>
            <br />
            <label>
              <input
                type="checkbox"
                name="kannada_complete"
                checked={JSON.parse(updatedItem.kannada_complete) === true}
                onChange={handleChange}
              />
              Complete
            </label>
            <label>
              <input
                type="checkbox"
                name="kannada_published"
                checked={JSON.parse(updatedItem.kannada_published) === true}
                onChange={handleChange}
              />
              Published
            </label>
            <br />


            <label htmlFor="odia">10. odia</label>
            <br />
            <label>
              <input
                type="checkbox"
                name="odia_complete"
                checked={JSON.parse(updatedItem.odia_complete) === true}
                onChange={handleChange}
              />
              Complete
            </label>
            <label>
              <input
                type="checkbox"
                name="odia_published"
                checked={JSON.parse(updatedItem.odia_published) === true}
                onChange={handleChange}
              />
              Published
            </label>
            <br />

            <label htmlFor="insta">11. insta</label>
            <br />
            <label>
              <input
                type="checkbox"
                name="insta_complete"
                checked={JSON.parse(updatedItem.insta_complete) === true}
                onChange={handleChange}
              />
              Complete
            </label>
            <label>
              <input
                type="checkbox"
                name="insta_published"
                checked={JSON.parse(updatedItem.insta_published) === true}
                onChange={handleChange}
              />
              Published
            </label>
            <br />

            <label htmlFor="fb">12. fb</label>
            <br />
            <label>
              <input
                type="checkbox"
                name="fb_complete"
                checked={JSON.parse(updatedItem.fb_complete) === true}
                onChange={handleChange}
              />
              Complete
            </label>
            <label>
              <input
                type="checkbox"
                name="fb_published"
                checked={JSON.parse(updatedItem.fb_published) === true}
                onChange={handleChange}
              />
              Published
            </label>
            <br />

            <div>
              <label htmlFor="file_link">File Link</label>
              <input
                type="text"
                id="file_link"
                name="file_link"
                onChange={handleChange}
                value={(updatedItem.file_link)}
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
  zIndex: "100"
};

const popupContentStyles = {
  backgroundColor: "white",
  borderRadius: "10px",
  textAlign: "left",
  width: "500px",
  height: "400px",
  overflowY: "scroll"
};

const closeBtnStyle = {
  float: 'right',
  marginBottom: '1rem',
  padding: '0',
  cursor: 'pointer',
  width: 'fit-content',
  margin: '0 0 25px 0'
};


export default UpdatePopup;
