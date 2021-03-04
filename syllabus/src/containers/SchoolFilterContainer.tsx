import React, { useState } from "react";
import { connect } from "react-redux";
import { getSchools } from "../redux/reducers/fetchedCourses/schools";
import {
  fetchCoursesBySchool,
  removeSchool,
} from "../redux/actions";
import SchoolFilterForm from "../components/syllabus/SchoolFilterForm";

interface ReduxStateProps {
  loadedSchools: string[];
}

interface ReduxDispatchProps {
  addSchool: (school: string) => void;
  removeSchool: (school: string) => void;
}

interface OwnProps {
  handleToggleFilter: (name: string, value: string) => void;
}

const SchoolFilterContainer = ({
  loadedSchools,
  addSchool,
  removeSchool,
  handleToggleFilter,
}: ReduxStateProps & ReduxDispatchProps & OwnProps) => {
  const [selectedSchools, setSelectedSchools] = useState([]);

  const handleToggleSchoolFilter = (school: string) => {
    let newSelectedSchools = [...selectedSchools];
    const index = selectedSchools.indexOf(school);
    if (index > -1) {
      newSelectedSchools.splice(index, 1);
    } else {
      newSelectedSchools = [...selectedSchools, school];
    }
    setSelectedSchools(newSelectedSchools);
    handleToggleFilter("school", school);
  };

  return (
    <SchoolFilterForm
      loadedSchools={loadedSchools}
      selectedSchools={selectedSchools}
      handleToggleFilter={handleToggleSchoolFilter}
      loadSyllabus={addSchool}
      removeSyllabus={removeSchool}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    loadedSchools: getSchools(state.fetchedCourses.schools) || [],
  };
};

const mapDispatchToProps = {
  addSchool: fetchCoursesBySchool,
  removeSchool: removeSchool,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SchoolFilterContainer);
