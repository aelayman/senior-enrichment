import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCampus } from "../store";
import { Link } from "react-router-dom";


class SingleCampus extends Component {

// a dumb class because it has lifecycle hooks 
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
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => { //do I need ownProps here?? 
    return {
    campusData: state.currentCampus
    //id: ownProps.match.params.id???
    
    };
};


const singleCampusContainer = connect(mapStateToProps)(SingleCampus);

export default singleCampusContainer;
