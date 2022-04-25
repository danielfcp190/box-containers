let nextBoxId = 200;
let nextContainerId = 0;

export const addBox = ({ level, type, color }) => ({
  payload: "ADD_BOX",
  id: nextBoxId++,
  level,
  type,
  color,
});

export const addContainer = ({ level, type, items }) => ({
  payload: "ADD_CONTAINER",
  id: nextContainerId++,
  level,
  type,
  items,
});

export const addNewBox = ({ level, type, color }) => ({
  payload: "ADD_NEW_BOX",
  id: nextBoxId++,
  level,
  type,
  color,
});

export const addNewContainer = ({ level, type, items }) => ({
  payload: "ADD_NEW_CONTAINER",
  id: nextContainerId++,
  level,
  type,
  items,
});
