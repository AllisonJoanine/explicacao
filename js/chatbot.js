document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("chat-form");
  const input = document.getElementById("user-input");
  const messages = document.getElementById("chat-messages");

  const apiKey = "sk-SUA_CHAVE_AQUI"; // 🔐 Coloque sua chave da OpenAI aqui depois

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userMessage = input.value.trim();
    if (!userMessage) return;

    addMessage(userMessage, "user");
    input.value = "";

    addMessage("Digitando...", "ai", true); // Placeholder da IA enquanto processa

    try {
      const aiReply = await getAIResponse(userMessage);
      removeTypingIndicator();
      addMessage(aiReply, "ai");
    } catch (error) {
      removeTypingIndicator();
      addMessage("Desculpe, não consegui responder agora. Tente novamente mais tarde.", "ai");
    }
  });

  function addMessage(text, sender, isTemporary = false) {
    const div = document.createElement("div");
    div.className = `message ${sender}`;
    div.textContent = text;
    if (isTemporary) div.id = "typing-indicator";
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function removeTypingIndicator() {
    const typing = document.getElementById("typing-indicator");
    if (typing) typing.remove();
  }

  async function getAIResponse(message) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Você é um assistente educacional da Universidade Anhembi Morumbi, pronto para ajudar alunos com dúvidas acadêmicas."
          },
          { role: "user", content: message }
        ],
        temperature: 0.7
      })
    });

    if (!response.ok) throw new Error("Erro na resposta da API");

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "Desculpe, não consegui entender sua pergunta.";
  }
});
