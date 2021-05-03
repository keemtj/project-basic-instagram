import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../../Component/Main/Post';
import { getFollowingPostImages, getPostImages } from '../../Modules/images';
import { firebaseAuth } from '../../services/firebase';

const PostContainer = ({ post }) => {
  const dispatch = useDispatch();
  const {
    images,
    heartCount,
    text,
    isPossibleComment,
    comments,
    date,
    location,
    displayName,
    uid: uidByPost,
    id,
  } = post;

  // -->
  // FIXME: images data 수정
  // const imagesArray = useSelector(state => state.posts.myPosts.data);
  // const srcs = imagesArray.find(v => v.id === id)?.data?.srcs;

  // NOTE 수정본
  const {
    data: myPostsImages,
    loading: mpLoading,
    error: mpError,
  } = useSelector(state => state.images.myPostsImages);
  const {
    data: myFollowingPostsImages,
    loading: mfpLoading,
    error: mfpError,
  } = useSelector(state => state.images.myFollowingPostsImages);

  const allImages = () => {
    if (myPostsImages && myFollowingPostsImages) {
      return [...myPostsImages, ...myFollowingPostsImages].sort(
        (a, b) => b.date - a.date,
      );
    }
  };
  const imageArray = allImages() && allImages().find(value => value.id === id);
  // -->

  // NOTE 경과 시간 계산 함수
  const calcTimeElapsed = date => {
    const start = new Date(date);
    const end = Date.now();
    const sec = Math.floor((end - start) / 1000); // 경과시간, 초
    const min = Math.floor((end - start) / 1000 / 60); // 경과시간, 분
    const hour = Math.floor((end - start) / 1000 / 60 / 60); // 경과시간, 시간
    const day = Math.floor((end - start) / 1000 / 60 / 60 / 24); // 경과시간, 일
    const elapsed =
      sec >= 60
        ? min >= 60
          ? hour >= 24
            ? day + '일전'
            : hour + '시간 전'
          : min + '분 전'
        : '방금 전';
    return elapsed;
  };

  // NOTE 게시글 더보기, 숨기기 함수
  const [more, setMore] = useState(true);
  const onClickMore = () => {
    setMore(!more);
  };

  useEffect(() => {
    /**
     * NOTE get images to firebaseStorage
     * FIXME: firebaseStorage 및 dispatch
     * @param uid The uid of the user who posted this post.
     * @param id  Doc.id pointing to this post.
     * @param name The filenames of the images in this post.
     */
    // dispatch(getPostImagesToStorage({ uid, id, images }));
    const { uid } = firebaseAuth.currentUser;
    if (!(myPostsImages || myFollowingPostsImages)) {
      if (uid === uidByPost) {
        console.log('내 post');
        dispatch(getPostImages({ uid: uidByPost, id, images }));
      } else {
        console.log('following유저의 포스트');
        dispatch(getFollowingPostImages({ uid: uidByPost, id, images }));
      }
    }
  }, []);
  if (mpLoading || mfpLoading) return <div>로딩중</div>;
  if (mpError || mfpError) return <div>에러발생</div>;
  if (!(myPostsImages && myFollowingPostsImages)) return <div>데이터없음</div>;
  return (
    <Post
      photoURL={'/images/default_profile.png'}
      displayName={displayName}
      location={location}
      srcs={imageArray && imageArray.srcs}
      imagesNames={images}
      heartCount={heartCount}
      more={more}
      text={text}
      onClickMore={onClickMore}
      isPossibleComment={isPossibleComment}
      comments={comments}
      timeElapsed={calcTimeElapsed(date)}
    />
  );
};

export default PostContainer;
