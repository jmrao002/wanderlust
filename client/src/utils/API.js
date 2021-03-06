require("dotenv").config();

// route to get logged in user's info (needs the token)
export const getMe = (token) => {
  return fetch("/api/users/me", {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData) => {
  return fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

// save webcam data for a logged in user
export const saveWebcam = (webcamData, token) => {
  return fetch("/api/users", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(webcamData),
  });
};

// remove saved webcam data for a logged in user
export const deleteWebcam = (webcamId, token) => {
  return fetch(`/api/users/webcams/${webcamId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

// make a search to windy webcams api
// will get 10 results unless otherwise specified
export const searchWindyWebcams = (query) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  return fetch(
    `https://api.windy.com/api/webcams/v2/list/property=live/category=${query}/orderby=popularity/limit=20?show=webcams:image,player,location&key=${process.env.REACT_APP_API_KEY}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return result;
    })
    .catch((error) => console.log("error", error));
};
