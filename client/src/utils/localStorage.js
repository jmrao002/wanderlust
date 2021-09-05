export const getSavedWebcamIds = () => {
  const savedWebcamIds = localStorage.getItem("saved_webcams")
    ? JSON.parse(localStorage.getItem("saved_webcams"))
    : [];

  return savedWebcamIds;
};

export const saveWebcamIds = (webcamIdArr) => {
  if (webcamIdArr.length) {
    localStorage.setItem("saved_webcams", JSON.stringify(webcamIdArr));
  } else {
    localStorage.removeItem("saved_webcams");
  }
};

export const removeWebcamId = (webcamId) => {
  const savedWebcamIds = localStorage.getItem("saved_webcams")
    ? JSON.parse(localStorage.getItem("saved_webcams"))
    : null;

  if (!savedWebcamIds) {
    return false;
  }

  const updatedSavedWebcamIds = savedWebcamIds?.filter(
    (savedWebcamId) => savedWebcamId !== webcamId
  );
  localStorage.setItem("saved_webcams", JSON.stringify(updatedSavedWebcamIds));

  return true;
};
