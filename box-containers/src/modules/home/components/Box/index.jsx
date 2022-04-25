import React from "react";
import styled from "styled-components";

export default function Box({ color, id, level }) {
  return (
    <BoxStyled
      level={level}
      id={id}
      style={{
        backgroundColor: color,
      }}
    />
  );
}

const BoxStyled = styled.div`
  height: 4rem;
  width: 4rem;
  border: 1px solid black;
  margin: 1rem;
`;
