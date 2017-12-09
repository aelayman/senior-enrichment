import React from "react";
import { connect } from "react-redux";
import { updateCampus } from "../store";

const EditCampus = (props) => {
    const campus = props.campusData;
    console.log("What is this?", props);

    return (
        <form onSubmit={props.handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Edit this Campus</label>
                <input
                    value={campus.name}
                    className="form-control"
                    type="text"
                    name="campusName"
                    placeholder={campus.name}
                />
                <textarea
                    className="form-control"
                    name="campusDescription"
                    placeholder="Enter campus description"
                />
                <input
                    className="form-control"
                    value="https://i.imgur.com/AxH69n9.jpg"
                    type="text"
                    name="campusImage"
                    placeholder="Enter campus photo"
                />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-default">Submit</button>
            </div>
        </form>

    );
};

const mapStateToProps = (state) => {
    return {
        campusData: state.campuses
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleSubmit(event) {
            event.preventDefault();
            const campusData = { name: event.target.campusName.value, description: event.target.campusDescription.value, imageUrl: event.target.campusImage.value };
            const history = ownProps.history;
            dispatch(updateCampus(campusData, history));
        }
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditCampus);
