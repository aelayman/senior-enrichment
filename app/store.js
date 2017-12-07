import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import loggingMiddleware from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import axios from "axios";
import { composeWithDevTools } from 'redux-devtools-extension';

//export default createStore(rootReducer, applyMiddleware(thunkMiddleware, loggingMiddleware));


// INITIAL STATE

const initialState = {
    campuses: [],
    students: [],
    //currentCampus: {}
};


// ACTION TYPES

const GET_CAMPUSES = "GET_CAMPUSES";
const GET_STUDENTS = "GET_STUDENTS";
//const GET_SINGLE_CAMPUS = "GET_SINGLE_CAMPUS"


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

// export function getSingleCampus(campus) {
//     const action = {
//         type: GET_SINGLE_CAMPUS,
//         campus
//     };
//     return action;
// }

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
            // console.log("do I have students in the array?", students);
            dispatch(action);
        });
    };
}

//save this to notes! 
// export function fetchCampus(campusId) {
//     return function thunk(dispatch) { //dispatches action in order to change the state
//         return axios.get(`/api/campuses/${campusId}`)
//         .then(res => res.data)
//         .then(campus => {
//             const action = getSingleCampus(campus); //this is the action creator function  
//             dispatch(action);
//         });

//     };
// }


// REDUCER 

//save reducer example to notes

function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_CAMPUSES:
            return Object.assign({}, state, { campuses: action.campuses });

            // return {
            //     ...state,
            //     campuses: action.campuses
            // }; //cannot use ... syntax without babel
        case GET_STUDENTS:
            return Object.assign({}, state, { students: action.students });

        // case GET_SINGLE_CAMPUS:
        //     return Object.assign({}, state, { currentCampus: action.campus } );

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

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(
      thunkMiddleware,
      loggingMiddleware
    ))
  );
  
  export default store;
