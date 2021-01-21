import React from "react";
import styled from "styled-components";
import ReviewStars from "./ReviewStars";
import { media } from "../../styled-components/utils";
import { withNamespaces } from "react-i18next";
import { COURSE_REVIEW_LNG_FULL_NAME } from "../../config/course_review_lng";
import { Button, Icon, Modal } from "semantic-ui-react";

const ReviewsWrapper = styled("div")`
  background: #fff;
  line-height: 120%;
`;

const Review = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1em;
`;

const ReviewDivider = styled("hr")`
  margin: 0px 2em;
  border: 1px solid #ddd;
`;

const ReviewText = styled("div")`
  ${media.phoneMini`font-size: 1.4rem; flex: 1 0 60%;`};
`;

const GoogleTranslationHint = styled("p")`
  margin: 0;
  margin-top: 5px;
  font-size: 0.7em;
  color: #aaa;
`;

const ReviewCreatedTime = styled(GoogleTranslationHint)`
  margin-top: 0px;
`;

const ReviewTitle = styled("h6")`
  font-size: 0.7em;
  margin-top: 0;
  margin-bottom: 0.5em;
`;

const ReviewYear = styled("span")`
  background-color: orange;
  color: #fff;
  padding: 0 0.5em;
  border-radius: 5px;
`;

const ReviewScalesList = styled("div")`
  word-break: break-word;
  flex: 1 0 6em;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 1em;
  ${media.tablet`font-size: 1em;`};
  ${media.phoneMini`font-size: 1.2rem; flex: 1 0 40%;`};
`;

const ReviewScale = styled("div")`
  text-align: end;
`;

const DeleteModal = styled(Modal)`
  text-align: center !important;
  font-size: 1.5em !important;
  background-color: rgba(0, 0, 0, 0.2) !important;
  ${media.phone`font-size: 1.4rem !important;`}
  .header {
    font-size: 2rem !important;
  }
  .button {
    font-size: 1.7rem !important;
  }
`;

const Editbutton = styled(Button)`
  background: #fff !important;
  color: orange !important;
  padding: 0px !important;
`;

const Deletebutton = styled(Editbutton)`
  color: red !important;
`;

class ReviewsList extends React.Component {
  state = {
    isDeleteModalOpen: false,
    reviewToDelete: {},
    reviewIndexToDelete: -1,
  };

  openDeleteModal = (review, i) => {
    this.setState({
      isDeleteModalOpen: true,
      reviewToDelete: review,
      reviewIndexToDelete: i,
    });
  };
  closeDeleteModal = () =>
    this.setState({
      isDeleteModalOpen: false,
      reviewToDelete: {},
      reviewIndexToDelete: -1,
    });
  confirmDeleteReview = () => {
    this.props.deleteReview(
      this.state.reviewToDelete["created_at"],
      this.state.reviewIndexToDelete
    );
    this.closeDeleteModal();
  };

  render() {
    const {
      reviews,
      searchLang,
      reviewLang,
      openReviewEditForm,
      t,
    } = this.props;
    return reviews.map((review, i) => (
      <ReviewsWrapper key={i}>
        {i !== 0 && <ReviewDivider />}
        <Review>
          <ReviewText>
            <ReviewTitle>
              <ReviewYear>{review["year"]}</ReviewYear>{" "}
              {review[searchLang === "en" ? "title" : "title_jp"]} ({" "}
              {review[searchLang === "en" ? "instructor" : "instructor_jp"]} )
            </ReviewTitle>
            <span>
              {review["comment_" + reviewLang] !== undefined &&
                review["comment_" + reviewLang].split("\n").map((str, j) => (
                  <span key={j}>
                    {str}
                    <br />
                  </span>
                ))}
            </span>
            {review["src_lang"] ? (
              review["src_lang"] !== reviewLang && (
                <GoogleTranslationHint>
                  Translated from{" "}
                  {COURSE_REVIEW_LNG_FULL_NAME[review["src_lang"]]} by Google
                </GoogleTranslationHint>
              )
            ) : (
              <GoogleTranslationHint>Not translated yet</GoogleTranslationHint>
            )}
            <ReviewCreatedTime>
              {new Date(review["created_at"]).toLocaleString()}
            </ReviewCreatedTime>
          </ReviewText>
          <ReviewScalesList>
            {review["mod"] && (
              <span>
                <Editbutton
                  icon
                  size='massive'
                  onClick={() =>
                    openReviewEditForm({
                      ...review,
                      src_comment: review["comment_" + review["src_lang"]],
                      index: i,
                    })
                  }
                >
                  <Icon name="pencil alternate" />
                </Editbutton>
                <Deletebutton
                  icon
                  size='massive'
                  onClick={() => this.openDeleteModal(review, i)}
                >
                  <Icon name="trash" />
                </Deletebutton>
              </span>
            )}
            <ReviewScale>
              <span>{t(`courseInfo.Satisfaction`)}&nbsp;</span>
              <ReviewStars scale={review["satisfaction"]} />
            </ReviewScale>
            <ReviewScale>
              <span>{t(`courseInfo.Difficulty`)}&nbsp;</span>
              <ReviewStars scale={review["difficulty"]} />
            </ReviewScale>
            <ReviewScale>
              <span>{t(`courseInfo.Benefit`)}&nbsp;</span>
              <ReviewStars scale={review["benefit"]} />
            </ReviewScale>
          </ReviewScalesList>
        </Review>
        <DeleteModal
          open={this.state.isDeleteModalOpen}
          onClose={this.closeDeleteModal}
        >
          <Modal.Header>
            {t(`courseInfo.delete review confirmation`)}
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Button
                icon
                style={{ background: "red", color: "#fff" }}
                onClick={() => this.confirmDeleteReview()}
              >
                <Icon name="check" /> {t(`courseInfo.delete review yes`)}
              </Button>
              <Button
                icon
                style={{ background: "green", color: "#fff" }}
                onClick={this.closeDeleteModal}
              >
                <Icon name="close" /> {t(`courseInfo.delete review no`)}
              </Button>
            </Modal.Description>
          </Modal.Content>
        </DeleteModal>
      </ReviewsWrapper>
    ));
  }
}

export default withNamespaces("translation")(ReviewsList);
