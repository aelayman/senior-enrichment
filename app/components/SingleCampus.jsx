import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCampus } from "../store";
import { Link } from "react-router-dom";
//import { EditCampus } from "./EditCampus";


class SingleCampus extends Component {

    componentDidMount() {
        const campusThunk = fetchCampus(this.props.match.params.campusId);
        this.props.dispatch(campusThunk);

    }

    render() {


        const campus = this.props.campusData;
        return (
            <div>
                <img src={campus.imageUrl} className="campus-image" />
                <h2>{campus.name}</h2>
                <p>{campus.description}</p>
            <ul>
            {
                campus.students.map(student => {
                    return (
                        <li key={student.id} >
                        <Link to={`/students/${student.id}`} >
                        {student.name}
                        </Link>
                        </li>
                    );
                })
            }
            </ul>
                <button type="button">
                <Link to={`/campuses/${campus.id}/edit`}>Edit</Link></button>
            <button type="button">Delete Campus</button>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
    campusData: state.currentCampus
    };
};


const singleCampusContainer = connect(mapStateToProps)(SingleCampus);

export default singleCampusContainer;
