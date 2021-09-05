import React, { useState, useEffect } from "react";
import { Container, Dropdown, DropdownButton } from "react-bootstrap";
import { getWebcamCategories } from "../utils/API";

const CategoryDropdown = () => {
    const [items, setItems] = React.useState([]);
    const [value, setValue] = React.useState();
  // Some guidelines for creating a dropdown from an API response
  // https://www.carlrippon.com/drop-down-data-binding-with-react-hooks/
  // https://api.windy.com/api/webcams/v2/list?show=categories&key=2LUGQul9yRztrjwRIjsxvu1laj1HUCuq

  React.useEffect(() => {
    async function getWebcamCategories() {
      const response = await fetch(
        `https://api.windy.com/api/webcams/v2/list?show=categories&key=2LUGQul9yRztrjwRIjsxvu1laj1HUCuq`
      );
      const body = await response.json();
      setItems(
        body.result.categories.map(({ name }) => ({ label: name, value: name }))
      );
    }
    getWebcamCategories();
  }, []);

  return (
    <Container>
      <DropdownButton
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
    </Container>
  );
};

export default CategoryDropdown;
