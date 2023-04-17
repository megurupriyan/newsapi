const express = require("express");
const cors = require("cors");
const axios = require("axios");
const moment = require("moment");

const app = express();
app.use(cors());

const apiKey = "ca18b561cb2cf106e6cfa783e00057f2"; // Get an API key from the GNews API website

const cache = {}; // Use an in-memory cache to store the API responses

app.get("/api/news", async (req, res) => {
  const { q, lang, country, category, from, to, pageSize } = req.query;
  const cacheKey = `news:${q || ""}:${lang || ""}:${country || ""}:${
    category || ""
  }:${from || ""}:${to || ""}:${pageSize || ""}`;

  if (
    cache[cacheKey] &&
    moment().diff(moment(cache[cacheKey].timestamp), "minutes") < 5
  ) {
    // If the data is cached and it's not older than 5 minutes, return it from the cache
    return res.json(cache[cacheKey].data);
  }

  try {
    const response = await axios.get("https://gnews.io/api/v4/search", {
      params: {
        q,
        lang,
        country,
        category,
        from,
        to,
        page_size: pageSize,
        token: apiKey,
      },
    });

    const data = response.data.articles;
    cache[cacheKey] = { timestamp: moment(), data }; // Store the response data in the cache
    return res.json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.listen(8080, () => {
  console.log("Server listening on port 3001");
});
