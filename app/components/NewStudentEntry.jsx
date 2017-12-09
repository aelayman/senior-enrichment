import React from "react";
import SharedStudentForm from "./SharedStudentForm";

const NewStudentEntry = (props) => {
    return <SharedStudentForm newStudent={true} {...props} />;
};

export default NewStudentEntry;