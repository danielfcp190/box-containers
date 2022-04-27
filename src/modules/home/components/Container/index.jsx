/* eslint-disable react/no-children-prop */
import React, { useState } from "react";
import styled from "styled-components";
import Box from "../Box";
import { addNewBox, addNewContainer } from "../../../../../store/actions";
import { useDispatch } from "react-redux";

export default function Container({ children, parentId }) {
  const [buttonFocus, setButtonFocus] = useState(false);
  const dispatch = useDispatch();

  const handleBox = () => {
    dispatch(
      addNewBox({
        parentId: parentId,
        type: "box",
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      })
    );

    setButtonFocus(false);
  };

  const handleContainer = () => {
    dispatch(
      addNewContainer({
        parentId: parentId,
        containerId: Math.floor(Math.random() * 10001),
        type: "container",
        items: [],
      })
    );
    setButtonFocus(false);
  };

  return (
    <>
      <Wrapper>
        <ContentWrapper>
          {children.map((item) =>
            item.type === "box" ? (
              <Box
                id={item.id}
                key={item.id}
                color={item.color}
                parentId={item.parentId}
              />
            ) : (
              <Container
                key={item.id}
                parentId={item.parentId}
                children={item.items}
              />
            )
          )}
        </ContentWrapper>
        <ButtonsWrapper>
          <Button onClick={() => setButtonFocus(true)}>Add</Button>
          {buttonFocus && (
            <>
              <FocusButtonsWrapper>
                <Button onClick={handleBox}>Box</Button>
                <Button onClick={handleContainer}>Container</Button>
              </FocusButtonsWrapper>
              <ExitFocusButtons onClick={() => setButtonFocus(false)}>
                X
              </ExitFocusButtons>
            </>
          )}
        </ButtonsWrapper>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  height: auto;
  max-width: fit-content;
  padding: 1rem;
  margin: 1rem;
  display: flex;
  /* flex-wrap: wrap; */
  align-items: center;
  border: 1px solid black;
  align-self: flex-start;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ButtonsWrapper = styled.div`
  position: relative;
`;

const Button = styled.button`
  border-radius: 0.5rem;
  padding: 0rem 3rem;
  margin: 0 1rem;
  height: 2.5rem;
  cursor: pointer;
  :active {
    transform: scale(-3%, -3%);
    transition: 0.5s;
  }
`;

const FocusButtonsWrapper = styled.div`
  position: absolute;
  z-index: 10;
  display: flex;
  transform: translate(-4.5rem, -4rem);
`;

const ExitFocusButtons = styled.span`
  position: absolute;
  z-index: 10;
  transform: translate(-1rem, 1rem);
  cursor: pointer;
`;
