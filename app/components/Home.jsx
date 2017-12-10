import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";


const Home = () => {

    return (
    <div id="homepage">
        <h1 className="school-title">JavaShip BoatCamp</h1>
        <h4>Welcome to JavaShip BoatCamp where you can study C.S. on an S.S.</h4>
        <p>This is JavaShip BoatCamp's Campus management tool. You can create new Campuses AKA ships, add students to various ships and of course edit and delete the ships and students</p>
    </div>

    );
};

export default Home;
