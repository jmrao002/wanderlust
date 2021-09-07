const db = require("../config/connection");
const { Category } = require("../models");

db.once("open", async () => {
  await Category.deleteMany({});

  const categories = await Category.insertMany([
    { name: "Outdoor" },
    { name: "Lake/River" },
    { name: "Mountain/Canyon" },
    { name: "Sky" },
    { name: "Building" },
    { name: "Airport" },
    { name: "City" },
    { name: "Beach" },
    { name: "Coast" },
  ]);

  console.log("categories seeded");

  process.exit();
});
