import React from 'react';
import styled from 'styled-components';
import { Dot } from '@styled-icons/bootstrap/Dot';

const Main = () => {
  return (
    <StMainWrapper>
      <StMain>
        <StSection>
          <StArticle>
            <header>헤더</header>
            <img src="images/default_profile.png" alt="default_image" />
          </StArticle>
          <StArticle>아티클 1</StArticle>
        </StSection>
        <StAsideWrapper>
          <StAside>
            <div>
              <img />
              <div>my username</div>
            </div>
            <div>
              <img />
              <div>followers username</div>
              <button>팔로우</button>
              <img />
              <div>followers username</div>
              <button>팔로우</button>
              <img />
              <div>followers username</div>
              <button>팔로우</button>
              <img />
              <div>followers username</div>
              <button>팔로우</button>
              <img />
              <div>followers username</div>
              <button>팔로우</button>
            </div>
          </StAside>
          <StFooter>
            <StCategories>
              <li>
                소개
                <StDot />
              </li>
              <li>
                도움말
                <StDot />
              </li>
              <li>
                홍보 센터
                <StDot />
              </li>
              <li>
                API
                <StDot />
              </li>
              <li>
                채용 정보
                <StDot />
              </li>
              <li>
                개인정보처리방침
                <StDot />
              </li>
              <li>
                약관
                <StDot />
              </li>
              <li>
                위치
                <StDot />
              </li>
              <li>
                인기 계정
                <StDot />
              </li>
              <li>
                해시태그
                <StDot />
              </li>
              <li> 언어</li>
            </StCategories>
            <StCopyright>© 2021 INSTAGRAM FROM FACEBOOK</StCopyright>
          </StFooter>
        </StAsideWrapper>
      </StMain>
    </StMainWrapper>
  );
};

const StMainWrapper = styled.div`
  background-color: #fafafa;
  flex-grow: 1;
  margin-top: 5.5rem;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StMain = styled.main`
  width: 95rem;
  border: 1px solid red;
  padding-top: 3rem;
  display: flex;
  flex-flow: row nowrap;
`;

const StSection = styled.section`
  width: 65rem;
`;

const StArticle = styled.article`
  width: 62rem;
  height: fit-content;
  border: 1px solid red;
`;

const StAsideWrapper = styled.div`
  width: 100%;
  max-width: 30rem;
  padding-top: 3rem;
  border: 1px solid orange;
  top: 5.5rem;
  position: fixed;
  right: calc((100% - 95rem) / 2);
`;

const StAside = styled.aside``;

const StFooter = styled.footer`
  color: #c7c7c7;
  line-height: 1.5;
`;
const StCategories = styled.ul`
  display: flex;
  flex-flow: row wrap;
`;

const StCopyright = styled.div`
  margin-top: 1rem;
`;

const StDot = styled(Dot)`
  width: 1rem;
  height: 1rem;
`;
export default Main;
