import React from "react";
import styled from "styled-components";
import axios from "axios";
import { connect } from "react-redux";
import { useRouter } from "next/router";

function SaveJson({ container }) {
  const router = useRouter();
  let id;

  const getId = () => {
    try {
      axios.get("/api/containers").then((res) => (id = res.data.length + 1));
    } catch (err) {
      console.log(err);
    }
  };

  getId();

  const saveJson = (event) => {
    event.preventDefault();
    const json = JSON.stringify(container);
    try {
      axios
        .post("/api/containers", {
          id,
          json,
        })
        .then(router.push(`https://box-containers.vercel.app/${id}`));
      // alert(
      //   `You can check the Containers on: https://box-containers.vercel.app/api/${id}`
      // );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button onClick={saveJson}>Save JSON</Button>
    </>
  );
}

const mapStateToProps = (state) => ({ container: state.containerReducer });

export default connect(mapStateToProps)(SaveJson);

const Button = styled.button`
  width: 30vw;
  border-radius: 0.5rem;
  height: 2.5rem;
  cursor: pointer;
  white-space: nowrap;
  margin-top: 3rem;
  :active {
    transform: scale(-3%, -3%);
    transition: 0.5s;
  }
`;
