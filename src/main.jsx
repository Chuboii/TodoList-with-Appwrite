import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom"
import {UserProvider} from "/src/context/Context"
import {UserTodoProvider} from "/src/context/UserTodo"
import {AlertProvider} from "/src/context/AlertContext"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
  <AlertProvider>
  <UserProvider>
  <UserTodoProvider>
    <App />
    </UserTodoProvider>
    </UserProvider>
    </AlertProvider>
    </BrowserRouter>
  </React.StrictMode>
)
