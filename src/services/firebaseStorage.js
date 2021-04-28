import { firebaseStorage } from './firebase';

// get post images to storage
export const getPostImages = async ({ uid, id, images }) => {
  const arr = await images.map(async filename => {
    const url = await firebaseStorage
      .ref()
      .child(`/${uid}/${id}/${filename}`)
      .getDownloadURL();
    return url;
  });
  const promiseAll = await Promise.all(arr);
  const result = { id, srcs: promiseAll };
  return result;
};
