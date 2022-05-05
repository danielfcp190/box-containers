export function useBuildJsonFromModel(data) {
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

  return rebuildOriginalJson(data);
}
