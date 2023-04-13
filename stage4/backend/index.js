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
        [UserGender, UserCountry, UserFirstName, UserLastName, UserPassword, UserAge], (err, result) => {
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


app.post("/api/deleteUser", (require, response) => {
  const deleteUserFirstName = require.body.deleteUserFirstName;
  const deleteUserLastName = require.body.deleteUserLastName;
  const sqlDelete = "DELETE FROM `USER` WHERE `FirstName`= ? and `LastName`= ?";
  db.query(sqlDelete, [deleteUserFirstName, deleteUserLastName], (err, result) => {
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

app.post("/api/updateUser", (require, response) => {
  const UserOldName = require.body.UserOldName;
  const UserNewName = require.body.UserNewName;

  const sqlUpdate = "UPDATE `USER` SET `FirstName` = ? WHERE `FirstName` = ?";
  db.query(sqlUpdate, [UserNewName, UserOldName], (err, result) => {
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

app.post("/api/findRelateSym", (require, response) => {
  const findRelateSymName = require.body.findRelateSymName;
  const sqlSelect = "SELECT c.name AS condition_name, s.name AS symptom_name, AVG(s.average_age) AS avg_age FROM CONDITIONS c JOIN relate_to r1 ON c.trackable_id = r1.condition_id JOIN SYMPTOMS s ON r1.symptom_id = s.trackable_id JOIN relate_to r2 ON r1.symptom_id = r2.symptom_id AND r1.condition_id != r2.condition_id WHERE c.name = ? GROUP BY c.name, s.name HAVING COUNT(DISTINCT r2.condition_id) > 1;";
  db.query(sqlSelect, findRelateSymName, (err, result) => {
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

app.post("/api/findTopSym", (require, response) => {
  const symptomsTopAmount = parseInt(require.body.symptomsTopAmount);
  const sqlSelect = "SELECT r.symptom_id,r.symptom_name , COUNT(r.symptom_id) AS cnt FROM relate_to r  GROUP BY r.symptom_id, r.symptom_name ORDER BY COUNT(r.symptom_id) DESC LIMIT ?;";
  db.query(sqlSelect, symptomsTopAmount, (err, result) => {
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

