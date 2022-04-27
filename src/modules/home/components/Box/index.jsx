import React, { useState } from "react";
import styled from "styled-components";
import { SketchPicker } from "react-color";
import { useDispatch } from "react-redux";
import { changeBoxColor } from "../../../../../store/actions";

export default function Box({ color, level, id }) {
  const dispatch = useDispatch();
  const [colorPicker, setColorPicker] = useState(false);
  const [newColor, setNewColor] = useState(color);

  const handleChangeComplete = (color) => {
    setNewColor(color.hex);
    dispatch(
      changeBoxColor({
        type: "box",
        id: id,
        color: color.hex,
      })
    );
    setColorPicker(!colorPicker);
  };

  return (
    <Container>
      <BoxStyled
        level={level}
        style={{
          backgroundColor: newColor,
        }}
        onClick={() => setColorPicker(!colorPicker)}
      />

      {colorPicker && (
        <ColorPicker>
          <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
        </ColorPicker>
      )}
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
