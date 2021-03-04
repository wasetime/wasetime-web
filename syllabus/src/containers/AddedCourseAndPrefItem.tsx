import React from "react";
import { connect } from "react-redux";
import Alert from "react-s-alert";
import { withTranslation } from "react-i18next";
import {
  removeCourse,
  changeCourseColor,
  toggleCourseVisibility,
} from "../redux/actions";
import CourseAndPrefItem from "../components/timetable/CourseAndPrefItem";
import { SyllabusKey } from "@bit/wasedatime.syllabus.ts.constants.syllabus-data";
import Course from "../types/course";

interface ReduxDispatchProps {
  removeCourse: (id: string) => void;
  changeCourseColor: (id: string, color: string) => void;
  toggleCourseVisibility: (id: string) => void;
}

interface OwnProps {
  addedCourseAndPref: {
    pref: {
      color: number;
      displayLang: string;
      visibility: boolean;
    };
    course: Course;
  };
}

class AddedCourseAndPrefItem extends React.Component<
  ReduxDispatchProps & OwnProps,
  {}
> {
  handleRemoveCourse = (id) => {
    this.props.removeCourse(id);
    Alert.success("Course removed.", {
      position: "bottom",
      effect: "jelly",
    });
  };

  handleChangeColor = (colorId) => {
    const { addedCourseAndPref } = this.props;
    const { course } = addedCourseAndPref;
    this.props.changeCourseColor(course[SyllabusKey.ID], colorId);
  };

  handleToggleVisibility = (id) => {
    console.log(id);
    this.props.toggleCourseVisibility(id);
  };

  render() {
    const { addedCourseAndPref } = this.props;
    const { pref, course } = addedCourseAndPref;
    const { color, visibility, displayLang } = pref;
    return (
      <CourseAndPrefItem
        color={color}
        visibility={visibility}
        displayLang={displayLang}
        course={course}
        handleRemoveCourse={this.handleRemoveCourse}
        handleChangeColor={this.handleChangeColor}
        handleToggleVisibility={this.handleToggleVisibility}
      />
    );
  }
}

const mapDispatchToProps = {
  removeCourse,
  changeCourseColor,
  toggleCourseVisibility,
};

export default withTranslation("translation")(
  connect(null, mapDispatchToProps)(AddedCourseAndPrefItem)
);
