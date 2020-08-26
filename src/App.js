import React ,{useState}from "react";
import "./App.css";
import { Sidebar } from "./components/Sidebar";
import Chat from "./components/Chat";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import { useStateValue } from "./components/StateProvider";

export default function App() {
  const [{user},dispatch]=useStateValue()

    return (
        <div className="app">
        {
        !user?(<h1><Login/></h1>
          ):(
        <div className="app_body">
          <Router>
          <Sidebar />
            <Switch>   
              <Route path="/rooms/:roomId" component={Chat}/>  
              <Route exact path="/" component={Chat}/>
            </Switch>
          </Router>
        </div>
        )
      }
      </div>
     
   
  );
}
