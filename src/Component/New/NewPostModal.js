import React from 'react';
import styled from 'styled-components';
import ModalPortal from '../../ModalPortal';

const NewPostModal = () => {
  const [modalState, setModalState] = useState(false);
  const closeModal = () => {
    setModalState(!modalState);
  };

  return (
    <ModalPortal>
      <StModal>
        <div>
          <h3>새 게시글</h3>
          <p>사진올리기, 문구입력</p>
          <button onClick={closeModal}>닫기</button>
        </div>
      </StModal>
    </ModalPortal>
  );
};

const StModal = styled.div`
  background: rgba(0, 0, 0, 0.25);
  width: 100%;
  height: 100%;
`;

export default NewPostModal;
