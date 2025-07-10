const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/analyze', async (req, res) => {
  const { resumeText, jobDescription } = req.body;

  const prompt = `
You are an AI resume assistant. Analyze the following resume and suggest improvements so it aligns better with the given job description.

Job Description:
${jobDescription}

Resume:
${resumeText}

Your response should highlight changes or suggestions that would make this resume more appealing for the job.
`;

  try {
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: "llama3",
      prompt: prompt,
      stream: false
    });

    res.json({ reply: response.data.response });
  } catch (err) {
    console.error("Ollama error:", err.message);
    res.status(500).json({ error: "Failed to query Ollama" });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
