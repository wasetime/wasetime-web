import React from "react";
import {Helmet} from "react-helmet";

import SyllabusSearch from "./SyllabusSearch";
import {RowWrapper} from "../../styled-components/Wrapper";

const Syllabus = (props) => {
  return (
    <RowWrapper>
      <Helmet>
        <title>WasedaTime - Syllabus Search</title>
        <meta
          name="description"
          content="Syllabus Searching at Waseda University."
        />
        <meta property="og:title" content="WasedaTime - Syllabus Search" />
        <meta
          property="og:description"
          content="Syllabus Searching at Waseda University."
        />
        <meta property="og:site_name" content="WasedaTime - Syllabus Search" />
      </Helmet>
      <SyllabusSearch />
    </RowWrapper>
  );
};

export default Syllabus;
