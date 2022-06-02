import logo from './logo.svg';
import './App.css';
import Axios from 'axios';
import { useState, useEffect } from "react"

function App()
{
  const [listOfUsers, setListOfUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUserName] = useState("");

  const createUser = async () =>
  {
    Axios.post("http://localhost:3001/createUser",
      {  name, age, username }).then(response =>
    {
        alert("User created successfully");
        setListOfUsers([...listOfUsers, response.data]);
    })
  }


  useEffect(() =>
  {
    Axios.get("http://localhost:3001/getUsers").then(response =>
    {
      setListOfUsers(response.data)
    })
  }, [listOfUsers]);

  return (
    <div className="App">
      <div className="userDisplay">
        {
          listOfUsers.map(user =>
          { 
            return <div>
              <h1>Name: {user.name}</h1>
              <h1>Age: {user.age}</h1>
              <h1>Username: {user.username}</h1>
            </div>
          })
        }
      </div>
      <div>
        <input name='' type="text" placeholder="Name..." onChange={(e)=> setName(e.target.value)}/>
        <input type="number" placeholder="Age..." onChange={(e)=> setAge(e.target.value)}/>
        <input type="text" placeholder="Username..." onChange={(e)=> setUserName(e.target.value)}/>
        <button onClick={createUser}>Create User</button>
      </div>
    </div>
  );
}

export default App;
