import React, {useState, useEffect} from 'react';
import AuthContext from "./Contexts/AuthContext";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import axios from 'axios';
import Home from "./Pages/Home";
import CreateCategory from './Pages/Catagory/CreateCategory';
import BrowseCategories from './Pages/Catagory/BrowserCategories';
import ShowCategory from './Pages/Catagory/ShowCategory';
import CreateForum from './Pages/Forum/CreateForum';
import ShowForum from './Pages/Forum/ShowForum';
import CreateThread from './Pages/Thread/CreateThread';
import ShowThread from './Pages/Thread/ShowThread';

function App() {
  const [user, setUser] = useState(null);
  const [isInitiated, setIsInitiated] = useState(false);

  useEffect(() => {
    init();
  }, [])

  const init = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get ('/api/auth/init', {params: {token}});
    const {user} = response.data;
    setUser(user);
    setIsInitiated(true);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.setItem("token", null);
  };

  return (
    <div>
      {isInitiated && (
        <AuthContext.Provider value={{user, setUser, handleLogout}}>
          <Router>
          <Navbar />  
          <Switch>
            <Route path="/" exact>
              <Home/>
            </Route>
            <Route path="/auth/login">
              {!user ? <Login/> : <Redirect to="/"></Redirect>}
            </Route>
            <Route path="/auth/register">
              {!user ? <Register/> : <Redirect to="/"></Redirect>}
            </Route>
            <Route path="/category/create">
              {user ? <CreateCategory/> : <Redirect to="/auth/login"></Redirect>}
            </Route>
            <Route path="/category/:id">
              <ShowCategory/>
            </Route>
            <Route path="/category">
              <BrowseCategories/>
            </Route>
            <Route path="/forum/create/:id">
              {user ? <CreateForum/> : <Redirect to="/auth/login"></Redirect>}
            </Route>
            <Route path="/forum/:id">
              <ShowForum/>
            </Route>
            <Route path="/thread/create/:id">
              {user ? <CreateThread/> : <Redirect to="/auth/login"></Redirect>}
            </Route>
            <Route path="/thread/:id">
              <ShowThread/>
            </Route>
          </Switch>
          </Router>
        </AuthContext.Provider>
      )}
    </div>
  );
}

export default App;
