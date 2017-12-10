import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import NavBar from "./NavBar";
import Campuses from "./Campuses";
import Students from "./Students";
import SingleCampus from "./SingleCampus";
import SingleStudent from "./SingleStudent";
import NewCampusEntry from "./NewCampusEntry";
import NewStudentEntry from "./NewStudentEntry";
import EditCampus from "./EditCampus";
import EditStudent from "./EditStudent";
import Home from "./Home";

import store, { fetchCampuses, fetchStudents } from '../store';

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
            <Route exact path="/" component={Home} />
            <Route exact path="/campuses" component={Campuses} />
            <Route exact path="/students" component={Students} />
            <Route exact path="/campuses/new-campus" component={NewCampusEntry} />
            <Route exact path="/students/new-student" component={NewStudentEntry} />
            <Route exact path="/campuses/:campusId/edit" component={EditCampus} />
            <Route exact path="/students/:studentId/edit" component={EditStudent} />
            <Route path="/campuses/:campusId" component={SingleCampus} />
            <Route path="/students/:studentId" component={SingleStudent} />


          </Switch>
        </main>
      </div>
    );
  }
}

