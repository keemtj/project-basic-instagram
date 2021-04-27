import { firestore } from './firebase';

//  get currentUser data to users collection of firestore
export const getCurrentUserData = async uid => {
  const doc = await firestore.collection('users').doc(uid).get();
  const datas = doc.data();
  return datas;
};

// get follow data of currentUser by uid
export const getFollowData = async uid => {
  const doc = await firestore.collection('follow').doc(uid).get();
  const datas = doc.data();
  return datas;
};

// get uid followed me
export const getFollowedMe = async uid => {
  let followed = [];
  const docs = await firestore
    .collection('follow')
    .where('following', 'array-contains', uid)
    .get();
  docs.forEach(doc => {
    const { uid, displayName } = doc.data();
    followed.push({ uid, displayName });
  });
  return followed;
};

// get posts by currentUser
export const getCurrentUserPostsData = async uid => {
  let datas = [];
  const docs = await firestore
    .collection('posts')
    .doc(uid)
    .collection('my-posts')
    .orderBy('date', 'desc')
    .get();
  docs.forEach(doc => datas.push(doc.data()));
  return datas;
};

// get all posts by following
export const getAllPostsByFollowing = async following => {
  const arr = await following.map(async uid => {
    let datas = [];
    const docs = await firestore
      .collection('posts')
      .doc(uid)
      .collection('my-posts')
      .orderBy('date', 'desc')
      .get();
    docs.forEach(doc => datas.push(doc.data()));
    return datas;
  });
  // arr = [Promise, Promise];
  const promiseAll = await Promise.all(arr);
  const result = await promiseAll.flatMap(v => v);
  return result;
};

// get user data by displayname
export const getUserDataByDisplayName = async displayName => {
  let findUser = [];
  const docs = await firestore
    .collection('users')
    .where('displayName', '==', displayName)
    .get();
  docs.forEach(doc => findUser.push(doc.data()));
  return findUser;
};
