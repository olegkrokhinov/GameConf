import React, { useEffect, useRef, useState } from 'react';

const URL = "http://localhost:4000/";

export default function UserList({currentUser, setCurrentUser},  ...props) {
   
  const [usersList, setUsersList] = useState(<div> Getting a list of users from server.Please wait ...</div>);
  const [error, setError] = useState('');

  useEffect(()=>{

    getUsers('users', (currentUser && currentUser.userAccessToken) || 'no token')
    .then (users => {
      setUsersList(renderUsersListAsArr(users));
    })
    .catch(err => {
      setError(renderErrorMessage(err));
    })     

  }, []);
  
  function getUsers(path, userAccessToken){
    return new Promise((resolve, reject)=>{
        fetch(URL + path, { 
            method: 'GET',   
            headers: { Authorization: userAccessToken }
        })
        .then(res => checkHtppError(res))
        .then(res => resolve(res.json()))
        .catch(reject);
    });
  }
  
  function checkHtppError(res){
    if (res.ok) {
      return res;
    } else {
      let message = `Error ${res.status}: ${res.statusText}`;
      throw new Error(message)
    }; 
  };
  
  function renderUsersListAsArr (users){
    let render = [];
    for (let key in users){
      render.push(<div>{users[key].login}</div>);
    };  
    return render;       
  }
  
  function renderErrorMessage (err) {
    return (
      <div> {err.message} </div>
    );
  }

  return  <div>
           <div>List of DB users:</div>    
           { !error 
               ? <div>{usersList}</div>
               : <div>{error}</div>
           }
          </div>
}

