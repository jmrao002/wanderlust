import React from "react";
import { Container } from "react-bootstrap";

const WebcamiFrame = () => {
  return (
    <Container>
      <a
        name="windy-webcam-timelapse-player"
        data-id={`xxx`}
        data-play="month"
        href={`https://windy.com/webcams/xxx`}
        target="_blank"
        rel="noopener noreferrer"
      />
      <script
        async
        type="text/javascript"
        src="https://webcams.windy.com/webcams/public/embed/script/player.js"
      ></script>
    </Container>
  );
};

export default WebcamiFrame;
