import React, { useEffect, useState } from 'react';
import PostComments from '../../Component/Main/PostComments';
import { getDisplayName } from '../../services/firestore';

const PostCommentsContainer = ({ comments, onClickPostModal, newComments }) => {
  const [displayNames, setDisplayNames] = useState([]);

  useEffect(async () => {
    if (comments.length > 0) {
      console.log('comment 추가됨?');
      const result = await getDisplayName(comments);
      setDisplayNames(result);
    }
  }, [comments]);

  return (
    <PostComments
      displayNames={displayNames}
      comments={comments}
      onClickPostModal={onClickPostModal}
      newComments={newComments}
    />
  );
};

export default PostCommentsContainer;
