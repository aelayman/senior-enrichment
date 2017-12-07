import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStudent } from "../store";

class SingleStudent extends Component {



    componentDidMount() {
        const studentThunk = fetchStudent(this.props.match.params.studentId);
        this.props.dispatch(studentThunk);

    }

    render() {

        const student = this.props.studentData;
        console.log("Student Info", student);
        return (
            <div>
                <h2>{student.name}</h2>
                <ul>
                    <li>Email: {student.email}</li>
                    <li>GPA: {student.gpa}</li>
                    <li>Campus: </li>
                </ul>

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
