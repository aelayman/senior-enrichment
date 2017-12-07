import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import NavBar from './NavBar';
import Campuses from './Campuses';
import Students from './Students';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';
import NewCampusEntry from './NewCampusEntry';

import store, { fetchCampuses, fetchStudents } from '../store';
//import { connect } from "react-redux";

export default class UserInterface extends Component {

  componentDidMount () {
    //these two don't need params so they can request right away
    const campusesThunk = fetchCampuses();
    const studentsThunk = fetchStudents();

    store.dispatch(campusesThunk);
    store.dispatch(studentsThunk);
  }

  render() {

    return (
      <div>
        <NavBar />
        <main>
          <Switch>
            <Route exact path="/" component={Campuses} />
            <Route exact path="/campuses" component={Campuses} />
            <Route exact path="/students" component={Students} />
            <Route path="/campuses/:campusId" component={SingleCampus} />
            <Route path="/students/:studentId" component={SingleStudent} />
            <Route path="/new-campus" component={NewCampusEntry} />
          </Switch>
        </main>
      </div>
    );
  }
}



