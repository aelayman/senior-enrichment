import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStudent } from "../store";

class SingleCampus extends Component {

    componentDidMount() {
        const campusThunk = fetchStudent(this.props.match.params.campusId);
        this.props.dispatch(campusThunk);

    }

    render () {
        
        return (
            <div>A Single Student</div>

        );
    }


}
