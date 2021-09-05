import React from "react";
import { Container } from "react-bootstrap";

return (
  <Container>
    <a
      name="windy-webcam-timelapse-player"
      data-id={`${data}`}
      data-play="month"
      href={`https://windy.com/webcams/${data}`}
      target="_blank"
    ></a>
    <script>
      async; type = "text/javascript"; src =
      "https://webcams.windy.com/webcams/public/embed/script/player.js";
    </script>
  </Container>
);

export default WebcamiFrame;
