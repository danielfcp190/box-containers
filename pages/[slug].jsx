import { useDispatch, useSelector } from "react-redux";
import { addBox, addContainer } from "../store/actions";
import Container from "../src/modules/home/components/Container";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function BoxContainersfromId() {
  const state = useSelector((state) => state.containerReducer);
  const dispatch = useDispatch();
  const router = useRouter();
  const [data, setData] = useState([]);
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

  const renderContent = () => {
    return content?.map(
      (item) =>
        item.type === "container" && (
          <Container
            key={item.id}
            parentId={item.parentId}
            // eslint-disable-next-line react/no-children-prop
            children={item.items}
          />
        )
    );
  };

  useEffect(() => {
    const getData = async () => {
      await axios(`api/${router.query.slug}`)
        .then((response) => {
          setData(response.data);
        })
        .then(() => {
          rebuildOriginalJson(data);
          buildModelFromJson(data[0], 0);
          setContent(state);
        });
    };
    getData();
  });

  return <>{renderContent()}</>;
}
