function loadPage(page) {
  fetch(`pages/${page}.html`)
    .then(res => res.text())
    .then(data => {
      const container = document.getElementById("content");
      container.innerHTML = data;

      // Reexecuta scripts da página carregada
      const scripts = container.querySelectorAll("script");
      scripts.forEach((oldScript) => {
        const newScript = document.createElement("script");
        if (oldScript.src) {
          newScript.src = oldScript.src;
        } else {
          newScript.textContent = oldScript.textContent;
        }
        document.body.appendChild(newScript);
      });

      // Reativa ícones
      if (typeof lucide !== "undefined") {
        lucide.createIcons();
      }
    })
    .catch(err => {
      document.getElementById("content").innerHTML = "<p>Erro ao carregar a página.</p>";
      console.error(err);
    });
}

  
  function loadPortal() {
    document.getElementById("content").innerHTML = `
      <iframe src="https://saafapp.cscedu.com.br/login/athon" class="portal-iframe"></iframe>
    `;
  }
  
