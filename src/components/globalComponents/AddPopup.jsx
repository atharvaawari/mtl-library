import React, { useState, useEffect } from 'react';

import IconButton from '@mui/material/IconButton';
import { toast, Toaster } from "react-hot-toast";

import '../Popup.css';

const AddPopup = ({ onClose, addData, selectedCategory, colsSet }) => {
    const initialFormData = {
        title: '',
        channel: selectedCategory,
        ...colsSet.reduce((acc, language) => {
            acc[`${language.toLowerCase().replaceAll(' ','_')}_complete`] = false;
            acc[`${language.toLowerCase().replaceAll(' ','_')}_published`] = false;
            return acc;
        }, {})
    };

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        setFormData({ ...initialFormData, channel: selectedCategory });
    }, [selectedCategory, colsSet]);

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: newValue,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
            console.log("formData", formData);
        try {
            const response = await fetch('http://localhost:3001/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
    
            if (response.ok) {
                console.log('Form submitted successfully!');
                addData(formData);
                // setFormData({
                //     title: '',
                //     channel: '',
                //     hindi_complete: false,
                //     hindi_published: false,
                //     english_complete: false,
                //     english_published: false,
                //     bangla_complete: false,
                //     bangla_published: false,
                //     portuguese_complete: false,
                //     portuguese_published: false
                // });
    
                toast.success('Data inserted successfully!', {
                    position: 'top-right',
                });
    
            } else {
                console.error('Failed to submit form');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    
        // addData(formData);
        // setFormData({
        //     title: '',
        //     channel: '',
        //     hindi_complete: false,
        //     hindi_published: false,
        //     english_complete: false,
        //     english_published: false,
        //     bangla_complete: false,
        //     bangla_published: false,
        //     portuguese_complete: false,
        //     portuguese_published: false
        // });
    
        onClose();
    };
    

    return (
        <>
            <div className="popup-overlay" onClick={onClose}>
                <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                    <div>
                        <IconButton type="button" onClick={onClose} style={closeBtnStyle}>
                            X
                        </IconButton>
                    </div>
                
                    <div>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                            <br />

                            {colsSet.map((language, index) => (
                                <div key={index}>
                                    <label htmlFor={`${language.toLowerCase()}_complete`}>{index + 1}. {language}</label>
                                    <br />
                                    <input
                                        type="checkbox"
                                        id={`${language.toLowerCase()}_complete`}
                                        name={`${language.toLowerCase()}_complete`}
                                        checked={formData[`${language.toLowerCase()}_complete`]}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor={`${language.toLowerCase()}_complete`}>Complete</label>

                                    <input
                                        type="checkbox"
                                        id={`${language.toLowerCase()}_published`}
                                        name={`${language.toLowerCase()}_published`}
                                        checked={formData[`${language.toLowerCase()}_published`]}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor={`${language.toLowerCase()}_published`}>Published</label>
                                    <br />
                                </div>
                            ))}

                            <div className="btn-box">
                                <button type="submit">Submit</button>
                                <button type="button" onClick={onClose}>Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

const closeBtnStyle = {
    float: 'right',
    marginBottom: '1rem',
    padding: '0',
    cursor: 'pointer',
    width: 'fit-content',
    margin: '0 0 25px 0'
};

export default AddPopup;
