import React, { Component } from "react";
import styled from "styled-components";

class Show extends Component {
  render() {
    return (
      <Container
        active={this.props.active}
        isFirstEp={this.props.episode === 1}
        onClick={() => this.props.updateCurrentShow(this.props.episode)}
      >
        <EpisodeText>Episode {this.props.episode}</EpisodeText>
        <TitleText>{this.props.title}</TitleText>
      </Container>
    );
  }
}

const Container = styled.div`
  color: #f3f3f3;
  min-height: 4rem;
  background-color: #313131;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${({ active }) => !active && `border-right: 1px solid #717171;`}
  ${({ active }) =>
    active
      ? `border-left: 0.5rem solid #febe10;`
      : `border-left: 0.5rem solid #717171`}
  border-bottom: 1px solid #717171;
  ${({ isFirstEp }) => isFirstEp && `border-bottom-left-radius: 0.3rem;`}
`;
const EpisodeText = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;
const TitleText = styled.h2`
  font-size: 1.5rem;
`;

export default Show;
