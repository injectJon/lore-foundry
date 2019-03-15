import React from "react";
import styled from "styled-components";

const Subscribe = () => {
  return (
    <Container>
      <Button>iTunes</Button>
      <Button>Overcast</Button>
      <Button>Google Podcast</Button>
      <Button>Stitcher</Button>
      <Button>PocketCasts</Button>
      <Button>Google Play</Button>
      <Button>Spotify</Button>
      <Button>RSS</Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-left: -2rem;
  margin-bottom: 1rem;
`;
const Button = styled.a`
  padding: 1rem;
  font-size: 1.4rem;
  margin-left: 2rem;
  margin-bottom: 2rem;
  border: 1px solid #eeeeee;
  background-color: #eeeeee;
  border-radius: 0.3rem;

  :hover {
    cursor: pointer;
    background-color: transparent;
  }
`;

export default Subscribe;
