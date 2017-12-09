import React from "react";
import SharedCampusForm from "./SharedCampusForm";

const EditCampus = (props) => {
    return <SharedCampusForm {...props} newCampus={false} />; //pass all the props to sharedcampusform (child)
};

export default EditCampus;
