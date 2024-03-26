// require fs and puppeteer
const express = require("express");
const { generateImage } = require("./service/generateImage");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.set("view engine", "ejs");
app.set();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/image", async (req, res) => {
  let { url, token, height, width } = req.body;
  // if (token !== process.env.TOKEN) {
  //   return res.status(401).json({ message: "Unauthorized" });
  // }
  if (!url) {
    return res.status(400).json({ message: "URL is required" });
  }
  res.setHeader("Content-Type", `image/png`);
  res.setHeader(
    "Cache-Control",
    `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
  );

  res.end(await generateImage(url, width, height));
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
