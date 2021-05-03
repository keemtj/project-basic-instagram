import React, { useEffect } from 'react';
import {
  // useDispatch,
  useSelector,
} from 'react-redux';
import Posts from '../../Component/Profile/Posts';
// import { getPosts } from '../../Modules/posts';

const PostsContainer = () => {
  // const dispatch = useDispatch();
  const { data: myPosts, loading, error } = useSelector(
    state => state.posts.myPosts,
  );
  const { data: myPostsImages } = useSelector(
    state => state.images.myPostsImages,
  );

  const sortedPosts = () => {
    if (myPosts) {
      return [...myPosts].sort((a, b) => b.date - a.date);
    }
  };
  const sortedImages = () => {
    if (myPostsImages) {
      return [...myPostsImages].sort((a, b) => b.date - a.date);
    }
  };

  useEffect(() => {
    /**
     * NOTE 포스트 데이터가 없을 경우 myPosts 데이터 가져오기
     * @param uid watchName
     */
    // dispatch(getPosts());
  }, []);
  return (
    <Posts
      myPosts={sortedPosts()}
      loading={loading}
      error={error}
      images={sortedImages()}
    />
  );
};

export default PostsContainer;
