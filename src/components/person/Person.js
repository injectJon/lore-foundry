import React from "react";
import styled from "styled-components";

const Person = ({ imgSrc, name, twitterHandle, intro }) => {
  return (
    <Container>
      <SocialContainer>
        <Avatar src={imgSrc} />
        <NameText>{name}</NameText>
      </SocialContainer>
      <IntroText>{intro}</IntroText>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 14rem;
  background-color: #eeeeee;
  margin-left: 3rem;
  padding: 1rem;
  border-radius: 0.3rem;
`;
const SocialContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;
const Avatar = styled.img`
  height: 8rem;
`;
const NameText = styled.h3`
  font-size: 1.8rem;
  margin-top: 2.8rem;
  margin-left: 2rem;
`;
const IntroText = styled.p`
  font-size: 1.2rem;
`;

export default Person;
