import React from "react";
import MediaQuery from "react-responsive";
import styled from "styled-components";
import { WithTranslation, withTranslation } from "react-i18next";
import SchoolImportCard from "./SchoolImportCard";
import { media, sizes } from "@bit/wasedatime.core.ts.utils.responsive-utils";

import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import Tab from "semantic-ui-react/dist/commonjs/modules/Tab";
import Card from "semantic-ui-react/dist/commonjs/views/Card";
import Popup from "semantic-ui-react/dist/commonjs/modules/Popup";
import Menu from "semantic-ui-react/dist/commonjs/collections/Menu";

import Lang from "@bit/wasedatime.core.ts.constants.langs";
import * as schoolIconEnMap from "@bit/wasedatime.syllabus.ts.constants.school-name-icon-map-en";
import * as schoolIconJaMap from "@bit/wasedatime.syllabus.ts.constants.school-name-icon-map-ja";

const RowWrapper = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 1em 1em 0px 1em;
`;

const StyledSegment = styled(Segment)`
  width: 100% !important;
  min-height: ${(props) => (props.open ? "120px" : "40px")};
  cursor: default !important;
  animation: none !important;
  border-radius: 5px !important;
  box-shadow: none !important;
  margin: 1em 2em 0em;
  padding: 0.5rem 1em 0px !important;
  transition: min-height 0.3s !important;

  &:hover {
    border-radius: 5px !important;
    transform: none !important;
  }
`;

const WiderPopup = styled(Popup)`
  div {
    ${media.tablet`width: 80vw !important;`}
  }
`;

const ChooseSchoolButton = styled("button")`
  width: 100%;
  font-size: 14px;
  padding: 0.5rem;
  margin-bottom: 1rem;
  background: #b51e36;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer !important;
  ${media.phoneMini`font-size: 11px;`} i {
    color: #48af37;
  }
  &:hover {
    background: #b51e36;
    color: #fff;
    i {
      color: #fff;
    }
  }
  &:focus {
    outline: 0;
  }
`;

interface Props extends WithTranslation {
  loadedSchools: string[];
  selectedSchools: string[];
  handleToggleFilter: (school: string) => void;
  loadSyllabus: (school: string) => void;
  removeSyllabus: (school: string) => void;
}

interface State {
  open: boolean;
  loadedSchools: string[];
  loadingSchool: string | null;
  removingSchool: string | null;
}

class SchoolFilterForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      open: true,
      loadedSchools: props.loadedSchools,
      loadingSchool: null,
      removingSchool: null,
    };
  }

  componentDidMount() {
    const { loadedSchools, selectedSchools, handleToggleFilter } = this.props;
    if (loadedSchools.length === 1 && selectedSchools.length === 0)
      handleToggleFilter(loadedSchools[0]);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loadedSchools !== this.props.loadedSchools) {
      this.setState({ loadedSchools: this.props.loadedSchools });
    }
  }

  schoolImportPanes = () => {
    const { loadedSchools, loadingSchool } = this.state;
    const { t, i18n, selectedSchools, handleToggleFilter } = this.props;
    const schoolGroupNames = ["Undergraduate", "Graduate", "Special"];

    const ImportCardGroup = ({ schoolNameIconMap, itemsPerRow }) => (
      <Card.Group itemsPerRow={itemsPerRow} style={{ marginTop: "0.5em" }}>
        {Object.keys(schoolNameIconMap).map((schoolName) => (
          <SchoolImportCard
            key={schoolName}
            loaded={loadedSchools.includes(schoolName)}
            loading={loadingSchool === schoolName}
            schoolIcon={schoolNameIconMap[schoolName]}
            onDownload={() => this.handleSchoolloading(schoolName)}
            isBannedToLoad={
              !loadedSchools.includes(schoolName) &&
              loadingSchool &&
              loadingSchool !== schoolName
            }
            checked={selectedSchools.includes(schoolName)}
            onCheck={() => handleToggleFilter(schoolName)}
          />
        ))}
      </Card.Group>
    );

    const lng = i18n.language;
    const schoolIconMap =
      i18n.language === Lang.EN
        ? [
            schoolIconEnMap.undergradSchoolNameIconMap,
            schoolIconEnMap.gradSchoolNameIconMap,
            schoolIconEnMap.otherSchoolNameIconMap,
          ]
        : [
            schoolIconJaMap.undergradSchoolNameIconMap,
            schoolIconJaMap.gradSchoolNameIconMap,
            schoolIconJaMap.otherSchoolNameIconMap,
          ];
    return schoolIconMap.map((schoolNameIconMap, i) => ({
      menuItem: (
        <Menu.Item key={schoolGroupNames[i]} style={{ fontSize: "1.2em" }}>
          {t("syllabus.School Filter." + schoolGroupNames[i])}
        </Menu.Item>
      ),
      render: () => (
        <React.Fragment>
          <MediaQuery minWidth={sizes.tablet}>
            {(matches) => {
              return matches ? (
                <ImportCardGroup
                  key={i}
                  schoolNameIconMap={schoolNameIconMap}
                  itemsPerRow={6}
                />
              ) : (
                <ImportCardGroup
                  key={i}
                  schoolNameIconMap={schoolNameIconMap}
                  itemsPerRow={4}
                />
              );
            }}
          </MediaQuery>
        </React.Fragment>
      ),
    }));
  };

  handleSchoolloading = async (school) => {
    const { loadingSchool, loadedSchools } = this.state;
    const oldestLoadedSchool = loadedSchools[0];
    let newLoadedSchools = [...loadedSchools];

    if (loadedSchools.length >= 10) newLoadedSchools.splice(0, 1);

    this.setState({ loadingSchool: school });
    newLoadedSchools.push(school);
    await this.props.loadSyllabus(school);

    setTimeout(() => {
      this.setState(
        {
          loadingSchool: null,
          loadedSchools: newLoadedSchools,
        },
        () => this.props.handleToggleFilter(school)
      );
    }, 1000);
  };

  render() {
    const { handleToggleFilter, selectedSchools, t, i18n } = this.props;
    return (
      <WiderPopup
        trigger={
          <ChooseSchoolButton>
            {t("syllabus.School Filter.Choose Schools")}
          </ChooseSchoolButton>
        }
        content={<Tab panes={this.schoolImportPanes()} />}
        on="click"
        position="bottom left"
        size="huge"
        wide="very"
      />
    );
  }
}

export default withTranslation("translation")(SchoolFilterForm);
