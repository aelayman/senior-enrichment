import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Campuses = (props) => {
    return (
        <div>
            <h1 className="school-title">JavaShip BoatCamp</h1>
            <div id="campus-grid">
                {
                    props.campuses.map(campus => {
                        return (
                            <div key={campus.id} className="campus-profile">
                                <Link to={`/campuses/${campus.id}`} >
                                    <div className="campus-profile-link">
                                        <div className="campus-image-container">
                                            <img src={campus.imageUrl} className="campus-image" />
                                        </div>
                                        <h2 className="campus-name">{campus.name}</h2>
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
