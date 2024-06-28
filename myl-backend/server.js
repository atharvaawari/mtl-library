const express = require('express')
const cors = require('cors');
const connection = require('./app/config/db');
const bodyParser = require('body-parser');

require('dotenv').config()
require('./app/config/db')

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());



//____________ROUTERS________________
const contentHub = require("./app/routes/content-hub-routes")


app.use(contentHub)


// const executeDynamicSQLByTable = (SQLQUERY) => {
//   return new Promise((resolve, reject) => {
//     connection.query(SQLQUERY, response = (err, rows) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(rows);
//       }
//     });
//   });
// };

// function constructInsertQuery(tableName, data) {
//   const keys = Object.keys(data);
//   const values = Object.values(data);
//   const stringValues = values.map(value => String(value));
//   const insertingValues = stringValues.map(value => `'${value.replace(/'/g, "''")}'`).join(', ');
//   console.log(tableName)

//   const query = `
//     INSERT INTO ${tableName} (${keys.join(', ')})
//     VALUES (${insertingValues})
//   `;

//   return query;
// }

// function constructUpdateQuery(tableName, data) {
//   const keys = Object.keys(data);
//   const updates = keys.map(key => `${key} = '${data[key]}'`).join(', ');
//   // console.log("keys",keys)
//   console.log("updates", updates)
//   console.log(data.id)
//   const query = `
//     UPDATE ${tableName}
//     SET ${updates}
//     WHERE id = '${data.id}'
//   `;
//   console.log("query1", query)

//   return query;
// }

// function getTableName(data) {

//   switch (data.channel) {
//     case "yt-mindYourLogic":
//     case "yt-Detective-mehul":
//     case "yt-ghost-Hunters":
//       return tableName = "content_house";
//     case "insta-fb-content":
//       return tableName = "insta_fb_content";
//     case "game-videos":
//       return tableName = "game_video";
//     default:
//       return tableName = "child_content_hub";
//   }
// }


// app.get("/content-data", async (req, res) => {
//   try {

//     let category = req.query.category;
//     let tableName = req.query.tablename;

//     let data = await executeDynamicSQLByTable(`
//     SELECT * FROM ${tableName} 
//     WHERE channel = '${category}'
//     `);
//     res.json(data);
//     // console.log(data)  
//   } catch (error) {
//     console.error('Error sending data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.post("/submit", async (req, res) => {

//   try {
//     const data = req.body;
    
//     const tableName = getTableName(data);

//     const query = constructInsertQuery(tableName, data);
    
//     const submitedData = await executeDynamicSQLByTable(query);

//     const insertId = Number(submitedData.insertId);

//     res.status(200).json({ insertId: insertId, message: "Data submited successfully!!" });
//     console.log("Data submited successfully!!")
//   } catch (error) {
//     console.error('Error sending data:', error);
//     res.status(500).json({ error });
//   }
// });

// app.post("/update-content", async (req, res) => {

//   try {
//     const data = req.body;
    
//     const tableName = getTableName(data);
    
//     const query  = constructUpdateQuery(tableName, data);
    
//      await executeDynamicSQLByTable(query);

//     res.status(200).json({ message: "Data Update successfully!!" });
//     console.log("Data submited successfully!!")

//   } catch (error) {
//     console.error('Error updating data:', error);
//     res.status(500).json({ error });
//   }
// })

// app.post("/update-content-child", async (req, res) => {

//   try {
//     let data = req.body;

//     const tableName = getTableName(data);
    
//     const query  = constructUpdateQuery(tableName, data);
    
//      await executeDynamicSQLByTable(query);

//     res.status(200).json({ message: 'success' });
//     console.log("Data updated Successfully!!")
//   } catch (error) {
//     console.error('Error sending data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }

// });

// app.get("/get-content-child-data", async (req, res) => {

//   try {
//     const data = await executeDynamicSQLByTable(`SELECT * FROM child_content_hub WHERE parent_id = ${Number(req.query.id)}`);

//     res.status(200).json(data);

//   } catch (error) {
//     console.error('Error sending data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }

// });

// app.post("/submit-child", async (req, res) => {

//   try {

//     const data = req.body;
    
//     const tableName = getTableName(data);
    
//     const query = constructInsertQuery(tableName, data);
    
//     const submitedData = await executeDynamicSQLByTable(query);

//     await executeDynamicSQLByTable(`UPDATE content_house SET child_count = child_count + 1 WHERE id = ${data.parent_id}`);

//     const insertId = Number(submitedData.insertId)

//     res.status(200).json({ insertId: insertId });
//     console.log("data Submited Successfully!!")
//   } catch (error) {
//     console.error('Error sending data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }

// });


app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});

