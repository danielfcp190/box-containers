import React, { useState } from "react";
import styled from "styled-components";
import { Circle } from "react-color";

export default function Box({ color, id, level }) {
  const [colorPicker, setColorPicker] = useState(false);
  return (
    <Container>
      <BoxStyled
        level={level}
        // key={id}
        style={{
          backgroundColor: color,
        }}
        onClick={() => setColorPicker(!colorPicker)}
      />
      {/* <div>hello</div> */}
      {/* <ColorPicker>{colorPicker && <Circle />}</ColorPicker> */}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;

const BoxStyled = styled.div`
  height: 4rem;
  width: 4rem;
  border: 1px solid black;
  margin: 1rem;
`;

const ColorPicker = styled.div`
  position: absolute;
  z-index: 10;
`;
