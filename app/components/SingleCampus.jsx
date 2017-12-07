import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCampus } from "../store";

class SingleCampus extends Component {


    componentDidMount() {
        const campusThunk = fetchCampus(this.props.match.params.campusId);
        this.props.dispatch(campusThunk);

    }

    render() {
        //const { id, campus } = this.props
        // const campus = campuses.find(campus => +campus.id === +campus.id)
        // if (!campus) return <div> there is no campus here</div>
        // remember to bind handlechange 

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
    //id: ownProps.match.params.id
    
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
