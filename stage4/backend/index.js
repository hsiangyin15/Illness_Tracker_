const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

var db = mysql.createConnection({
  host: "35.192.127.189",
  user: "root",
  password: "1234",
  database: "CS411",
});

db.connect((err) => {
  if (err) {
    console.log("Error connecting to database: ", err);
    return;
  }
  console.log("Connected to database!");
});
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/insertUser", (require, response) => {
    const UserFirstName = require.body.UserFirstName;
    const UserLastName = require.body.UserLastName;
    const UserPassword = require.body.UserPassword;
    const UserCountry = require.body.UserCountry;
    const UserGender = require.body.UserGender;
    const UserAge = require.body.UserAge;

    const sqlInsert = 
    "INSERT INTO `USER` (`sex`, `country`, `FirstName`, `LastName`, `password`, `age`) VALUES (?,?,?,?,?,?);";
    var id = UserFirstName+UserAge+UserCountry;
    db.query(
        sqlInsert,
        [UserGender, UserCountry, UserFirstName, UserLastName, UserPassword, UserAge],
        (err, result) => {
          if (err) {
            console.log(err);
            return response.status(500).send(err);
          }
          response.status(200).send(result);
        }
      );
    });

app.post("/api/searchCondition", (require, response) => {
    const searchConditionName = require.body.searchConditionName;
    const sqlSelect = "SELECT * FROM `CONDITIONS` WHERE `name`= ?";
    db.query(sqlSelect, searchConditionName, (err, result) => {
        if (err){
            console.log(err);
            response.status(500);
        }
        else{
            console.log(result);
            response.send(result);
        }

    });
});

app.listen(3002, () => {
    console.log("running on port 3002");
})

