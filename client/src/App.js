import React from "react";
import { Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";

import NavBar from "./components/NavBar";
import Explore from "./components/Explore";
import Home from "./components/Home";
import SearchBlogs from "./components/SearchBlogs";
import Profile from "./components/Profile";
import AddBlog from "./components/AddBlog";
import BlogForm from "./components/BlogForm";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

import "./App.css";

function App() {
  window.onload = window.localStorage.clear();

  return (
    <React.Fragment>
      <Provider store={store}>
        <div className="body-bg">
          <NavBar></NavBar>
          <main>
            <Switch>
              <Route path="/signup">
                <SignUp></SignUp>
              </Route>
              <Route path="/signin">
                <SignIn></SignIn>
              </Route>
              <Route path="/explore">
                <Explore></Explore>
              </Route>
              <Route path="/home">
                <Home></Home>
              </Route>
              <Route path="/profile/:id">
                <Profile></Profile>
              </Route>
              <Route path="/blogform/:blogId">
                <BlogForm></BlogForm>
              </Route>
              <Route path="/searchblogs">
                <SearchBlogs></SearchBlogs>
              </Route>
            </Switch>
          </main>
          <AddBlog></AddBlog>
          <Footer></Footer>
        </div>
      </Provider>
    </React.Fragment>
  );
}

export default App;
