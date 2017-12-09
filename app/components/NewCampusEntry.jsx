import React from "react";
import { connect } from "react-redux";
import { postCampus } from "../store";

//need to add onchange handler???
//warning.js:33 Warning: Failed form propType: You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`. Check the render method of `NewCampusEntry`

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
                    defaultValue="https://i.imgur.com/AxH69n9.jpg"
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


// when the campus is submitted, the event is dispatched to the thunk in order to update the database and eventually state

//use to set some to be functions specifically functions taht will dispatch an action or a thunk
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleSubmit(event) {
            event.preventDefault();
            const campusData = {
                name: event.target.campusName.value,
                description: event.target.campusDescription.value,
                imageUrl: event.target.campusImage.value
            };
            const history = ownProps.history;
            dispatch(postCampus(campusData, history));
        }
        // handleChange(event) {
        //     dispatch()
        // }
    };
};


export default connect(mapDispatchToProps)(NewCampusEntry);
