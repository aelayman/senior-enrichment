import React from "react";
import { connect } from "react-redux";
import { postStudent, updateStudent } from "../store";


const SharedStudentForm = (props) => {
    const isNewStudent = props.newStudent;
    let title;
    let buttonTitle;
    let student;

    if (isNewStudent) {
        student = {
            firstName: "",
            lastName: "",
            email: "",
            gpa: "",
            campus: {}
        };
        title = "Create A Student";
        buttonTitle = "Create Student";
    } else {
        title = "Edit this Student";
        buttonTitle = "Submit";
        student = props.studentData;
        if (student === undefined) {
            return null;
        }
    }


    return (
        <form onSubmit={props.handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">{title}</label>
                <input
                    defaultValue={student.firstName}
                    className="form-control"
                    type="text"
                    name="studentFirstName"
                    placeholder="Enter student's first name"
                />
                <input
                    defaultValue={student.lastName}
                    className="form-control"
                    type="text"
                    name="studentLastName"
                    placeholder="Enter student's last name"
                />
                <input
                    defaultValue={student.email}
                    className="form-control"
                    type="text"
                    name="studentEmail"
                    placeholder="Enter student's email"
                />
                <input
                    defaultValue={student.gpa}
                    className="form-control"
                    type="text"
                    name="studentGpa"
                    placeholder="Enter student's GPA"
                />
                <select defaultValue={student.campus.id} name="campus">
                    {
                        props.campuses.map(campus => {
                            return (
                                <option key={campus.id} value={campus.id} > {campus.name}
                                </option>
                            );
                        })
                    }

                </select>
            </div>
            <div className="form-group">
                <button type="submit">{buttonTitle}</button>
            </div>
        </form>

    );
};

const mapStateToProps = (state, ownProps) => {
    const propsToAdd = {
        campuses: state.campuses
    };
    if (!ownProps.newStudent) {
        propsToAdd.studentData = state.students.find(student => {
            return student.id === +ownProps.match.params.studentId;
        });
    }
    return propsToAdd;
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleSubmit(event) {
            event.preventDefault();
            const studentData = {
                firstName: event.target.studentFirstName.value,
                lastName: event.target.studentLastName.value,
                email: event.target.studentEmail.value,
                gpa: event.target.studentGpa.value,
                campusId: event.target.campus.value
            };
            if (!ownProps.newStudent) {
                studentData.id = ownProps.match.params.studentId;
            }
            const history = ownProps.history;
            if (ownProps.newStudent) {
                dispatch(postStudent(studentData, history));
            } else {
                dispatch(updateStudent(studentData, history));
            }
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SharedStudentForm);

