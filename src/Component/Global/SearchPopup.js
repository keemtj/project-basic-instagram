import React from 'react';
import styled from 'styled-components';

const SearchPopup = ({ value, popupRef }) => {
  const searchList = [{ displayName: 'admin2' }];
  const searchHistory = [{ displayName: 'admin3' }];
  return (
    <>
      <StTriangle />
      <StSearchPopupWrapper ref={popupRef}>
        <StSearchPopupHeader>
          <div>최근 검색 항목</div>
          <button>모두 지우기</button>
        </StSearchPopupHeader>
        {!searchHistory ? (
          <div>최근 검색 내역 없음</div>
        ) : (
          <ul>
            {searchHistory.map((list, index) => (
              <li key={index}>{list.displayName}</li>
            ))}
          </ul>
        )}
        {value &&
          searchList.map((list, index) => (
            <div key={index}>{list.displayName}</div>
          ))}
      </StSearchPopupWrapper>
    </>
  );
};

const StTriangle = styled.div`
  position: absolute;
  z-index: 5;
  top: 4.65rem;
  right: calc(50% - 1rem);
  border: 7.5px solid black;
  border-color: ${({ theme }) => theme.white} ${({ theme }) => theme.white}
    transparent transparent;
  box-shadow: 2px -2px 5px -2px ${({ theme }) => theme.gray8};
  transform: rotate(-45deg);
`;

const StSearchPopupWrapper = styled.div`
  position: absolute;
  top: 5.4rem;
  z-index: 4;

  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-start;
  background: ${({ theme }) => theme.white};
  border: none;
  border-radius: 5px;
  width: 35rem;
  height: 35rem;
  box-shadow: 0px 0px 10px ${({ theme }) => theme.gray8};
`;

const StSearchPopupHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default SearchPopup;
