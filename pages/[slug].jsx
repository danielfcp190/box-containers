import { useDispatch, useSelector } from "react-redux";
import { addBox, addContainer } from "../store/actions";
import Container from "../src/modules/home/components/Container";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function BoxContainersfromId() {
  const router = useRouter();
  const { slug } = router.query;
  const state = useSelector((state) => state.containerReducer);
  const dispatch = useDispatch();
  const [content, setContent] = useState([]);

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

  const buildModelFromJson = (data, parentId) => {
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
            buildModelFromJson(data[i][j], parentId);
          }
        }
      }
    }
  };

  useEffect(() => {
    setContent(state);
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`api/${slug}`);
      const result = await response.data;
      rebuildOriginalJson(result);
      buildModelFromJson(result[0], 0);
    };
    if (slug) {
      fetchData();
    }
  }, [slug]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    const json = JSON.stringify(content);
    await axios.put(`api/${slug}`, { slug, json });
  };

  return (
    <>
      {content.length > 0 &&
        content.map(
          (item) =>
            item.type === "container" && (
              <Container
                key={item.id}
                parentId={item.parentId}
                // eslint-disable-next-line react/no-children-prop
                children={item.items}
              />
            )
        )}
      <Button onClick={handleUpdate}>Update Model</Button>
    </>
  );
}

const Button = styled.button`
  width: 30vw;
  border-radius: 0.5rem;
  height: 2.5rem;
  cursor: pointer;
  white-space: nowrap;
  margin: 3rem 3rem;
  :active {
    transform: scale(-3%, -3%);
    transition: 0.5s;
  }
`;
