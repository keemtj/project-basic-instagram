import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Post from '../../Component/Main/Post';

const PostContainer = ({ post }) => {
  const {
    images,
    heartCount,
    text,
    isPossibleComment,
    comments,
    date,
    location,
    displayName,
    // uid,
    id,
  } = post;
  const imagesArray = useSelector(state => state.posts.myPosts.data);
  const srcs = imagesArray.find(v => v.id === id)?.data?.srcs;

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
  }, []);
  return (
    <Post
      photoURL={'/images/default_profile.png'}
      displayName={displayName}
      location={location}
      imageURL={srcs}
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
