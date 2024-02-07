import axios from "axios";

const apiClient = axios.create(
    {
        baseURL:'http://localhost:8080'
    }

);

export const retrieveAllTodosForUsernameApi
    = (username) => apiClient.get(`/users/${username}/todos`)
    //http://localhost8080/users/eren/todos


    export const deleteTodoApi
    = (username,id) => apiClient.delete(`/users/${username}/todos/${id}`)