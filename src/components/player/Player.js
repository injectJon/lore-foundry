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
          <PlayContainer>
            {this.state.playing ? (
              <PlayPause src={pauseIcon} onClick={() => this.pause()} />
            ) : (
              <PlayPause src={playIcon} onClick={() => this.play()} />
            )}
            <TimeText>
              {currentTimeString} / {show.meta.duration}
            </TimeText>
          </PlayContainer>

          <ShowContainer>
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
          </ShowContainer>
        </LeftContainer>
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

const mediaWidth = "640px";

const Container = styled.div`
  height: 10rem;
  width: 100%;
  border-radius: 0.3rem 0.3rem 0 0;
  position: sticky;
  top: 0rem;
  display: flex;
  justify-content: space-between;
  z-index: 100;

  @media (max-width: ${mediaWidth}) {
    flex-wrap: wrap;
    height: 20rem;
  }
`;
const LeftContainer = styled.div`
  flex: 1;
  background-color: #313131;
  height: 10rem;
  border-right: 0.1rem solid #030202;
  display: flex;
`;
const PlayContainer = styled.div`
  height: 10rem;
  min-width: 10rem;
  border-right: 0.1rem solid #030202;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ShowContainer = styled.div`
  background-color: #313131;
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 10rem;
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
  overflow: hidden;

  -webkit-appearance: none;

  :hover {
    cursor: pointer;
  }

  ::-webkit-slider-runnable-track {
    height: 100%;
    -webkit-appearance: none;
    background: #212121;
    border-radius: 0;
  }

  ::-moz-range-progress {
    background: #fcc34b;
    height: 100%;
  }

  ::-webkit-slider-thumb {
    width: 1.5rem;
    height: 100%;
    -webkit-appearance: none;
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
  white-space: nowrap;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  padding-left: 1.3rem;
  padding-bottom: 1.25rem;

  @media (max-width: ${mediaWidth}) {
    white-space: normal;
  }
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

  @media (max-width: ${mediaWidth}) {
    width: 100%;
    border-top: 0.1rem solid #030202;
  }
`;
const VolumeContainer = styled.div`
  background-color: #313131;
  width: 10rem;
  height: 100%;
  border-left: 0.1rem solid #030202;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${mediaWidth}) {
    width: 50%;
  }
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

  -webkit-appearance: none;

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 1.3rem;
    height: 1.3rem;
    background-color: #fcc34b;
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
  background-color: #313131;
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

  @media (max-width: ${mediaWidth}) {
    width: 50%;
    border-left: none;
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
  margin-left: 0.2rem;
  margin-right: 0.2rem;
`;

export default Player;
