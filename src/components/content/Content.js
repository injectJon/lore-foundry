import React, { Component } from "react";
import styled from "styled-components";

import ShowList from "../showList/ShowList";
import ShowNotes from "../showNotes/ShowNotes";
import Player from "../player/Player";

function sortShows(show1, show2) {
  //sort by season & episode
  const value = show1.meta.season * 1000 + show1.meta.episode;
  const value2 = show2.meta.season * 1000 + show2.meta.episode;

  if (value < value2) {
      return 1;
  }
  if (value > value2) {
      return -1;
  }

  return 0;
}

class Content extends Component {
  constructor() {
    super();

    this.state = {
      currentShow: parseInt(localStorage.getItem("currentShow")) || null,
      expandedShow: parseInt(localStorage.getItem("currentShow")) || null,
      shows: []
    };

    this.updateCurrentShow = this.updateCurrentShow.bind(this);
    this.expandShow = this.expandShow.bind(this);
  }

  componentDidMount() {
    fetch("https://allegedbot.herokuapp.com/api/lorefoundry/rss", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: process.env.REACT_APP_API_KEY
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          console.log("Successfully fetched shows.");
          if (this.state.currentShow && this.state.expandedShow) {
            this.setState({ shows: json.shows });
          } else {
            const sortedShows = json.shows.sort((show, show2) => sortShows(show, show2));
            this.setState({
              shows: sortedShows,
              currentShow: {season: sortedShows[0].meta.season, episode: sortedShows[0].meta.episode},
              expandedShow: {season: sortedShows[0].meta.season, episode: sortedShows[0].meta.episode}
            });
          }
        } else {
          console.log("Error fetching shows from the server.");
          console.log("Response:\n", json);
        }
      });
  }

  componentDidUpdate() {
    localStorage.setItem("currentShow", this.state.currentShow);
  }

  updateCurrentShow(sNum, eNum) {
    this.setState({ currentShow: {season: sNum, episode: eNum } });
  }

  expandShow(sNum, eNum) {
    this.setState({ expandedShow: {season: sNum, episode: eNum } });
  }

  render() {
    const currentShow = this.state.shows.filter(
      show => show.meta.season === this.state.currentShow.season && show.meta.episode === this.state.currentShow.episode
    );
    const expandedShow = this.state.shows.filter(
      show => show.meta.season === this.state.expandedShow.season && show.meta.episode === this.state.expandedShow.episode
    );

    // Don't render content until we've found the current show
    let content;

    if (currentShow[0] && expandedShow[0]) {
      content = (
        <Container>
          <Player show={currentShow[0]} />
          <ShowContainer>
            <ShowList
              shows={this.state.shows}
              currentShow={this.state.currentShow}
              expandedShow={this.state.expandedShow}
              updateCurrentShow={this.updateCurrentShow}
              expandShow={this.expandShow}
            />
            <ShowNotes show={expandedShow[0]} />
          </ShowContainer>
        </Container>
      );
    } else {
      content = <div>{`Fetching Episodes...`}</div>;
    }

    return <div>{content}</div>;
  }
}

const mediaWidth = "640px";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const ShowContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: ${mediaWidth}) {
    flex-direction: column;
  }
`;

export default Content;
