import React from "react";
import { Jumbotron, Container, CardColumns, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/react-hooks";
// import the query we're going to execute and the mutation
import { GET_ME } from "../utils/queries";
import { REMOVE_WEBCAM } from "../utils/mutations";

import Auth from "../utils/auth";
import { removeWebcamId } from "../utils/localStorage";

const SavedWebcams = () => {
  // execute the query on component load
  const { loading, data } = useQuery(GET_ME);
  const [removeWebcam, { error }] = useMutation(REMOVE_WEBCAM);
  // check to see if data is there and if not then return an empty array
  const userData = data?.me || [];

  const handleDeleteWebcam = async (webcamId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeWebcam({
        variables: { webcamId },
      });

      removeWebcamId(webcamId);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>viewing saved webcams</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedWebcams.length
            ? `Viewing ${userData.savedWebcams.length} saved ${
                userData.savedWebcams.length === 1 ? "webcam" : "webcams"
              }:`
            : "you have no saved webcams!"}
        </h2>
        <CardColumns>
          {userData.savedWebcams.map((webcam) => {
            return (
              <Card key={webcam.webcamId} border="dark">
                {webcam.image ? (
                  <Card.Img
                    src={webcam.image}
                    alt={`A preview of ${webcam.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{webcam.title}</Card.Title>
                  <div className="d-flex justify-content-around">
                    <Link
                      to={{
                        pathname: "/view",
                        state: {
                          webcamId: webcam.webcamId,
                          webcamTitle: webcam.title,
                        },
                      }}
                    >
                      Live View
                    </Link>
                    <Card.Link
                      href={`http://maps.google.com/maps?q=${webcam.lat},${webcam.lon}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      See it on a map
                    </Card.Link>
                  </div>
                  <button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteWebcam(webcam.webcamId)}
                  >
                    Delete this Webcam!
                  </button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedWebcams;
