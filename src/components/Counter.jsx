import React from "react";
import styled from "styled-components";
import { convertTime } from "../lib";

const CouterText = styled.div`
  font-size: 20px;
`;

export const Counter = ({ counter }) => {
  return (
    <>
      <CouterText>{convertTime(counter)}</CouterText>
    </>
  );
};
