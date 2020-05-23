import React, { Component } from "react";
import styled from "styled-components";
import playIcon from "../../small-play-button-01.png";
import playingIcon from "../../playing-bars-01-01.png";

class Show extends Component {
  render() {
    return (
      <Container
        active={this.props.active}
        isFirstEp={this.props.episode === 1}
        onClick={() => this.props.expandShow(this.props.season, this.props.episode)}
      >
        <TextContainer>
          <EpisodeText>Season {this.props.season}, Episode {this.props.episode}</EpisodeText>
          <TitleText>{this.props.title}</TitleText>
        </TextContainer>
        <ButtonContainer
          onClick={() => this.props.updateCurrentShow(this.props.season, this.props.episode)}
          playing={this.props.playing}
          active={this.props.active}
        >
          {this.props.playing && <PlayButton src={playingIcon} />}
          {!this.props.playing && <PlayButton src={playIcon} />}
        </ButtonContainer>
      </Container>
    );
  }
}

const mediaWidth = "640px";

const Container = styled.div`
  color: #313131;
  min-height: 4rem;
  background-color: #f3f3f3;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ active }) =>
    !active && `border-right: 1px solid #c6c6c6; background-color: #e9e9e9;`}
  ${({ active }) =>
    active
      ? `border-left: 0.5rem solid #febe10;`
      : `border-left: 0.5rem solid #c6c6c6;`}
  border-bottom: 1px solid #c6c6c6;
  ${({ isFirstEp }) => isFirstEp && `border-bottom-left-radius: 0.3rem;`}

  @media (max-width: ${mediaWidth}) {
    border-right: none;
  }
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  padding-right: 0;
  ${({ active }) => active && `padding-right: 0.1rem;`}

  :hover {
    cursor: pointer;
    ${({ playing }) => playing && `cursor: default;`}
  }
`;
const PlayButton = styled.img`
  height: 1rem;
  margin-right: 1rem;
`;
const EpisodeText = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;
const TitleText = styled.h2`
  font-size: 1.5rem;
`;

export default Show;
