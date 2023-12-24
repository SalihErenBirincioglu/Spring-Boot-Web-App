import { useState } from "react"

export default function TodoApp(){
    return(
        <div className="TodoApp">
            Todo Managment Application
            <LoginComponent/>
            {/*<WelcomeComponent/>*/}
        </div>
    )
}

function LoginComponent(){
    const [username, setUsername] = useState('Eren')
    const [password, setPassword] = useState('')

    function handleUserNameChange(event){
        setUsername(event.target.value);
    }

    function handlePasswordChange(event){
        setPassword(event.target.value);
    }

    return(
        <div className="Login">
          <div>
            <label>User name:</label>
            <input type="text" name="username" value={username} onChange={handleUserNameChange}></input>
          </div>
          <div>
            <label>Password</label>
            <input type="password" name="password" value={password} onChange={handlePasswordChange}></input>
          </div>
          <div>
            <button type="button" name="login" >Login</button>
          </div>

        </div>
    )
}

function WelcomeComponent(){
    return(
        <div className="Welcome">
            Welcome Component
        </div>
    )
}