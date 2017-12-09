import React from "react";
import { connect } from "react-redux";
import { updateCampus, postCampus } from "../store";

const SharedCampusForm = (props) => {
    const newCampus = props.newCampus;

    let campus;
    let title;
    let submitText;
    if (newCampus) {
        campus = { name: "", description: "", imageUrl: "https://i.imgur.com/AxH69n9.jpg" };
        submitText = "Create Campus";
        title = "Create a New Campus";
    } else {
        campus = props.campusData;
        submitText = "Submit";
        title = "Edit this Campus";
        if (campus === undefined) {
            return null; //this will prevent the form from rendering if the request hasn't completed yet
        }
    }


    return (
        <form onSubmit={props.handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">{title}</label>
                <input
                    defaultValue={campus.name} //dont use 'value' unless attaching onChange
                    className="form-control"
                    type="text"
                    name="campusName"
                    placeholder="Enter Campus Name"
                />
                <textarea
                    defaultValue={campus.description}
                    className="form-control"
                    name="campusDescription"
                    placeholder="Enter campus description"
                />
                <input
                    defaultValue={campus.imageUrl}
                    className="form-control"
                    type="text"
                    name="campusImage"
                    placeholder="Enter campus photo"
                />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-default">{submitText}</button>
            </div>
        </form>

    );
};

const mapStateToProps = (state, ownProps) => {
    if (ownProps.newCampus) {
        return {};
    } else {
        return {
            campusData: state.campuses.find(campus => {
                return campus.id === +ownProps.match.params.campusId; //i cannot just use currentCampus because I dont call that thunk method in here. this means I could not directly load this page without going through campus first
            })
        };
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleSubmit(event) {
            event.preventDefault();
            const campusData = {
                name: event.target.campusName.value, description: event.target.campusDescription.value, imageUrl: event.target.campusImage.value
            };
            if (!ownProps.newCampus) {
                campusData.id = ownProps.match.params.campusId; //if editing an existing campus I need to pass the id because the thunk will look for an id on that object as required by the api endpoint. in this case I am getting the id from the url
            }
            const history = ownProps.history;
            if (ownProps.newCampus) {
                dispatch(postCampus(campusData, history));
            } else {
                dispatch(updateCampus(campusData, history));
            }
        }
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SharedCampusForm);
