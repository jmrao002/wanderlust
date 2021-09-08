import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import WebcamiFrame from "../components/WebcamiFrame";

const ViewWebcam = () => {
  const { loading, data } = useQuery(GET_ME);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <WebcamiFrame />
    </>
  );
};

export default ViewWebcam;
