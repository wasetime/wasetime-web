import React from "react";
import chunk from "lodash/chunk";
import { Waypoint } from "react-waypoint";
import styled from "styled-components";
import CourseChunk from "./CourseChunk";
import { WithTranslation, withTranslation } from "react-i18next";
import Lang from "@bit/wasedatime.core.ts.constants.langs";
import Course from "../../types/course";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

const CourseListWrapper = styled(SimpleBar)`
  height: 100%;
  overflow-x: hidden;
  .simplebar-scrollbar::before {
    background-color: #999;
  }
`;

const CourseChunkWrapper = styled("div")`
  margin: 0.5em;
`;

const getChunkKey = (chunk) => {
  const head = chunk[0];
  const tail = chunk[chunk.length - 1];
  return `${head.a}-${tail.a}`;
};

const COURSES_PER_CHUNK = 5;
const INIT_CHUNKS_NUM = 2;

interface Props extends WithTranslation {
  searchTerm: string | string[];
  searchLang: string | string[];
  results: Course[];
  onSearchInputChange: (inputText: string) => void;
}

interface State {
  loadedChunksNum: number;
}

class FetchedCourseList extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      loadedChunksNum: INIT_CHUNKS_NUM,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchTerm !== prevProps.searchTerm) {
      this.setState({
        loadedChunksNum: INIT_CHUNKS_NUM,
      });
      window.scrollTo({ top: 0 });
    }
  }

  resultsToChunks = () =>
    chunk(this.props.results, COURSES_PER_CHUNK).slice(
      0,
      this.state.loadedChunksNum
    );

  loadMoreChunks = (index) => {
    if (index !== 0 && index + 1 === this.state.loadedChunksNum) {
      this.setState((prevState, props) => {
        return {
          loadedChunksNum: prevState.loadedChunksNum + 1,
        };
      });
    }
  };

  render() {
    const { searchTerm, searchLang, results, i18n } = this.props;
    const resultsInChunks = this.resultsToChunks();

    return (
      <CourseListWrapper autoHide={true}>
        {resultsInChunks.length ? (
          resultsInChunks.map((chunk, index) => (
            <Waypoint
              key={getChunkKey(chunk)}
              onEnter={() => {
                this.loadMoreChunks(index);
              }}
            >
              <CourseChunkWrapper>
                <div>
                  <span>
                    {i18n.language === Lang.JA
                      ? "全 " +
                        results.length +
                        " 件中 " +
                        (index * 5 + 1) +
                        " - " +
                        (index * 5 + chunk.length) +
                        " 件を表示"
                      : index * 5 +
                        1 +
                        " - " +
                        (index * 5 + chunk.length) +
                        " of " +
                        results.length +
                        " courses"}
                  </span>
                </div>
                <CourseChunk
                  chunk={chunk}
                  searchTerm={searchTerm}
                  searchLang={searchLang}
                />
              </CourseChunkWrapper>
            </Waypoint>
          ))
        ) : (
          <div style={{ marginTop: "0.5em", textAlign: "center" }}>
            No results? Try importing a school or changing the filter!
          </div>
        )}
      </CourseListWrapper>
    );
  }
}

export default withTranslation("translation")(FetchedCourseList);
