import React from "react";
import SharedCampusForm from "./SharedCampusForm";

const NewCampusEntry = (props) => {
    return <SharedCampusForm {...props} newCampus={true} />;
};

export default NewCampusEntry;
