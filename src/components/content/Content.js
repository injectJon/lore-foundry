import React, { Component } from "react";
import styled from "styled-components";

import ShowList from "../showList/ShowList";

class Content extends Component {
  constructor() {
    super();

    this.state = {
      shows: []
    };
  }

  componentDidMount() {
    console.log("Fetching shows from server...");
    fetch("https://allegedbot.herokuapp.com/api/lorefoundry/rss", {
      method: "GET",
      headers: {
        Authorization: ``
      }
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        if (json.success) {
          this.setState({ shows: json.shows });
        }
      });
  }

  render() {
    return (
      <Container>
        <Player />
        <ShowList shows={this.state.shows} />
        <ShowNotes />
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const Player = styled.div`
  height: 10rem;
  width: 100%;
  background-color: #eeeeee;
  border-radius: 0.3rem 0.3rem 0 0;
`;
const ShowNotes = styled.div`
  width: 60%;
  background-color: #313131;
  border-bottom: 1px solid #717171;
  border-bottom-right-radius: 0.3rem;
`;

export default Content;
