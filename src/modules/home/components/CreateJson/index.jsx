import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

function CreateJson({ container }) {
  const [text, setText] = useState("");
  const [content, setContent] = useState([]);

  useEffect(() => {
    setContent(container);
  });

  const rebuildOriginalJson = (array) => {
    for (let i in array) {
      delete array[i].id;
      delete array[i].level;
      if (array[i].items) {
        rebuildOriginalJson(array[i].items);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    rebuildOriginalJson(content);
    let jsonString = JSON.stringify(content);
    setText(jsonString);
  };

  return (
    <Wrapper>
      <Label htmlFor="json">Print boxes&apos;s JSON in the textbox:</Label>
      <Button onClick={handleSubmit}>Create JSON</Button>
      <Text name="json" value={text} />
    </Wrapper>
  );
}

const mapStateToProps = (state) => ({ container: state.containerReducer });

export default connect(mapStateToProps)(CreateJson);

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
