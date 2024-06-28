const express = require("express")
const routes = express.Router()
const {
  getContetData, 
  submitContentData,
  updateContentData, 
  updateContentChild, 
  getContentChildData, 
  submitChildData 
}  =  require("../controllers/content-hub-controller.js")


routes.get('/content-data', getContetData)
routes.post('/submit', submitContentData)
routes.post('/update-content', updateContentData)
routes.post('/update-content-child', updateContentChild)
routes.get('/get-content-child-data', getContentChildData)
routes.post('/submit-child', submitChildData)


module.exports = routes