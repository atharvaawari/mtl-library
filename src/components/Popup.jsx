import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import IconButton from '@mui/material/IconButton';


import './Popup.css';

const Popup = ({ onClose, addData, selectedCategory }) => {
    const [formData, setFormData] = useState({
        title: '',
        channel: '',
        hindi_complete: false,
        hindi_published: false,
        english_complete: false,
        english_published: false,
        bangla_complete: false,
        bangla_published: false,
        telugu_complete: false,
        telugu_published: false,
        tamil_complete: false,
        tamil_published: false,
        malayalam_complete: false,
        malayalam_published: false,
        portuguese_complete: false,
        portuguese_published: false,
        spanish_complete: false,
        spanish_published: false,
        kannada_complete: false,
        kannada_published: false,
        odia_complete: false,
        odia_published: false,
        insta_complete: false,
        insta_published : false,
        fb_complete: false,
        fb_published: false,
    });

    const handleChange = (e) => {
        const { name, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : e.target.value;

        setFormData({ ...formData, [name]: newValue,channel: selectedCategory  });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

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
                setFormData({
                    title: '',
                    channel: '',
                    hindi_complete: false,
                    hindi_published: false,
                    english_complete: false,
                    english_published: false,
                    bangla_complete: false,
                    bangla_published: false,
                    telugu_complete: false,
                    telugu_published: false,
                    tamil_complete: false,
                    tamil_published: false,
                    malayalam_complete: false,
                    malayalam_published: false,
                    portuguese_complete: false,
                    portuguese_published: false,
                    spanish_complete: false,
                    spanish_published: false,
                    kannada_complete: false,
                    kannada_published: false,
                    odia_complete: false,
                    odia_published: false,
                    insta_complete: false,
                    insta_published : false,
                    fb_complete: false,
                    fb_published: false,
                });

                toast.success('Data inserted successfully!', {
                    position: 'top-right',
                });
            } else {
                console.error('Failed to submit form');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }

        onClose();
    };

    return (
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

                        {['Hindi', 'English', 'Bangla', 'Telugu', 'Tamil', 'Malayalam', 'Portuguese', 'Spanish','Kannada','Odia','insta','fb'].map((language, index) => (
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

export default Popup;

