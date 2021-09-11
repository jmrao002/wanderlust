import React from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const ViewWebcam = (props) => {
  const location = useLocation();
  const webcamId = location.state?.webcamId;
  const webcamTitle = location.state?.webcamTitle;
  return (
    <Container className="d-flex justify-content-center m-4">
      <div className="d-flex row justify-content-center">
        <p className="justify-content-center">Live view of {webcamTitle}</p>
        <iframe
          title="Live View"
          src={`https://webcams.windy.com/webcams/stream/${webcamId}`}
          width="1080px"
          height="720px"
        ></iframe>
      </div>
    </Container>
  );
};

export default ViewWebcam;
