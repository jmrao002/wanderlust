const db = require("../config/connection");
const { Category } = require("../models");

db.once("open", async () => {
  await Category.deleteMany({});

  const categories = await Category.insertMany([
    { name: "landscape" },
    { name: "lake" },
    { name: "mountain" },
    { name: "traffic" },
    { name: "building" },
    { name: "airport" },
    { name: "city" },
    { name: "beach" },
    { name: "coast" },
  ]);

  console.log("categories seeded");

  // await Sortoption.deleteMany({});

  // const sortoptions = await Sortoption.insertMany([
  //   { name: "popularity" },
  //   { name: "hotness" },
  //   { name: "new" },
  //   { name: "random" },
  // ]);

  // console.log("sortoptions seeded");

  process.exit();
});
