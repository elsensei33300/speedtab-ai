function askAI() {
  const input = document.getElementById('ai-input').value;
  const responseBox = document.getElementById('ai-response');
  responseBox.innerText = "Thinking...";
  const apiKey = localStorage.getItem("openai_api_key");
  if (!apiKey) {
    responseBox.innerText = "Please enter your OpenAI API key in settings.";
    return;
  }
  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: input }]
    })
  })
  .then(res => res.json())
  .then(data => {
    responseBox.innerText = data.choices?.[0]?.message?.content || "No response.";
  })
  .catch(err => {
    responseBox.innerText = "Error: " + err.message;
  });
}