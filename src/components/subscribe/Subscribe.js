import React from "react";
import styled from "styled-components";

const Subscribe = () => {
  return (
    <Container>
      <Button
        className="itunes"
        href="https://itunes.apple.com/us/podcast/the-lore-foundry/id1438375479?ls=1"
        onClick={e => {
          e.preventDefault();
          window.open(
            "https://itunes.apple.com/us/podcast/the-lore-foundry/id1438375479?ls=1"
          );
        }}
      >
        iTunes
      </Button>
      <Button
        className="tune-in"
        href="https://tunein.com/podcasts/Fantasy--Science-Fiction-Podc/The-Lore-Foundry-p1161580/"
        onClick={e => {
          e.preventDefault();
          window.open(
            "https://tunein.com/podcasts/Fantasy--Science-Fiction-Podc/The-Lore-Foundry-p1161580/"
          );
        }}
      >
        Tune In
      </Button>
      <Button
        className="overcast"
        href="https://overcast.fm/itunes1438375479/the-lore-foundry"
        onClick={e => {
          e.preventDefault();
          window.open("https://overcast.fm/itunes1438375479/the-lore-foundry");
        }}
      >
        Overcast
      </Button>
      <Button
        className="google-podcast"
        href="https://www.google.com/podcasts?feed=aHR0cDovL3RoZWxvcmVmb3VuZHJ5LmxpYnN5bi5jb20vZ29vZ2xl"
        onClick={e => {
          e.preventDefault();
          window.open(
            "https://www.google.com/podcasts?feed=aHR0cDovL3RoZWxvcmVmb3VuZHJ5LmxpYnN5bi5jb20vZ29vZ2xl"
          );
        }}
      >
        Google Podcast
      </Button>
      <Button
        className="stitcher"
        href="https://www.stitcher.com/podcast/the-lore-foundry?refid=stpr"
        onClick={e => {
          e.preventDefault();
          window.open(
            "https://www.stitcher.com/podcast/the-lore-foundry?refid=stpr"
          );
        }}
      >
        Stitcher
      </Button>
      <Button
        className="pocket-casts"
        href="https://pca.st/Ac7k"
        onClick={e => {
          e.preventDefault();
          window.open("https://pca.st/Ac7k");
        }}
      >
        PocketCasts
      </Button>
      <Button
        className="google-play"
        href="https://play.google.com/music/listen?u=0#/ps/Indmu2kanqdrslno3nmuwlk3lma"
        onClick={e => {
          e.preventDefault();
          window.open(
            "https://play.google.com/music/listen?u=0#/ps/Indmu2kanqdrslno3nmuwlk3lma"
          );
        }}
      >
        Google Play
      </Button>
      <Button
        className="spotify"
        href="https://open.spotify.com/show/6wRyUR1xLVIoUQ9g4LK8L4?si=yFH_KnFVQ62ujSWwWclxmA"
        onClick={e => {
          e.preventDefault();
          window.open(
            "https://open.spotify.com/show/6wRyUR1xLVIoUQ9g4LK8L4?si=yFH_KnFVQ62ujSWwWclxmA"
          );
        }}
      >
        Spotify
      </Button>
      <Button
        className="rss"
        href="http://thelorefoundry.libsyn.com/rss"
        onClick={e => {
          e.preventDefault();
          window.open("http://thelorefoundry.libsyn.com/rss");
        }}
      >
        RSS
      </Button>
    </Container>
  );
};

const Container = styled.div`
  width: calc(100%+2rem);
  display: flex;
  flex-wrap: wrap;
  margin-left: -2rem;
  margin-bottom: 1rem;
  margin-right: -0rem;
`;
const Button = styled.a`
  flex: 1;
  padding: 1rem;
  font-size: 1.4rem;
  text-align: center;
  white-space: nowrap;
  margin-left: 2rem;
  margin-bottom: 2rem;
  border: 1px solid #313131;
  background-color: #313131;
  border-radius: 0.3rem;
  color: #f3f3f3;
  text-decoration: none;

  ${({ className }) => (className === "itunes" ? `color: #983cd0;` : "")}
    ${({ className }) => (className === "tune-in" ? `color: #14d8cc;` : "")}
    ${({ className }) => (className === "overcast" ? `color: #ff7127;` : "")}
    ${({ className }) =>
      className === "google-podcast" ? `color: #fcae4f;` : ""}
    ${({ className }) => (className === "stitcher" ? `color: #c8d05b;` : "")}
    ${({ className }) =>
      className === "pocket-casts" ? `color: #dc1210;` : ""}
    ${({ className }) => (className === "google-play" ? `color: #36d4dc;` : "")}
    ${({ className }) => (className === "spotify" ? `color: #0da944;` : "")}
    ${({ className }) => (className === "rss" ? `color: #ed7421;` : "")}

  :hover {
    cursor: pointer;
    background-color: transparent;

    ${({ className }) =>
      className === "itunes" ? `border-color: #983cd0;` : ""}
    ${({ className }) =>
      className === "tune-in" ? `border-color: #14d8cc;` : ""}
    ${({ className }) =>
      className === "overcast" ? `border-color: #ff7127;` : ""}
    ${({ className }) =>
      className === "google-podcast" ? `border-color: #fcae4f;` : ""}
    ${({ className }) =>
      className === "stitcher" ? `border-color: #c8d05b;` : ""}
    ${({ className }) =>
      className === "pocket-casts" ? `border-color: #dc1210;` : ""}
    ${({ className }) =>
      className === "google-play" ? `border-color: #36d4dc;` : ""}
    ${({ className }) =>
      className === "spotify" ? `border-color: #0da944;` : ""}
    ${({ className }) => (className === "rss" ? `border-color: #ed7421;` : "")}
  }
`;

export default Subscribe;
