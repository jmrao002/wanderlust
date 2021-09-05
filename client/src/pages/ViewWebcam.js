import React from "react";
import { Container } from "react-bootstrap";

const ViewWebcam = () => {
  const { loading, data } = useQuery(GET_ME);

  if (loading) {
    return <h2>Loading...</h2>;
  }

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
};

export default ViewWebcam;
