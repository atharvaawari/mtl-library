const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mariadb = require("mariadb");
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require('cors');

const {
  emailinUserTable,
  addLeaves,
  getLeavsData,
  getAllLeavsData,
  updateJWTToken,
  executeDynamicSQLByTable,
  executeDynamicSQL,
  removeLeaves,
  pendingLeaves,
} = require("./models/auth");

const { groupedByEmail } = require("./controller/utils/groupedByEmail");
const { checkLeaveStatus } = require("./controller/utils/getLeaveStatus");
const { verifyAuth,verifyAuth1, isEmpEnabled } = require("./controller/utils/verify-cookies");
const { weekYearData,moveItemsToBottom,getTarfetDoneCount } = require("./controller/utils/date-time");
const {getIdeaInnovation} = require("./controller/ideas-innovation-controller");

// Use EJS as templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); 

app.use(
  session({
    secret: "mySecretKey", // Use a strong secret key in production
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set this to true if serving over HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    },
  })
);

// Serve static files from the React app
//app.use(express.static(path.join(__dirname, 'client/build')));
app.use("/data", express.static("data"));
app.use("/static", express.static("public"));
app.use("/content-hub", express.static("client/build"));
app.use(express.static("txt_file"));

// _______ Routers __________

const gameRouter = require("./routes/game-router");
const authRouter = require("./routes/auth-router");
const empRouter = require("./routes/emp-router");
const leaveRouter = require("./routes/leave-router");
const contentUploadsRouter = require("./routes/content-uploads-route");
const ideasRouter = require("./routes/ideas-innovation-router");
const testingRouter = require("./routes/testing-router");
const attendanceRouter = require("./routes/attendance-router");

app.use(authRouter);
app.use(gameRouter);
app.use(empRouter);
app.use(leaveRouter);
app.use(contentUploadsRouter);
app.use(ideasRouter);
app.use(testingRouter);
app.use(attendanceRouter);

// _______ Routers ___________

app.get("/" ,async (req, res) => {
  if (req.cookies.emp_login) {
    return res.redirect("/home-page");
  }

  return res.redirect("/login");

});


app.get("/home-page",verifyAuth1, isEmpEnabled, async (req, res) => {

  try {

    if (req.cookies.emp_login) {
      const email = verifyAuth(req.cookies.emp_login);
      const adminData = await emailinUserTable(email);
      const leaveStatuData = await checkLeaveStatus();
  
      return res.render("home-page", {
        todayLeaveData: leaveStatuData.todayLeaveData,
        tomorrowLeaveData: leaveStatuData.tomorrowLeaveData,
        adminData:adminData[0]
      });
    }
  
     return res.redirect("/login");
    
  } catch (error) {
    res.send(error)
  }

   
});

let category;
let tableName;

app.get("/content-data", async (req, res) => {
  try {
    
    category = req.query.category;
    tableName = req.query.tablename;

    let data = await executeDynamicSQLByTable(`
    SELECT * FROM ${tableName} 
    WHERE channel = '${category}'
    `);
    res.json(data);
    // console.log(data)  
  } catch (error) {
    console.error('Error sending data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post("/submit", async (req, res) => {
  
  try {
    let submitedData;

    // console.log(req.body);
    if (tableName === "content_house") {
      
      submitedData = await executeDynamicSQLByTable(
        `
      INSERT INTO content_house (
          title, 
          hindi_complete, hindi_published, hindi_link,
          english_complete, english_published, english_link,
          bangla_complete, bangla_published, bangla_link,
          telugu_complete, telugu_published, telugu_link,
          tamil_complete, tamil_published, tamil_link,
          malayalam_complete, malayalam_published, malayalam_link,
          portuguese_complete, portuguese_published, portuguese_link,
          spanish_complete, spanish_published, spanish_link,
          kannada_complete, kannada_published,kannada_link,
          odia_complete, odia_published, odia_link,
          insta_complete, insta_published, insta_link,
          fb_complete, fb_published, fb_link,
          file_link,
          channel
      ) 
      VALUES (
          '${req.body.title}',
          '${req.body.hindi_complete}', '${req.body.hindi_published}', '${req.body.hindi_link}',
          '${req.body.english_complete}', '${req.body.english_published}', '${req.body.english_link}',
          '${req.body.bangla_complete}', '${req.body.bangla_published}', '${req.body.bangla_link}',
          '${req.body.telugu_complete}', '${req.body.telugu_published}', '${req.body.telugu_link}',
          '${req.body.tamil_complete}', '${req.body.tamil_published}', '${req.body.tamil_link}',
          '${req.body.malayalam_complete}', '${req.body.malayalam_published}', '${req.body.malayalam_link}',
          '${req.body.portuguese_complete}', '${req.body.portuguese_published}', '${req.body.portuguese_link}',
          '${req.body.spanish_complete}', '${req.body.spanish_published}', '${req.body.spanish_link}',
          '${req.body.kannada_complete}', '${req.body.kannada_published}', '${req.body.kannada_link}',
          '${req.body.odia_complete}','${req.body.odia_published}', '${req.body.odia_link}',
          '${req.body.insta_complete}', '${req.body.insta_published}', '${req.body.insta_link}',
          '${req.body.fb_complete}','${req.body.fb_published}', '${req.body.fb_link}',
          '${req.body.file_link}',
          '${req.body.channel}'
      )
  `);
       
      //  console.log("submitedData", submitedData)
       
    } else if (tableName === "insta_fb_content") {
      
      submitedData =  await executeDynamicSQLByTable(
        `
        INSERT INTO insta_fb_content (
            title, 
            mehul_insta_complete, mehul_insta_published, mehul_insta_link,
            myl_insta_hindi_complete, myl_insta_hindi_published, myl_insta_hindi_link,
            myl_insta_english_complete, myl_insta_english_published, myl_insta_english_link,
            myl_fb_complete, myl_fb_published, myl_fb_link,
            file_link,
            channel
        ) 
        VALUES (
            '${req.body.title}',
            '${req.body.mehul_insta_complete}', '${req.body.mehul_insta_published}', '${req.body.mehul_insta_link}',
            '${req.body.myl_insta_hindi_complete}', '${req.body.myl_insta_hindi_published}', '${req.body.myl_insta_hindi_link}',
            '${req.body.myl_insta_english_complete}', '${req.body.myl_insta_english_published}', '${req.body.myl_insta_english_link}',
            '${req.body.myl_fb_complete}', '${req.body.myl_fb_published}', '${req.body.myl_fb_link}',
            '${req.body.file_link}',
            '${req.body.channel}'
        )
    `
      )
    } else {
      

      submitedData =  await executeDynamicSQLByTable(
        `
        INSERT INTO game_video (
            title, 
            hindi_complete, hindi_published, hindi_link,
            english_complete, english_published, english_link, 
            bangla_complete, bangla_published, bangla_link, 
            portuguese_complete, portuguese_published, portuguese_link,
            file_link, 
            channel
        ) 
        VALUES (
            '${req.body.title}',
            '${req.body.hindi_complete}', '${req.body.hindi_published}', '${req.body.hindi_link}',
            '${req.body.english_complete}', '${req.body.english_published}', '${req.body.english_link}',
            '${req.body.bangla_complete}', '${req.body.bangla_published}', '${req.body.bangla_link}',
            '${req.body.portuguese_complete}', '${req.body.portuguese_published}', '${req.body.portuguese_link}',
            '${req.body.file_link}',
            '${req.body.channel}'
        )
    `
      )
    }

    res.status(200).json({ message: 'success', submitedData:submitedData });

  } catch (error) {
    console.error('Error sending data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

});

app.post("/update-content", async (req, res) => {

  try {
    if (tableName === "content_house") {

      await executeDynamicSQLByTable(`
      UPDATE content_house 
      SET 
        title = '${req.body.title}', 
        hindi_complete = '${req.body.hindi_complete}', 
        hindi_published = '${req.body.hindi_published}', 
        hindi_link = '${req.body.hindi_link}', 
        english_complete = '${req.body.english_complete}', 
        english_published = '${req.body.english_published}', 
        english_link = '${req.body.english_link}', 
        bangla_complete = '${req.body.bangla_complete}', 
        bangla_published = '${req.body.bangla_published}', 
        bangla_link = '${req.body.bangla_link}', 
        telugu_complete = '${req.body.telugu_complete}', 
        telugu_published = '${req.body.telugu_published}', 
        telugu_link = '${req.body.telugu_link}', 
        tamil_complete = '${req.body.tamil_complete}', 
        tamil_published = '${req.body.tamil_published}',
        tamil_link = '${req.body.tamil_link}',
        malayalam_complete = '${req.body.malayalam_complete}', 
        malayalam_published = '${req.body.malayalam_published}',
        malayalam_link = '${req.body.malayalam_link}',
        portuguese_complete = '${req.body.portuguese_complete}', 
        portuguese_published = '${req.body.portuguese_published}',
        portuguese_link = '${req.body.portuguese_link}',
        spanish_complete = '${req.body.spanish_complete}', 
        spanish_published = '${req.body.spanish_published}',
        spanish_link = '${req.body.spanish_link}',
        kannada_complete = '${req.body.kannada_complete}', 
        kannada_published = '${req.body.kannada_published}',
        kannada_link = '${req.body.kannada_link}',
        odia_complete = '${req.body.odia_complete}', 
        odia_published = '${req.body.odia_published}',
        odia_link = '${req.body.odia_link}',
        insta_complete = '${req.body.insta_complete}', 
        insta_published = '${req.body.insta_published}',
        insta_link = '${req.body.insta_link}',
        fb_complete  = '${req.body.fb_complete}',
        fb_published = '${req.body.fb_published}',
        fb_link = '${req.body.fb_link}',
        file_link = '${req.body.file_link}',
        timestamp = '${req.body.timestamp}'
      WHERE id = '${req.body.id}'
    `);
    } else if (tableName === "insta_fb_content") {
      await executeDynamicSQLByTable(`
    UPDATE insta_fb_content 
    SET 
      title = '${req.body.title}', 
      mehul_insta_complete = '${req.body.mehul_insta_complete}', 
      mehul_insta_published = '${req.body.mehul_insta_published}', 
      mehul_insta_link = '${req.body.mehul_insta_link}', 
      myl_insta_hindi_complete = '${req.body.myl_insta_hindi_complete}', 
      myl_insta_hindi_published = '${req.body.myl_insta_hindi_published}', 
      myl_insta_hindi_link = '${req.body.myl_insta_hindi_link}', 
      myl_insta_english_complete = '${req.body.myl_insta_english_complete}', 
      myl_insta_english_published = '${req.body.myl_insta_english_published}', 
      myl_insta_english_link = '${req.body.myl_insta_english_link}', 
      myl_fb_complete = '${req.body.myl_fb_complete}', 
      myl_fb_published = '${req.body.myl_fb_published}',
      myl_fb_link = '${req.body.myl_fb_link}',
      file_link = '${req.body.file_link}'
      WHERE id = '${req.body.id}'
  `);
    } else {
      // console.log(req.body)
      await executeDynamicSQLByTable(`
    UPDATE game_video 
    SET 
      title = '${req.body.title}', 
      hindi_complete = '${req.body.hindi_complete}', 
      hindi_published = '${req.body.hindi_published}', 
      hindi_link = '${req.body.hindi_link}', 
      english_complete = '${req.body.english_complete}', 
      english_published = '${req.body.english_published}', 
      english_link = '${req.body.english_link}', 
      bangla_complete = '${req.body.bangla_complete}', 
      bangla_published = '${req.body.bangla_published}', 
      bangla_link = '${req.body.bangla_link}', 
      portuguese_complete = '${req.body.portuguese_complete}', 
      portuguese_published = '${req.body.portuguese_published}', 
      portuguese_link = '${req.body.portuguese_link}', 
      file_link = '${req.body.file_link}',
      timestamp = '${req.body.timestamp}'
      
    WHERE id = '${req.body.id}'
  `);
    }

    res.status(200).json({ message: 'success' });

  } catch (error) {
    console.error('Error sending data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

});

app.post("/update-content-child",async (req,res) => {

  try {

    await executeDynamicSQLByTable(`
    UPDATE child_content_hub
    SET 
      title = '${req.body.title}', 
      hindi_complete = '${req.body.hindi_complete}', 
      hindi_published = '${req.body.hindi_published}', 
      english_complete = '${req.body.english_complete}', 
      english_published = '${req.body.english_published}', 
      bangla_complete = '${req.body.bangla_complete}', 
      bangla_published = '${req.body.bangla_published}', 
      telugu_complete = '${req.body.telugu_complete}', 
      telugu_published = '${req.body.telugu_published}', 
      tamil_complete = '${req.body.tamil_complete}', 
      tamil_published = '${req.body.tamil_published}',
      malayalam_complete = '${req.body.malayalam_complete}', 
      malayalam_published = '${req.body.malayalam_published}',
      portuguese_complete = '${req.body.portuguese_complete }', 
      portuguese_published = '${req.body.portuguese_published}',
      spanish_complete = '${req.body.spanish_complete }', 
      spanish_published = '${req.body.spanish_published}',
      kannada_complete = '${req.body.kannada_complete }', 
      kannada_published = '${req.body.kannada_published}',
      odia_complete = '${req.body.odia_complete }', 
      odia_published = '${req.body.odia_published}',
      insta_complete = '${req.body.insta_complete }', 
      insta_published = '${req.body.insta_published}',
      fb_complete = '${req.body.fb_complete }', 
      fb_published = '${req.body.fb_published}'
    WHERE id = '${req.body.id}'
  `);
    res.status(200).json({ message: 'success' });
      
  } catch (error) {
      console.error('Error sending data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }

});

app.get("/get-content-child-data",async (req,res) => {

  try {
    const data = await executeDynamicSQLByTable(`SELECT * FROM child_content_hub WHERE parent_id = ${Number(req.query.id)}`);

    res.status(200).json(data);
      
  } catch (error) {
      console.error('Error sending data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }

});

app.post("/submit-child",async (req,res) => {

  try {

    let submitedData;
    submitedData = await executeDynamicSQLByTable(`
    INSERT INTO child_content_hub (
        title, 
        hindi_complete, hindi_published, 
        english_complete, english_published, 
        bangla_complete, bangla_published, 
        telugu_complete, telugu_published, 
        tamil_complete, tamil_published, 
        malayalam_complete, malayalam_published, 
        portuguese_complete, portuguese_published, 
        spanish_complete, spanish_published, 
        kannada_complete,kannada_published,
        odia_complete,odia_published,
        insta_complete,insta_published,
        fb_complete,fb_published,
        parent_id
    ) 
    VALUES (
        '${req.body.title}',
        '${req.body.hindi_complete}', '${req.body.hindi_published}',
        '${req.body.english_complete}', '${req.body.english_published}',
        '${req.body.bangla_complete}', '${req.body.bangla_published}',
        '${req.body.telugu_complete}', '${req.body.telugu_published}',
        '${req.body.tamil_complete}', '${req.body.tamil_published}',
        '${req.body.malayalam_complete}', '${req.body.malayalam_published}',
        '${req.body.portuguese_complete}', '${req.body.portuguese_published}',
        '${req.body.spanish_complete}', '${req.body.spanish_published}',
        '${req.body.kannada_complete }', '${req.body.kannada_published}',
        '${req.body.odia_complete }','${req.body.odia_published}',
        '${req.body.insta_complete}','${req.body.insta_published }',
        '${req.body.fb_complete}','${req.body.fb_published}',
        '${req.body.parent_id}'
       
    )
`);


await executeDynamicSQLByTable(`UPDATE content_house SET child_count = child_count + 1 WHERE id = ${req.body.parent_id}`);

res.status(200).json({ message: 'success', submitedData: submitedData });
      
  } catch (error) {
      console.error('Error sending data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }

});


// Serve static files from the 'client/build' directory
app.use(express.static(path.join(__dirname, 'client/build')));

// Catch-all handler to serve index.html for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});