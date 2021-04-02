import React from 'react';
import styled from 'styled-components';
import { Dot } from '@styled-icons/bootstrap/Dot';

const MainFooter = () => {
  const categories = [
    '소개',
    '도움말',
    '홍보 센터',
    'API',
    '채용 정보',
    '개인정보처리방침',
    '약관',
    '위치',
    '인기 계정',
    '해시태그',
    '언어',
  ];

  return (
    <StFooter>
      <StCategories>
        {categories.map((category, index, arr) => (
          <li key={index}>
            {category}
            {index !== arr.length - 1 && <StDot />}
          </li>
        ))}
      </StCategories>
      <StCopyright>© 2021 INSTAGRAM FROM FACEBOOK</StCopyright>
    </StFooter>
  );
};

const StFooter = styled.footer`
  color: ${({ theme }) => theme.category2};
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

export default MainFooter;
