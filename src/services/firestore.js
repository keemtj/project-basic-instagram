import { firebase, firebaseAuth, firestore } from './firebase';

// NOTE main page
// get current user data
export const getCurrentUserData = async uid => {
  const doc = await firestore.collection('users').doc(uid).get();
  const datas = doc.data();
  return datas;
};

// get follow data of currentUser by uid
export const getCurrentUserFollowData = async uid => {
  const doc = await firestore.collection('follow').doc(uid).get();
  const datas = doc.data();
  return datas;
};

// get posts data
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
export const getPostsByAllFollowing = async following => {
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
  const promiseAll = await Promise.all(arr);
  const result = await promiseAll.flatMap(v => v);
  return result;
};

// =======================================================
export const getUserDataByPost = async uid => {
  const response = await firestore.collection('users').doc(uid).get();
  const result = await Promise.resolve(response.data());
  return result;
};

// get searchUser data to users collection of firestore
export const getSearchUserData = async uid => {
  const doc = await firestore.collection('users').doc(uid).get();
  const datas = doc.data();
  return datas;
};

// get follow data of searchUser by uid
export const getSearchUserFollowData = async uid => {
  try {
    const doc = await firestore.collection('follow').doc(uid).get();
    const datas = doc.data();
    return datas;
  } catch (e) {
    // console.log(e);
    return e;
  }
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

// Profile Page에서 새로고침시 watchName에 맞는 uid 가져오기
export const getUid = async watchName => {
  let uid = '';
  const docs = await firestore
    .collection('users')
    .where('displayName', '==', watchName)
    .get();
  docs.forEach(doc => (uid = doc.data().uid));
  return uid;
};

// --> new post
export const generatedId = () => {
  const result = firestore.collection('posts').doc().id;
  return result;
};

// --> get user search results by name
export const getUserSearchResultByDisplayName = async value => {
  if (value === '') return null;
  // NOTE displayName >= value, limit(10)
  let datas = [];
  const docs = await firestore.collection('users').get();
  docs.forEach(doc => {
    datas.push(doc.data());
  });
  const regex = new RegExp(`${value}`, 'i');
  const result = datas
    .filter(data => {
      return regex.test(data.displayName);
    })
    .sort((a, b) => a.displayName.localeCompare(b.displayName));
  return result;
};

// --> follow, unfollow
export const follow = async (currentUserUid, searchUserUid) => {
  console.log('follow!!');
  await firestore
    .collection('follow')
    .doc(currentUserUid)
    .update({
      following: firebase.firestore.FieldValue.arrayUnion(searchUserUid),
    });
  await firestore
    .collection('follow')
    .doc(searchUserUid)
    .update({
      followers: firebase.firestore.FieldValue.arrayUnion(currentUserUid),
    });
};

export const unfollow = async (currentUserUid, searchUserUid) => {
  console.log('unfollow');
  await firestore
    .collection('follow')
    .doc(currentUserUid)
    .update({
      following: firebase.firestore.FieldValue.arrayRemove(searchUserUid),
    });
  await firestore
    .collection('follow')
    .doc(searchUserUid)
    .update({
      followers: firebase.firestore.FieldValue.arrayRemove(currentUserUid),
    });
};

// --> post data by single post
export const getPostBySinglePost = async payload => {
  const { postUid: uid, postId: postId } = payload;
  const response = await firestore
    .collection('posts')
    .doc(uid)
    .collection('my-posts')
    .doc(postId)
    .get();
  return response.data();
};

// --> bookmarking
export const observeBookmark = (dispatch, actionCreator) => {
  const { uid } = firebaseAuth.currentUser;
  firestore
    .collection('bookmark')
    .doc(uid)
    .onSnapshot(snapshot => {
      dispatch(actionCreator(snapshot.data().bookmarks));
    });
};

export const getBookmarksData = async uid => {
  const response = await firestore.collection('bookmark').doc(uid).get();
  return response.data();
};

export const addBookmarkData = async (currentUserUid, uid, id) => {
  /**
   * @param currentUserUid 현재 활동중인 유저의 uid
   * @param uid 선택한 게시물을 올린 유저의 uid
   * @param postId  선택한 게시물의 postId(postId)
   */
  await firestore
    .collection('bookmark')
    .doc(currentUserUid)
    .update({
      bookmarks: firebase.firestore.FieldValue.arrayUnion({
        uid,
        id,
      }),
    });
};

export const removeBookmarkData = async (currentUserUid, uid, id) => {
  await firestore
    .collection('bookmark')
    .doc(currentUserUid)
    .update({
      bookmarks: firebase.firestore.FieldValue.arrayRemove({
        uid,
        id,
      }),
    });
};

export const getPostsByBookmarks = async bookmarks => {
  console.log('저장된 북마크 posts 가져오기~~~~~');
  const response = await bookmarks.map(async ({ uid, id }) => {
    const doc = await firestore
      .collection('posts')
      .doc(uid)
      .collection('my-posts')
      .doc(id)
      .get();
    return doc.data();
  });
  const result = await Promise.all(response);
  return result;
};

// --> heart
export const observeHeart = (dispatch, actionCreator) => {
  const { uid } = firebaseAuth.currentUser;
  firestore
    .collection('heart')
    .doc(uid)
    .onSnapshot(snapshot => {
      dispatch(actionCreator(snapshot.data().hearts));
    });
};

export const getHeartsData = async uid => {
  const response = await firestore.collection('heart').doc(uid).get();
  return response.data();
};

export const addHeartData = async (currentUserUid, uid, id) => {
  /**
   * @param currentUserUid 현재 활동중인 유저의 uid
   * @param uid 선택한 게시물을 올린 유저의 uid
   * @param postId  선택한 게시물의 postId(postId)
   */
  await firestore
    .collection('heart')
    .doc(currentUserUid)
    .update({
      hearts: firebase.firestore.FieldValue.arrayUnion({ uid, id }),
    });
};

export const removeHeartData = async (currentUserUid, uid, id) => {
  await firestore
    .collection('heart')
    .doc(currentUserUid)
    .update({
      hearts: firebase.firestore.FieldValue.arrayRemove({ uid, id }),
    });
};

export const increaseHeartCount = async (uid, id) => {
  await firestore
    .collection('posts')
    .doc(uid)
    .collection('my-posts')
    .doc(id)
    .update({ heartCount: firebase.firestore.FieldValue.increment(1) });
};

export const decreaseHeartCount = async (uid, id) => {
  await firestore
    .collection('posts')
    .doc(uid)
    .collection('my-posts')
    .doc(id)
    .update({ heartCount: firebase.firestore.FieldValue.increment(-1) });
};

export const getPostsByHearts = async hearts => {
  console.log('저장된 좋아요 posts 가져오기~~~~~');
  const response = await hearts.map(async ({ uid, id }) => {
    const doc = await firestore
      .collection('posts')
      .doc(uid)
      .collection('my-posts')
      .doc(id)
      .get();
    return doc.data();
  });
  const result = await Promise.all(response);
  return result;
};
