import React, { Component } from "react";
import styled from "styled-components";

import Header from "./components/header/Header";
import Subscribe from "./components/subscribe/Subscribe";
import Content from "./components/content/Content";

class App extends Component {
  constructor() {
    super();

    this.state = {
      width: window.innerWidth
    };

    this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
  }

  componentWillMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange() {
    this.setState({ width: window.innerWidth });
  }

  render() {
    return (
      <AppWrapper>
        <Container>
          <Header />
          <Subscribe />
          <Content />
        </Container>
      </AppWrapper>
    );
  }
}

const AppWrapper = styled.div`
  min-height: 100vh;
  width: inherit;
  background-color: #f3f3f3;
  display: flex;
  justify-content: center;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: inherit;
  width: 100rem;
  padding: 3rem;

  @media (max-width: 50rem) {
    width: 100vw;
  }
`;

export default App;
