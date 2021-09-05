import React, { useState, useEffect } from "react";
import { Container, Dropdown, DropdownButton } from "react-bootstrap";
require("dotenv").config();

const CategoryDropdown = () => {
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState([
    { label: "Loading...", value: "" },
  ]);
  const [value, setValue] = React.useState();
  // Some guidelines for creating a dropdown from an API response
  // https://www.carlrippon.com/drop-down-data-binding-with-react-hooks/
  // https://api.windy.com/api/webcams/v2/list?show=categories&key=2LUGQul9yRztrjwRIjsxvu1laj1HUCuq

  // consider possibly moving this to the API.js page in Utils
  React.useEffect(() => {
    async function getWebcamCategories() {
      const response = await fetch(
        `https://api.windy.com/api/webcams/v2/list?show=categories&key=${process.env.REACT_APP_API_KEY}`
      );
      const body = await response.json();
      setItems(
        body.result.categories.map(({ name }) => ({ label: name, value: name }))
      );
      setLoading(false);
    }
    getWebcamCategories();
  }, []);

  return (
    <Container>
      <DropdownButton
        disabled={loading}
        className="text-dark m-2"
        variant="light"
        size="lg"
        title="Categories"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      >
        {items.map(({ label, value }) => (
          <Dropdown.Item key={value} value={value}>
            {label}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      <div>Selected Category: {value}</div>
    </Container>
  );
};

export default CategoryDropdown;
