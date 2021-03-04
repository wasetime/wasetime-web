import React from "react";
import styled from "styled-components";
import ReviewStars from "./ReviewStars";
import { media, sizes } from "@bit/wasedatime.core.ts.utils.responsive-utils";
import { WithTranslation, withTranslation } from "react-i18next";
import ReviewLang from "@bit/wasedatime.syllabus.ts.constants.review-lang";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "semantic-ui-react/dist/commonjs/modules/Modal";
import ReviewType from "../../types/review";

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
  font-size: 1.3em;
  line-height: 1.5em;
  ${media.phoneMini`font-size: 1.5em; flex: 1 0 60%;`};
`;

const GoogleTranslationHint = styled("p")`
  margin: 0;
  margin-top: 5px;
  font-size: 0.8em;
  color: #aaa;
`;

const ReviewCreatedTime = styled(GoogleTranslationHint)`
  margin-top: 0px;
`;

const ReviewTitle = styled("h6")`
  line-height: 1.5em;
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
  font-size: 1.4em;
  line-height: 1.5em;
  ${media.phoneMini`flex: 1 0 40%;`};
`;

const ReviewScale = styled("div")`
  text-align: end;
`;

const DeleteModal = styled(Modal)`
  width: auto !important;
  text-align: center !important;
  font-size: 1.5em;
  background-color: rgba(0, 0, 0, 0.2) !important;
  .button {
    font-size: 1.5rem;
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

interface ReviewToEdit extends ReviewType {
  src_comment: string;
  index: number;
}

interface Props extends WithTranslation {
  reviews: ReviewType[];
  searchLang: string;
  reviewLang: string;
  openEditForm: (review: ReviewToEdit) => void;
  deleteReview: (review: ReviewType, index: number) => void;
}

interface State {
  isDeleteModalOpen: boolean;
  reviewToDelete: ReviewType | object;
  reviewIndexToDelete: number;
}

class ReviewsList extends React.Component<Props, State> {
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
    const { reviews, searchLang, reviewLang, openEditForm, t } = this.props;

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
                  Translated from {ReviewLang[review["src_lang"]]} by Google
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
                  size="massive"
                  onClick={() =>
                    openEditForm({
                      ...review,
                      src_comment: review["comment_" + review["src_lang"]],
                      index: i,
                    })
                  }
                >
                  <FontAwesomeIcon icon={faPen} />
                </Editbutton>
                <Deletebutton
                  icon
                  size="massive"
                  onClick={() => this.openDeleteModal(review, i)}
                >
                  <FontAwesomeIcon icon={faTrash} />
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
          <Modal.Content>
            <h2>{t(`courseInfo.delete review confirmation`)}</h2>
            <Modal.Description>
              <Button
                icon
                style={{ background: "red", color: "#fff" }}
                onClick={() => this.confirmDeleteReview()}
              >
                {t(`courseInfo.delete review yes`)}
              </Button>
              <Button
                icon
                style={{ background: "green", color: "#fff" }}
                onClick={this.closeDeleteModal}
              >
                {t(`courseInfo.delete review no`)}
              </Button>
            </Modal.Description>
          </Modal.Content>
        </DeleteModal>
      </ReviewsWrapper>
    ));
  }
}

export default withTranslation("translation")(ReviewsList);
