import React from 'react';
import { connect } from "react-redux";

const Students = (props) => {
    return (
        <div>
            Ahoy Student 1 
        {
            props.students
        }
        
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
