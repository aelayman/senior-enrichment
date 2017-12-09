import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removeStudent } from "../store";

const Students = (props) => {
    return (
        <div>
            <table id="students-table">
                <tbody>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Campus</th>
                        <th />
                    </tr>
                    {
                        props.students.map(student => {
                            return (
                                <tr key={student.id}>
                                    <td>{student.id}</td>
                                    <td>
                                        <Link to={`/students/${student.id}`}>
                                            {student.name}
                                        </Link>
                                    </td>
                                    <td>{student.campus.name}</td>
                                    <td><button onClick={props.handleRemove} type="button" data-student-id={student.id}>X</button></td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            <button type="button" className="btn btn-primary float-right">
                <Link to={"/students/new-student"} >
                    Add a new student
                </Link>
            </button>
        </div>

    );
};


const mapStateToProps = (state) => {
    return {
        students: state.students
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleRemove(event) {
            event.preventDefault();
            const studentId = +event.target.getAttribute("data-student-id");
            dispatch(removeStudent(studentId));
        }
    };
};

const studentsContainer = connect(mapStateToProps, mapDispatchToProps)(Students);

export default studentsContainer;

