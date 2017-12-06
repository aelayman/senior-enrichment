import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import loggingMiddleware from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import axios from "axios";

export default createStore(rootReducer, applyMiddleware(thunkMiddleware, loggingMiddleware));


// INITIAL STATE

const initialState = {
    campuses: [],
    students: []
};


// ACTION TYPES

const GET_CAMPUSES = "GET_CAMPUSES";
const GET_STUDENTS = "GET_STUDENTS";
const GET_SINGLE_CAMPUS = "GET_SINGLE_CAMPUS";



// ACTION CTREATORS 

export function getCampuses(campuses) {
    const action = {
        type: GET_CAMPUSES,
        campuses
    };
    return action;
}

export function getStudents(students) {
    const action = {
        type: GET_STUDENTS,
        students
    };
    return action;
}

// // THUNK CREATORS

export function fetchCampuses() {
    return function thunk(dispatch) {
        return axios.get('/api/campuses')
        .then(res => res.data)
        .then(campuses => {
            const action = getCampuses(campuses);
            //console.log("!!!!!CAMPUSES FROM DB", campuses); //able to get campuses from DB
            dispatch(action);
        });
    };
}

export function fetchStudents() {
    return function thunk(dispatch) {
        return axios.get('/api/students')
        .then(res => res.data)
        .then(students => {
            const action = getStudents(students);
            dispatch(action);
        });
    };
}


// REDUCER 

function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_CAMPUSES:
            const campusesState = Object.assign({}, state, { campuses: action.campuses });
            return campusesState;
            // return {
            //     ...state,
            //     campuses: action.campuses
            // }; //cannot use ... syntax without babel
        // case GET_STUDENTS:
        //     return {
        //         ...state,
        //         students: action.students
        //     };

        default:
            return state;
    }
}




// //1. set up action types:
// // GET STUDENTS, GET CAMPUSES, ====> later: CREATE NEW STUDENT CREATE NEW CAMPUS 

// // set up reducer 

// // set up thunk 

// // call thunk in user interface in componentDidMount 

// //  connect campuses component to the store so that the campuses re-renders when there is a change remember to use react-redux lib
// //this should load campuses from the server and display them. 
