import localForage from "localforage";
import { SYLLABUS_KEYS } from "./js/config/syllabusKeys";
import { oldTermMap } from "./js/data/oldTermMap";

export const LNG_KEY = "wasedatime-2020-lng";
const PREV_STATE_NAME = "wasedatime-2019-state";
const STATE_NAME = "wasedatime-2020-state";
const STATE_FETCHED_COURSES_NAME = "wasedatime-2020-state-fc";
const STATE_ADDED_COURSES_NAME = "wasedatime-2020-state-ac";

export const loadState = () => {
  let prevState = null;
  try {
    const serializedPrevState = localStorage.getItem(PREV_STATE_NAME);
    if (serializedPrevState !== null) {
      prevState = JSON.parse(serializedPrevState);
    }
  } catch (error) {
    console.error(error);
  }

  return Promise.all([
    localForage.getItem(STATE_NAME),
    localForage.getItem(STATE_FETCHED_COURSES_NAME),
  ])
    .then((states) => {
      let state;
      let fetchedCourses;
      if (prevState !== null) {
        state = prevState;
        state.user.isFirstTimeAccess = true;
        fetchedCourses = {
          byId: {},
          list: {},
        };
      } else {
        state = states[0];
        fetchedCourses = states[1];

        let needsUpdate = false;
        if (fetchedCourses !== null) {
          const fetchedTime = fetchedCourses.list.fetchedTime;

          let nextUpdateTime = new Date(fetchedTime);
          // Courses are updated at 7am everyday
          // if the last fetched time is 0 - 6 o'clock, the next update time is the same day, 7am
          // if the last fetched time is 7 - 23 o'clock, the next update time is the next day, 7am
          if (nextUpdateTime.getHours() >= 7) {
            nextUpdateTime.setDate(nextUpdateTime.getDate() + 1);
          }
          nextUpdateTime.setHours(7, 0, 0, 0);

          const currentTime = new Date();
          needsUpdate = currentTime >= nextUpdateTime;
        }

        const isOldSchema =
          Array.isArray(fetchedCourses.list.ids) &&
          fetchedCourses.byId[fetchedCourses.list.ids[0]]._id;
        const newFeaturesAvailable = !("tokens" in state.user);

        if (isOldSchema || newFeaturesAvailable) {
          state.user.isFirstTimeAccess = true;
          fetchedCourses = {
            byId: {},
            list: {},
            schools: fetchedCourses.schools,
          };
        } else if (fetchedCourses === null || needsUpdate) {
          fetchedCourses = {
            byId: {},
            list: {},
            schools: fetchedCourses.schools,
          };
        }
      }

      if (prevState === null && (state === null || fetchedCourses === null)) {
        return undefined;
      }

      const fallPrefs = state.addedCourses.fall.prefs.map((pref) => {
        pref["displayLang"] = pref["displayLang"] || "en";
        return pref;
      });
      const springPrefs = state.addedCourses.spring.prefs.map((pref) => {
        pref["displayLang"] = pref["displayLang"] || "en";
        return pref;
      });

      state.addedCourses.fall.prefs = fallPrefs;
      state.addedCourses.spring.prefs = springPrefs;

      // map old schema to new one for addedCourses
      [state.addedCourses.fall.byId, state.addedCourses.spring.byId].forEach(
        (addedCoursesById) => {
          Object.keys(addedCoursesById).forEach((id) => {
            if (addedCoursesById[id]._id) {
              const course = addedCoursesById[id];
              const occ = course.os.map((o) => ({
                [SYLLABUS_KEYS.OCC_DAY]: o.d,
                [SYLLABUS_KEYS.OCC_PERIOD]: o.s === o.e ? o.s : o.s * 10 + o.e,
                [SYLLABUS_KEYS.OCC_LOCATION]:
                  o.b === "-1" || o.c === "undecided"
                    ? "undecided"
                    : o.b + "-" + o.c,
              }));

              addedCoursesById[id] = {
                [SYLLABUS_KEYS.ID]: course._id,
                [SYLLABUS_KEYS.TITLE]: course.t,
                [SYLLABUS_KEYS.TITLE_JP]: course.tj,
                [SYLLABUS_KEYS.INSTRUCTOR]: course.i,
                [SYLLABUS_KEYS.INSTRUCTOR_JP]: course.ij,
                [SYLLABUS_KEYS.LANG]:
                  course.l === "JP" ? "0" : course.l === "EN" ? "1" : "9",
                [SYLLABUS_KEYS.TERM]: oldTermMap[course.tm],
                [SYLLABUS_KEYS.OCCURRENCES]: occ,
                [SYLLABUS_KEYS.CODE]: course.c,
                [SYLLABUS_KEYS.SCHOOL]: course.ks[0].s,
              };
            }
          });
        }
      );

      return {
        ...state,
        fetchedCourses,
      };
    })
    .catch((error) => {
      console.error(error);
      // In case of any errors, play safe and let reducers initialize the state.
      return undefined;
    });
};

export const saveState = (state) => {
  const { fetchedCourses, ...rest } = state;
  localStorage.setItem(
    STATE_ADDED_COURSES_NAME,
    JSON.stringify(rest.addedCourses)
  );
  localForage
    .setItem(STATE_NAME, rest)
    .then((value) => {})
    .catch((error) => {
      console.error(error);
    });
  localForage
    .setItem(STATE_FETCHED_COURSES_NAME, fetchedCourses)
    .then((value) => {})
    .catch((error) => {
      console.error(error);
    });
};
