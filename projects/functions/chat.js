const apiKey = "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";

// Dados do aluno embutidos no código
const alunoData = {
  "nome": "João Silva",
  "ra": "12345678",
  "statusGeral": "Regular",
  "disciplinas": [
    {
      "nome": "Banco de Dados em Ambientes Locais e Nuvem - F",
      "notas": [8.2, 9.1],
      "faltas": 1,
      "status": "Em andamento"
    },
    {
      "nome": "Desenvolvimento de Aplicações Locais - F",
      "notas": [7.5, 8.0],
      "faltas": 2,
      "status": "Em andamento"
    },
    {
      "nome": "Engenharia de Software Aplicada - F",
      "notas": [6.8, 7.2],
      "faltas": 0,
      "status": "Em andamento"
    },
    {
      "nome": "Frameworks de Gestão de Projetos - F",
      "notas": [8.0, 8.7],
      "faltas": 1,
      "status": "Em andamento"
    },
    {
      "nome": "Introdução a Programação Orientada a Objetos - F",
      "notas": [9.5],
      "faltas": 0,
      "status": "Em andamento"
    }
  ],
  "atividadesPendentes": [
    {
      "disciplina": "Frameworks de Gestão de Projetos - F",
      "descricao": "Apresentação do projeto final",
      "professor": "Valdinei Castelan",
      "prazo": "2025-04-15"
    }
  ],
  "gradeHoraria": {
    "segunda-feira": [
      {
        "horario": "19:15 até 22:45",
        "disciplina": "Banco de Dados em Ambientes Locais e Nuvem - F",
        "professor": "Cleber de Luca",
        "local": "Lab. Boole"
      }
    ],
    "terça-feira": [
      {
        "horario": "19:15 até 22:45",
        "disciplina": "Desenvolvimento de Aplicações Locais - F",
        "professor": "Anderson Reis de Campos",
        "local": "Lab. Boole"
      }
    ],
    "quarta-feira": [
      {
        "horario": "19:15 até 22:45",
        "disciplina": "Engenharia de Software Aplicada - F",
        "professor": "Andreia Santos",
        "local": "Sala E2.1 - Lab. Jobs"
      }
    ],
    "quinta-feira": [
      {
        "horario": "19:15 até 22:45",
        "disciplina": "Frameworks de Gestão de Projetos - F",
        "professor": "Valdinei Castelan",
        "local": "Sala E2.7"
      }
    ],
    "sexta-feira": [
      {
        "horario": "19:15 até 22:45",
        "disciplina": "Introdução a Programação Orientada a Objetos - F",
        "professor": "Hudson Victoria Diniz",
        "local": "Sala E1.1 - Lab. Fortran"
      }
    ]
  }
};

// Carrega histórico de mensagens salvas
window.addEventListener("DOMContentLoaded", () => {
  const history = JSON.parse(localStorage.getItem("chatHistory"));
  if (history && history.length > 0) {
    history.forEach(msg => addMessage(msg.role, msg.text));
  }
});

document.getElementById("chat-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  addMessage("user", message);
  input.value = "";

  const systemPrompt = `
Você é uma assistente virtual simpática, animada e prestativa da faculdade Anhembi Morumbi | Campus Athon.

Seu papel é ajudar o aluno João Silva (RA: ${alunoData.ra}) com base nas informações a seguir:

📘 Disciplinas:
${alunoData.disciplinas.map(d => `- ${d.nome}: notas [${d.notas.join(", ")}], faltas ${d.faltas}, status ${d.status}`).join('\n')}

📌 Atividades pendentes:
${alunoData.atividadesPendentes.map(a => `- ${a.descricao} em ${a.disciplina}, com ${a.professor}, prazo: ${a.prazo}`).join('\n')}

🕐 Grade horária:
${Object.entries(alunoData.gradeHoraria).map(([dia, aulas]) => {
  const lista = aulas.map(a => `  - ${a.disciplina}, ${a.horario}, com ${a.professor}, em ${a.local}`).join('\n');
  return `• ${dia.charAt(0).toUpperCase() + dia.slice(1)}:\n${lista}`;
}).join('\n\n')}

Use essas informações sempre que a dúvida do aluno estiver relacionada. Nunca diga que não tem acesso aos dados, pois eles estão acima. Seja objetiva, cordial e acolhedora nas respostas.
`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;
    addMessage("ai", reply);
  } catch (error) {
    console.error("Erro ao obter resposta da IA:", error);
    addMessage("ai", "Opa! Tive um probleminha técnico aqui. Tenta novamente mais tarde, tá bom? 😊");
  }
});

function addMessage(role, text) {
  const msg = document.createElement("div");
  msg.className = role === "user" ? "user-msg" : "ai-msg";
  msg.textContent = text;
  document.getElementById("chat-box").appendChild(msg);
  document.getElementById("chat-box").scrollTop = document.getElementById("chat-box").scrollHeight;

  const history = JSON.parse(localStorage.getItem("chatHistory")) || [];
  history.push({ role, text });
  localStorage.setItem("chatHistory", JSON.stringify(history));
}

document.getElementById("clear-chat").addEventListener("click", () => {
  localStorage.removeItem("chatHistory");
  document.getElementById("chat-box").innerHTML = "";

  const welcomeMessage = "🎓 Olá, calouro(a)! Seja muito bem-vindo à Anhembi Morumbi | Campus Athon! Sou sua assistente virtual e estou aqui para te ajudar com todas as suas dúvidas sobre a faculdade. 😄 Vamos começar?";
  addMessage("ai", welcomeMessage);

  localStorage.setItem("chatHistory", JSON.stringify([{ role: "ai", text: welcomeMessage }]));
});
