import { useState } from 'react'
import { BrowserRouter,Routes,Route, useNavigate,useParams,Link} from 'react-router-dom'
import './TodoApp.css'

export default function TodoApp() {
    return (
        <div className="TodoApp">
            <HeaderComponent/>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<LoginComponent/>}></Route>
                    <Route path='/login' element={<LoginComponent/>}></Route>
                    <Route path='/welcome/:username' element={<WelcomeComponent/>}></Route>
                    <Route path='/todos' element={<ListTodosComponent/>}></Route>
                    <Route path='/logout' element={<LogoutComponent/>}></Route>
                    <Route path='/*' element={<ErrorComponent/>}></Route>
                </Routes>
            </BrowserRouter>
            <FooterComponent/>
        </div>
    )
}

function LoginComponent() {

    const [username, setUsername] = useState('SalihEren')

    const [password, setPassword] = useState('')

    const [showSuccessMessage, setShowSuccessMessage] = useState(false)

    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const navigator = useNavigate();  

    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    function handleSubmit() {
        if(username==='SalihEren' && password==='test123'){
            console.log('Success')
            setShowSuccessMessage(true)
            setShowErrorMessage(false)
            navigator(`/welcome/${username}`)
        } else {
            console.log('Failed')
            setShowSuccessMessage(false)
            setShowErrorMessage(true)
        }
    }


    return (
        <div className="Login">
            <h1>You should login first</h1>
            {showSuccessMessage && <div className="successMessage">Authenticated Successfully</div>}
            {showErrorMessage && <div className="errorMessage">Authentication Failed. Please check your credentials.</div>}
            <div className="LoginForm">
                <div>
                    <label>User Name:</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
                </div>
                <div>
                    <button type="button" name="login" onClick={handleSubmit}>login</button>
                </div>
            </div>
        </div>
    )
}

 

function WelcomeComponent() {

    const {username} = useParams();
    return (
        <div className="WelcomeComponent">
           <h1>Welcome to my website {username}</h1>
           <div>
           Manage your todos - <Link to="/todos">Go here</Link>
           </div>
        </div>
    )
}

function ErrorComponent() {
    return (
        <div className="ErrorComponent">
            <h1>We are working really hard to fix this</h1>
            <div>
                Reach me at 0539-70****
            </div>
        </div>
    )
}

function ListTodosComponent() {

    const today = new Date()
    
    const targetDate = new Date(today.getFullYear()+12, today.getMonth(), today.getDay())
    
    const todos = [
                    {id: 1, description: 'Learn AWS', done: false, targetDate:targetDate},
                    {id: 2, description: 'Learn Full Stack Dev', done: false, targetDate:targetDate},
                    {id: 3, description: 'Learn DevOps', done: false, targetDate:targetDate},
                ]


    return (
        <div className="table">
            <h1>Things You Want To Do!</h1>
            <div>
                <table>
                    <thead>
                            <tr>
                                <td>ID</td>
                                <td>Description</td>
                                <td>Is Done?</td>
                                <td>Target Date</td>
                            </tr>
                    </thead>
                    <tbody>
                    {
                        todos.map(
                            todo => (
                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate.toDateString()}</td>
                                </tr>
                            )
                        )
                    }
                    </tbody>

                </table>
            </div>
        </div>
    )
}

function HeaderComponent() {
    return (
        <div className="header">
            header <hr/>
        </div>
    )
}


function FooterComponent() {
    return (
        <div className="footer">
            footer <hr/>
        </div>
    )
}


function LogoutComponent() {
    return (
        <div className="ErrorComponent">
            <h1>You are logged out</h1>
            <div>
                Thank you for visiting my website
            </div>
        </div>
    )
}