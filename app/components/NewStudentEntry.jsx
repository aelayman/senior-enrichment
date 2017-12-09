import React from "react";
import { connect } from "react-redux";
import { postStudent } from "../store";


const NewStudentEntry = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Create a Student</label>
                <input
                    className="form-control"
                    type="text"
                    name="studentFirstName"
                    placeholder="Enter studen'ts first name"
                />
                <input
                    className="form-control"
                    type="text"
                    name="studentLastName"
                    placeholder="Enter studen'ts last name"
                />
                <input
                    className="form-control"
                    type="text"
                    name="studentEmail"
                    placeholder="Enter student's email"
                />
                <input
                    className="form-control"
                    type="text"
                    name="studentGpa"
                    placeholder="Enter student's GPA"
                />
                <select name="campus">
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
                <button type="submit" className="btn btn-default">Create Student</button>
            </div>
        </form>

    );
};

const mapStateToProps = (state) => {
    return {
        campuses: state.campuses
    };
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
            const history = ownProps.history;
            dispatch(postStudent(studentData, history));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(NewStudentEntry);

