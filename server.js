require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const fetch = require("node-fetch");

const API_KEY = "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";

const app = express();
app.use(express.json());
app.use(cors());

// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Chat with OpenAI API",
      version: "1.0.0",
      description: "An API to interact with OpenAI for text generation",
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
  },
  apis: ["./server.js"], // files containing annotations as above
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

// app.get("/api-docs", (req, res) => {
//   res.sendFile("docs.html", { root: __dirname });
// });

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

/**
 * @openapi
 * /completions:
 *   post:
 *     description: Get a response from OpenAI
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Server error
 */

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
      max_tokens: 1000,
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
    res.status(500).send(error);
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
