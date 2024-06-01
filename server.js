require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const fetch = require("node-fetch");
const axios = require("axios");
const fs = require("fs").promises;
const path = require("path");

const API_KEY = "sk-proj-Ef2FNNOpgm2g8XKxR8VeT3BlbkFJDQBqLbGVnkxSldw1BecE";
const PORT = 8000;

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
  apis: ["./server.js"],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

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
  const model = req.body.model === "ChatGPT3" ? "text-davinci-003" : "gpt-4";

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: [{ role: "system", content: req.body.message }],
      model: model,
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

/**
 * @openapi
 * /generate-image:
 *   post:
 *     description: Generate an image from a prompt
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prompt:
 *                 type: string
 *               size:
 *                 type: string
 *     responses:
 *       200:
 *         description: Image URL returned
 *       500:
 *         description: Error message
 */

app.post("/generate-image", async (req, res) => {
  const { prompt, size, n } = req.body;
  if (!prompt || !size) {
    res.status(400).send("Missing required parameters");
    return;
  }
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt, n, size }),
  };

  try {
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      options
    );
    const data = await response.json();
    const downloads = await Promise.all(
      data.data.map(async (generation, index) => {
        const response = await axios({
          url: generation.url,
          responseType: "arraybuffer",
        });
        const buffer = Buffer.from(response.data, "utf-8");
        const filename = `image-${Date.now()}-${index}.png`;
        // Обновление пути к папке где сохраняются картинки
        const filepath = path.resolve(
          __dirname,
          "src",
          "utils",
          "generatedImages",
          filename
        );
        await fs.writeFile(filepath, buffer);
        return `http://localhost:${PORT}/images/${filename}`;
      })
    );

    res.send({ imageUrls: downloads });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.toString());
  }
});

// Обновление пути для статического сервера картинок
app.use(
  "/images",
  express.static(path.resolve(__dirname, "src", "utils", "generatedImages"))
);

// app.get("/images/:filename", (req, res) => {
//   const { filename } = req.params;
//   const filepath = path.resolve(__dirname, "images", filename);
//   res.sendFile(filepath);
// });

app.listen(PORT, () => {
  console.log(`
  ============================================
  🚀 Server ready at: http://localhost:${PORT}

  Press CTRL-C to stop server
  ============================================
  `);
});
