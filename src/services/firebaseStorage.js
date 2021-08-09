import { firebaseStorage } from './firebase';

/**
 * remove images by post data
 * @param {array} imagesArray
 * @param {string} currentUserUid
 * @param {string} id
 */
export const removeImagesByPostData = (imagesArray, currentUserUid, id) => {
  console.log(imagesArray);
  imagesArray.forEach(({ name }) => {
    firebaseStorage.ref(`/${currentUserUid}/${id}/${name}`).delete();
  });
  console.log('Remove images');
};
