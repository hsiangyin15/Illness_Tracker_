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
  
  const [searchConditionName,setsearchConditionName] = useState('');
  const [searchConditionList,setsearchConditionList] = useState([]);

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
    }).then(() => {
    window.location.reload();
  })
  .catch(error => {
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
      
    </div>
  );
}

export default App;
