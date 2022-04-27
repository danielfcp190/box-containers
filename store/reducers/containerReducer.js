const containerReducer = (
  state = [
    {
      id: Math.floor(Math.random() * 10001),
      parentId: 0,
      containerId: 0,
      type: "container",
      items: [],
    },
  ],
  action
) => {
  switch (action.payload) {
    case "ADD_BOX":
      const mapping = (arr) => {
        arr?.map((item) =>
          item.type === "container"
            ? item.parentId === action.parentId
              ? item.items.push({
                  id: action.id,
                  type: action.type,
                  color: action.color,
                })
              : mapping(item.items)
            : item
        );
      };

      mapping(state);
      return state;

    case "ADD_NEW_BOX":
      const mappingNewBox = (arr) => {
        arr?.map((item) =>
          item.type === "container"
            ? item.parentId === action.parentId
              ? item.items.push({
                  id: action.id,
                  type: action.type,
                  color: action.color,
                })
              : mappingNewBox(item.items)
            : item
        );
      };

      mappingNewBox(state);
      return state;

    case "ADD_CONTAINER":
      const mappingContainer = (arr) => {
        arr?.map((item) =>
          item.type === "container"
            ? item.parentId === action.parentId
              ? item.items.push({
                  id: action.id,
                  parentId: action.containerId,
                  type: action.type,
                  items: action.items,
                })
              : mappingContainer(item.items)
            : item
        );
      };

      action.parentId === 0
        ? (state = [
            {
              id: action.id,
              parentId: action.containerId,
              type: action.type,
              items: action.items,
            },
          ])
        : mappingContainer(state);

      return state;

    case "ADD_NEW_CONTAINER":
      const mappingNewContainer = (arr) => {
        arr?.map((item) =>
          item.type === "container"
            ? item.parentId === action.parentId
              ? item.items.push({
                  id: action.id,
                  parentId: action.containerId,
                  type: action.type,
                  items: action.items,
                })
              : mappingNewContainer(item.items)
            : item
        );
      };

      mappingNewContainer(state);
      return state;

    default:
      return state;
  }
};

export default containerReducer;
