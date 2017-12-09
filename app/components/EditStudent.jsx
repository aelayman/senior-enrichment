import React from "react";
import SharedStudentForm from "./SharedStudentForm";

const EditStudent = (props) => {
    return <SharedStudentForm newStudent={false} {...props} />;
};

export default EditStudent;
