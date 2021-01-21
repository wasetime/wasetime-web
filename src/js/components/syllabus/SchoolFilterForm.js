import React from "react";
import MediaQuery from "react-responsive";
import styled from "styled-components";
import { withNamespaces } from "react-i18next";
import SchoolImportCard from "./SchoolImportCard";
import SchoolRemoveCard from "./SchoolRemoveCard";
import { media, sizes } from "../../styled-components/utils";

import {
  Segment,
  Tab,
  Card,
  Header,
  Icon,
  Checkbox,
  Form,
  Button,
  Popup,
  Image,
  Message,
  Menu,
} from "semantic-ui-react";

import {
  undergradSchoolNameIconMap,
  gradSchoolNameIconMap,
  otherSchoolNameIconMap,
  allSchoolNameIconMap,
} from "../../utils/schoolNameIconMap";

const RowWrapper = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 1em 1em 0px 1em;
`;

const StyledSegment = styled(Segment)`
  width: 100% !important;
  min-height: ${(props) => (props.isSchoolFilterOpened ? "120px" : "40px")};
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

const ChooseSchoolButton = styled(Button)`
  font-size: 14px !important;
  padding: 0.5em 1em !important;
  color: #777 !important;
  ${media.phoneMini`font-size: 11px !important;`}
  i {
    color: #48af37 !important;
  }
`;

const RemoveSchoolButton = styled(ChooseSchoolButton)`
  i {
    color: #ce0115 !important;
  }
`;

class SchoolFilterForm extends React.Component {
  state = {
    isSchoolFilterOpened: true,
    loadedSchools: this.props.loadedSchools,
    loadingSchool: null,
    removingSchool: null,
    schoolsUpToLimit: this.props.loadedSchools.length >= 10,
  };

  componentDidMount() {
    const { loadedSchools, selectedSchools, handleToggleFilter } = this.props;
    if (loadedSchools.length === 1 && selectedSchools.length === 0)
      handleToggleFilter("school", loadedSchools[0]);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loadedSchools !== this.props.loadedSchools) {
      this.setState({ loadedSchools: this.props.loadedSchools });
    }
  }

  schoolImportPanes = () => {
    const { loadedSchools, loadingSchool, schoolsUpToLimit } = this.state;
    const { t } = this.props;
    const schoolGroupNames = ["Undergraduate", "Graduate", "Special"];
    const ImportCardGroup = ({ schoolNameIconMap, itemsPerRow }) => (
      <Card.Group itemsPerRow={itemsPerRow} style={{ marginTop: "0.5em" }}>
        {Object.keys(schoolNameIconMap).map((schoolName) => (
          <SchoolImportCard
            key={schoolName}
            schoolName={schoolName}
            loaded={loadedSchools.includes(schoolName)}
            loading={this.state.loadingSchool === schoolName}
            schoolIcon={schoolNameIconMap[schoolName]}
            onDownload={this.handleSchoolloading}
            isBannedToLoad={
              !loadedSchools.includes(schoolName) &&
              ((loadingSchool && this.state.loadingSchool !== schoolName) ||
                schoolsUpToLimit)
            }
          />
        ))}
      </Card.Group>
    );

    return [
      undergradSchoolNameIconMap(this.props.lng),
      gradSchoolNameIconMap(this.props.lng),
      otherSchoolNameIconMap(this.props.lng),
    ].map((schoolNameIconMap, i) => ({
      menuItem: (
        <Menu.Item key={schoolGroupNames[i]} style={{ fontSize: "1.2em" }}>
          {t("syllabus.School Filter." + schoolGroupNames[i])}
        </Menu.Item>
      ),
      render: () => (
        <React.Fragment>
          {schoolsUpToLimit ? (
            <Message warning>
              <Message.Header>
                {t("syllabus.School Filter.Schools up to limit warning title")}
              </Message.Header>
              <p>
                {t("syllabus.School Filter.Schools up to limit warning text")}
              </p>
            </Message>
          ) : (
            ""
          )}
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

  schoolRemoveForm = () => {
    const RemoveCardGroup = ({ schoolNameIconMap, itemsPerRow }) => (
      <Card.Group itemsPerRow={itemsPerRow}>
        {this.state.loadedSchools.map((schoolName) => (
          <SchoolRemoveCard
            key={schoolName}
            schoolName={schoolName}
            schoolIcon={schoolNameIconMap[schoolName]}
            removing={this.state.removingSchool === schoolName}
            onRemove={this.handleSchoolRemove}
            isBannedToRemove={
              this.state.removingSchool !== null &&
              this.state.removingSchool !== schoolName
            }
          />
        ))}
      </Card.Group>
    );
    return (
      <MediaQuery minWidth={sizes.tablet}>
        {(matches) => {
          return matches ? (
            <RemoveCardGroup
              schoolNameIconMap={allSchoolNameIconMap(this.props.lng)}
              itemsPerRow={6}
            />
          ) : (
            <RemoveCardGroup
              schoolNameIconMap={allSchoolNameIconMap(this.props.lng)}
              itemsPerRow={4}
            />
          );
        }}
      </MediaQuery>
    );
  };

  handleSchoolloading = async (school) => {
    const { schoolsUpToLimit, loadingSchool, loadedSchools } = this.state;
    if (
      !schoolsUpToLimit &&
      (!loadingSchool || loadingSchool !== school) &&
      loadedSchools.length < 10
    ) {
      if (loadedSchools.length === 9) {
        this.setState({ schoolsUpToLimit: true });
      }

      this.setState({ loadingSchool: school });
      await this.props.loadSyllabus(school);

      setTimeout(() => {
        this.setState(
          {
            loadingSchool: null,
            loadedSchools: [...loadedSchools, school],
          },
          this.props.handleToggleFilter("school", school)
        );
      }, 1000);
    }
  };

  handleSchoolRemove = async (school) => {
    if (this.state.loadedSchools.includes(school)) {
      let loadedSchools = this.state.loadedSchools;
      this.setState({ removingSchool: school });
      loadedSchools.splice(loadedSchools.indexOf(school), 1);
      if (this.props.selectedSchools.includes(school)) {
        this.props.handleToggleFilter("school", school);
      }

      await this.props.removeSyllabus(school);

      setTimeout(() => {
        this.setState({
          removingSchool: null,
          loadedSchools: loadedSchools,
          schoolsUpToLimit: loadedSchools.length >= 10,
        });
      }, 1000);
    }
  };

  render() {
    const { t, handleToggleFilter, selectedSchools } = this.props;
    return (
      <RowWrapper>
        <StyledSegment isSchoolFilterOpened={this.state.isSchoolFilterOpened}>
          <Header
            as="h2"
            onClick={() =>
              this.setState((state) => ({
                isSchoolFilterOpened: !state.isSchoolFilterOpened,
              }))
            }
            style={{ cursor: "pointer", margin: "0px" }}
          >
            {t("syllabus.School Filter.title")}{" "}
            <Popup
              content={t("syllabus.School Filter.Loaded schools limit message")}
              on="hover"
              trigger={
                <Icon
                  name="question circle outline"
                  style={{
                    display: "inline-block",
                    fontSize: "1em",
                    verticalAlign: "top",
                  }}
                />
              }
            />
            {this.state.isSchoolFilterOpened ? (
              <Icon name="angle up" style={{ display: "inline-block" }} />
            ) : (
              <Icon name="angle down" style={{ display: "inline-block" }} />
            )}
          </Header>

          {this.state.loadedSchools.length > 0 &&
            this.state.isSchoolFilterOpened && (
              <Button.Group>
                <WiderPopup
                  trigger={
                    <ChooseSchoolButton
                      inverted
                      color="grey"
                      icon="add"
                      content={t("syllabus.School Filter.Choose Schools")}
                    />
                  }
                  content={<Tab panes={this.schoolImportPanes()} />}
                  on="click"
                  position="bottom left"
                  size="huge"
                  wide="very"
                />
                <WiderPopup
                  trigger={
                    <RemoveSchoolButton
                      inverted
                      color="grey"
                      icon="minus"
                      content={t("syllabus.School Filter.Remove Schools")}
                    />
                  }
                  content={this.schoolRemoveForm()}
                  on="click"
                  position="bottom left"
                  size="huge"
                  wide="very"
                />
              </Button.Group>
            )}

          {this.state.loadedSchools.length === 0 &&
            this.state.isSchoolFilterOpened && (
              <Message style={{ fontSize: "1.5em" }}>
                <Message.Header>
                  {t("syllabus.School Filter.No imported")}
                </Message.Header>
                <p>{t("syllabus.School Filter.Import request")}</p>
                <Popup
                  trigger={
                    <ChooseSchoolButton
                      inverted
                      color="grey"
                      icon="add"
                      content={t("syllabus.School Filter.Choose Schools")}
                    />
                  }
                  content={<Tab panes={this.schoolImportPanes()} />}
                  on="click"
                  position="bottom left"
                  size="huge"
                  wide="very"
                />
              </Message>
            )}

          {this.state.isSchoolFilterOpened && (
            <Form>
              <Form.Group inline style={{ margin: "0px" }}>
                {this.state.loadedSchools.map((schoolName) => (
                  <Form.Field
                    key={schoolName}
                    control={Checkbox}
                    label={{
                      children: (
                        <Image
                          style={{ width: "5em" }}
                          src={allSchoolNameIconMap(this.props.lng)[schoolName]}
                        />
                      ),
                    }}
                    checked={selectedSchools.includes(schoolName)}
                    style={{ margin: "1em 0px 0px" }}
                    onChange={() => handleToggleFilter("school", schoolName)}
                  />
                ))}
              </Form.Group>
            </Form>
          )}
        </StyledSegment>
      </RowWrapper>
    );
  }
}

export default withNamespaces("translation")(SchoolFilterForm);
