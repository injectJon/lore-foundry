import React, { Component } from "react";
import styled from "styled-components";

import ShowList from "../showList/ShowList";
import ShowNotes from "../showNotes/ShowNotes";
import Player from "../player/Player";

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
        Authorization: process.env.REACT_APP_API_KEY
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          if (this.state.currentShow && this.state.expandedShow) {
            this.setState({ shows: json.shows });
          } else {
            this.setState({
              shows: json.shows,
              currentShow: json.shows.length + 1,
              expandedShow: json.shows.length + 1
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

  updateCurrentShow(num) {
    this.setState({ currentShow: num });
  }

  expandShow(num) {
    this.setState({ expandedShow: num });
  }

  render() {
    const currentShow = this.state.shows.filter(
      show => show.meta.episode === this.state.currentShow
    );
    const expandedShow = this.state.shows.filter(
      show => show.meta.episode === this.state.expandedShow
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
