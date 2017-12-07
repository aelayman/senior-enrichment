import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCampus } from "../store";

//when you click on a specific campus you want to see a list of the student names and a description of the campus and the campus title 



class SingleCampus extends Component {

    // if props.campus is empty (we dont have data), therefore I want to dispatch my thunk to get the data


    componentDidMount() {
        const campusThunk = fetchCampus(this.props.match.params.campusId);
        this.props.dispatch(campusThunk);

    }

    render() {

        return (
            <div>
                <h2>{this.props.campusData.name}</h2>
                <p>{this.props.campusData.description}</p>
            <ul>
            {
                this.props.campusData.students.map(student => {
                    return (
                        <li key={student.id} >
                        <span>{student.name}</span>
                        </li>
                    );
                })
            }
            </ul>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
    campusData: state.currentCampus
    //students: state.students
    
    };
};

// class StudentsListLoader extends Component {

//     componentDidMount () {
//         this.props.changeCampusView(this.props.campus.name);
//     }

//     componentWillReceiveProps (nextProps) {
//         if (nextProps.campus.name !== this.props.campus.name) {
//           this.props.changeCampusView(nextProps.campus.name);
//         }
//       }

//     render () {
//         console.log("!!!!!!");
//         return (
//             <SingleCampus {...this.props} />
//         );
//       }

// }


// const mapStateToProps = (state, ownProps) => {
//     const campusId = Number(ownProps.match.params.campusId);



//     return {
//         campus: state.campuses,
//         //state.campuses.find(campus => campus.id === campusId) || { name: '' },
//         students: state.students.filter(student => student.campusId === campusId),
//         campusId
//     };
// };

// const mapDispatchToProps = function (dispatch) {
//     return {
//         changeCampusView(campus) {
//         dispatch(changeCampusView(campus));
//       }
//     };
//   };

const singleCampusContainer = connect(mapStateToProps)(SingleCampus);



export default singleCampusContainer;
