import { firestore } from './firebase';

//  get currentUser data to users collection of firestore
export const getCurrentUserData = async uid => {
  const doc = await firestore.collection('users').doc(uid).get();
  const datas = doc.data();
  return datas;
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
