import React, { useState, useEffect } from "react";
import { Container, Dropdown, DropdownButton } from "react-bootstrap";
require("dotenv").config();

const CategoryDropdown = () => {
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState([
    { label: "Loading...", value: "" },
  ]);
  // controll the dropdown value with state
  const [value, setValue] = React.useState();

  // consider possibly moving this to the API.js page in Utils
  React.useEffect(() => {
    // abort loading when unmounted to avoid error on fast page redirect
    let unmounted = false;
    // get categories from API list
    async function getWebcamCategories() {
      const response = await fetch(
        `https://api.windy.com/api/webcams/v2/list?show=categories&key=2LUGQul9yRztrjwRIjsxvu1laj1HUCuq`
      );
      const body = await response.json();
      if (!unmounted) {
        setItems(
          body.result.categories.map(({ name }) => ({
            label: name,
            value: name,
          }))
        );
        setLoading(false);
      }
    }
    getWebcamCategories();
    return () => {
      unmounted = true;
    };
  }, []);

  return (
    // redo all of this with bootstrap components... unless you're going to break it :)
    <>
      <select
        disabled={loading}
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      >
        <option value="null">--Choose a Category--</option>
        {items.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </>
  );
};

export default CategoryDropdown;
