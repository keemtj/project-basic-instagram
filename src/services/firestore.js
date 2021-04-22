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

// get DisplayName followed me
export const getFollowedMe = async displayName => {
  let followedMe = [];
  const docs = await firestore
    .collection('follow')
    .where('following', 'array-contains', displayName)
    .get();
  docs.forEach(doc => followedMe.push(doc.data().displayName));
  return followedMe;
};

// get posts by currentUser
export const getCurrentUserPostsData = async uid => {
  let posts = [];
  const userPosts = await firestore
    .collection('posts')
    .doc(uid)
    .collection('my-posts')
    .get();
  userPosts.forEach(doc => posts.push(doc.data()));
  return posts;
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
