import React from 'react';
// import store from '../store';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
//import { withRouter } from "react-router-dom";

const Campuses = (props) => {
    return (
        <div>
            <button type="button">
                <Link to={"/campuses/new-campus"} >
                    Add a new campus
            </Link>
            </button>
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
// <div className="campus-profile">
// <a href="#">
//     <img src="https://i.imgur.com/AxH69n9.jpg" className="campus-image" /> </a>

// <h2>Boaty McBoatface</h2>
// </div>