import './App.css';
import React, { useState, useEffect } from "react";
import Axios from 'axios';

function App() {
  const [UserFirstName, setUserFirstName] = useState('');
  const [UserLastName, setUserLastName] = useState('');
  const [UserPassword, setUserPassword] = useState('');
  const [UserCountry, setUserCountry] = useState('');
  const [UserGender, setUserGender] = useState('');
  const [UserAge, setUserAge] = useState('');
  const [showCreateUserList, setshowCreateUserList] = useState([]);

  const [wishFirstName, setwishFirstName] = useState('');
  const [wishLastName, setwishLastName] = useState('');
  const [wishRequestName, setwishRequestName] = useState('');
  const [wishwishEmail, setwishEmail] = useState('');
  const [showWishList, setshowWishList] = useState([]);

  const [ListAllWishList, setListAllWishList] = useState([]);

  const [searchConditionName, setsearchConditionName] = useState('');
  const [searchConditionList, setsearchConditionList] = useState([]);

  const [deleteUserFirstName, setdeleteUserFirstName] = useState('');
  const [deleteUserLastName, setdeleteUserLastName] = useState('');
  const [showDeleteUserList, setshowDeleteUserList] = useState([]);

  const [UserOldName, setUserOldName] = useState('');
  const [UserNewName, setUserNewName] = useState('');
  const [updateUserNameList, setupdateUserNameList] = useState([]);


  const [findRelateSymName, setfindRelateSymName] = useState('');
  const [findRelateSymList, setfindRelateSymList] = useState([]);

  const [symptomsTopAmount, setsymptomsTopAmount] = useState('');
  const [symptomsTopAmountList, setsymptomsTopAmountList] = useState([]);

  const [findRelateConName, setfindRelateConName] = useState('');
  const [findRelateConList, setfindRelateConList] = useState([]);

  const [password, setPassword] = useState('');
  const [isDeleteEnabled, setIsDeleteEnabled] = useState(false);

  const [FeedbackFirstName, setFeedbackFirstName] = useState('');
  const [FeedbackLastName, setFeedbackLastName] = useState('');
  const [FeedbackPassword, setFeedbackPassword] = useState('');
  const [FeedbackType, setFeedbackType] = useState('');
  const [FeedbackSymConName, setFeedbackSymConName] = useState('');
  const [FeedbackDescription, setFeedbackDescription] = useState('');
  const [showsubmitFeedback, setshowsubmitFeedback] = useState([]);

  const [ReportFirstName, setReportFirstName] = useState('');
  const [ReportLastName, setReportLastName] = useState('');
  const [ReportPassword, setReportPassword] = useState('');
  const [ReportType, setReportType] = useState('');
  const [ReportSymConName, setReportSymConName] = useState('');
  const [showsubmitReport, setshowsubmitReport] = useState([]);



  //   useEffect(() => {
  //     Axios.get('http://localhost:3002/api/get').then((response) => {
  //       setillnessWishList(response.data)
  //     })
  //   },[])

  const submitCreateUser = () => {
    Axios.post('http://localhost:3002/api/insertUser', {
      UserFirstName: UserFirstName,
      UserLastName: UserLastName,
      UserPassword: UserPassword,
      UserCountry: UserCountry,
      UserGender: UserGender,
      UserAge: UserAge
    })
      .then((response) => {
        setshowCreateUserList([
          ...showCreateUserList,
          {
            name: `${UserFirstName} ${UserLastName}`
          }
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitReport = () => {
    Axios.post('http://localhost:3002/api/submitReport', {
      ReportFirstName: ReportFirstName,
      ReportLastName: ReportLastName,
      ReportPassword: ReportPassword,
      ReportType: ReportType,
      ReportSymConName: ReportSymConName
    })
      .then((response) => {
        setshowsubmitReport([
          ...showsubmitReport,
          {
            name: `${ReportFirstName} ${ReportLastName}`,
            type: `${ReportType} `,
            item: `${ReportSymConName} `

          }
        ]);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401 || error.response.status === 500 || error.response.status === 404) {
          console.log("wtf:)))");
          return setshowsubmitReport([
            {
              error: error.response.data.message,
            },
          ]);
        }
        console.log(error);
      });
  };

  const submitFeedback = () => {
    Axios.post('http://localhost:3002/api/submitFeedback', {
      FeedbackFirstName: FeedbackFirstName,
      FeedbackLastName: FeedbackLastName,
      FeedbackPassword: FeedbackPassword,
      FeedbackType: FeedbackType,
      FeedbackSymConName: FeedbackSymConName,
      FeedbackDescription: FeedbackDescription
    })
      .then((response) => {
        setshowsubmitFeedback([
          ...showsubmitFeedback,
          {
            name: `${FeedbackFirstName} ${FeedbackFirstName}`
          }
        ]);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          return setshowsubmitFeedback([
            {
              error: error.response.data.message,
            },
          ]);
        }
        console.log(error);
      });
  };


  const submitWish = () => {
    Axios.post('http://localhost:3002/api/addWish', {

      wishFirstName: wishFirstName,
      wishLastName: wishLastName,
      wishRequestName: wishRequestName,
      wishwishEmail: wishwishEmail
    })
      .then((response) => {
        setshowWishList([
          ...showWishList,
          {
            name: `${wishFirstName} ${wishFirstName}`
          }
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const searchCondition = () => {
    Axios.post('http://localhost:3002/api/searchCondition', {
      searchConditionName: searchConditionName
    })
      .then(function (response) {
        console.log(response.data[0]);
        setsearchConditionList(response.data);

      })
      .catch(function (error) {
        console.log(error);
      });

  };

  const ListAllWish = () => {
    Axios.post('http://localhost:3002/api/ListAllWish', {
      ListAllWish: ListAllWish
    })
      .then(function (response) {
        console.log(response.data[0]);
        setListAllWishList(response.data);

      })
      .catch(function (error) {
        console.log(error);
      });

  };

  const deleteUser = () => {
    Axios.post('http://localhost:3002/api/deleteUser', {
      deleteUserFirstName: deleteUserFirstName,
      deleteUserLastName: deleteUserLastName
    })
      .then((response) => {
        setshowDeleteUserList([
          ...showDeleteUserList,
          {
            name: `${deleteUserFirstName} ${deleteUserLastName}`
          }
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateUserName = () => {
    Axios.post('http://localhost:3002/api/updateUser', {
      UserOldName: UserOldName,
      UserNewName: UserNewName
    })
      .then((response) => {
        setupdateUserNameList([
          ...updateUserNameList,
          {
            name: `${UserNewName}`
          }
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const findRelateSym = () => {
    Axios.post('http://localhost:3002/api/findRelateSym', {
      findRelateSymName: findRelateSymName
    })
      .then(function (response) {
        console.log(response.data[0]);
        setfindRelateSymList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

  };

  const findTopSym = () => {
    Axios.post('http://localhost:3002/api/findTopSym', {
      symptomsTopAmount: symptomsTopAmount
    })
      .then(function (response) {
        console.log(response.data[0]);
        setsymptomsTopAmountList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

  };

  const findRelateCon = () => {
    Axios.post('http://localhost:3002/api/findRelateCon', {
      findRelateConName: findRelateConName
    })
      .then(function (response) {
        console.log(response.data[0]);
        setfindRelateConList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

  };

  const handlePasswordChange = (e) => {
    const enteredPassword = e.target.value;
    setPassword(enteredPassword);
    setIsDeleteEnabled(enteredPassword === '0000');
  }

  return (

    <div className="App" >

      <div id="topA" style={{ height: 15 + 'em' }}>

      </div>

      <div id="homeAnchor" style={{ marginTop: 2 + 'em', height: 2 + 'em' }}>
        <h1 style={{ color: '#5e9693' }}>Welcome to Diagnosify!</h1>
        <h4 style={{ color: 'white' }}>Discover more about different conditions and their associated symptoms with us.</h4>

        <h4 style={{ color: 'white' }}>Together, healthier, happier!</h4>
      </div>

      <div className="form" style={{ marginTop: 10 + 'em' }}>
        <input type="text" placeholder="Learn a certain condition.." style={{ width: 40 + 'em' }} name="searchConditionName" onChange={(e) => {
          setsearchConditionName(e.target.value)
        }} />

        <button type="button" class="btn btn-dark" onClick={searchCondition}> Search</button>
        {searchConditionList.map((val) => {
          return (
            <div className="card" id="searchname">
              <p> Condition name: {val.name} </p>
              <p> Amount of patients of this condition: {val.amount_of_patient} </p>
              <p> Average age of this condition: {val.average_age} </p>
            </div>
          );

        })}

        <div id="SymptomCheckerAnchor" style={{ height: 2 + 'em' }}>

        </div>

        <h1 style={{ marginTop: 3 + 'em', color: 'white' }}>Symptom Checker</h1>
        <div className="form">
          <input type="text" placeholder="Enter your symptom, we'll show you the corelated conditions." style={{ width: 40 + 'em' }} name="findRelateConName" onChange={(e) => {
            setfindRelateConName(e.target.value)
          }} />
          <button type="button" className="btn btn-outline-dark" onClick={findRelateCon}>Check</button>
          {findRelateConList.length > 0 &&
            <div className="card">
              {findRelateConList.map((val) => {
                return (
                  <p> Related conditions: {val.condition_name} - At average age:: {val.avg_age}</p>
                );
              })}
            </div>
          }
        </div>
        <div id="ConditionExplorerAnchor" style={{ height: 2 + 'em' }}>

        </div>

        <h1 style={{ marginTop: 3 + 'em', color: 'white' }}> Condition Explorer </h1>
        <div className="form">
          <input type="text" placeholder="Name a symptom, we'll show you the symptoms it may cause.." style={{ width: 40 + 'em' }} name="findRelateSymName" onChange={(e) => {
            setfindRelateSymName(e.target.value)
          }} />

          <button type="button" class="btn btn-outline-dark" onClick={findRelateSym}>Explore</button>
          {findRelateSymList.length > 0 &&
            <div className="card">
              {findRelateSymList.map((val) => {
                return (
                  <p> Related symptoms: {val.symptom_name} - At average age: {val.avg_age}</p>
                );
              })}
            </div>
          }
        </div>

      </div>

      <div id="SymRank" style={{ height: 12 + 'em' }}>

      </div>

      <h1 style={{ marginTop: 2 + 'em', color: 'white' }}> Top Symptom Rank</h1>
      <div className="form" style={{ marginBottom: 8 + 'em' }}>
        <input type="number" placeholder=" Type in the top-ranked amount you would like to learn..." style={{ width: 40 + 'em' }} name="symptomsTopAmount" onChange={(e) => {
          setsymptomsTopAmount(e.target.value)
        }} />

        <button type="button" class="btn btn-outline-dark" onClick={findTopSym}>Find</button>
        {symptomsTopAmountList.length > 0 &&
          <div className="card">
            {symptomsTopAmountList.map((val) => {
              return (
                <p> Related symptoms: {val.symptom_name} - Amount: {val.cnt}</p>
              );
            })}
          </div>
        }
      </div>


      <div id="SignUpA" style={{ height: 4 + 'em' }}>

      </div>
      <hr style={{ width: 50 + 'em', borderWidth: 3 + 'px', color: 'white', borderColor: 'white' }}></hr>
      <h1 style={{ marginTop: 3 + 'em', color: 'white' }}>User Sign Up</h1>
      <div className="form">
        <input type="text" name="UserFirstName" placeholder="First Name" onChange={(e) => {
          setUserFirstName(e.target.value)
        }} />

        <input type="text" name="UserLastName" placeholder="Last Name" onChange={(e) => {
          setUserLastName(e.target.value)
        }} />



        <input type="text" name="UserCountry" placeholder="Country" onChange={(e) => {
          setUserCountry(e.target.value)
        }} />
        <input type="number" name="UserAge" placeholder="Age" onChange={(e) => {
          setUserAge(e.target.value)
        }} />
        <input type="password" name="UserPassword" placeholder="Password" onChange={(e) => {
          setUserPassword(e.target.value)
        }} />
        <select name="UserGender" onChange={(e) => {
          setUserGender(e.target.value)
        }}>
          <option value="">-- Please select --</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
        <br></br>
        <button type="button" class="btn btn-dark" onClick={submitCreateUser}> Submit</button>
        {showCreateUserList.map((val) => {
          return (
            <div className="card" id="insertuser">
              <h3>New user created! </h3>
              <p> User information for {val.name} has been successfully inserted! </p>
            </div>
          );

        })}
      </div>

      <div id="ReportingAnchor" style={{ height: 4 + 'em' }}>

      </div>
      <hr style={{ width: 50 + 'em', borderWidth: 3 + 'px', color: 'white', borderColor: 'white' }}></hr>
      <h1 style={{ marginTop: 3 + 'em', color: 'white' }}>User Report</h1>
      <div className="row_form">
        <input type="text" name="ReportFirstName" placeholder="First Name" onChange={(e) => {
          setReportFirstName(e.target.value)
        }} /> <span>  </span>

        <input type="text" name="ReportLastName" placeholder="Last Name" onChange={(e) => {
          setReportLastName(e.target.value)
        }} /><span>  </span>


        <input type="password" name="ReportPassword" placeholder="Password" onChange={(e) => {
          setReportPassword(e.target.value)
        }} /><span>  </span>

        <select name="ReportType" onChange={(e) => {
          setReportType(e.target.value)
        }}>
          <option value="">-- Please select Report Type--</option>
          <option value="Symptom">Symptom</option>
          <option value="Condition">Condition</option>
        </select><span>  </span>

        <br></br>
        <div className="form">
          <input type="text" name="ReportSymConName" placeholder="Enter the condition/symptom Name..." style={{ width: 40 + 'em' }} onChange={(e) => {
            setReportSymConName(e.target.value)
          }} />
        </div>
        <button type="button" class="btn btn-dark" onClick={submitReport}> Submit</button>
        <div className="form">
          {showsubmitReport.map((val) => {
            if (val.error) {
              return (
                <div className="card">
                  <h3>Error</h3>
                  <p>{val.error}</p>
                </div>
              );
            }
            return (
              <div className="card">
                <h3>New report added! </h3>
                <p>{val.type}: {val.item} successfully added for {val.name}!</p>
              </div>
            );
          })}
        </div>
      </div>

      <div id="WishlistAnchor" style={{ height: 4 + 'em' }}>

      </div>
      <hr style={{ width: 50 + 'em', borderWidth: 3 + 'px', color: 'white', borderColor: 'white' }}></hr>
      <h1 style={{ marginTop: 3 + 'em', color: 'white' }}>Whishlist</h1>
      <div className="row_form">
        <input type="text" name="wishRequestName" placeholder="Name the condition that you'll like to learn more.." style={{ width: 40 + 'em', height: 3 + 'em' }} onChange={(e) => {
          setwishRequestName(e.target.value)
        }} /><br></br><br></br>

        <input type="text" name="wishFirstName" placeholder="Your First Name" onChange={(e) => {
          setwishFirstName(e.target.value)
        }} /> <span>  </span>


        <input type="text" name="wishLastName" placeholder="Your Last Name" onChange={(e) => {
          setwishLastName(e.target.value)
        }} /><span>  </span>

        <input type="email" name="wishEmail" placeholder="Your email" onChange={(e) => {
          setwishEmail(e.target.value)
        }} /><span>  </span>

        <br></br><br></br>
        <button type="button" class="btn btn-dark" onClick={submitWish}> Submit</button>
        <div className="form">
          {showWishList.map((val) => {
            return (
              <div className="card" id="insertuser">
                <h3>New wish added! </h3>
                <p> Information will be emailed to you once completed! </p>
              </div>
            );

          })}
        </div>
      </div>
      <h3 style={{ marginTop: 3 + 'em', color: 'white' }}>See Current Whishes</h3>
      <button type="button" class="btn btn-dark" onClick={ListAllWish}>Search</button>
      <div className="form">
        {ListAllWishList.length > 0 &&
          <div className="card">
            {ListAllWishList.map((val) => {
              return (
                <p> Condition requested: {val.conditionWish} </p>
              );
            })}
          </div>
        }
      </div>


      <div id="FeedbackAnchor" style={{ height: 4 + 'em' }}>

      </div>
      <hr style={{ width: 50 + 'em', borderWidth: 3 + 'px', color: 'white', borderColor: 'white' }}></hr>
      <h1 style={{ marginTop: 3 + 'em', color: 'white' }}>User Feedback</h1>
      <div className="row_form">
        <input type="text" name="FeedbackFirstName" placeholder="First Name" onChange={(e) => {
          setFeedbackFirstName(e.target.value)
        }} /> <span>  </span>

        <input type="text" name="FeedbackLastName" placeholder="Last Name" onChange={(e) => {
          setFeedbackLastName(e.target.value)
        }} /><span>  </span>


        <input type="password" name="FeedbackPassword" placeholder="Password" onChange={(e) => {
          setFeedbackPassword(e.target.value)
        }} /><span>  </span>

        <select name="FeedbackType" onChange={(e) => {
          setFeedbackType(e.target.value)
        }}>
          <option value="">-- Please select Feedback Type--</option>
          <option value="Symptom">Symptom</option>
          <option value="Condition">Condition</option>
        </select><span>  </span>

        <br></br>
        <div className="form">
          <input type="text" name="FeedbackSymConName" placeholder="Enter the condition/symptom Name..." style={{ width: 40 + 'em' }} onChange={(e) => {
            setFeedbackSymConName(e.target.value)
          }} />
          <input type="text" name="FeedbackDescription" placeholder="Description.." style={{ width: 40 + 'em' }} onChange={(e) => {
            setFeedbackDescription(e.target.value)
          }} />
        </div>
        <button type="button" class="btn btn-dark" onClick={submitFeedback}> Submit</button>
        <div className="form">
          {showsubmitFeedback.map((val) => {
            if (val.error) {
              return (
                <div className="card">
                  <h3>Error</h3>
                  <p>{val.error}</p>
                </div>
              );
            }
            return (
              <div className="card">
                <h3>New Feedback added! </h3>
                <p>
                  Thank you for providing this data. It will greatly help us to
                  update our information more effectively!
                </p>
              </div>
            );
          })}
        </div>
      </div>



      <hr style={{ marginTop: 15 + 'em', width: 50 + 'em', borderWidth: 3 + 'px', color: 'white', borderColor: 'white' }}></hr>
      <div id="Authorized" style={{ height: 2 + 'em' }}>

      </div>
      <h3 style={{ marginTop: 15 + 'em', color: '#ff0066' }}>Authorized Management</h3>
      <h3 style={{ marginTop: 1 + 'em', color: 'white' }}>Delete a user</h3>
      <div className="row_form">
        <input type="text" name="deleteUserFirstName" placeholder="First Name" onChange={(e) => {
          setdeleteUserFirstName(e.target.value)
        }} />
        <span>  </span>
        <input type="text" name="deleteUserLastName" placeholder="Last Name" onChange={(e) => {
          setdeleteUserLastName(e.target.value)
        }} />
        <span>  </span>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={handlePasswordChange}
        />
        <span>  </span>
        <button type="button" class="btn btn-outline-danger" onClick={deleteUser} disabled={!isDeleteEnabled}> Delete</button>
        {showDeleteUserList.map((val) => {
          return (
            <div className="card" id="insertuser">
              <h3>User deleted! </h3>
              <p> User {val.name} is deleted! </p>
            </div>
          );

        })}


      </div>


      <h3 style={{ marginTop: 3 + 'em', color: 'white' }}>Update a user's name</h3>
      <div className="row_form">
        <input type="text" name="UserOldName" placeholder="Old Firstname" onChange={(e) => {
          setUserOldName(e.target.value)
        }} /><span>  </span>
        <input type="text" name="UserNewName" placeholder="New Firstname" onChange={(e) => {
          setUserNewName(e.target.value)
        }} /><span>  </span>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={handlePasswordChange}
        />

        <button type="button" class="btn btn-outline-warning" onClick={updateUserName} disabled={!isDeleteEnabled}>Update</button>
        {updateUserNameList.map((val) => {
          return (
            <div className="card" id="insertuser">
              <h3>Name updated! </h3>
              <p> User name changed to {val.name}! </p>
            </div>
          );

        })}


      </div>

    </div>
  );
}

export default App;