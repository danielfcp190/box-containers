import React, { useState } from "react";
import styled from "styled-components";
import { useBuildModelFromJson } from "../../../../utils/buildModel";

export default function TextArea() {
  const [text, setText] = useState("");
  const [data, setData] = useState();

  // const json2Data = `{"type": "container", "items": [{"type": "box"}, {"type": "container", "items": [{"type": "box", "color": "green"}, {"type": "box","color": "red"}, {"type": "container", "items": [{"type": "box"}, {"type": "container", "items": [{"type": "box", "color": "green"}, {"type": "box","color": "red"}]}]}]}]}`;

  useBuildModelFromJson(data, 0);

  const handleSubmit = (event) => {
    const jsonData = JSON.parse(text.slice(1, text.length - 1));
    setData(jsonData);
    event.preventDefault();
  };

  return (
    <Wrapper>
      <Label htmlFor="json">Transform JSON in Boxes:</Label>
      <Text
        name="json"
        placeholder={`"{"type":"container","items":[{"type":"box","color":"green"}]}"`}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <Button onClick={handleSubmit}>Build</Button>
    </Wrapper>
  );
}

const Wrapper = styled.form`
  width: 50vw;
  display: grid;
  grid-template-columns: auto auto;
  margin-top: 2rem;
  grid-row-gap: 0.5rem;
`;

const Label = styled.label`
  grid-column: 1 / span 2;
`;
const Text = styled.textarea`
  width: 30vw;
  height: 3rem;
  /* resize: none; */
`;

const Button = styled.button`
  width: 9rem;
  border-radius: 0.5rem;
  padding: 0rem 3rem;
  margin-left: 1rem;
  height: 2.5rem;
  cursor: pointer;
  align-self: center;
  :active {
    transform: scale(-3%, -3%);
    transition: 0.5s;
  }
`;
