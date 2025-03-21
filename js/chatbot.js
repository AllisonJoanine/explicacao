document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("chat-form");
    const input = document.getElementById("user-input");
    const messages = document.getElementById("chat-messages");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const userMessage = input.value.trim();
      if (!userMessage) return;
  
      addMessage(userMessage, "user");
      input.value = "";
  
      const aiReply = await getAIResponse(userMessage);
      addMessage(aiReply, "ai");
    });
  
    function addMessage(text, sender) {
      const div = document.createElement("div");
      div.className = `message ${sender}`;
      div.textContent = text;
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
    }
  
    async function getAIResponse(message) {
      const apiKey = "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; // 🔐 Coloque sua chave aqui depois
      const endpoint = "https://api.openai.com/v1/chat/completions";
  
      const payload = {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Você é um assistente acadêmico da Universidade Anhembi Morumbi." },
          { role: "user", content: message }
        ],
        temperature: 0.7
      };
  
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`
          },
          body: JSON.stringify(payload)
        });
  
        const data = await response.json();
        return data.choices?.[0]?.message?.content || "Desculpe, não consegui entender.";
      } catch (err) {
        console.error(err);
        return "Erro ao se comunicar com a IA.";
      }
    }
  });
  