import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCampus, removeCampus } from "../store";
import { Link } from "react-router-dom";



class SingleCampus extends Component {

    componentDidMount() {
        this.props.loadCampusData();
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
            <button onClick={this.props.handleRemove} type="button">Delete Campus</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    campusData: state.currentCampus
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleRemove(event) {
            event.preventDefault();
            const campusId = +ownProps.match.params.campusId;
            dispatch(removeCampus(campusId, ownProps.history));
        },
        loadCampusData() {
            const campusThunk = fetchCampus(ownProps.match.params.campusId);
            dispatch(campusThunk);
        }
    };
};

const singleCampusContainer = connect(mapStateToProps, mapDispatchToProps)(SingleCampus);

export default singleCampusContainer;
