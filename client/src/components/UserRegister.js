import React, { useState } from 'react';
import {register} from '../userAuth.js'

export default function UserRegister (props) {
  
  const [login, setLogin] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [registerResultMessage, setRegisterResultMessage] = useState(''); 
  const [registered, setRegistered] = useState(false); 
    
  function handleLoginChange(event) {
    setLogin(event.target.value);    
  }
  
  function handlePasswordChange(event) {
    setPassword(event.target.value);    
  }

  function handleSubmit(event) {
      event.preventDefault();
      register(login, password)
      .then((json)=>{
        setRegisterResultMessage('User registered successfuly!'); 
        setRegistered(true);
      })
      .catch(error => {
        setRegisterResultMessage('UserRegisuserRegisterVars.ter catch error: '+ error.message); 
        setRegistered(false);
      })
  }

return (
  <div>
    <div><h3>UserRegister</h3></div>
    <form onSubmit={handleSubmit}>
      
      {!registered &&
      <div>
        <label>Login:</label>
        <input value={login} onChange={handleLoginChange} />
        <label>Password:</label>
        <input value={password} onChange={handlePasswordChange} />
        <input type="submit" value="Sign up" />
      </div>
      }

      {registerResultMessage && (
        
        ((registered) && 
          <div>
            {registerResultMessage}
          </div>)
        
        || 
        
        ((!registered) && 
          <div>
            {registerResultMessage}
          </div>)
              
      )}

    </form>
  </div>
  );
}

 