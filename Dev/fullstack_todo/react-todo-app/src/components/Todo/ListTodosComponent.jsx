import { useAuth } from "../Security/AuthContext"
import { deleteTodoApi, retrieveAllTodosForUsernameApi } from "./api/TodoApiService"
import {useEffect, useState} from "react"
function ListTodosComponent() {

    const today = new Date()
    
    const targetDate = new Date(today.getFullYear()+12, today.getMonth(), today.getDay())
    
    const[todos,setTodos] = useState([])

    const[message,setMessage] = useState(null)

    const authContext= useAuth()
    
    const username =authContext.username

    useEffect(
        () => refreshTodos,[])

    function refreshTodos() {
        retrieveAllTodosForUsernameApi(username)
        .then(response => { console.log(response.data)

        setTodos(response.data)
    }
    )
    .catch(error => console.log(error))
    }

    function deleteTodo(id){
        deleteTodoApi(username,id)
        .then(
            () => {
                setMessage(`Delete of todo with id = ${id} succesful`)
                refreshTodos()
            }
        )
        .catch(error => console.log(error))

    }
    
    return (
        <div className="table">
            <h1>Things You Want To Do!</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
                <table>
                    <thead>
                            <tr>
                                <th>Description</th>
                                <th>Is Done?</th>
                                <th>Target Date</th>
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
                                    <td>{todo.targetDate.toString()}</td>
                                    <td><button className="btn btn-warning" onClick={() => deleteTodo(todo.id)}>Delete</button></td>
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


export default ListTodosComponent