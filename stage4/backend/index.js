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

    app.post("/api/addWish", (require, response) => {
        const wishFirstName = require.body.wishFirstName;
        const wishLastName = require.body.wishLastName;
        const wishRequestName = require.body.wishRequestName;
        const wishwishEmail = require.body.wishwishEmail;
      
        const sqlQuery = "SELECT user_id FROM USER WHERE FirstName = ? AND LastName = ?";
        db.query(sqlQuery, [wishFirstName, wishLastName], (err, result) => {
          if (err) {
            console.log(err);
            response.status(500).send("Error while querying USER table");
          } else {
            const userId = result[0].user_id;
            const sqlInsert = "INSERT INTO WISHLIST (conditionWish, user_id, subscription_email) VALUES (?, ?, ?)";
            db.query(sqlInsert, [wishRequestName, userId, wishwishEmail], (err, result) => {
              if (err) {
                console.log(err);
                response.status(500).send("Error while inserting into WISHLIST table");
              } else {
                console.log(result);
                response.send(result);
              }
            });
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

app.post("/api/ListAllWish", (require, response) => {
    const searchConditionName = require.body.searchConditionName;
    const sqlSelect = "SELECT * FROM `WISHLIST` ";
    db.query(sqlSelect, (err, result) => {
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

app.post("/api/findRelateCon", (require, response) => {
    const findRelateConName = require.body.findRelateConName;
    const sqlSelect = "SELECT s.name AS symptom_name, c.name AS condition_name, AVG(s.average_age) AS avg_age FROM SYMPTOMS s JOIN relate_to r1 ON s.trackable_id = r1.symptom_id JOIN CONDITIONS c ON r1.condition_id = c.trackable_id JOIN relate_to r2 ON r1.condition_id = r2.condition_id AND r1.symptom_id != r2.symptom_id WHERE s.name = ? GROUP BY s.name, c.name HAVING COUNT(DISTINCT r2.symptom_id) > 1;";
    db.query(sqlSelect, findRelateConName, (err, result) => {
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

  app.post("/api/submitReport", (require, response) => {
    const ReportFirstName = require.body.ReportFirstName;
    const ReportLastName = require.body.ReportLastName;
    const ReportPassword = require.body.ReportPassword;
    const ReportType = require.body.ReportType;
    const ReportSymConName = require.body.ReportSymConName;
    const ReportDescription = require.body.ReportDescription;

    const sqlCheckPassword = "SELECT user_id FROM USER WHERE FirstName = ? AND LastName = ? AND password = ?";
    db.query(
        sqlCheckPassword,
        [ReportFirstName, ReportLastName, ReportPassword],
        (err, result) => {
            if (err) {
                console.log(err);
                response.status(500).send({ message: "Error checking user password." });
            } else if (result.length === 0) {
                response.status(401).send({ message: "Invalid user credentials." });
            } else {
                const userId = result[0].user_id;
                const sqlInsert = "INSERT INTO `REPORTING` (`user_id`, `report_type`, `reported_name`, `reported_description`) VALUES (?,?,?,?);";
                db.query(
                    sqlInsert,
                    [userId, ReportType, ReportSymConName, ReportDescription],
                    (err, result) => {
                        if (err) {
                            console.log(err);
                            response.status(500).send({ message: "Error inserting report." });
                        } else {
                            console.log(result);
                            response.send(result);
                        }
                    }
                );
            }
        }
    );
});




app.listen(3002, () => {
    console.log("running on port 3002");
})

