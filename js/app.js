// app.js
// Helper: get URL parameter
function getParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

// Topics page
if (window.location.pathname.endsWith("topics.html")) {
  const level = getParam("level"); // a1, a2, b1, b2
  if (level) {
    fetch(`content/${level}.json`)
      .then(res => res.json())
      .then(data => {
        document.getElementById("levelTitle").textContent = `${data.level} — ${data.title}`;
        const topicsDiv = document.getElementById("topicsList");
        topicsDiv.innerHTML = "";
        data.topics.forEach(t => {
          const link = document.createElement("a");
          link.href = `article.html?level=${level}&topic=${t.id}`;
          link.textContent = t.title;
          link.className = "topic-card";
          topicsDiv.appendChild(link);
        });
      })
      .catch(err => console.error("Error loading topics:", err));
  }
}

// Article page
if (window.location.pathname.endsWith("article.html")) {
  const level = getParam("level");
  const topicId = getParam("topic");
  if (level && topicId) {
    fetch(`content/${level}.json`)
      .then(res => res.json())
      .then(data => {
        const topic = data.topics.find(t => t.id === topicId);
        if (topic) {
          document.getElementById("topicTitle").textContent = topic.title;
          document.getElementById("topicExplanation").textContent = topic.explanation;
          const list = document.getElementById("examplesList");
          list.innerHTML = "";
          (topic.examples || []).forEach(ex => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${ex.german}</strong> — ${ex.english}`;
            list.appendChild(li);
          });
        }
      })
      .catch(err => console.error("Error loading article:", err));
  }
}
