import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addBox, addContainer } from "../../../../../store/actions";

export default function TextArea() {
  const [text, setText] = useState("");

  const dispatch = useDispatch();
  // const json2Data = `{"type": "container", "items": [{"type": "box"}, {"type": "container", "items": [{"type": "box", "color": "green"}, {"type": "box","color": "red"}, {"type": "container", "items": [{"type": "box"}, {"type": "container", "items": [{"type": "box", "color": "green"}, {"type": "box","color": "red"}]}]}]}]}`;
  let count = 0;

  const build = (data) => {
    for (let i in data) {
      if (data[i] === "container") {
        dispatch(
          addContainer({
            type: "container",
            items: [],
            level: count,
          })
        );
        count++;
      } else if (data[i] !== "container") {
        for (let j in data[i]) {
          if (data[i][j].type === "box") {
            data[i][j].color
              ? dispatch(
                  addBox({
                    type: "box",
                    color: `${data[i][j].color}`,
                    level: count,
                  })
                )
              : dispatch(
                  addBox({
                    type: "box",
                    color: "orange",
                    level: count,
                  })
                );
          } else {
            build(data[i][j]);
          }
        }
      }
    }
  };

  const handleSubmit = (event) => {
    const jsonData = JSON.parse(text.slice(1, text.length - 1));
    build(jsonData);
    event.preventDefault();
  };

  return (
    <Wrapper>
      <Label htmlFor="json">Transform JSON in Boxes:</Label>
      <Text
        name="json"
        placeholder={`{"type":"container","items":[{"type":"box","color":"green"}]}`}
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