/* eslint-disable no-undef */
import { firebase, firebaseAuth, firestore } from './firebase';

// --> APP, Global
/**
 * get current user data
 * @param {string} uid
 */
export const getCurrentUserData = async uid => {
  const doc = await firestore.collection('users').doc(uid).get();
  const datas = doc.data();
  return datas;
};

/**
 * get user data by posts
 * @param {string} uid
 */
export const getUserDataByPost = async uid => {
  const response = await firestore.collection('users').doc(uid).get();
  const result = await Promise.resolve(response.data());
  return result;
};

/**
 * get follower, following user's uid of currentUser
 * @param {string} uid
 */
export const getCurrentUserFollowData = async uid => {
  const doc = await firestore.collection('follow').doc(uid).get();
  const datas = doc.data();
  return datas;
};

// --> MAIN
// --> post
/**
 * main page에서 posts(my posts, following users posts) 데이터 가져오는 함수
 * @param {Array} uids combined my uid and following users uid
 * @returns {Array} main posts
 */
export const getAllPosts = async ({ uids, dispatch, updateLastMainDocs }) => {
  const arr = uids.map(async uid => {
    const response = await firestore
      .collection('posts')
      .orderBy('date', 'desc')
      .where('uid', '==', uid)
      .limit(3)
      .get();
    const datas = response.docs.map(doc => doc.data());
    const last = response.docs[response.docs.length - 1];
    return { datas, last };
  });
  const promiseAll = await Promise.all(arr);
  const promiseAll2 = promiseAll.filter(item => item.last);
  dispatch(updateLastMainDocs(promiseAll2.map(item => item.last)));
  const result = promiseAll2
    .map(item => item.datas)
    .flatMap(v => v)
    .sort((a, b) => b.date - a.date);
  return result;
};

export const getNextMainPosts = async ({
  uids,
  lastDocs,
  dispatch,
  updateLastDocs,
}) => {
  const arr = uids.map(async (uid, index) => {
    if (!lastDocs[index]) return null;
    const response = await firestore
      .collection('posts')
      .orderBy('date', 'desc')
      .where('uid', '==', uid)
      .startAfter(lastDocs[index])
      .limit(3)
      .get();
    const datas = response.docs.map(doc => doc.data());
    const last = response.docs[response.docs.length - 1];
    return { datas, last };
  });
  const promiseAll = await Promise.all(arr);
  const promiseAll2 = promiseAll.filter(item => item);
  const promiseAll3 = promiseAll2.filter(item => item.last);
  dispatch(updateLastDocs(promiseAll3.map(item => item.last)));
  const result = promiseAll3
    .map(item => item.datas)
    .flatMap(v => v)
    .sort((a, b) => b.date - a.date);
  return result;
};

/**
 * 각각의 post에서 comments 가져오는 함수
 * @param {string} id post id
 */
export const getCommentsByPost = async id => {
  const response = await firestore
    .collection('posts')
    .doc(id)
    .collection('comments')
    .orderBy('date', 'asc')
    .get();
  let datas = [];
  response.forEach(res => datas.push(res.data()));
  return datas;
};

/**
 * post에 댓글 추가하는 함수
 * @param {string} id post id
 * @param {string} text comment
 * @param {number} date time stamp
 */
export const addCommentToPost = async (id, text, date) => {
  const { uid } = firebaseAuth.currentUser;
  await firestore.collection('posts').doc(id).collection('comments').doc().set({
    uid,
    date,
    text,
  });
};

/**
 * post에 좋아요 추가하는 함수
 * @param {string} id  좋아요한 게시물의 post id
 */
export const addHeartData = async id => {
  const { uid: currentUserUid } = firebaseAuth.currentUser;
  try {
    await firestore
      .collection('posts')
      .doc(id)
      .update({
        hearts: firebase.firestore.FieldValue.arrayUnion(currentUserUid),
      });
  } catch (e) {
    console.log('좋아요 클릭시 게시글이 삭제되어 에러뜸', e.message, id);
    return 'error';
  }
};

/**
 * post에 좋아요 없애는 함수
 * @param {string} id  좋아요한 게시물의 post id
 */
export const removeHeartData = async id => {
  const { uid: currentUserUid } = firebaseAuth.currentUser;
  try {
    await firestore
      .collection('posts')
      .doc(id)
      .update({
        hearts: firebase.firestore.FieldValue.arrayRemove(currentUserUid),
      });
  } catch (e) {
    console.log('좋아요 취소시 게시글이 삭제되어 에러뜸', e.message, id);
    return 'error';
  }
};

/**
 * post에 북마크를 추가하는 함수
 * @param {string} id  좋아요한 게시물의 post id
 */
export const addBookmarkData = async id => {
  const { uid: currentUserUid } = firebaseAuth.currentUser;
  try {
    await firestore
      .collection('posts')
      .doc(id)
      .update({
        bookmarks: firebase.firestore.FieldValue.arrayUnion(currentUserUid),
      });
  } catch (e) {
    console.log('북마크 클릭시 게시글이 삭제되어 에러뜸', e.message, id);
    return 'error';
  }
};

/**
 * post에 북마크를 없애는 함수
 * @param {string} id  좋아요한 게시물의 post id
 */
export const removeBookmarkData = async id => {
  const { uid: currentUserUid } = firebaseAuth.currentUser;
  try {
    await firestore
      .collection('posts')
      .doc(id)
      .update({
        bookmarks: firebase.firestore.FieldValue.arrayRemove(currentUserUid),
      });
  } catch (e) {
    console.log('북마크 클릭시 게시글이 삭제되어 에러뜸', e.message, id);
    return 'error';
  }
};

/**
 * update main post(상태 변화를 감시하고 즉시 변경)
 * @param {function} dispatch
 * @param {function} actionCreator
 * @param {string} id  상태값이 바뀐 게시물의 post id
 */
export const observeMainPost = (dispatch, actionCreator, id) => {
  firestore
    .collection('posts')
    .doc(id)
    .onSnapshot(snapshot => {
      dispatch(actionCreator(snapshot.data()));
    });
};

// --> PROFILE PAGE
/**
 * Profile Page에서 새로고침시 watchName의 uid 가져오기
 * @param {string} watchName, user's displayName
 * @return uid
 */
export const getUid = async watchName => {
  let uid = '';
  const docs = await firestore
    .collection('users')
    .where('displayName', '==', watchName)
    .get();
  docs.forEach(doc => (uid = doc.data().uid));
  return uid;
};

export const getUidByPostId = async id => {
  const response = await firestore.collection('posts').doc(id).get();
  return response.data().uid;
};
// --> follow data
/**
 * get follow data of searchUser by uid
 * @param {string} uid
 */
export const getProfileUserFollowData = async uid => {
  try {
    const doc = await firestore.collection('follow').doc(uid).get();
    const datas = doc.data();
    return datas;
  } catch (e) {
    // console.log(e);
    return e;
  }
};

// --> posts
/**
 * 클릭한 유저의 uid, profile page의 User에서 렌더링
 * @param {string} uid user's uid
 * @returns user object
 */
export const getProfileUserData = async uid => {
  const response = await firestore.collection('users').doc(uid).get();
  return response.data();
};

/**
 * 클릭한 유저의 uid, profile page에서 렌더링
 * @param {string} uid user's uid
 * @returns posts array
 */
export const getProfilePosts = async uid => {
  const response = await firestore
    .collection('posts')
    .where('uid', '==', uid)
    .get();
  let datas = [];
  response.forEach(res => datas.push(res.data()));
  return datas.sort((a, b) => b.date - a.date);
};

/**
 * update main post(상태 변화를 감시하고 즉시 변경)
 * @param {function} dispatch
 * @param {function} actionCreator
 * @param {string} id  상태값이 바뀐 게시물의 post id
 */
export const observeProfilePost = (dispatch, actionCreator, id) => {
  firestore
    .collection('posts')
    .doc(id)
    .onSnapshot(snapshot => {
      dispatch(actionCreator(snapshot.data()));
    });
};

// --> bookmark posts
/**
 * 클릭한 유저의 uid, profile page에서 렌더링
 * @param {string} uid user's uid
 * @returns bookmarks array
 */
export const getProfileBookmarkPosts = async uid => {
  const response = await firestore
    .collection('posts')
    .where('bookmarks', 'array-contains', uid)
    .get();
  let datas = [];
  response.forEach(res => datas.push(res.data()));
  return datas.reverse();
};

/**
 * update profile bookmark post(상태 변화를 감시하고 즉시 변경)
 * @param {function} dispatch
 * @param {function} actionCreator
 * @param {string} id  상태값이 바뀐 게시물의 post id
 */
export const observeProfileBookmarkPost = (dispatch, actionCreator, id) => {
  firestore
    .collection('posts')
    .doc(id)
    .onSnapshot(snapshot => {
      dispatch(actionCreator(snapshot.data()));
    });
};

// --> heart posts
/**
 * 클릭한 유저의 uid, profile page에서 렌더링
 * @param {string} uid user's uid
 * @returns hearts array
 */
export const getProfileHeartPosts = async uid => {
  const response = await firestore
    .collection('posts')
    .where('hearts', 'array-contains', uid)
    .get();
  let datas = [];
  response.forEach(res => datas.push(res.data()));
  return datas.reverse();
};

/**
 * update profile heart post(상태 변화를 감시하고 즉시 변경)
 * @param {function} dispatch
 * @param {function} actionCreator
 * @param {string} id  상태값이 바뀐 게시물의 post id
 */
export const observeProfileHeartPost = (dispatch, actionCreator, id) => {
  firestore
    .collection('posts')
    .doc(id)
    .onSnapshot(snapshot => {
      dispatch(actionCreator(snapshot.data()));
    });
};

/**
 * remove post data
 * @param {string} id post id
 */
export const removeMyPost = async id => {
  await firestore.collection('posts').doc(id).delete();
};

// update(remove) posts data & observe data
export const updatePostsData = async (
  dispatch,
  actionCreator,
  newPostIds = [],
) => {
  const { uid } = firebaseAuth.currentUser;
  const docs = await firestore
    .collection('posts')
    .doc(uid)
    .collection('main')
    .orderBy('date', 'desc')
    .limit(5)
    .get();
  if (docs.size === 0) {
    dispatch(actionCreator([]));
  } else {
    console.log('바뀐 데이터 가져옴?');
    const arr = docs.docChanges().map(async change => {
      const { uid, id } = change.doc.data();
      const doc = await firestore
        .collection('posts')
        .doc(uid)
        .collection('my-posts')
        .doc(id)
        .get();
      return doc.data();
    });
    const promiseAll = await Promise.all(arr);
    const result = promiseAll.filter(post => !newPostIds.includes(post.id));
    await dispatch(actionCreator(result));
  }
};

// update current user data
export const updateCurrentUserData = async (dispatch, actionCreator) => {
  const { uid } = firebaseAuth.currentUser;
  firestore
    .collection('users')
    .doc(uid)
    .onSnapshot(doc => {
      dispatch(actionCreator(doc.data()));
    });
};

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

// get searchUser data to users collection of firestore
export const getSearchUserData = async uid => {
  const doc = await firestore.collection('users').doc(uid).get();
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

// --> new post
export const generatedId = (collectionName = 'posts') => {
  const result = firestore.collection(collectionName).doc().id;
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

// --> ASIDE
/**
 * get suggetion users data by differenceSet(=uids)
 * @param {array} uids
 */
export const getSuggestionUsersData = async uids => {
  const arr = uids.map(async uid => {
    const doc = await firestore.collection('users').doc(uid).get();
    return doc.data();
  });
  const result = await Promise.all(arr);
  return result;
};

/**
 * update state of follow
 * @param {function} dispatch useDispatch react-redux hook
 * @param {function} actionCreator
 */
export const observeUsersFollowData = (dispatch, actionCreator) => {
  const { uid } = firebaseAuth.currentUser;
  firestore
    .collection('follow')
    .doc(uid)
    .onSnapshot(snapshot => {
      dispatch(actionCreator(snapshot.data()));
    });
};

// --> follow, unfollow
export const follow = async (currentUserUid, searchUserUid) => {
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
  const response = await firestore
    .collection('posts')
    .doc(searchUserUid)
    .collection('my-posts')
    .get();
  response.docs.forEach(async doc => {
    const { uid, id, date } = doc.data();
    await firestore
      .collection('posts')
      .doc(currentUserUid)
      .collection('main')
      .doc(id)
      .set({
        uid,
        id,
        date,
      });
  });
};

export const unfollow = async (currentUserUid, searchUserUid) => {
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
  const response = await firestore
    .collection('posts')
    .doc(searchUserUid)
    .collection('my-posts')
    .get();
  response.docs.forEach(async doc => {
    const { id } = doc;
    await firestore
      .collection('posts')
      .doc(currentUserUid)
      .collection('main')
      .doc(id)
      .delete();
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
export const getBookmarksData = async uid => {
  const response = await firestore.collection('bookmarks').doc(uid).get();
  return response.data();
};

// --> heart
// --> Profile page(hearts)
/**
 * get posts you liked
 * @param {string} uid uid or others
 * @returns
 */
export const getHeartsData = async uid => {
  const response = await firestore
    .collection('posts')
    .where('hearts', 'array-contains', uid)
    .get();
  let datas = [];
  response.forEach(res => datas.push(res.data()));
  return datas;
};

export const getUsersDataByHearts = async hearts => {
  console.log('좋아요를 누른 유저들의 데이터 가져오기~~~~');
  const response = await hearts.map(async uid => {
    const doc = await firestore.collection('users').doc(uid).get();
    return doc.data();
  });
  const result = await Promise.all(response);
  return result;
};

export const getDisplayName = async comments => {
  const arr = await comments.map(async comment => {
    const response = await firestore.collection('users').doc(comment.uid).get();
    const result = await Promise.resolve(response);
    return result.data().displayName;
  });
  const promiseAll = await Promise.all(arr);
  return promiseAll;
};

export const getPhotoURL = async comments => {
  const arr = await comments.map(async comment => {
    const response = await firestore.collection('users').doc(comment.uid).get();
    const result = await Promise.resolve(response);
    return result.data().photoURL;
  });
  const promiseAll = await Promise.all(arr);
  return promiseAll;
};

export const getUids = async comments => {
  const arr = await comments.map(async comment => {
    const response = await firestore.collection('users').doc(comment.uid).get();
    const result = await Promise.resolve(response);
    return result.data().uid;
  });
  const promiseAll = await Promise.all(arr);
  return promiseAll;
};

// --> DIRECT
/**
 * Get rooms by uid
 * @param {string} uid
 */
export const getRoomsByUid = async uid => {
  const response = await firestore
    .collection('direct')
    .where('participant', 'array-contains', uid)
    .orderBy('timeStamp', 'desc')
    .get();
  const roomsArr = response.docs.map(doc => doc.data());
  const roomsAll = await Promise.all(roomsArr);
  const rooms = await roomsAll.flatMap(v => v);
  return rooms;
};

/**
 * Direct messages
 * @param {string} uid current user's uid
 * @param {string} id room id(directId)
 * @return {array} messages
 */
export const getMessagesByRoomId = async id => {
  const response = await firestore
    .collection('direct')
    .doc(id)
    .collection('messages')
    .orderBy('timeStamp', 'desc')
    .get();
  const messagesArr = response.docs.map(doc => doc.data());
  const messagesAll = await Promise.all(messagesArr);
  return messagesAll;
};

/**
 * update direct rooms
 * @param {function} dispatch
 * @param {function} actionCreator
 * @param {string} uid
 */
export const updateDirectRooms = async (dispatch, actionCreator, uid) => {
  firestore
    .collection('direct')
    .where('participant', 'array-contains', uid)
    .orderBy('timeStamp', 'desc')
    .onSnapshot(snapshot => {
      const rooms = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        rooms.push(data);
      });
      dispatch(actionCreator(rooms));
    });
};

/**
 * update messages
 * @param {function} dispatch
 * @param {function} actionCreator
 * @param {string} id
 */
export const updateMsgs = async (dispatch, actionCreator, id) => {
  firestore
    .collection('direct')
    .doc(id) // directId
    .collection('messages')
    .orderBy('timeStamp', 'desc')
    .onSnapshot(snapshot => {
      const messages = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        messages.push(data);
      });
      dispatch(actionCreator(messages));
    });
};

/**
 * Get room data already created
 * @param {string} uid
 * @param {string} selectedUid
 */
export const getRoomDataAlreadyCreated = async (uid, selectedUid) => {
  const response = await firestore
    .collection('direct')
    .where('from', '==', uid)
    .where('participant', 'array-contains', selectedUid)
    .get();
  let data = {};
  response.docs.forEach(doc => {
    data = doc.data();
  });
  return data;
};
