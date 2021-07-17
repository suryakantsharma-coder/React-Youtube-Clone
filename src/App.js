
import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from "./components/home";
import Player from "./components/Player";
import History from './components/history';
import Trending from './components/trending';
import LikeVideos from './components/likeVideos';
import LoginUI from './components/Login';


function App() {


  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/welcome" component={LoginUI}></Route>
        <Route exact path="/" component={Home}></Route>
        <Route path="/p/:vid" component={Player} ></Route>
        <Route exact path="/history" component={History} ></Route>
        <Route path="/trending" component={Trending}></Route>
        <Route path="/likeVideos" component={LikeVideos}></Route>
        <Route exact path="/search/:keyword" component={Home}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
