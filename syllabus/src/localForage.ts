import localForage from "localforage";

interface oldAddedCoursesBySemType {
  prefs: {
    id: string; color: number; displayLang: string; visibility: boolean;
  }[];
  sortingOption: string;
  byId: {
    [id: string]: any;
  };
}

interface oldStateType {
  addedCourses: {
    fall: oldAddedCoursesBySemType;
    spring: oldAddedCoursesBySemType;
    ids: string[];
    idsBySchool: {
      [school: string]: {
        ids: string[];
        exp: string;
      }
    }
  },
  fetchedBuildings: any;
  stats: any;
  user: any;
}

interface oldStateFcType {
  byId: {
    [school: string]: {
      [id: string]: any;
    }
  };
  schools: string[];
  expBySchool: {
    [school: string]: string;
  };
  list: {
    ids: {
      [school: string]: string[];
    };
    error: any;
    fetchedTime: string;
    isFetching: boolean;
  }
}

const parseOldState = () => {
  console.log("old state");
  
  return Promise.all([
    localForage.getItem("wasedatime-2020-state"),
    localForage.getItem("wasedatime-2020-state-fc"),
  ])
    .then((oldStates: [oldStateType, oldStateFcType]) => {
      if (oldStates[0] && oldStates[1]) {
        const oldAddedCourseIds = oldStates[0].addedCourses.ids;
        const oldAddedCourseIdsBySchool = oldStates[0].addedCourses.idsBySchool;
        const oldFallAddedCourses = oldStates[0].addedCourses.fall;
        const oldSpringAddedCourses = oldStates[0].addedCourses.spring;
  
        let newIdsBySchool = {};
        for (const school in oldAddedCourseIdsBySchool) {
          newIdsBySchool[school] = {
            ids: []
          };
          newIdsBySchool[school].ids = oldAddedCourseIdsBySchool[school].ids
        }
  
        let byId = {};
        for (const id of oldAddedCourseIds) {
          const oldAddedCourses = oldFallAddedCourses.byId[id] ? oldFallAddedCourses : oldSpringAddedCourses
          const course = oldAddedCourses.byId[id]
          const pref = oldAddedCourses.prefs.find(p => p.id === id);
            byId[id] = {
              course: course,
              pref: {
                color: pref.color,
                displayLang: pref.displayLang === "jp" ? "ja" : pref.displayLang,
                visibility: pref.visibility
              }
            }
        }
  
        const addedCourses = {
          orderedIds: oldAddedCourseIds,
          sortingOption: "ADDED_ORDER",
          idsBySchool: newIdsBySchool,
          byId: byId
        }
  
        let parsedSchools = {}
        oldStates[1].schools.map(school => {
          parsedSchools[school] = {
            name: school,
            active: true,
            exp: undefined,
            timestamp: 0
          }
        })
        const fetchedCourses = {
          coursesBySchool: {},
          isFetching: false,
          schools: parsedSchools
        }
  
        localForage.removeItem("wasedatime-2020-state");
        localForage.removeItem("wasedatime-2020-state-fc");
  
        saveState({
          addedCourses,
          fetchedCourses
        });

        return {
          addedCourses,
          fetchedCourses
        }
      } else {
        saveState({
          addedCourses: {},
          fetchedCourses: {}
        });

        return {
          addedCourses: {},
          fetchedCourses: {}
        };
      }
    })
    .catch((error) => {
      console.error(error);
      // In case of any errors, play safe and let reducers initialize the state.
      return undefined;
    });
}

export const loadState = () => {
  return localForage
    .getItem("wasedatime-2021-state")
    .then((state) => state || parseOldState())
    .catch((err) => console.error(err));
};

export const saveState = (state: object) => {
  localForage
    .setItem("wasedatime-2021-state", state)
    .then((value) => {})
    .catch((error) => {
      console.error(error);
    });
};
