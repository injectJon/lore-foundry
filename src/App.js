import React, { Component } from "react";
import styled from "styled-components";

import Header from "./components/header/Header";
import Subscribe from "./components/subscribe/Subscribe";
import Content from "./components/content/Content";
import Footer from "./components/footer/Footer";

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
    // localStorage.clear();
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
          <Footer />
        </Container>
      </AppWrapper>
    );
  }
}

const mediaWidth = "640px";

const AppWrapper = styled.div`
  min-height: 100vh;
  width: inherit;
  background: rgb(3, 2, 2);
  background: radial-gradient(
    circle,
    rgba(3, 2, 2, 1) 0%,
    rgba(49, 49, 49, 1) 100%
  );
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  border-top: 0.25rem solid #fcc34b;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: inherit;
  width: 100rem;
  padding: 3rem;
  padding-top: 2rem;

  @media (max-width: ${mediaWidth}) {
    width: 100vw;
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

export default App;
