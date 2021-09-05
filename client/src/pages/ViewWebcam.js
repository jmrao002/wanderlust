import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { GET_ME } from "../utils/queries";
import WebcameiFrame from "../components/WebcamiFrame";

const ViewWebcam = () => {
  const { loading, data } = useQuery(GET_ME);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <WebcameiFrame />
    </>
  );
};

export default ViewWebcam;
