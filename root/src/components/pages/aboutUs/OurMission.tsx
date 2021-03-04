import React from "react";
import styled from "styled-components";
import { Wrapper } from "@bit/wasedatime.core.ts.styles.wrapper";
import { useTranslation } from "react-i18next";

const Title = styled("h2")`
  width: 50%;
  font-weight: bold;
  font-size: 1.5em;
  margin: 0 auto;
  text-align: center;
  color: #444 !important;
`;

const MainParagraph = styled("p")`
  width: 90%;
  margin: 0 auto;
  font-size: 0.9em;
`;

const ImageAndDescription = styled("div")`
  width: 100%;
`;
const Description = styled("div")`
  margin: 0 auto;
  float: left;
  border: solid;
`;
const Picture1 = styled("img")`
  width: 300px;
  height: auto;
  float: left;
  margin-right: 5px;
`;

const Picture2 = styled("img")`
  width: 300px;
  height: auto;
  margin-left: 5px;
`;

const Picture3 = styled("img")`
  width: 300px;
  height: auto;
  margin-left: 5px;
`;

const Picture4 = styled("img")`
  width: 300px;
  height: auto;
  margin-left: 5px;
`;

const OurMission = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <br></br>
      <Title>{t("aboutus.We are on a mission")}</Title>
      <br></br>
      <MainParagraph>
        {
          "WasedaTime has been working on supporting students' academic activities since launching. Its well-tested Syllabus Search feature is favored by thousands of students. More than 50% of international students are using this website. We never expect this could happen and are always grateful for all our users."
        }
      </MainParagraph>
    </Wrapper>
  );
};

export default OurMission;
