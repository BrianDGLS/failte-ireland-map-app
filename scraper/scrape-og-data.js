const ogs = require("open-graph-scraper");
const { join } = require("path");
const { readFileSync, writeFileSync } = require("fs");
const cheerio = require("cheerio");

const csvToJson = (csv) => {
  const lines = csv.split("\n");

  const result = [];
  const headers = lines[0].split(",");
  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const currentline = lines[i].split(",");
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }

  return result;
};

const attractionsCsv = readFileSync(
  join(__dirname, "../src/assets/data/attractions.csv"),
  "utf8"
);
const attractionsJson = csvToJson(attractionsCsv);

const Main = (async () => {
  const promises = [];
  for (const attraction of attractionsJson.slice(0, 10)) {
    if (attraction.Url) {
      const options = { url: attraction.Url };
      promises.push(
        new Promise((resolve, reject) => {
          ogs(options, (error, result, response) => {
            if (result.ogDescription) {
              attraction.ogDescription = result.ogDescription.replace(
                /[^0-9a-zA-Z .]/g,
                ""
              );
            }
            if (result.ogImage) {
              attraction.ogImage = Array.isArray(result.ogImage)
                ? result.ogImage[0].url
                : result.ogImage.url;
            }
            resolve(attraction);
          });
        })
      );
    }
  }
  await Promise.all(promises);
  const converter = require("json-2-csv");
  converter.json2csv(attractionsJson, (err, csv) => {
    if (err) {
      throw err;
    }

    writeFileSync(
      join(__dirname, "../src/assets/data/attractions-test.csv"),
      csv
    );
  });
})();
