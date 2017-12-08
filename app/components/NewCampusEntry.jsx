import React from "react";
import { connect } from "react-redux";
import { postCampus } from "../store";


const NewCampusEntry = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Create a Campus</label>
                <input
                    className="form-control"
                    type="text"
                    name="campusName"
                    placeholder="Enter campus name"
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
                <button type="submit" className="btn btn-default">Create Campus</button>
            </div>
        </form>

    );
};


// do i need to do regular function syntax here because of the binding? arrow functions change scope...
const mapStateToProps = (state) => {
    return {
        newCampusEntry: state.newCampus
    };
};


// when the campus is submitted, the event is dispatched to the thunk in order to update the database and eventually state

//use to set some to be functions specifically functions taht will dispatch an action or a funk
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleSubmit(event) {
            event.preventDefault();
            const campusData = { name: event.target.campusName.value, description: event.target.campusDescription.value, imageUrl: event.target.campusImage.value };
            const history = ownProps.history;
            dispatch(postCampus(campusData, history));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewCampusEntry);
