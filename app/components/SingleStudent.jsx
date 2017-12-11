import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStudent } from "../store";
import { Link } from "react-router-dom";

class SingleStudent extends Component {

    componentDidMount() {
        const studentThunk = fetchStudent(this.props.match.params.studentId);
        this.props.dispatch(studentThunk);

    }

    render() {

        const student = this.props.studentData;
        return (
            <div id="student-page">
                <h2 id="student-name">{student.name}</h2>
                <ul>
                    <li>Email: {student.email}</li>
                    <li>GPA: {student.gpaFormat}</li>
                    <li>
                        <Link to={`/campuses/${student.campus.id}`} >
                            Campus: {student.campus.name}
                        </Link>
                    </li>
                </ul>
                <button type="button"><Link to={`/students/${student.id}/edit`}>Edit</Link></button>
            </div>

        );
    }


}

const mapStateToProps = (state) => {
    return {
        studentData: state.currentStudent
    };
};

const singleStudentContainer = connect(mapStateToProps)(SingleStudent);

export default singleStudentContainer;
