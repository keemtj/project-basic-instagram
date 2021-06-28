/* eslint-disable no-undef */
import { firebase, firebaseAuth, firestore } from './firebase';

// --> APP
// get current user data
export const getCurrentUserData = async uid => {
  const doc = await firestore.collection('users').doc(uid).get();
  const datas = doc.data();
  return datas;
};

export const getAllPosts = async uid => {
  let datas = [];
  const mainDocs = await firestore
    .collection('posts')
    .doc(uid)
    .collection('main')
    .orderBy('date', 'desc')
    .limit(5)
    .get();
  mainDocs.forEach(doc => datas.push(doc.data()));
  const arr = datas.map(async data => {
    const { uid, id } = data;
    const response = await firestore
      .collection('posts')
      .doc(uid)
      .collection('my-posts')
      .doc(id)
      .get();
    return response.data();
  });
  const result = await Promise.all(arr);
  return result;
};

// remove post data
export const removePostData = async (currentUserUid, id, followers) => {
  const response = await firestore
    .collection('posts')
    .doc(currentUserUid)
    .collection('my-posts')
    .doc(id)
    .get();
  const { bookmarks, hearts } = response.data();
  console.log(
    '0. Get uid data of all users who saved or liked my post to be deleted',
  );
  await bookmarks.forEach(async uid => {
    await firestore
      .collection('bookmark')
      .doc(uid) // 나의 포스트를 '북마크'한 유저의 uid
      .update({
        bookmarks: firebase.firestore.FieldValue.arrayRemove({
          uid: currentUserUid, // 나의 uid
          id, // 나의 post id
        }),
      });
  });
  console.log('1. Remove bookmarks data of all users who saved my post');
  await hearts.forEach(async uid => {
    await firestore
      .collection('heart')
      .doc(uid)
      .update({
        hearts: firebase.firestore.FieldValue.arrayRemove({
          uid: currentUserUid, // 나의 포스트를 '좋아요'한 유저의 uid
          id, // 나의 post id
        }),
      });
  });
  console.log('2. Remove hearts data of all users who liked my post');
  await firestore
    .collection('posts')
    .doc(currentUserUid)
    .collection('my-posts')
    .doc(id)
    .delete();
  console.log('3. Remove post data of firestore');
  await firestore
    .collection('posts')
    .doc(currentUserUid)
    .collection('main')
    .doc(id)
    .delete();
  console.log('4. Removee post data of main collection');
  await followers.forEach(async uid => {
    await firestore
      .collection('posts')
      .doc(uid)
      .collection('main')
      .doc(id)
      .delete();
  });
  console.log('5. Remove post data to collection of followers');
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
// get follow data of currentUser by uid
export const getCurrentUserFollowData = async uid => {
  const doc = await firestore.collection('follow').doc(uid).get();
  const datas = doc.data();
  return datas;
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

// get user data by posts
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

// get users data by differenceSet(=uids)
export const getUsersData = async uids => {
  const arr = await uids.map(async uid => {
    const doc = await firestore.collection('users').doc(uid).get();
    return doc.data();
  });
  const result = await Promise.all(arr);
  return result;
};

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
  try {
    await firestore
      .collection('bookmark')
      .doc(currentUserUid)
      .update({
        bookmarks: firebase.firestore.FieldValue.arrayUnion({
          uid,
          id,
        }),
      });
    await firestore
      .collection('posts')
      .doc(uid) // 내가 북마크를 누른 유저의 uid
      .collection('my-posts')
      .doc(id) // 내가 북마크를 누른 유저의 post id
      .update({
        bookmarks: firebase.firestore.FieldValue.arrayUnion(currentUserUid),
      }); // 내 uid(current User uid)를 추가
  } catch (e) {
    console.log('북마크 클릭시 게시글이 삭제되어 에러뜸', e.message, uid, id);
    await firestore
      .collection('bookmark')
      .doc(currentUserUid)
      .update({
        bookmarks: firebase.firestore.FieldValue.arrayRemove({
          uid,
          id,
        }),
      });
    return 'error';
  }
};

export const removeBookmarkData = async (currentUserUid, uid, id) => {
  try {
    await firestore
      .collection('bookmark')
      .doc(currentUserUid)
      .update({
        bookmarks: firebase.firestore.FieldValue.arrayRemove({
          uid,
          id,
        }),
      });
    await firestore
      .collection('posts')
      .doc(uid) // 내가 북마크를 누른 유저의 uid
      .collection('my-posts')
      .doc(id) // 내가 북마크를 누른 유저의 post id
      .update({
        bookmarks: firebase.firestore.FieldValue.arrayRemove(currentUserUid),
      }); // 내 uid(current User uid)를 제거
  } catch (e) {
    console.log('북마크 클릭시 게시글이 삭제되어 에러뜸', e.message, uid, id);
    await firestore
      .collection('bookmark')
      .doc(currentUserUid)
      .update({
        bookmarks: firebase.firestore.FieldValue.arrayRemove({
          uid,
          id,
        }),
      });
    return 'error';
  }
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
  try {
    await firestore
      .collection('heart')
      .doc(currentUserUid)
      .update({
        hearts: firebase.firestore.FieldValue.arrayUnion({ uid, id }),
      });
    await firestore
      .collection('posts')
      .doc(uid) // 내가 좋아요를 누른 유저의 uid
      .collection('my-posts')
      .doc(id) // 내가 좋아요를 누른 유저의 post id
      .update({
        hearts: firebase.firestore.FieldValue.arrayUnion(currentUserUid),
      }); // 내 uid(current User uid)를 추가
  } catch (e) {
    console.log('좋아요 클릭시 게시글이 삭제되어 에러뜸', e.message, uid, id);
    await firestore
      .collection('heart')
      .doc(currentUserUid)
      .update({
        hearts: firebase.firestore.FieldValue.arrayRemove({ uid, id }),
      });
    return 'error';
  }
};

export const removeHeartData = async (currentUserUid, uid, id) => {
  try {
    await firestore
      .collection('heart')
      .doc(currentUserUid)
      .update({
        hearts: firebase.firestore.FieldValue.arrayRemove({ uid, id }),
      });
    await firestore
      .collection('posts')
      .doc(uid) // 내가 좋아요를 누른 유저의 uid
      .collection('my-posts')
      .doc(id) // 내가 좋아요를 누른 유저의 post id
      .update({
        hearts: firebase.firestore.FieldValue.arrayRemove(currentUserUid),
      }); // 내 uid(current User uid)를 제거
  } catch (e) {
    console.log('좋아요 취소시 게시글이 삭제되어 에러뜸', e);
    await firestore
      .collection('heart')
      .doc(currentUserUid)
      .update({
        hearts: firebase.firestore.FieldValue.arrayRemove({ uid, id }),
      });
    return 'error';
  }
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

export const getUsersDataByHearts = async hearts => {
  console.log('좋아요를 누른 유저들의 데이터 가져오기~~~~');
  const response = await hearts.map(async uid => {
    const doc = await firestore.collection('users').doc(uid).get();
    return doc.data();
  });
  const result = await Promise.all(response);
  return result;
};

// add comment
export const addCommentToPost = async (postUid, id, comment) => {
  const { uid } = firebaseAuth.currentUser;
  await firestore
    .collection('posts')
    .doc(postUid)
    .collection('my-posts')
    .doc(id)
    .update({
      comments: firebase.firestore.FieldValue.arrayUnion({
        comment,
        date: Date.now(),
        uid,
      }),
    });
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
