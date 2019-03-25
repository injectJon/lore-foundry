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
          episode={show.meta.episode}
          active={show.meta.episode === expandedShow}
          playing={show.meta.episode === currentShow}
          updateCurrentShow={this.props.updateCurrentShow}
          expandShow={this.props.expandShow}
        />
      );
    });
    return <Container>{shows}</Container>;
  }
}

const Container = styled.div`
  background-color: #f0f0f0;
  width: 40%;
  border-bottom-left-radius: 0.3rem;
  display: flex;
  flex-direction: column;
`;

export default ShowList;
