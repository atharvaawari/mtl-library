import React, { useState, useEffect } from 'react';

import IconButton from '@mui/material/IconButton';
import { toast} from "react-hot-toast";
import config from '../../config';

import '../Popup.css';

const AddPopup = ({ onClose, addData, selectedCategory, colsSet }) => {
    const initialFormData = {
        title: '',
        channel: selectedCategory,
        ...colsSet.reduce((acc, language) => {
            acc[`${language.toLowerCase().replaceAll(' ', '_')}_complete`] = false;
            acc[`${language.toLowerCase().replaceAll(' ', '_')}_published`] = false;
            acc[`${language.toLowerCase().replaceAll(' ', '_')}_link`] = '';
            return acc;
        }, {}),
        file_link: ''
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

        try {
            const response = await fetch(`${config.baseURL}/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            formData.id = data.insertId;
            addData(formData);

            toast.success('Data inserted successfully!', {
                position: 'top-right',
            });
            
        } catch (error) {
            console.error('Error submitting form:', error);
        }

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
                        <form >
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
                            <div>
                                <label htmlFor="file_link">File Link</label>
                                <input
                                    type="text"
                                    id="file_link"
                                    name="file_link"
                                    onChange={handleChange}
                                />
                            </div>
                        </form>
                        <div className="btn-box">
                            <button onClick={handleSubmit} type="submit">Submit</button>
                            <button type="button" onClick={onClose}>Close</button>
                        </div>
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
