require("dotenv").config();

const PORT = 8000;
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

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
      model: "gpt-4",
      max_tokens: 10,
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
  console.log(`Server is running on port ${PORT}`);
});
