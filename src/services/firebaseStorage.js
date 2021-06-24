import { firebaseStorage } from './firebase';

// // NOTE get post images to storage at Profile page
// export const getPostImagesUrlFromStorage = async ({ uid, id, images }) => {
//   // TODO: url
//   const urlDatas = await images.map(async filename => {
//     const url = await firebaseStorage
//       .ref()
//       .child(`/${uid}/${id}/${filename}`)
//       .getDownloadURL();
//     return url;
//   });
//   const srcs = await Promise.all(urlDatas);

//   // TODO:  time created
//   const timeCreatedDatas = await images.map(async filename => {
//     const metaData = await firebaseStorage
//       .ref()
//       .child(`/${uid}/${id}/${filename}`)
//       .getMetadata();
//     return metaData;
//   });
//   const promiseAll2 = await Promise.all(timeCreatedDatas);
//   const date = new Date(promiseAll2.map(d => d.timeCreated)[0]);
//   const result = { id, srcs, date };
//   // console.log(result);
//   return result;
// };

// remove images by post data
export const removeImagesByPostData = async (
  imagesArray,
  currentUserUid,
  id,
) => {
  await imagesArray.forEach(({ name }) => {
    firebaseStorage.ref(`/${currentUserUid}/${id}/${name}`).delete();
  });
  console.log('4. Remove images of storage');
};
