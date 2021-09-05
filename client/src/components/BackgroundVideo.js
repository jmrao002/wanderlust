import React from "react";
import { Container } from "react-bootstrap";

const BackgroundVideo = () => {
  const videoSource = "https://mdbootstrap.com/img/video/Lines.mp4";
  return (
    <Container>
      <video autoPlay="autoplay" loop="loop" muted>
        <source srt={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Container>
  );
};

export default BackgroundVideo;
