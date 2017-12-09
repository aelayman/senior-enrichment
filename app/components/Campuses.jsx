import React from 'react';
// import store from '../store';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
//import { withRouter } from "react-router-dom";

const Campuses = (props) => {
    return (
        <div>
            <h1 id="school-title">School Title</h1>
            <div id="campus-grid">
                {
                    props.campuses.map(campus => {
                        return (
                            <div key={campus.id} className="campus-profile">
                                <Link to={`/campuses/${campus.id}`} >
                                    <div className="campus-profile-link">
                                        <img src={campus.imageUrl} className="campus-image" />
                                        <h2>{campus.name}</h2>
                                    </div>
                                </Link>

                            </div>

                        );
                    })

                }
            </div>
            <button type="button" className="btn btn-primary float-right">
                <Link to={"/campuses/new-campus"} >
                    Add a new campus
                </Link>
            </button>
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
