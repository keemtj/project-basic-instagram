import { firebaseStorage } from './firebase';

// get post images to storage at Profile page
export const getPostImagesUrlFromStorage = async ({ uid, id, images }) => {
  // TODO: url
  const urlDatas = await images.map(async filename => {
    const url = await firebaseStorage
      .ref()
      .child(`/${uid}/${id}/${filename}`)
      .getDownloadURL();
    return url;
  });
  const srcs = await Promise.all(urlDatas);

  // TODO:  time created
  const timeCreatedDatas = await images.map(async filename => {
    const metaData = await firebaseStorage
      .ref()
      .child(`/${uid}/${id}/${filename}`)
      .getMetadata();
    return metaData;
  });
  const promiseAll2 = await Promise.all(timeCreatedDatas);
  const date = new Date(promiseAll2.map(d => d.timeCreated)[0]);
  const result = { id, srcs, date };
  // console.log(result);
  return result;
};
