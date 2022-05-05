import { useDispatch } from "react-redux";
import { addBox, addContainer } from "../../store/actions";

export function useBuildModelFromJson(data, parentId) {
  const dispatch = useDispatch();
  function buildModelFromJson(data, parentId) {
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
  }
  return buildModelFromJson(data, parentId);
}
