const puppeteer = require("puppeteer");
const ejs = require("ejs");
const path = require("path");

exports.generateImage = async (url, width, height, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--enable-gpu"],
      ignoreDefaultArgs: ["--disable-extensions"],
    });
    try {
      const page = await browser.newPage();
      await page.goto(url, {
        waitUntil: "networkidle0",
      });

      const divElement = await page.waitForSelector("div");
      const divBoundingBox = await divElement.boundingBox();

      const image = await page.screenshot({
        type: "jpeg",
        clip: {
          x: divBoundingBox.x,
          y: divBoundingBox.y,
          width: divBoundingBox.width,
          height: divBoundingBox.height,
        },
      });
      await browser.close();
      return image;
    } catch (err) {
      console.log(err);
      browser.close();
      return res.status(500).send("unable to generate image");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("unable to generate image");
  }
};
