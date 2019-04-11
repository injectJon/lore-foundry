import React, { Component } from "react";
import styled from "styled-components";
import logo from "../../logo-tome-white-medium.png";
import daronAvatar from "../../daron-avatar.png";
import gregAvatar from "../../greg-avatar.png";

import Person from "../person/Person";

class Header extends Component {
  state = {
    people: [
      {
        name: "Greg",
        imgSrc: gregAvatar,
        twitterHandle: "",
        intro: `Hi, I'm Greg.`
      },
      {
        name: "Daron",
        imgSrc: daronAvatar,
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

const mediaWidth = "840px";

const Container = styled.div`
  width: 100%;
  min-height: 28rem;
  display: flex;
  align-items: flex-end;

  @media (max-width: ${mediaWidth}) {
    flex-direction: column;
    align-items: center;
  }
`;
// LEFT CONTAINER ----------------
const LeftContainer = styled.div`
  flex: 1;
`;
const Logo = styled.img`
  height: 25rem;
  margin-left: 2.3rem;

  @media (max-width: ${mediaWidth}) {
    margin-left: 0;
    align-self: center;
  }
`;
// RIGHT CONTAINER ---------------
const RightContainer = styled.div`
  flex: 2;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: flex-end;
  margin-left: -2rem;

  @media (max-width: ${mediaWidth}) {
    align-items: center;
    justify-content: center;
    margin-left: 0;
    width: inherit;
  }
`;
const Tagline = styled.h2`
  margin-bottom: 1.8rem;
  margin-left: 3rem;
  font-size: 2.5rem;
  color: #f3f3f3;

  @media (max-width: ${mediaWidth}) {
    margin-left: 0;
    text-align: center;
  }
`;
const People = styled.div`
  width: 100%;
  display: flex;
  align-items: space-between;
  margin-bottom: 3rem;

  @media (max-width: ${mediaWidth}) {
    margin-right: -0rem;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0;
  }
`;

export default Header;
