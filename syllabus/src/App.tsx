import React, { useState, useEffect, lazy, Suspense } from "react";
import { Router, LocationProvider, navigate } from "@reach/router";
import { getIdToken } from "@bit/wasedatime.core.ts.utils.user";
import { getAddedCoursePrefs } from "./redux/reducers/addedCourses";
import { ReduxRootState } from "./redux/reducers";
import { fetchCourses, saveTimetable } from "./redux/actions";
import { connect } from "react-redux";
import API from "@aws-amplify/api";
const Timetable = lazy(() => import("./containers/TimetableContainer"));
const Syllabus = lazy(() => import("./containers/SyllabusContainer"));
import LoadingSpinner from "@bit/wasedatime.core.ts.ui.loading-spinner";
import "semantic-ui-css/components/dropdown.min.css";
import "semantic-ui-css/components/icon.min.css";
import "./styles/styles.scss";

interface IdAndPrefType {
  id: string;
  color: number;
  displayLang: string;
}

interface ReduxStateProps {
  addedCoursesPrefs: IdAndPrefType[];
}

interface ReduxDispatchProps {
  fetchCourses: () => void;
  saveTimetable: (idsAndPrefs: IdAndPrefType) => void;
}

const App = ({
  addedCoursesPrefs,
  fetchCourses,
  saveTimetable,
}: ReduxStateProps & ReduxDispatchProps) => {
  const postTimetable = async (idsAndPrefs) => {
    const idToken = await getIdToken();
    API.post("wasedatime-dev", "/timetable", {
      body: { data: { courses: idsAndPrefs || [] } },
      headers: {
        Authorization: idToken,
      },
    });
  };

  useEffect(() => {
    const f = async () => {
      await fetchCourses();

      const idToken = await getIdToken();
      if (idToken) {
        API.get("wasedatime-dev", "/timetable", {
          headers: {
            Authorization: idToken,
          },
          response: true,
        })
          .then((res) => {
            if (res.data.data.courses.length === 0) {
              if (addedCoursesPrefs.length > 0)
                postTimetable(addedCoursesPrefs);
            } else {
              saveTimetable(res.data.data.courses);
            }
          })
          .catch((e) => {
            if (
              e.response &&
              !e.response.data.data &&
              addedCoursesPrefs.length > 0
            )
              postTimetable(addedCoursesPrefs);
          });
      }
    };
    f();
  }, []);

  return (
    <Suspense fallback={<LoadingSpinner message="Loading..." />}>
      <LocationProvider>
        {(context) => {
          if (
            !context.location.pathname.includes("courses") &&
            window.location.pathname.includes("courses")
          ) {
            navigate(window.location.pathname);
          }
        }}
      </LocationProvider>
      <Router>
        <Syllabus path="courses/syllabus" />
        <Timetable path="courses/timetable" />
      </Router>
    </Suspense>
  );
};

const mapStateToProps = (state: ReduxRootState) => ({
  addedCoursesPrefs: getAddedCoursePrefs(state.addedCourses.byId),
});

const mapDispatchToProps = {
  fetchCourses,
  saveTimetable,
};

export default connect<ReduxStateProps, ReduxDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(App);
