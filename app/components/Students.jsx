import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
                                    <td><button>X</button></td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            <button type="button">
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

const studentsContainer = connect(mapStateToProps)(Students);

export default studentsContainer;

