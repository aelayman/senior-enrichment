import { createStore, applyMiddleware } from 'redux';
//import rootReducer from './reducers';
import loggingMiddleware from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import axios from "axios";
import { composeWithDevTools } from 'redux-devtools-extension';

//export default createStore(rootReducer, applyMiddleware(thunkMiddleware, loggingMiddleware));


// INITIAL STATE

const initialState = {
    campuses: [],
    students: [],
    currentCampus: { students: [] },
    currentStudent: { campus: {} },
    //error message can navigate to route who can display what error is in the store
};


// ACTION TYPES

const GET_CAMPUSES = "GET_CAMPUSES";
const GET_STUDENTS = "GET_STUDENTS";
const GET_SINGLE_CAMPUS = "GET_SINGLE_CAMPUS";
const GET_SINGLE_STUDENT = "GET_SINGLE_STUDENT";
const ADD_NEW_CAMPUS = "ADD_NEW_CAMPUS";
const ADD_NEW_STUDENT = "ADD_NEW_STUDENT";
const DELETE_STUDENT = "DELETE_STUDENT";
const DELETE_CAMPUS = "DELETE_CAMPUS";
const EDIT_CAMPUS = "EDIT_CAMPUS";
const EDIT_STUDENT = "EDIT_STUDENT";


// ACTION CREATORS

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

export function getSingleCampus(campus) {
    const action = {
        type: GET_SINGLE_CAMPUS,
        campus
    };
    return action;
}

export function getSingleStudent(student) {
    const action = {
        type: GET_SINGLE_STUDENT,
        student
    };
    return action;
}

export function addNewCampus(campusData) {
    const action = {
        type: ADD_NEW_CAMPUS,
        campusData
    };
    return action;
}

export function addNewStudent(studentData) {
    const action = {
        type: ADD_NEW_STUDENT,
        studentData
    };
    return action;
}

export function deleteStudent(studentId) {
    const action = {
        type: DELETE_STUDENT,
        studentId
    };
    return action;
}

export function deleteCampus(campusId) {
    const action = {
        type: DELETE_CAMPUS,
        campusId
    };
    return action;
}

export function editCampus(campus) {
    const action = {
        type: EDIT_CAMPUS,
        campus
    };
    return action;
}

export function editStudent(student) {
    const action = {
        type: EDIT_STUDENT,
        student
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
                dispatch(action);
            });
    };
}

//look at last part of juke for error handling
// logging the error is okay. 

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
export function fetchCampus(campusId) {
    return function thunk(dispatch) { //dispatches action in order to change the state
        return axios.get(`/api/campuses/${campusId}`)
            .then(res => res.data)
            .then(campus => {
                const action = getSingleCampus(campus); //this is the action creator function  
                dispatch(action);
            });

    };
}

export function postCampus(campus, history) {
    return function thunk(dispatch) {
        return axios.post('/api/campuses', campus)
            .then(res => res.data)
            .then(newCampus => {
                const action = addNewCampus(newCampus);
                dispatch(action);
                //once the new campus has been created, we can dynamically navigate on the frontend
                history.push(`/campuses/${newCampus.id}`);
            });
    };
}


export function fetchStudent(studentId) {
    return function thunk(dispatch) {
        return axios.get(`/api/students/${studentId}`)
            .then(res => res.data)
            .then(student => {
                const action = getSingleStudent(student);
                dispatch(action);
            });
    };
}

export function postStudent(student, history) {
    return function thunk(dispatch) {
        return axios.post('/api/students', student)
            .then(res => res.data)
            .then(newStudent => {
                const action = addNewStudent(newStudent);
                dispatch(action);
                history.push(`/students/${newStudent.id}`);
            });
    };
}

export function removeStudent(studentId) {
    return function thunk(dispatch) {
        return axios.delete(`/api/students/${studentId}`)
            .then(() => {
                const action = deleteStudent(studentId);
                dispatch(action);
            });
    };
}

export function removeCampus(campusId, history) {
    return function thunk(dispatch) {
        return axios.delete(`/api/campuses/${campusId}`)
            .then(() => {
                const action = deleteCampus(campusId);
                dispatch(action);
                history.push(`/campuses`);
            });
    };
}

export function updateCampus(campus, history) {
    return function thunk(dispatch) {
        return axios.put(`/api/campuses/${campus.id}`, campus)
            .then(res => res.data)
            .then(resCampus => {
                const action = editCampus(resCampus);
                dispatch(action);
                history.push(`/campuses/${resCampus.id}`);
            });
    };
}

export function updateStudent(student, history) {
    return function thunk(dispatch) {
        return axios.put(`/api/students/${student.id}`, student)
            .then(res => res.data)
            .then(resStudent => {
                const action = editStudent(resStudent);
                dispatch(action);
                history.push(`/students/${resStudent.id}`);
            });
    };
}

//auxiliary functions

// I need to find the object I want to edit (campus or student) in the array on state and then add all the previous campuses back to the array, the edited campus, and the following campuses 

//and then add that array back to the state object (do this in reducer)
const indexOfObject = (id, array) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i].id === id) {
            return i;
        }
    }
    return -1;
};


// REDUCER 

//save reducer example to notes

function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_CAMPUSES:
            return Object.assign({}, state, { campuses: action.campuses });

        case GET_STUDENTS:
            return Object.assign({}, state, { students: action.students });

        case GET_SINGLE_CAMPUS:
            return Object.assign({}, state, { currentCampus: action.campus });

        case GET_SINGLE_STUDENT:
            return Object.assign({}, state, { currentStudent: action.student });

        case ADD_NEW_CAMPUS: {
            const newCampus = [...state.campuses, action.campusData];
            return Object.assign({}, state, { campuses: newCampus });
        }

        case ADD_NEW_STUDENT: {
            const newStudent = [...state.students, action.studentData];
            return Object.assign({}, state, { students: newStudent });
        }

        case DELETE_STUDENT: {
            const studentId = action.studentId;
            const remainingStudentsArray = state.students.filter(student => {
                return student.id !== studentId;
            });
            return Object.assign({}, state, { students: remainingStudentsArray });
        }

        case DELETE_CAMPUS: {
            const campusId = action.campusId;
            const remainingCampusesArray = state.campuses.filter(campus => {
                return campus.id !== campusId;
            });
            const remainingStudentsArray = state.students.filter(student => {
                return student.campus.id !== campusId;
            });
            return Object.assign({}, state, { campuses: remainingCampusesArray, students: remainingStudentsArray });
        }

        case EDIT_CAMPUS: {
            const campusIndex = indexOfObject(action.campus.id, state.campuses);
            const newCampusesArray = [...state.campuses.slice(0, campusIndex), action.campus, ...state.campuses.slice(campusIndex + 1)];
            return Object.assign({}, state, {
                campuses: newCampusesArray
            });
        }

        case EDIT_STUDENT: {
            const studentIndex = indexOfObject(action.student.id, state.students);
            const newStudentsArray = [...state.students.slice(0, studentIndex), action.student, ...state.campuses.slice(studentIndex + 1)];
            return Object.assign({}, state, {
                students: newStudentsArray
            });
        }

        default:
            return state;
    }
}

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(
        thunkMiddleware,
        loggingMiddleware
    ))
);

export default store;
