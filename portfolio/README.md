# Portfólio Allison Joanine - Full-Stack Developer

Um portfólio moderno e responsivo desenvolvido com tecnologias front-end puras (HTML, CSS, JavaScript), featuring um chatbot AI integrado e design futurista com efeito starfield.

## 🚀 Características

- **Design Totalmente Responsivo**: Funciona perfeitamente em mobile (< 640px), tablet (640-1024px) e desktop (≥ 1024px)
- **Menu Hambúrguer**: Navegação colapsável em telas pequenas com animação slide-in suave
- **Tema Claro/Escuro**: Alternância de tema com persistência local
- **Animações Suaves**: Efeitos de entrada e transições elegantes
- **Chatbot AI Funcional**: Assistente virtual integrado com OpenAI GPT-3.5-turbo com toggle suave (scale + opacity)
- **Starfield Background Otimizado**: Fundo animado com contagem de partículas reduzida em dispositivos móveis para economia de bateria/CPU
- **Navegação Inteligente**: Scroll spy e navegação suave entre seções
- **Projetos Destacados**: Seção com projetos do GitHub e link "More Projects"
- **Links Sociais**: GitHub e LinkedIn integrados no hero e footer
- **Formulário de Contato**: Integração com EmailJS para envio de emails
- **Performance Otimizada**: Carregamento rápido e otimizações de performance

## 📱 Responsividade

### Breakpoints:
- **Mobile**: < 640px (75 estrelas no starfield)
- **Tablet**: 640px - 1024px (100 estrelas no starfield)  
- **Desktop**: ≥ 1024px (150 estrelas no starfield)

### Menu Hambúrguer:
- Ativado automaticamente em telas < 768px
- Navegação slide-in com animação suave
- Fechamento automático ao clicar em links ou fora do menu

## 🤖 Chatbot Melhorado

### Funcionalidades:
- **Toggle Function**: `toggleChat()` adiciona/remove classe `.open`
- **Z-index Correto**: Painel sempre acima de outros elementos
- **Animações Suaves**: Transição scale (0.95 → 1) + opacity (0 → 1)
- **Ícone de Fechar**: Dentro do painel para fácil acesso
- **Limite de Mensagens**: 6 mensagens por sessão para demonstração

## 📁 Estrutura do Projeto

```
portfolio-project/
├── public/
│   └── starfield.js          # Script do fundo starfield (otimizado para mobile)
├── src/
│   ├── styles/
│   │   ├── globals.css       # Reset CSS + variáveis globais
│   │   └── theme.css         # Estilos do tema + componentes responsivos
│   ├── scripts/
│   │   ├── main.js           # Funcionalidades principais + hamburger menu
│   │   ├── aos-init.js       # Inicialização das animações
│   │   └── chat-widget.js    # Widget do chatbot AI (com comentários)
│   └── assets/               # Imagens, ícones, etc.
├── index.html                # Página principal (com meta viewport)
├── .env.example              # Exemplo de configuração
├── .gitignore                # Arquivos ignorados
└── README.md                 # Este arquivo
```

## 🎯 Projetos Destacados

### 1. **Facial Recognition System**
- **GitHub**: https://github.com/AllisonJoanine/ReconhecimentoFacial.git
- **Tecnologias**: Python, OpenCV, TensorFlow, Deep Learning
- **Descrição**: Sistema avançado de reconhecimento facial com deep learning

### 2. **LeiFacil Mobile – Legal AI Assistant**  
- **GitHub**: https://github.com/AllisonJoanine/applaws.git
- **Tecnologias**: React Native, AI/NLP, JavaScript, API REST
- **Descrição**: Assistente de IA para legislação brasileira

### 3. **More Projects**
- **GitHub Profile**: https://github.com/AllisonJoanine

## 🔗 Links Sociais

- **GitHub**: https://github.com/AllisonJoanine
- **LinkedIn**: https://www.linkedin.com/in/allison-joanine-de-araujo-ribeiro-404996258

## 🛠️ Instalação e Configuração

### 1. Clone ou Baixe o Projeto

```bash
# Se usando Git
git clone <repository-url>
cd portfolio-project

# Ou simplesmente baixe e extraia os arquivos
```

### 2. Configuração das Variáveis de Ambiente

```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o arquivo .env com suas chaves reais
```

### 3. Configure a Chave da OpenAI (Para o Chatbot)

1. Acesse [OpenAI Platform](https://platform.openai.com/api-keys)
2. Crie uma nova chave de API
3. Adicione a chave no arquivo `.env`:
   ```
   VITE_OPENAI_KEY=sk-your-actual-openai-key-here
   ```

### 4. Configure EmailJS (Opcional - Para Formulário de Contato)

1. Crie uma conta em [EmailJS](https://www.emailjs.com/)
2. Configure um serviço de email
3. Crie um template de email
4. Adicione as configurações no arquivo `.env`:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_USER_ID=your_user_id
   ```

## 🚀 Executando Localmente

### Opção 1: Servidor HTTP Simples (Python)

```bash
# Python 3
python -m http.server 8000

# Acesse: http://localhost:8000
```

### Opção 2: Servidor HTTP Simples (Node.js)

```bash
# Instale o http-server globalmente
npm install -g http-server

# Execute o servidor
http-server -p 8000

# Acesse: http://localhost:8000
```

### Opção 3: Live Server (VS Code)

1. Instale a extensão "Live Server" no VS Code
2. Clique com o botão direito em `index.html`
3. Selecione "Open with Live Server"

## 📦 Deploy

### GitHub Pages

1. **Prepare o repositório:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/seu-usuario/seu-repositorio.git
   git push -u origin main
   ```

2. **Configure GitHub Pages:**
   - Vá para Settings > Pages no seu repositório
   - Selecione "Deploy from a branch"
   - Escolha "main" branch e "/ (root)"
   - Clique em "Save"

3. **⚠️ Importante para GitHub Pages:**
   - **NÃO** faça commit do arquivo `.env` com chaves reais
   - As variáveis de ambiente não funcionam no GitHub Pages
   - Para o chatbot funcionar, você precisará usar Vercel ou Netlify

### Vercel (Recomendado)

1. **Instale a CLI do Vercel:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Configure as variáveis de ambiente:**
   - Acesse o dashboard do Vercel
   - Vá para Settings > Environment Variables
   - Adicione suas chaves:
     - `VITE_OPENAI_KEY`
     - `VITE_EMAILJS_SERVICE_ID` (opcional)
     - `VITE_EMAILJS_TEMPLATE_ID` (opcional)
     - `VITE_EMAILJS_USER_ID` (opcional)

4. **Redeploy:**
   ```bash
   vercel --prod
   ```

### Netlify

1. **Conecte seu repositório:**
   - Acesse [Netlify](https://netlify.com)
   - Clique em "New site from Git"
   - Conecte seu repositório GitHub

2. **Configure as variáveis de ambiente:**
   - Vá para Site settings > Environment variables
   - Adicione suas chaves (mesmo processo do Vercel)

3. **Deploy automático:**
   - O Netlify fará deploy automaticamente a cada push

## 🔧 Personalização

### Alterando Informações Pessoais

Edite o arquivo `index.html` e procure pelas seguintes seções:

- **Nome e título**: Seção `.hero-title`
- **Sobre**: Seção `#about`
- **Habilidades**: Seção `#skills`
- **Projetos**: Seção `#projects`
- **Experiência**: Seção `#experience`
- **Educação**: Seção `#education`
- **Contato**: Seção `#contact`

### Alterando Cores e Tema

Edite as variáveis CSS em `src/styles/globals.css`:

```css
:root {
    --primary-color: #3b82f6;    /* Cor principal */
    --secondary-color: #8b5cf6;  /* Cor secundária */
    --accent-color: #06b6d4;     /* Cor de destaque */
    /* ... outras variáveis */
}
```

### Adicionando Novos Projetos

1. Adicione uma nova `.project-card` na seção `#projects`
2. Siga a estrutura existente
3. Adicione as tecnologias usadas em `.tech-tag`

### Configurando o Chatbot

Edite o prompt do sistema em `src/scripts/chat-widget.js`:

```javascript
const systemPrompt = `Você é o assistente do portfólio do [SEU NOME].
// Adicione suas informações aqui
`;
```

## 🔒 Segurança

### Proteção de Chaves de API

- **NUNCA** faça commit de chaves reais no repositório
- Use sempre o arquivo `.env` para chaves sensíveis
- Adicione `.env` ao `.gitignore`:
  ```
  .env
  .env.local
  .env.production
  ```

### Limitações do Chatbot

- Limite de 6 mensagens por sessão (configurável)
- Rate limiting da OpenAI se aplica
- Considere implementar autenticação para uso em produção

## 🐛 Solução de Problemas

### Chatbot não abre/fecha

1. Verifique se a função `toggleChat()` está sendo chamada
2. Confirme que a classe `.open` está sendo adicionada/removida
3. Verifique o z-index do painel no CSS
4. Teste as animações de scale + opacity

### Menu hambúrguer não funciona

1. Verifique se está em uma tela < 768px
2. Confirme que o JavaScript está carregando
3. Teste a classe `.active` no menu

### Starfield muito lento em mobile

1. Confirme que a contagem de estrelas está reduzida
2. Verifique se `getStarCount()` está funcionando
3. Teste em diferentes dispositivos

### Animações não funcionam

1. Verifique se a biblioteca AOS está carregando
2. Confirme que o JavaScript não tem erros
3. Teste em diferentes navegadores

## 📱 Compatibilidade

- **Navegadores**: Chrome 60+, Firefox 60+, Safari 12+, Edge 79+
- **Dispositivos**: Desktop, Tablet, Mobile
- **Resoluções**: 320px - 4K+
- **Performance**: Otimizado para dispositivos móveis

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Contato

**Allison Joanine de Araujo Ribeiro**
- Email: allisonjoanine@gmail.com
- WhatsApp: +55 15 99186-1717
- GitHub: https://github.com/AllisonJoanine
- LinkedIn: https://www.linkedin.com/in/allison-joanine-de-araujo-ribeiro-404996258
- Localização: Sorocaba - SP, Brasil

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!

