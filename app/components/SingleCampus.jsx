import React, { Component } from "react";
import { connect } from "react-redux";
import { changeCampusView } from "../store";

//when you click on a specific campus you want to see a list of the student names and a description of the campus and the campus title 



const SingleCampus = (props) => {
    // if props.campus is empty (we dont have data), therefore I want to dispatch my thunk to get the data

    // componentDidMount () {
    //     const campusThunk = fetchCampus(this.props.match.params.campusId);
    //     this.props.dispatch(campusThunk);

    // }
    //console.log("YOOO", props.campusData);


    // props are an object with "campusData" & "students"
    return (
        <div>
        
        this is where my campus info goes
        </div>
    );
};

class StudentsListLoader extends Component {

    componentDidMount () {
        this.props.changeCampusView(this.props.campus.name);
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.campus.name !== this.props.campus.name) {
          this.props.changeCampusView(nextProps.campus.name);
        }
      }

    render () {
        console.log("!!!!!!");
        return (
            <SingleCampus {...this.props} />
        );
      }

}


const mapStateToProps = (state, ownProps) => {
    const campusId = Number(ownProps.match.params.campusId);

    console.log("are these the campuses?", state);
    
    
    return {
        campus: state.campuses,
        //state.campuses.find(campus => campus.id === campusId) || { name: '' },
        students: state.students.filter(student => student.campusId === campusId),
        campusId
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        changeCampusView(campus) {
        dispatch(changeCampusView(campus));
      }
    };
  };

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(StudentsListLoader);
