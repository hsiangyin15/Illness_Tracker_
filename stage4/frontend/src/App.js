import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';

function App() {
  const [UserFirstName,setUserFirstName] = useState('');
  const [UserLastName,setUserLastName] = useState('');
  const [UserPassword, setUserPassword]= useState(''); 
  const [UserCountry, setUserCountry] = useState('');
  const [UserGender, setUserGender] = useState('');
  const [UserAge, setUserAge] = useState('');
  const [showCreateUserList,setshowCreateUserList] = useState([]);

  const [searchConditionName,setsearchConditionName] = useState('');
  const [searchConditionList,setsearchConditionList] = useState([]);

  const [deleteUserName,setdeleteUserName] = useState('');

  const [UserOldName,setUserOldName] = useState('');
  const [UserNewName,setUserNewName] = useState('');
  const [updateUserNameList,setupdateUserNameList] = useState([]);
  
  
  const [findRelateSymName,setfindRelateSymName] = useState('');
  const [findRelateSymList,setfindRelateSymList] = useState([]);

  const [symptomsTopAmount,setsymptomsTopAmount] = useState('');
  const [symptomsTopAmountList,setsymptomsTopAmountList] = useState([]);  


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


  const deleteUser = () => { 
    Axios.post('http://localhost:3002/api/deleteUser', {
      deleteUserName: deleteUserName
    })
    .then(function (response) {
     window.location.reload();

    })
    .catch(function (error) {
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

  const findTopSym  = () => { 
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
  

  return (
    
    <div className="App">
      <h1> User Sign Up</h1>
      <div className="form">
        <label> First Name:</label>
        <input type="text" name="UserFirstName" onChange={(e) => {
          setUserFirstName(e.target.value)
        } }/>
        <label> Last Name:</label>
        <input type="text" name="UserLastName" onChange={(e) => {
          setUserLastName(e.target.value)
        }}/>
        <label> Password:</label>
        <input type="text" name="UserPassword" onChange={(e) => {
          setUserPassword(e.target.value)
        }}/>
        <label> Country:</label>
        <input type="text" name="UserCountry" onChange={(e) => {
          setUserCountry(e.target.value)
        }}/>
        <label> Gender:</label>
        <input type="text" name="UserGender" onChange={(e) => {
          setUserGender(e.target.value)
        }}/>
        <label> Age:</label>
        <input type="text" name="UserAge" onChange={(e) => {
          setUserAge(e.target.value)
        }}/>
        <button onClick={submitCreateUser}> Submit</button>
        {showCreateUserList.map((val) => {
          return (
            <div className = "card" id="insertuser">
              <h3>New user created! </h3>
              <p> User information for {val.name} has been successfully inserted! </p>
              </div>
          );

        })}
      </div>
      
      

        <h1> SEARCH</h1>

        <div className="form">
          <label> Search for a existing condition:</label>
          <input type="text" name="searchConditionName" onChange={(e) => {
            setsearchConditionName(e.target.value)
          } }/>
          
          <button onClick={searchCondition}> Search</button>
          {searchConditionList.map((val) => {
          return (
            <div className = "card" id="searchname">
              <p> Condition name: {val.name} </p>
              <p> Amount of patients of this condition: {val.amount_of_patient} </p>
              <p> Average age of this condition: {val.average_age} </p>
              </div>
          );

        })}
        
        
      </div>

      <h1>Delete</h1>
      <div className="form">
          <label> Delete an existing user with FirstName:</label>
          <input type="text" name="deleteUserName" onChange={(e) => {
            setdeleteUserName(e.target.value)
          } }/>
          
          <button onClick={deleteUser}> Delete</button>
        
        
      </div>


      <h1>Update</h1>
      <div className="form">
          <label> Old Firstname:</label>
          <input type="text" name="UserOldName" onChange={(e) => {
            setUserOldName(e.target.value)
          } }/>
          <label> New Firstname:</label>
          <input type="text" name="UserNewName" onChange={(e) => {
            setUserNewName(e.target.value)
          } }/>
          
          <button onClick={updateUserName}>Update</button>
          {updateUserNameList.map((val) => {
          return (
            <div className = "card" id="insertuser">
              <h3>Name updated! </h3>
              <p> User name changed to {val.name}! </p>
              </div>
          );

        })}
        
        
      </div>

      <h1>Find multi-related symptoms and age: </h1>
      <div className="form">
          <label> Condition name:</label>
          <input type="text" name="findRelateSymName" onChange={(e) => {
            setfindRelateSymName(e.target.value)
          } }/>
          
          <button onClick={findRelateSym}>Find</button>
          {findRelateSymList.map((val) => {
          return (
            <p> Related symptoms: {val.symptom_name} - Age: {val.avg_age}</p>
          );

        })}
      </div>

      <h1>Top symptoms that occurs in most conditions: </h1>
      <div className="form">
          <label> Type in the top-ranked amount you would like to learn:</label>
          <input type="text" name="symptomsTopAmount" onChange={(e) => {
            setsymptomsTopAmount(e.target.value)
          } }/>
          
          <button onClick={findTopSym}>Find</button>
          {symptomsTopAmountList.map((val) => {
          return (
            <p> Related symptoms: {val.symptom_name} - Amount: {val.cnt}</p>
          );

        })}
      </div>

      
    </div>
  );
}

export default App;
