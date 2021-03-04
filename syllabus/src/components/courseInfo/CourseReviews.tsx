import React from "react";
import styled from "styled-components";
import MediaQuery from "react-responsive";
import { media, sizes } from "@bit/wasedatime.core.ts.utils.responsive-utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import ReviewLangSwitches from "./ReviewLangSwitches";
import ReviewScalesCountContainer from "./ReviewScalesCountContainer";
import ReviewsList from "./ReviewsList";
import { WithTranslation, withTranslation } from "react-i18next";
import { getAvgScales } from "../../utils/get-avg-scales";
import { Review, Scales } from "../../types/review";
import { Course } from "../../types/course";
import AddReviewForm from "./AddReviewForm";
import { getIdToken, getUserAttr } from "@bit/wasedatime.core.ts.utils.user";
import API from "@aws-amplify/api";
import Alert from "react-s-alert";
import { SyllabusKey } from "@bit/wasedatime.syllabus.ts.constants.syllabus-data";
import SignInModal from "@bit/wasedatime.core.ts.ui.sign-in-modal";

// todo: make alert works

const StyledReviewsWrapper = styled("div")`
  ${media.phone`padding: 0 1em;`}
`;

const StyledSubHeading = styled("h6")`
  align-self: flex-start;
  margin: 1rem 0px;
  padding-left: 1rem;
  border-left: 5px solid rgb(148, 27, 47);
  font-weight: 300;
`;

const AddReviewButton = styled("button")`
  background-color: #b51e36;
  color: #fff;
  border: 0px;
  border-radius: 5px;
  font-size: 0.8em;
  float: right;
  ${media.phone`float: none;`}
  ${media.phone`width: 100%;`}
  padding: 0.3rem 0.5em;
`;

const Announcement = styled("div")`
  background-color: #48af37;
  color: #fff;
  margin-top: 20px;
  margin-bottom: 5px;
  padding: 5px 10px;
  font-size: 0.7em;
  border-radius: 3px;
  line-height: normal;
`;

const Disclaimer = styled(Announcement)`
  background-color: #aaa;
  margin: 0.5rem 0px;
`;

const ReviewsListWrapper = styled("div")`
  max-height: 60vh;
  overflow-y: auto;
`;

interface Props extends WithTranslation {
  courseKey: string;
  course: Course;
  searchLang: string;
  reviews: Review[];
}

interface State {
  reviews: Review[];
  scalesAvg: Scales;
  reviewLang: string;
  isFormOpen: boolean;
  formScales: Scales;
  formText: string;
  formMode: string;
  editReviewIndex: number;
  editReviewPrimaryKey: string;
  editReviewOriginalText: string;
  isFormSending: boolean;
  isSignInModalOpen: boolean;
}

class CourseReviews extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      reviews: props.reviews,
      scalesAvg: getAvgScales(props.reviews),
      reviewLang: props.searchLang,
      isFormOpen: false,
      formMode: "new",
      formScales: { satisfaction: 0, difficulty: 0, benefit: 0 },
      formText: "",
      editReviewIndex: -1,
      editReviewPrimaryKey: "",
      editReviewOriginalText: "",
      isFormSending: false,
      isSignInModalOpen: false,
    };
  }

  onFormScaleChange = (target, score) => {
    this.setState((prevState) => ({
      formScales: { ...prevState.formScales, [target]: score },
    }));
  };

  onFormTextChange = (text) => this.setState({ formText: text });

  openEditForm = (review) => {
    this.setState(
      {
        formMode: "edit",
        formScales: {
          satisfaction: review["satisfaction"],
          difficulty: review["difficulty"],
          benefit: review["benefit"],
        },
        formText: review["src_comment"],
        editReviewIndex: review["index"],
        editReviewPrimaryKey: review["created_at"],
        editReviewOriginalText: review["src_comment"],
      },
      () => this.setState({ isFormOpen: true })
    );
  };

  onNewReviewFormSubmit = async () => {
    const idToken = await getIdToken();
    const {
      formScales,
      formText,
      formMode,
      editReviewPrimaryKey,
      editReviewOriginalText,
    } = this.state;

    if (!idToken.length) {
      this.setState({ isSignInModalOpen: true });
      return;
    }
    const { course, courseKey, t } = this.props;

    if (Object.values(formScales).indexOf(0) > -1 || formText.length === 0) {
      Alert.warning(t(`courseInfo.Fill in all fields before sending`), {
        position: "bottom",
        effect: "jelly",
      });
    } else {
      const editReview = { ...formScales, comment: formText };
      const newReview = {
        ...editReview,
        course_key: courseKey,
        title: course[SyllabusKey.TITLE],
        title_jp: course[SyllabusKey.TITLE_JP],
        instructor: course[SyllabusKey.INSTRUCTOR],
        instructor_jp: course[SyllabusKey.INSTRUCTOR_JP],
        year: new Date().getFullYear(),
      };

      try {
        this.setState({ isFormSending: true });

        // Send the review
        if (formMode === "new") {
          API.post("wasedatime-dev", "/course-reviews/" + courseKey, {
            body: {
              data: newReview,
            },
            headers: {
              "Content-Type": "application/json",
              Authorization: idToken,
            },
          }).then(async () => this.cleanFormAndUpdateReviews(newReview));
        } else if (formMode === "edit") {
          API.patch(
            "wasedatime-dev",
            "/course-reviews/" + courseKey + "?ts=" + editReviewPrimaryKey,
            {
              body: {
                data: editReview,
              },
              headers: {
                "Content-Type": "application/json",
                Authorization: idToken,
              },
            }
          ).then(async () => this.cleanFormAndUpdateReviews(newReview));
        }
      } catch (error) {
        Alert.error(this.props.t(`courseInfo.Review failed to send`), {
          position: "bottom",
          effect: "jelly",
        });
      }
    }
  };

  cleanFormAndUpdateReviews = async (newReview) => {
    const idToken = await getIdToken();
    const userAttr = await getUserAttr();
    const uid = userAttr.id;
    const { courseKey, t } = this.props;

    Alert.success(t(`courseInfo.Review sent`), {
      position: "bottom",
      effect: "jelly",
    });

    const res = await API.get(
      "wasedatime-dev",
      "/course-reviews/" + courseKey + "?uid=" + uid,
      {
        headers: {
          "x-api-key": "0PaO2fHuJR9jlLLdXEDOyUgFXthoEXv8Sp0oNsb8",
          "Content-Type": "application/json",
        },
      }
    );

    this.setState({
      reviews: res.data,
      scalesAvg: getAvgScales(res.data),
      isFormOpen: false,
      formScales: {
        satisfaction: 0,
        difficulty: 0,
        benefit: 0,
      },
      formText: "",
      isFormSending: false,
      formMode: "new",
      editReviewIndex: -1,
      editReviewPrimaryKey: "",
      editReviewOriginalText: "",
    });
  };

  deleteReview = async (reviewPrimaryKey, reviewIndex) => {
    const idToken = await getIdToken();
    if (!idToken.length) {
      this.setState({ isSignInModalOpen: true });
      return;
    }

    const { reviews } = this.state;
    const { courseKey, t } = this.props;
    API.del(
      "wasedatime-dev",
      "/course-reviews/" + courseKey + "?ts=" + reviewPrimaryKey,
      {
        headers: {
          Authorization: idToken,
        },
      }
    )
      .then(() => {
        Alert.success(t(`courseInfo.Review deleted`), {
          position: "bottom",
          effect: "jelly",
        });

        const updatedReviews = reviews;
        updatedReviews.splice(reviewIndex, 1);
        this.setState({
          reviews: updatedReviews,
          scalesAvg: getAvgScales(updatedReviews),
        });
      })
      .catch((e) => console.log(e));
  };

  openReviewForm = async () => {
    const idToken = await getIdToken();
    if (idToken) this.setState({ isFormOpen: true });
    else this.setState({ isSignInModalOpen: true });
  };

  render() {
    const { searchLang, t } = this.props;

    const {
      reviews,
      scalesAvg,
      reviewLang,
      formScales,
      formText,
      isFormOpen,
      isFormSending,
      isSignInModalOpen,
    } = this.state;

    return isFormOpen ? (
      <StyledReviewsWrapper>
        <AddReviewForm
          closeModal={() => this.setState({ isFormOpen: false })}
          scales={formScales}
          text={formText}
          handleScaleChange={this.onFormScaleChange}
          handleTextChange={this.onFormTextChange}
          handleFormSubmit={this.onNewReviewFormSubmit}
          isSending={isFormSending}
        />
      </StyledReviewsWrapper>
    ) : (
      <StyledReviewsWrapper>
        <StyledSubHeading>
          {t(`courseInfo.Reviews`)}{" "}
          <MediaQuery minWidth={sizes.phone}>
            {(matches) => (matches ? " " : <br />)}
          </MediaQuery>
          <span style={{ marginLeft: "10px" }}>
            <ReviewLangSwitches
              reviewLang={reviewLang}
              switchReviewLang={(lng) => this.setState({ reviewLang: lng })}
              isInHeading={true}
            />
          </span>
          <MediaQuery minWidth={sizes.phone}>
            {(matches) =>
              matches && (
                <AddReviewButton onClick={this.openReviewForm}>
                  <FontAwesomeIcon icon={faPen} />{" "}
                  {this.props.t(`courseInfo.Write your Review`)}
                </AddReviewButton>
              )
            }
          </MediaQuery>
        </StyledSubHeading>
        <MediaQuery minWidth={sizes.phone}>
          {(matches) =>
            !matches && (
              <AddReviewButton
                onClick={() => this.setState({ isFormOpen: true })}
              >
                <FontAwesomeIcon icon={faPen} />{" "}
                {this.props.t(`courseInfo.Write your Review`)}
              </AddReviewButton>
            )
          }
        </MediaQuery>
        <Disclaimer>{t(`courseInfo.Disclaimer`)}</Disclaimer>
        <ReviewsListWrapper>
          <ReviewScalesCountContainer
            avgSatisfaction={scalesAvg.satisfaction}
            avgDifficulty={scalesAvg.difficulty}
            avgBenefit={scalesAvg.benefit}
            thisCourseReviewsLength={reviews.length}
          />
          <ReviewsList
            reviews={reviews}
            searchLang={searchLang}
            reviewLang={reviewLang}
            openEditForm={this.openEditForm}
            deleteReview={this.deleteReview}
          />
        </ReviewsListWrapper>
        <SignInModal
          isModalOpen={isSignInModalOpen}
          closeModal={() => this.setState({ isSignInModalOpen: false })}
        />
      </StyledReviewsWrapper>
    );
  }
}

export default withTranslation("translation")(CourseReviews);
