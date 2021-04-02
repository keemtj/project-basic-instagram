import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <StWrapper>
      <StFooter>
        <StCategories>
          <li>소개</li>
          <li>블로그</li>
          <li>채용 정보</li>
          <li>도움말</li>
          <li>API</li>
          <li>개인정보처리방침</li>
          <li>약관</li>
          <li>인기 계정</li>
          <li>해시태그</li>
          <li>위치</li>
        </StCategories>
        <StCopyrightBox>
          <StSelectBox>
            <option value="ko">한국어</option>
            <option value="en">English</option>
          </StSelectBox>
          <span>© 2021 Instagram From Facebook</span>
        </StCopyrightBox>
      </StFooter>
    </StWrapper>
  );
};

const StWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.background};
  width: 100vw;
  height: 12rem;
`;

const StFooter = styled.footer`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 95rem;
  height: 100%;
  padding-top: 1.5rem;
  color: ${({ theme }) => theme.category};
  font-size: 1.2rem;
`;

const StCategories = styled.ul`
  display: flex;
  flex-flow: row nowrap;
  & > li + li {
    margin-left: 1.5rem;
  }
`;

const StCopyrightBox = styled.div`
  margin-top: 1.8rem;
`;

const StSelectBox = styled.select`
  border: none;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.category};
  font-size: 1.2rem;
  margin-right: 1rem;
  outline: none;
  cursor: pointer;
`;

export default Footer;
