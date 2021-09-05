import React from "react";
import { Container } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { GET_ME } from "../utils/queries";

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
    </>
  );
};

export default ViewWebcam;
