import React, { Component } from "react";
import styled from "styled-components";
import playIcon from "../../small-play-button-01.png";

class Show extends Component {
  render() {
    return (
      <Container
        active={this.props.active}
        isFirstEp={this.props.episode === 1}
        onClick={() => this.props.expandShow(this.props.episode)}
      >
        <TextContainer>
          <EpisodeText>Episode {this.props.episode}</EpisodeText>
          <TitleText>{this.props.title}</TitleText>
        </TextContainer>
        <ButtonContainer
          onClick={() => this.props.updateCurrentShow(this.props.episode)}
          playing={this.props.playing}
          active={this.props.active}
        >
          <PlayButton src={playIcon} />
        </ButtonContainer>
      </Container>
    );
  }
}

const Container = styled.div`
  color: #313131;
  min-height: 4rem;
  background-color: #f3f3f3;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ active }) => !active && `border-right: 1px solid #e6e6e6;`}
  ${({ active }) =>
    active
      ? `border-left: 0.5rem solid #febe10;`
      : `border-left: 0.5rem solid #e6e6e6`}
  border-bottom: 1px solid #e6e6e6;
  ${({ isFirstEp }) => isFirstEp && `border-bottom-left-radius: 0.3rem;`}
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
  ${({ playing }) => playing && `display: none;`}
  ${({ active }) => active && `padding-right: 0.1rem;`}

  :hover {
    cursor: pointer;
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
