import React, { Component } from "react";
import styled from "styled-components";
import playIcon from "../../play-button-01.png";
import pauseIcon from "../../pause-button-01.png";

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      currentTime: parseInt(localStorage.getItem("currentTime")) || 0,
      playbackSpeed: parseInt(localStorage.getItem("playbackSpeed")) || 1,
      volume: parseInt(localStorage.getItem("volume")) || 50,
      showLength: "00:00:00"
    };

    this.audio = new Audio(this.props.show.url);

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.changePlaybackSpeed = this.changePlaybackSpeed.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.scrub = this.scrub.bind(this);
  }

  componentDidMount() {
    this.setState({
      showLength: this.convertStringToMs(this.props.show.meta.duration)
    });
    this.audio.currentTime = this.state.currentTime / 1000;
    this.audio.volume = this.state.volume / 100;
    this.audio.playbackRate = this.state.playbackSpeed;
    this.audio.addEventListener("timeupdate", e => {
      this.setState({ currentTime: e.target.currentTime * 1000 });
    });
  }

  componentDidUpdate(prevProps) {
    const { show } = this.props;

    if (show.meta.episode !== prevProps.show.meta.episode) {
      this.pause();
      this.audio.removeEventListener("timeupdate", e => "");
      console.log(this.props.show.meta.duration);

      this.setState({
        currentTime: 0,
        showLength: this.convertStringToMs(this.props.show.meta.duration)
      });

      this.audio = new Audio(show.url);
      this.audio.addEventListener("timeupdate", e => {
        this.setState({ currentTime: e.target.currentTime * 1000 });
      });

      this.audio.currentTime = 0;
      this.audio.playbackRate = this.state.playbackSpeed;
      this.audio.volume = this.state.volume / 100;

      this.play();
    }

    localStorage.setItem("currentTime", this.state.currentTime);
    localStorage.setItem("volume", this.state.volume);
    localStorage.setItem("playbackSpeed", this.state.playbackSpeed);
  }

  play() {
    this.setState({ playing: true });
    this.audio.play();
  }

  pause() {
    this.setState({ playing: false });
    this.audio.pause();
  }

  convertStringToMs(string) {
    const parts = string.split(":");

    if (parts.length === 3) {
      const hours = parseInt(parts[0]) * 3600000;
      const minutes = parseInt(parts[1]) * 60000;
      const seconds = parseInt(parts[2]) * 1000;

      return hours + minutes + seconds;
    } else {
      const minutes = parseInt(parts[1]) * 60000;
      const seconds = parseInt(parts[2]) * 1000;

      return minutes + seconds;
    }
  }

  convertMsToString(s) {
    function pad(n, z) {
      z = z || 2;
      return ("00" + n).slice(-z);
    }

    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return pad(hrs) + ":" + pad(mins) + ":" + pad(secs);
  }

  changePlaybackSpeed() {
    const currentSpeed = this.state.playbackSpeed;
    let playbackSpeed = currentSpeed + 0.25;

    playbackSpeed = playbackSpeed > 2 ? 0.5 : playbackSpeed;

    this.setState({ playbackSpeed });
    this.audio.playbackRate = playbackSpeed;
  }

  changeVolume(value) {
    this.setState({ volume: value });
    this.audio.volume = value / 100;
  }

  scrub(value) {
    this.setState({ currentTime: value });
    this.audio.currentTime = value / 1000;
  }

  render() {
    const { show } = this.props;

    const currentTimeString = this.convertMsToString(this.state.currentTime);

    return (
      <Container>
        <LeftContainer>
          {this.state.playing ? (
            <PlayPause src={pauseIcon} onClick={() => this.pause()} />
          ) : (
            <PlayPause src={playIcon} onClick={() => this.play()} />
          )}
          <TimeText>
            {currentTimeString} / {show.meta.duration}
          </TimeText>
        </LeftContainer>
        <MidContainer>
          <PlaybackScrub id="scrub">
            <ScrubSlider
              type="range"
              min="0"
              max={`${this.state.showLength}`}
              value={this.state.currentTime}
              id="scrub"
              onChange={e => this.scrub(e.target.value)}
            />
          </PlaybackScrub>
          <ShowInfo>
            <TitleText>Playing: {show.title}</TitleText>
            <EpisodeText>Episode {show.meta.episode}</EpisodeText>
          </ShowInfo>
        </MidContainer>
        <RightContainer>
          <SpeedContainer onClick={() => this.changePlaybackSpeed()}>
            <SpeedText style={{ marginBottom: `${1}rem` }}>SPEED</SpeedText>
            <SpeedText>x {this.state.playbackSpeed}</SpeedText>
          </SpeedContainer>
          <VolumeContainer>
            <VolumeText>VOLUME</VolumeText>
            <Slider
              type="range"
              min="1"
              max="100"
              value={this.state.volume}
              id="volume"
              onChange={e => this.changeVolume(e.target.value)}
            />
          </VolumeContainer>
        </RightContainer>
      </Container>
    );
  }
}

const Container = styled.div`
  height: 10rem;
  width: 100%;
  background-color: #313131;
  border-radius: 0.3rem 0.3rem 0 0;
  position: sticky;
  top: 0rem;
  display: flex;
  justify-content: space-between;
  z-index: 100;
`;
const LeftContainer = styled.div`
  width: 12rem;
  height: 100%
  border-right: 0.1rem solid #030202;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const MidContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const PlaybackScrub = styled.div`
  width: 100%;
  height: 3rem;
  background-color: #212121;

  :hover {
    cursor: pointer;
  }
`;
const ScrubSlider = styled.input`
  height: 100%;
  width: 100%;
  background: #212121;
  outline: none;

  :hover {
    cursor: pointer;
  }

  ::-moz-range-progress {
    background: #fcc34b;
    height: 100%;
  }

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 0.1rem;
    height: 100%;
    background: #fcc34b;
    cursor: pointer;
    border-radius: 0;
  }
  ::-moz-range-thumb {
    width: 0.1rem;
    height: 100%;
    background: #fcc34b;
    cursor: pointer;
    border: none;
    border-radius: 0;
  }
`;
const ShowInfo = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  padding-left: 1.3rem;
  padding-bottom: 1.25rem;
`;
const TitleText = styled.h1`
  color: #f3f3f3;
  font-size: 1.8rem;
`;
const EpisodeText = styled.p`
  color: #f3f3f3;
  font-size: 1.1rem;
  font-weight: 600;
`;
const RightContainer = styled.div`
  display: flex;
`;
const VolumeContainer = styled.div`
  width: 10rem;
  height: 100%;
  border-left: 0.1rem solid #030202;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const VolumeText = styled.p`
  font-size: 1.1rem;
  color: #f3f3f3;
  margin-top: 2rem;
`;
const Slider = styled.input`
  width: 80%;
  height: 0.4rem;
  margin-bottom: 2.3rem;
  background: #212121;
  outline: none;

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 1rem;
    height: 1rem;
    background: #fcc34b;
    cursor: pointer;
    border-radius: 10rem;
  }
  ::-moz-range-thumb {
    width: 1.3rem;
    height: 1.3rem;
    background: #fcc34b;
    cursor: pointer;
    border: none;
    border-radius: 10rem;
  }
`;
const SpeedContainer = styled.div`
  width: 10rem;
  height: 100%;
  border-left: 0.1rem solid #030202;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  :hover {
    cursor: pointer;
  }
`;
const SpeedText = styled.div`
  color: #f3f3f3;
  font-size: 1.1rem;
  user-select: none;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;
const PlayPause = styled.img`
  height: 50%;
  margin-bottom: 0.5rem;

  :hover {
    cursor: pointer;
  }
`;
const TimeText = styled.p`
  font-size: 1rem;
  color: #f3f3f3;
`;

export default Player;
