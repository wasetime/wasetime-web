import React from "react";
import MediaQuery from "react-responsive";
import styled from "styled-components";

import AddedCourseListSwitch from "../../containers/syllabus/AddedCourseListSwitch";
import FetchedCourseListSearch from "../../containers/syllabus/FetchedCourseListSearch";
import { RowWrapper } from "../../styled-components/Wrapper";
import { SideBar } from "../../styled-components/SideBar";
import { sizes } from "../../styled-components/utils";
import withFetchCourses from "../../hocs/withFetchCourses";

const ExtendedRowWrapper = styled(RowWrapper)`
  flex: 1 0 0;
`;

const SyllabusSearch = (props) => {
  const { addedCoursesAndPrefs, fetchedCourses } = props;
  return (
    <ExtendedRowWrapper>
      <MediaQuery minWidth={sizes.tablet}>
        {(matches) =>
          matches && (
            <SideBar flexBasis="21em">
              <AddedCourseListSwitch
                addedCoursesAndPrefs={addedCoursesAndPrefs}
              />
            </SideBar>
          )
        }
      </MediaQuery>
      <FetchedCourseListSearch fetchedCourses={fetchedCourses} />
    </ExtendedRowWrapper>
  );
};

export default withFetchCourses(SyllabusSearch);
