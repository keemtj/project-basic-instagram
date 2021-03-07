import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <StWrapper>
      <StFooter>footer</StFooter>
    </StWrapper>
  );
};

const StWrapper = styled.div`
  border: 1px solid red;
  width: 100vw;
  height: 12rem;
`;

const StFooter = styled.footer``;

export default Footer;
