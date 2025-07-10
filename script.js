document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('parseBtn').addEventListener('click', () => {
    const fileInput = document.getElementById('resumeFile');
    const file = fileInput.files[0];

    if (!file) {
      alert("Please upload a .docx file");
      return;
    }

    const reader = new FileReader();

    reader.onload = function(event) {
      const arrayBuffer = event.target.result;

      mammoth.extractRawText({ arrayBuffer: arrayBuffer })
        .then(result => {
          const text = result.value;
          parseResumeText(text);
        })
        .catch(err => console.error("Failed to extract text:", err));
    };

    reader.readAsArrayBuffer(file);
  });

  function parseResumeText(text) {
    const lines = text.split('\n');
    const sections = { experience: [], education: [], skills: [] };
    let current = null;

    for (const rawLine of lines) {
      const line = rawLine.trim();

      const lower = line.toLowerCase();
      if (lower === "experience") {
        current = "experience";
        continue;
      } else if (lower === "education") {
        current = "education";
        continue;
      } else if (lower === "skills") {
        current = "skills";
        continue;
      }

      if (current && line !== "") {
        sections[current].push(line);
      }
    }

    updateUI(sections);

    // ✅ Get job description input
    const jobDescription = document.getElementById('jobDescription').value;

    // ✅ Send resume + job description to backend
    fetch('http://localhost:3000/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        resumeText: text,
        jobDescription: jobDescription
      })
    })
      .then(res => res.json())
      .then(data => {
        const aiOutputDiv = document.getElementById("aiOutput");
        if (data.reply) {
          aiOutputDiv.textContent = data.reply;
        } else {
          aiOutputDiv.textContent = "No AI response received.";
        }
      })
      .catch(err => {
        console.error("Ollama API error:", err);
        document.getElementById("aiOutput").textContent = "Error contacting AI.";
      });
  }

  function updateUI(sections) {
    const updateList = (id, items) => {
      const ul = document.getElementById(id);
      ul.innerHTML = "";
      items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
      });
    };

    updateList("experience", sections.experience);
    updateList("education", sections.education);
    updateList("skills", sections.skills);
  }
});
