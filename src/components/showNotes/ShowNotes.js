import React from "react";
import styled from "styled-components";

const ShowNotes = ({ show }) => {
  if (!show) return <Container />;
  const title = show.title;
  const episodeNum = show.meta.episode;
  const description = show.description;
  return (
    <Container>
      <Header>
        <TitleText>{title}</TitleText>
        <EpisodeText>Episode {episodeNum}</EpisodeText>
      </Header>
      <Notes>{description}</Notes>
    </Container>
  );
};

const mediaWidth = "640px";

const Container = styled.div`
  max-width: 60%;
  background-color: #f3f3f3;
  border-bottom: 0.1rem solid #c6c6c6;
  border-right: 0.1rem solid #c6c6c6;
  border-bottom-right-radius: 0.3rem;

  @media (max-width: ${mediaWidth}) {
    max-width: 100%;
    width: 100%;
    border-bottom-left-radius: 0.3rem;
  }
`;
const Header = styled.div`
  border-bottom: 0.1rem solid #717171;
  margin: 3rem 3rem 0rem 3rem;
  padding-bottom: 1.5rem;
`;
const TitleText = styled.h1`
  color: #313131;
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;
const EpisodeText = styled.p`
  color: #313131;
  font-size: 1.2rem;
`;
const Notes = styled.h2`
  color: #313131;
  margin: 1.5rem 3rem 3rem 3rem;
  font-size: 1.3rem;
  line-height: 2.5rem;
  font-weight: 500;
`;

export default ShowNotes;
