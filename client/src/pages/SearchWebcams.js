import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Card, CardColumns } from "react-bootstrap";
// import the mutation we're going to execute
import { SAVE_WEBCAM } from "../utils/mutations";
import { useMutation } from "@apollo/react-hooks";
import Auth from "../utils/auth";
import { searchWindyWebcams } from "../utils/API";
import { saveWebcamIds, getSavedWebcamIds } from "../utils/localStorage";
import CategoryMenu from "../components/CategoryMenu";
import Clock from "../components/Clock";
import { useStoreContext } from "../utils/GlobalState";

const SearchWebcams = () => {
  const [state, dispatch] = useStoreContext();
  const { currentCategory } = state;
  const [searchedWebcams, setSearchedWebcams] = useState([]);

  const [savedWebcamIds, setSavedWebcamIds] = useState(getSavedWebcamIds());

  const [saveWebcam, { error }] = useMutation(SAVE_WEBCAM);

  useEffect(() => {
    return () => saveWebcamIds(savedWebcamIds);
  });

  const autoScroll = () => {
    let element = document.getElementById("cards");
    element.scrollIntoView({ behavior: "smooth" });
  };

  // function to search
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await searchWindyWebcams(currentCategory);
      const responseObj = JSON.parse(response);
      const items = responseObj.result.webcams;

      const webcamData = items.map((webcam) => ({
        webcamId: webcam.id,
        title: webcam.title,
        image: webcam.image?.current.preview || "",
        link: webcam.player.live.embed,
        lon: webcam.location.longitude,
        lat: webcam.location.latitude,
      }));

      setSearchedWebcams(webcamData);
      autoScroll();
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
      <div id="hero" className="d-flex flex-column">
        <div className="justify-content-around row">
          <Clock title="Tokyo" datediff={9} />
          <Clock title="Dubai" datediff={4} />
          <Clock title="Paris" datediff={-2} />
          <Clock title="Chicago" datediff={-7} />
        </div>
        <div className="row justify-content-center">
          <div className="col-xl-8 text-center transparent pt-50">
            <h1>Your Window to the World</h1>
            <h3>Start Your Search</h3>
            {/* Note that this submits the form because it is using the React Bootstrap Form. If you remove that, you need to build a submit button. Something to think about if you add a Location parameter. */}
            <Form
              className="d-flex flex-row justify-content-center"
              onSubmit={handleFormSubmit}
            >
              {/* Category buttons component */}
              <CategoryMenu />
            </Form>
          </div>
        </div>
      </div>
      {/* Results Page */}
      <div id="cards">
        {/* <SortDropdown /> */}
        <CardColumns className="m-4">
          {searchedWebcams.map((webcam) => {
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
                  <Card.Title className="text-center">
                    {webcam.title}
                  </Card.Title>
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
                  {Auth.loggedIn() && (
                    <button
                      size="lg"
                      disabled={savedWebcamIds?.some(
                        (savedWebcamId) => savedWebcamId === webcam.webcamId
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSaveWebcam(webcam.webcamId)}
                    >
                      {savedWebcamIds?.some(
                        (savedWebcamId) => savedWebcamId === webcam.webcamId
                      )
                        ? "This webcam has been saved!"
                        : "Save this Webcam!"}
                    </button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </div>
    </div>
  );
};

export default SearchWebcams;
