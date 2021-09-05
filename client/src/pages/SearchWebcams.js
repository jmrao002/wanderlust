import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
// import the mutation we're going to execute
import { SAVE_WEBCAM } from "../utils/mutations";
import { useMutation } from "@apollo/react-hooks";
import Auth from "../utils/auth";
import { saveWebcam, searchGoogleWebcams } from "../utils/API";
import { saveWebcamIds, getSavedWebcamIds } from "../utils/localStorage";

const SearchWebcams = () => {
  const [searchedWebcams, setSearchedWebcams] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [savedWebcamIds, setSavedWebcamIds] = useState(getSavedWebcamIds());

  const [saveWebcam, { error }] = useMutation(SAVE_WEBCAM);

  useEffect(() => {
    return () => saveWebcamIds(savedWebcamIds);
  });

  // function to search and to set state
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchGoogleWebcams(searchInput);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const { items } = await response.json();

      const webcamData = items.map((webcam) => ({
        webcamId: webcam.id,
        authors: webcam.volumeInfo.authors || ["No author to display"],
        title: webcam.volumeInfo.title,
        description: webcam.volumeInfo.description,
        image: webcam.volumeInfo.imageLinks?.thumbnail || "",
      }));

      setSearchedWebcams(webcamData);
      setSearchInput("");
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
      <Jumbotron
        fluid
        className="text-light bg-image"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1468581264429-2548ef9eb732'})`,
          backgroundRepeat: "no-repeat",
          width: "100%",
        }}
      >
        <Container>
          <h1>Use the dropdowns to find your scene!</h1>
          {/* Will want to replace with API driven data. Also, use a For/ForEach loop to create more buttons when needed */}
          <Form className="d-flex flex-row" onSubmit={handleFormSubmit}>
            <div className="d-flex flex-row justify-content-left m-4">
              <DropdownButton id="dropdown-basic-button" title="Category">
                <Dropdown.Item href="#/action-1">Mountains</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Beaches</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Cities</Dropdown.Item>
              </DropdownButton>
              <DropdownButton id="dropdown-basic-button" title="Country">
                <Dropdown.Item href="#/action-1">United States</Dropdown.Item>
                <Dropdown.Item href="#/action-2">France</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Switzerland</Dropdown.Item>
              </DropdownButton>
            </div>
            <div className="d-flex flex-row justify-content-right m-4">
              {/* <Form.Row> */}
              {/* <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a webcam"
                />
              </Col> */}
              <Col xs={12} md={4}>
                <Button
                  className="btn btn-outline-light btn-lg text-dark m-2"
                  type="submit"
                  variant="light"
                  size="lg"
                >
                  Submit Search
                </Button>
              </Col>
              {/* </Form.Row> */}
            </div>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedWebcams.length
            ? `Viewing ${searchedWebcams.length} results:`
            : "Search for a webcam to begin"}
        </h2>
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
      </Container>
    </div>
  );
};

export default SearchWebcams;
