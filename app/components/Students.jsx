import React from 'react';
import { connect } from "react-redux";

const Students = (props) => {
    console.log("!!!! PROPS STUDENTS", props.students);
    return (
        <table>
            <tbody>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Campus</th>
                </tr>
                {
                    props.students.map(student => {
                        return (
                            <tr key={student.id}>
                                <th>{student.id}</th>
                                <th>{student.name}</th>
                                <th>{student.campus.name}</th>
 
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>



    );
};

const mapStateToProps = (state) => {
    return {
        students: state.students
    };
};

const studentsContainer = connect(mapStateToProps)(Students);

export default studentsContainer;


// {
//     props.students.map(student => {
//         return (
//             <tr key={student.id}>
//                 {student.name}
//             </tr>

//         );
//     })
// }