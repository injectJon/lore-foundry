import React, { Component } from "react";
import styled from "styled-components";

import Show from "../show/Show";

class ShowList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentShow: 13
    };

    this.updateCurrentShow = this.updateCurrentShow.bind(this);
  }

  updateCurrentShow(episodeNumber) {
    this.setState({ currentShow: episodeNumber });
  }

  render() {
    const currentShow = this.state.currentShow;
    const shows = this.props.shows.map(show => {
      return (
        <Show
          key={show.meta.episode}
          title={show.title}
          episode={show.meta.episode}
          active={show.meta.episode === currentShow}
          updateCurrentShow={this.updateCurrentShow}
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
