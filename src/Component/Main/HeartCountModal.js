import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline';
import { useDispatch, useSelector } from 'react-redux';
import { closePopup } from '../../Modules/popup';
import PostHeartCountPortal from '../../PostHeartCountPortal';
import ProfileImage from '../Global/ProfileImage';
import Loading from '../Global/Loading';

const HeartCountModal = () => {
  const modalRef = useRef();
  const dispatch = useDispatch();
  const { postHeartCountModal: postHeartCountModalState } = useSelector(
    state => state.popup,
  );
  const { data: usersWhoClickHeart, loading } = useSelector(
    state => state.heart.users,
  );

  const onCloseModal = () => {
    dispatch(closePopup('postHeartCountModal'));
  };

  const onCilckOutside = e => {
    if (
      postHeartCountModalState &&
      modalRef.current &&
      !modalRef.current.contains(e.target)
    ) {
      dispatch(closePopup('postHeartCountModal'));
    }
  };

  useEffect(() => {
    window.addEventListener('click', onCilckOutside);
    return () => {
      window.removeEventListener('click', onCilckOutside);
    };
  }, []);

  return (
    <PostHeartCountPortal>
      <StModal>
        <StHeartListBox ref={modalRef}>
          <StHeader>좋아요</StHeader>
          <StProfileBox>
            {loading ? (
              <Loading isLoading={loading} />
            ) : (
              usersWhoClickHeart.map((user, index) => {
                return (
                  <StUserList key={index}>
                    <ProfileImage
                      src={user.photoURL}
                      alt={user.displayName}
                      width={5}
                      height={5}
                    >
                      <StName>
                        <StDisplayName>{user.displayName}</StDisplayName>
                        {user.username && (
                          <StUsername>{user.username}</StUsername>
                        )}
                      </StName>
                    </ProfileImage>
                  </StUserList>
                );
              })
            )}
          </StProfileBox>
          <StCloseButton onClick={onCloseModal}>
            <StIcon />
          </StCloseButton>
        </StHeartListBox>
      </StModal>
    </PostHeartCountPortal>
  );
};

const StModal = styled.div`
  position: fixed;
  top: 0;
  z-index: 3;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StHeartListBox = styled.div`
  position: relative;
  background: ${({ theme }) => theme.white};
  border-radius: 10px;
  width: 40rem;
  height: 40rem;
`;

const StHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 5rem;
  font-size: 1.8rem;
  font-weight: 600;
  border-bottom: 1px solid ${({ theme }) => theme.gray8};
`;

const StProfileBox = styled.ul`
  height: 35rem;
  overflow: scroll;
  padding: 0.5rem 2rem;
`;

const StUserList = styled.li`
  padding: 0.4rem 0rem;
`;

const StName = styled.div`
  margin-left: 1.5rem;
  font-size: 1.4rem;
  font-weight: 600;
`;

const StDisplayName = styled.div`
  color: ${({ theme }) => theme.black};
`;
const StUsername = styled.div`
  margin-top: 0.2rem;
  font-size: 1.3rem;
  font-weight: 500;
  color: ${({ theme }) => theme.darkGray};
`;
const StCloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 5rem;
  height: 5rem;
  cursor: pointer;
`;

const StIcon = styled(CloseOutline)`
  width: 2.8rem;
`;

export default HeartCountModal;
