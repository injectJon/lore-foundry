import React, { Component } from "react";
import styled from "styled-components";

import Show from "../show/Show";

class ShowList extends Component {
  render() {
    const expandedShow = this.props.expandedShow;
    const currentShow = this.props.currentShow;
    const shows = this.props.shows.map(show => {
      return (
        <Show
          key={show.meta.episode}
          title={show.title}
          season={show.meta.season}
          episode={show.meta.episode}
          active={show.meta.season === expandedShow.season && show.meta.episode === expandedShow.episode}
          playing={show.meta.season === currentShow.season && show.meta.episode === currentShow.episode}
          updateCurrentShow={this.props.updateCurrentShow}
          expandShow={this.props.expandShow}
        />
      );
    });
    return <Container>{shows}</Container>;
  }
}

const mediaWidth = "640px";

const Container = styled.div`
  background-color: #f0f0f0;
  width: 40%;
  border-bottom-left-radius: 0.3rem;
  display: flex;
  flex-direction: column;

  @media (max-width: ${mediaWidth}) {
    width: 100%;
    height: 30rem;
    border-bottom-left-radius: 0rem;
    border-bottom: none;
    overflow: scroll;
    overflow-x: hidden;
  }
`;

export default ShowList;
