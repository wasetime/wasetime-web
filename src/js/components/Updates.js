import React from "react";
import PropTypes from "prop-types";
import { withNamespaces } from "react-i18next";
import styled from "styled-components";

import ModalContainer from "../containers/ModalContainer";

const StyledUpdates = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.3rem 2rem;
  height: 60px;
  background: ${(props) => props.theme.colorPrimary};
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 105;
  color: white;
`;

const ModalArticle = styled("article")`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalSection = styled("section")`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0px;
  font-size: 1em;
`;

class Updates extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <StyledUpdates>
        <ModalContainer linkText={t("updates.header")} text={""}>
          <ModalArticle>
            <ModalSection>
              <p>{t("updates.main")}</p>
              <p>{t("updates.main2")}</p>
              <p>{t("updates.main3")}</p>
              <p>{t("updates.main4")}</p>
              <p>{t("updates.main5")}</p>
            </ModalSection>
          </ModalArticle>
        </ModalContainer>
      </StyledUpdates>
    );
  }
}

export default withNamespaces("translation")(Updates);

Updates.propTypes = {
  t: PropTypes.func.isRequired,
};
