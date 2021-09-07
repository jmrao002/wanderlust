const db = require("../config/connection");
const { Category } = require("../models");

db.once("open", async () => {
  await Category.deleteMany({});

  const categories = await Category.insertMany([
    { name: "Beach" },
    { name: "Sky" },
    { name: "Outdoor" },
  ]);

  console.log("categories seeded");

  process.exit();
});
