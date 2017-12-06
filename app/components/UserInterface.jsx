import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import NavBar from './NavBar';
import Campuses from './Campuses';
import Students from './Students';
import store, { fetchCampuses } from '../store';
//import { connect } from "react-redux";

export default class UserInterface extends Component {

  componentDidMount () {
    const campusesThunk = fetchCampuses();

    store.dispatch(campusesThunk);
  }

  render() {

    return (
      <div>
        <NavBar />
        <main>
          <Switch>
            <Route exact path="/" component={Campuses} />
            <Route path="/campuses" component={Campuses} />
            <Route path="/students" component={Students} />
          </Switch>
        </main>
      </div>
    );
  }
}


