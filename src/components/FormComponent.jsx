import React, { useState, useEffect } from "react";
import "../FormComponent.css";
import DataDisplay from "./DataDisplay";
import GameDataDisplay from "./gameComponents/GameDataDisplay";
import SocialDataDisplay from "./SocialMediaComponent/SocialDataDisplay";
import Loader from "./Loader/Loader";
import Navbar from "./Navbar";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

const FormComponent = () => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [colsSet, setColsSet] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    // Simulate an API call
    setTimeout(() => {
      setLoading(false);
    }, 1000); // 3 seconds delay
  }, []);

  if (loading) {
    return <Loader />;
  }


  const changePopupData = (category) => {
    fetch('http://localhost:3000/data/channel.json')
      .then((response) => response.json())
      .then((data) => {
        setColsSet(data[category][0].languages)
      });

    if (!data) {
      return <div>..Loading</div>;
    }
  }

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    if (category) {
      setSelectedCategory(category)
      changePopupData(category)
    }
  };


  return (
    <>
      <Navbar />

      <div className="form-container">
        <div className="channel-dropdown">
          <FormControl
            variant="outlined"
            style={{ minWidth: 200, margin: "1rem auto", display: "block" }}>
            <InputLabel id="category-label">Select Channel</InputLabel>
            <Select
              labelId="category-label"
              value={selectedCategory}
              onChange={handleCategoryChange}
              label="Select Channel">
              <MenuItem value="yt-mindYourLogic">YT MindYourLogic</MenuItem>
              <MenuItem value="yt-Detective-mehul">YT Detective Mehul</MenuItem>
              <MenuItem value="yt-ghost-Hunters"> YT Ghost Hunters</MenuItem>
              <MenuItem value="insta-fb-content">Insta Fb Content</MenuItem>
              <MenuItem value="game-videos">Game Videos</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      {selectedCategory !== 'insta-fb-content' && selectedCategory !== 'game-videos' && selectedCategory !== '' && (
        <DataDisplay colsSet={colsSet} selectedCategory={selectedCategory} />
      )}
      {selectedCategory === 'insta-fb-content' && (
        <SocialDataDisplay colsSet={colsSet} selectedCategory={selectedCategory} />
      )}
      {selectedCategory === 'game-videos' && (
        <GameDataDisplay colsSet={colsSet} selectedCategory={selectedCategory} />
      )}


    </>
  );
};

export default FormComponent;
