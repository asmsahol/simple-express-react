/** @format */

import "./App.css";
import { useEffect, useRef, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const nameRef = useRef();
  const emailRef = useRef();
  useEffect(() => {
    fetch("http://localhost:4000/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const hundleAddUser = e => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const newUser = { name: name, email: email };

    //send to the server
    fetch("http://localhost:4000/users", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then(res => res.json())
      .then(data => {
        const addedUser = data;
        const newUser = [...users, addedUser];
        setUsers(newUser);
      });
    e.preventDefault();
  };
  nameRef.current.value = "";
  emailRef.current.value = "";

  return (
    <div className='App'>
      <h2>Total Users: {users.length}</h2>
      <form onSubmit={hundleAddUser}>
        <input type='text' ref={nameRef} placeholder='Your Name' />
        <input type='email' ref={emailRef} placeholder='Your Email' />
        <input type='submit' placeholder='submit' />
      </form>

      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
