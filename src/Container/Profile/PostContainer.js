import React, { useEffect, useState } from 'react';
import Post from '../../Component/Profile/Post';
import { getCommentsByPost } from '../../services/firestore';

const PostContainer = ({ post }) => {
  const {
    date,
    uid,
    isPossibleToComment,
    location,
    id,
    text,
    imagesArray,
    hearts,
    bookmarks,
    subLocation,
  } = post;
  const [comments, setComments] = useState([]);

  useEffect(async () => {
    const datas = await getCommentsByPost(id);
    setComments(datas);
  }, []);

  return (
    <Post
      date={date}
      uid={uid}
      isPossibleToComment={isPossibleToComment}
      location={location}
      id={id}
      text={text}
      imagesArray={imagesArray}
      hearts={hearts}
      heartsCount={hearts.length}
      bookmarks={bookmarks}
      subLocation={subLocation}
      comments={comments}
    />
  );
};

export default PostContainer;
