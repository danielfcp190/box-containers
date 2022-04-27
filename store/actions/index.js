export const addBox = ({ parentId, type, color }) => ({
  payload: "ADD_BOX",
  id: Math.floor(Math.random() * 10001),
  parentId,
  type,
  color,
});

export const addContainer = ({ parentId, containerId, type, items }) => ({
  payload: "ADD_CONTAINER",
  id: Math.floor(Math.random() * 10001),
  parentId,
  containerId,
  type,
  items,
});

export const addNewBox = ({ parentId, type, color }) => ({
  payload: "ADD_NEW_BOX",
  id: Math.floor(Math.random() * 10001),
  parentId,
  type,
  color,
});

export const addNewContainer = ({ parentId, containerId, type, items }) => ({
  payload: "ADD_NEW_CONTAINER",
  id: Math.floor(Math.random() * 10001),
  parentId,
  containerId,
  type,
  items,
});

export const changeBoxColor = ({ id, color, type }) => ({
  payload: "CHANGE_BOX_COLOR",
  type,
  id,
  color,
});
