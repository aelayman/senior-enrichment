import React from 'react';
// import store from '../store';
import { connect } from "react-redux";
//import { withRouter } from "react-router-dom";

const Campuses = (props) => {
    console.log("!!!!PROPS campuses", props.campuses);
    return (
        <div id="campus-grid">
            <div className="campus-profile">
                <a href="#">
                    <img src="https://i.imgur.com/AxH69n9.jpg" className="campus-image" /> </a>
                <h2>Boaty McBoatface</h2>
            </div>
        </div>

    );
};

const mapStateToProps = (state) => {
    return {
        campuses: state.campuses
    };
};

const campusesContainer = connect(mapStateToProps)(Campuses);



export default campusesContainer;
