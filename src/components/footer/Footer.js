import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Container>
      <Text>© Greg Burg & Daron Schmit 2019</Text>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Text = styled.p`
  font-size: 1.1rem;
  color: #fcc34b;
  margin-bottom: 1rem;
`;
export default Footer;
