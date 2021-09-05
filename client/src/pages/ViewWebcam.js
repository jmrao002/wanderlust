import React from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";
import { saveWebcam, searchGoogleWebcams } from "../utils/API";
import Auth from "../utils/auth";

return (
  <>
    <Container>
      <a
        name="windy-webcam-timelapse-player"
        data-id={`${webcamId}`}
        data-play="month"
        href={`https://windy.com/webcams/${webcamId}`}
        target="_blank"
      ></a>
      <script>
        async; type = "text/javascript"; src =
        "https://webcams.windy.com/webcams/public/embed/script/player.js";
      </script>
    </Container>
  </>
);

export default ViewWebcams;
