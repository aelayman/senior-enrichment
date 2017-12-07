import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCampus } from "../store";

//when you click on a specific campus you want to see a list of the student names and a description of the campus and the campus title 



const SingleCampus = (props) => {
    // if props.campus is empty (we dont have data), therefore I want to dispatch my thunk to get the data

    // componentDidMount () {
    //     const campusThunk = fetchCampus(this.props.match.params.campusId);
    //     this.props.dispatch(campusThunk);

    // }
    console.log("YOOO", props.campusData);

    return (
        <div>
            A Single Campus
            </div>
    );
};


const mapStateToProps = (state, ownProps) => {
    const campusId = Number(ownProps.match.params.channelId);

    return {
        campusData: state.campuses.find(campus => campus.id === campusId), //|| { name: '' },
        students: state.students.filter(student => student.campusId === campusId),
        campusId
    };
};

const singleCampusContainer = connect(mapStateToProps)(SingleCampus);

export default singleCampusContainer;
