const puppeteer = require("puppeteer");
const ejs = require("ejs");
const path = require("path");

exports.generateImage = (url, width, height) => {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox"],
        ignoreDefaultArgs: ["--disable-extensions"],
        args: ["--enable-gpu"],
      });

      const page = await browser.newPage();
      page.setViewport({ width: width, height: height });
      await page.goto(url, {
        waitUntil: "networkidle0",
      });
      const image = await page.screenshot({ type: "jpeg" });
      await browser.close();
      resolve(image);
    } catch (err) {
      reject(err);
    }
  });
};
