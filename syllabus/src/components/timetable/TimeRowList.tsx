import React from "react";
import styled from "styled-components";

import TimeRowItem from "./TimeRowItem";

const StyledList = styled("ol")`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0;
  margin: 2rem 0 0 0;
  background-color: rgba(255, 255, 255, 0.7);
  list-style: none;
  list-style-type: none;
  position: sticky;
  z-index: 80;
  left: 0;
`;

interface Props {
  largestPeriod: number;
}

const TimeRowList = ({ largestPeriod }: Props) => {
  const periods = [
    {
      s: "0900",
      e: "1030",
      p: 1,
    },
    {
      s: "1040",
      e: "1210",
      p: 2,
    },
    {
      s: "1300",
      e: "1430",
      p: 3,
    },
    {
      s: "1445",
      e: "1615",
      p: 4,
    },
    {
      s: "1630",
      e: "1800",
      p: 5,
    },
    {
      s: "1815",
      e: "1945",
      p: 6,
    },
    {
      s: "1955",
      e: "2125",
      p: 7,
    },
  ];
  const timeRows = periods
    .slice(0, Math.max(largestPeriod, 5))
    .map((period) => {
      return <TimeRowItem key={period.p} period={period}></TimeRowItem>;
    });
  return <StyledList>{timeRows}</StyledList>;
};

export default TimeRowList;
