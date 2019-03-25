import React, { Component } from "react";
import styled from "styled-components";
import logo from "../../logo-tome-white-medium.png";
import avatar from "../../placeholder-avatar.png";

import Person from "../person/Person";

class Header extends Component {
  state = {
    people: [
      {
        name: "Greg Berg",
        imgSrc: avatar,
        twitterHandle: "",
        intro: `Hi, I'm Greg.`
      },
      {
        name: "Daron Schmit",
        imgSrc: avatar,
        twitterHandle: "",
        intro: `Hi, I'm Daron.`
      }
    ]
  };
  render() {
    const people = this.state.people.map((person, i) => {
      return (
        <Person
          key={i}
          imgSrc={person.imgSrc}
          name={person.name}
          twitterHandle={person.twitterHandle}
          intro={person.intro}
        />
      );
    });
    return (
      <Container>
        <LeftContainer>
          <Logo src={logo} />
        </LeftContainer>
        <RightContainer>
          <Tagline>Greg and Daron do Worldbuilding.</Tagline>
          <People>{people}</People>
        </RightContainer>
      </Container>
    );
  }
}

const Container = styled.div`
  min-height: 28rem;
  display: flex;
  align-items: flex-end;
`;
// LEFT CONTAINER ----------------
const LeftContainer = styled.div`
  flex: 1;
`;
const Logo = styled.img`
  height: 25rem;
  margin-left: 2.3rem;
`;
// RIGHT CONTAINER ---------------
const RightContainer = styled.div`
  flex: 2
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: flex-end;
  margin-left: -2rem;
`;
const Tagline = styled.h2`
  margin-bottom: 1.8rem;
  margin-left: 3rem;
  font-size: 2.5rem;
  color: #f3f3f3;
`;
const People = styled.div`
  display: flex;
  align-items: space-between;
  margin-bottom: 3rem;
`;

export default Header;
