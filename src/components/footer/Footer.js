import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Container>
      <Text>© Greg & Daron {new Date().getFullYear()}</Text>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-top: 3rem;
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
