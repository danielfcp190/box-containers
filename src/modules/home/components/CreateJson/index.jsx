import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { addBox, addContainer } from "../../../../../store/actions";

export default function CreateJson() {
  const [text, setText] = useState("");
  const [content, setContent] = useState([]);
  const state = useSelector((state) => state.containerReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    setContent(state);
  });

  const rebuildOriginalJson = (array) => {
    for (let i in array) {
      delete array[i].id;
      delete array[i].parentId;
      delete array[i].containerId;
      if (array[i].items) {
        rebuildOriginalJson(array[i].items);
      }
    }
  };

  let parentId = 0;
  const build = (data) => {
    let containerId = Math.floor(Math.random() * 10001);
    for (let i in data) {
      if (data[i] === "container") {
        dispatch(
          addContainer({
            type: "container",
            items: [],
            parentId: parentId,
            containerId: containerId,
          })
        );
        parentId = containerId;
      } else if (data[i] !== "container") {
        for (let j in data[i]) {
          if (data[i][j].type === "box") {
            data[i][j].color
              ? dispatch(
                  addBox({
                    parentId: containerId,
                    type: "box",
                    color: `${data[i][j].color}`,
                  })
                )
              : dispatch(
                  addBox({
                    parentId: containerId,
                    type: "box",
                    color: "orange",
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
    event.preventDefault();
    rebuildOriginalJson(content);
    let jsonString = JSON.stringify(content);
    setText(`"` + jsonString.slice(1, jsonString.length - 1) + `"`);
    const jsonData = JSON.parse(jsonString.slice(1, jsonString.length - 1));
    build(jsonData);
  };

  return (
    <Wrapper>
      <Label htmlFor="json">Print boxes&apos;s JSON in the textbox:</Label>
      <Button onClick={handleSubmit}>Create JSON</Button>
      <Text name="json" value={text} readOnly />
    </Wrapper>
  );
}

const Wrapper = styled.div`
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
  margin-right: 1rem;
  height: 2.5rem;
  cursor: pointer;
  align-self: center;
  white-space: nowrap;
  :active {
    transform: scale(-3%, -3%);
    transition: 0.5s;
  }
`;
