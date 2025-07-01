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

    // Only switch section if line is exactly the keyword
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

    // Only add lines if we're currently in a section
    if (current && line !== "") {
      sections[current].push(line);
    }
  }

  updateUI(sections);
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
