import React from 'react';
import styled from 'styled-components';
import { calcTimeElapsed } from '../../lib/calcTime';
import ProfileImage from '../Global/ProfileImage';

const PostComments = ({
  displayNames,
  photoURLs,
  uids,
  comments,
  onMoveProfilePage,
}) => {
  return (
    <StCommentsUl>
      {comments.map((comment, index) => {
        return (
          <StComment key={index}>
            <ProfileImage
              src={photoURLs[index] || '/images/default_profile.png'}
              alt={displayNames[index]}
              width={3.5}
              height={3.5}
              onClick={() =>
                onMoveProfilePage({
                  displayName: displayNames[index],
                  uid: uids[index],
                })
              }
            />
            <StDisplayName
              onClick={() =>
                onMoveProfilePage({
                  displayName: displayNames[index],
                  uid: uids[index],
                })
              }
            >
              {displayNames[index]}
            </StDisplayName>
            <StText>{comment.text}</StText>
            <StTimeStamp>{calcTimeElapsed(comment.date)}</StTimeStamp>
          </StComment>
        );
      })}
    </StCommentsUl>
  );
};

const StCommentsUl = styled.ul`
  flex-grow: 1;
  padding: 1rem 1.5rem;
  font-size: 1.4rem;
  width: 100%;
  max-height: auto;
  overflow: scroll;
  border-bottom: 1px solid ${({ theme }) => theme.gray};
`;

const StComment = styled.li`
  display: flex;
  align-items: flex-start;
  & + & {
    margin-top: 1.2rem;
  }
`;

const StDisplayName = styled.div`
  font-weight: 600;
  margin-left: 0.5rem;
  margin-top: 1rem;
  line-height: 1.2;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const StText = styled.div`
  flex-grow: 1;
  margin-left: 0.5rem;
  margin-top: 1rem;
  line-height: 1.2;
`;

const StTimeStamp = styled.div`
  align-self: flex-start;
  margin-top: 1.1rem;
  min-width: fit-content;
  color: ${({ theme }) => theme.darkGray};
  text-align: right;
  font-size: 1rem;
  line-height: 1.2;
`;

export default PostComments;
