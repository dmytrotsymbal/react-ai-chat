require("dotenv").config();

const PORT = 8000;
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

// const API_KEY = process.env.API_KEY;
const API_KEY = "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";

app.post("/completions", async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,

      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: [{ role: "system", content: req.body.message }],
      model: "gpt-3.5-turbo-16k",
      max_tokens: 7,
    }),
  };

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => {
  console.log(`YEEEES! Server is running on port ${PORT}`);
});
