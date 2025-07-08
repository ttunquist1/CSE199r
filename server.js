const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/analyze', async (req, res) => {
  const { resumeText } = req.body;

  try {
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: "llama3",
      prompt: `You are to Analyze the users resume and improve upon it:\n\n${resumeText}`,
      stream: false
    });

    res.json({ reply: response.data.response });
  } catch (err) {
    console.error("Ollama error:", err.message);
    res.status(500).json({ error: "Failed to query Ollama" });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
