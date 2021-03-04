import React from "react";
import { connect } from "react-redux";
import Alert from "react-s-alert";
import { removeCourse } from "../redux/actions";
import CourseItem from "../components/CourseItem";
import { SyllabusKey } from "@bit/wasedatime.syllabus.ts.constants.syllabus-data";
import Course from "../types/course";

interface ReduxDispatchProps {
  removeCourse: (id: string) => void;
}

interface OwnProps {
  course: Course;
  removeCourseFromList: (course: Course) => void;
}

class AddedCourseItemContainer extends React.Component<
  ReduxDispatchProps & OwnProps
> {
  handleRemoveCourse = (title, lng) => {
    const { course, removeCourse, removeCourseFromList } = this.props;
    removeCourseFromList(course);
    removeCourse(course[SyllabusKey.ID]);
    Alert.success("Course removed.", {
      position: "bottom",
      effect: "jelly",
    });
  };

  render() {
    const { course } = this.props;
    return (
      <CourseItem
        handleOnClick={this.handleRemoveCourse}
        isAddable={false}
        searchTerm={""}
        searchLang={course.displayLang}
        course={course}
        expandable={false}
        openNewTabOnClick={true}
      />
    );
  }
}

const mapDispatchToProps = {
  removeCourse,
};

export default connect(null, mapDispatchToProps)(AddedCourseItemContainer);
