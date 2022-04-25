import CreateJson from "../../components/CreateJson";
import TextArea from "../../components/TextArea";
import SaveJson from "../../components/SaveJson";
import styled from "styled-components";
import Header from "../../components/Header";

export default function HomeScreen() {
  return (
    <Wrapper>
      <Header />
      <TextArea />
      <CreateJson />
      <SaveJson />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 90vw;
  height: auto;
  display: flex;
  flex-direction: column;

  align-items: center;
  margin: 5rem auto;
`;
