import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";
// import the mutation we're going to execute
import { SAVE_WEBCAM } from "../utils/mutations";
import { useMutation } from "@apollo/react-hooks";
import Auth from "../utils/auth";
import { saveWebcam, searchWindyWebcams } from "../utils/API";
import { saveWebcamIds, getSavedWebcamIds } from "../utils/localStorage";
import CategoryDropdown from "../components/CategoryDropdown";

const SearchWebcams = () => {
  const [searchedWebcams, setSearchedWebcams] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");

  const [savedWebcamIds, setSavedWebcamIds] = useState(getSavedWebcamIds());

  const [saveWebcam, { error }] = useMutation(SAVE_WEBCAM);

  useEffect(() => {
    return () => saveWebcamIds(savedWebcamIds);
  });

  // function to search
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (categoryInput == "null") {
      return false;
    }

    try {
      const response = await searchWindyWebcams(categoryInput);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const { items } = await response.json();

      const webcamData = items.map((webcam) => ({
        webcamId: webcam.id,
        image: webcam.volumeInfo.imageLinks?.thumbnail || "",
        link: webcam.volumeInfo.link,
        title: webcam.volumeInfo.title,
      }));

      setSearchedWebcams(webcamData);
    } catch (err) {
      console.error(err);
    }
  };

  // function to save webcam and add to state
  const handleSaveWebcam = async (webcamId) => {
    const webcamToSave = searchedWebcams.find(
      (webcam) => webcam.webcamId === webcamId
    );

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await saveWebcam({
        variables: { input: webcamToSave },
      });

      setSavedWebcamIds([...savedWebcamIds, webcamToSave.webcamId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {/* Need to get a background image or video working here. */}
      <div id="hero" className="d-flex flex-column justify-content-center">
        <div className="row justify-content-center">
          <div className="col-xl-8 text-center transparent">
            <h1>Your Window to the World</h1>
            <h3>Start Your Search</h3>

            <Form className="d-flex flex-row" onSubmit={handleFormSubmit}>
              <Col>
                {/* Call over to category dropdown component */}
                <CategoryDropdown />
              </Col>
              {/* <Form.Row> */}
              <Col className="align-items-center">
                <Button
                  className="btn btn-outline-light btn-lg text-dark m-2"
                  type="submit"
                  variant="light"
                  size="lg"
                >
                  Submit
                </Button>
              </Col>
              {/* </Form.Row> */}
            </Form>
          </div>
        </div>
      </div>
      {/* Might want to replace with a giphy tutorial? */}
      {/* <h2>
          {searchedWebcams.length
            ? `Viewing ${searchedWebcams.length} results:`
            : "Search for a webcam to begin"}
        </h2> */}
      <CardColumns>
        {searchedWebcams.map((webcam) => {
          return (
            <Card key={webcam.webcamId} border="dark">
              {webcam.image ? (
                <Card.Img
                  src={webcam.image}
                  alt={`The cover for ${webcam.title}`}
                  variant="top"
                />
              ) : null}
              <Card.Body>
                <Card.Title>{webcam.title}</Card.Title>
                <p className="small">Authors: {webcam.authors}</p>
                <Card.Text>{webcam.description}</Card.Text>
                {Auth.loggedIn() && (
                  <Button
                    disabled={savedWebcamIds?.some(
                      (savedWebcamId) => savedWebcamId === webcam.webcamId
                    )}
                    className="btn-block btn-info"
                    onClick={() => handleSaveWebcam(webcam.webcamId)}
                  >
                    {savedWebcamIds?.some(
                      (savedWebcamId) => savedWebcamId === webcam.webcamId
                    )
                      ? "This webcam has already been saved!"
                      : "Save this Webcam!"}
                  </Button>
                )}
              </Card.Body>
            </Card>
          );
        })}
      </CardColumns>
    </div>
  );
};

export default SearchWebcams;
