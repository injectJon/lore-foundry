import React from "react";
import styled from "styled-components";

const Person = ({ imgSrc, name, twitterHandle, intro }) => {
  return (
    <Container name={name}>
      <SocialContainer>
        <Avatar src={imgSrc} />
        <NameText>{name}</NameText>
      </SocialContainer>
      {/* <IntroText>{intro}</IntroText> */}
    </Container>
  );
};

const mediaWidth = "840px";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 14rem;
  background-color: #313131;
  margin-left: 3rem;
  padding: 1rem;
  border-radius: 0.3rem;
  justify-content: center;

  @media (max-width: ${mediaWidth}) {
    margin-left: 0;
    ${({ name }) => (name === "Greg" ? "margin-right: 3rem;" : "")}
  }

  @media (max-width: 640px) {
    width: calc(100% - 2rem);
    margin-bottom: 3rem;
    margin-left: 0;
    margin-right: 0;
  }
`;
const SocialContainer = styled.div`
  display: flex;
`;
const Avatar = styled.img`
  height: 10rem;
  margin-left: 1.5rem;
  border: 0.1rem solid #030202;
  border-radius: 5rem;
`;
const NameText = styled.h3`
  font-size: 1.8rem;
  margin-top: 3.8rem;
  margin-left: 2rem;
  color: #f3f3f3;
`;
// const IntroText = styled.p`
//   font-size: 1.2rem;
//   color: #f3f3f3;
// `;

export default Person;
