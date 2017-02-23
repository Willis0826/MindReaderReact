import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import IndexApp from './components/indexApp';
import AdminApp from './components/adminApp';
import { Router, Route, hashHistory } from 'react-router';


ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={IndexApp} />
    <Route path="/admin" component={AdminApp} />
  </Router>
),document.querySelector('.index-container')
);
