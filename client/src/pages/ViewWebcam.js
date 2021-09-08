import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import WebcamiFrame from "../components/WebcamiFrame";
import { useStoreContext } from "../utils/GlobalState";

const ViewWebcam = () => {
  const { loading, data } = useQuery(GET_ME);
  const [state, dispatch] = useStoreContext();
  const { currentCategory } = state;

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
