export const setItemToLocalStorage = arr =>
  localStorage.setItem('recent', JSON.stringify(arr));

export const addRecent = (arr, obj) => {
  const filtered = arr.filter(user => user.uid !== obj.uid);
  filtered.unshift(obj);
  // if (filtered.length > 10) {
  //   filtered.pop();
  // }
  setItemToLocalStorage(filtered);
  return filtered;
};

export const removeRecent = (arr, obj) => {
  const filtered = arr.filter(user => user.uid !== obj.uid);
  setItemToLocalStorage(filtered);
  return filtered;
};

export const allClearRecent = () => {
  setItemToLocalStorage([]);
  return [];
};
