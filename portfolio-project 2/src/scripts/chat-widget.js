// AI Chat Widget with OpenAI Integration
class ChatWidget {
    constructor() {
        this.isOpen = false;
        this.messageCount = 0;
        this.maxMessages = 6;
        this.apiKey = import.meta?.env?.VITE_OPENAI_KEY || this.getApiKeyFromEnv();
        this.messages = [];
        
        this.init();
        this.bindEvents();
        this.addWelcomeMessage();
    }
    
    init() {
        // Cache DOM elements
        this.chatWidget = document.getElementById('chat-widget');
        this.chatToggle = document.getElementById('chat-toggle');
        this.chatPanel = document.getElementById('chat-panel');
        this.chatClose = document.getElementById('chat-close');
        this.chatMessages = document.getElementById('chat-messages');
        this.chatInput = document.getElementById('chat-input');
        this.chatSend = document.getElementById('chat-send');
        this.messageCountDisplay = document.getElementById('message-count');
        
        // Update message count display
        this.updateMessageCount();
    }
    
    bindEvents() {
        // Toggle chat panel - Main functionality to open/close chat
        this.chatToggle?.addEventListener('click', () => this.toggleChat());
        this.chatClose?.addEventListener('click', () => this.closeChat());
        
        // Send message
        this.chatSend?.addEventListener('click', () => this.sendMessage());
        this.chatInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Close chat when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && 
                !this.chatWidget?.contains(e.target)) {
                this.closeChat();
            }
        });
        
        // ESC key closes chat
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeChat();
            }
        });
    }
    
    getApiKeyFromEnv() {
        // Fallback for environments without Vite
        // In production, this should be set via environment variables
        return process?.env?.VITE_OPENAI_KEY || '';
    }
    
    /**
     * Toggle chat panel open/close state
     * Adds/removes .open class and manages smooth transitions
     */
    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }
    
    /**
     * Open chat panel with smooth scale + opacity animation
     */
    openChat() {
        this.isOpen = true;
        this.chatPanel?.classList.add('open');
        this.chatInput?.focus();
        
        // Smooth scale + opacity transition
        if (this.chatPanel) {
            this.chatPanel.style.transform = 'scale(0.95)';
            this.chatPanel.style.opacity = '0';
            
            // Force reflow then animate
            this.chatPanel.offsetHeight;
            
            this.chatPanel.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
            this.chatPanel.style.transform = 'scale(1)';
            this.chatPanel.style.opacity = '1';
        }
    }
    
    /**
     * Close chat panel with smooth scale + opacity animation
     */
    closeChat() {
        this.isOpen = false;
        
        // Smooth scale + opacity transition
        if (this.chatPanel) {
            this.chatPanel.style.transition = 'all 0.2s ease-in';
            this.chatPanel.style.transform = 'scale(0.95)';
            this.chatPanel.style.opacity = '0';
            
            // Remove .open class after animation completes
            setTimeout(() => {
                this.chatPanel?.classList.remove('open');
            }, 200);
        }
    }
    
    addWelcomeMessage() {
        const welcomeMessage = {
            role: 'assistant',
            content: 'Olá! Sou o assistente do portfólio do Allison. Como posso ajudá-lo com informações sobre suas habilidades e projetos?'
        };
        
        this.addMessageToChat(welcomeMessage.content, 'bot');
    }
    
    async sendMessage() {
        const message = this.chatInput?.value.trim();
        if (!message || this.messageCount >= this.maxMessages) return;
        
        // Check if API key is available
        if (!this.apiKey) {
            this.showApiKeyError();
            return;
        }
        
        // Add user message to chat
        this.addMessageToChat(message, 'user');
        this.chatInput.value = '';
        this.messageCount++;
        this.updateMessageCount();
        
        // Add user message to conversation history
        this.messages.push({ role: 'user', content: message });
        
        // Show typing indicator
        this.showTypingIndicator();
        
        try {
            // Send to OpenAI API
            const response = await this.callOpenAI(message);
            
            // Remove typing indicator
            this.removeTypingIndicator();
            
            // Add bot response to chat
            this.addMessageToChat(response, 'bot');
            
            // Add bot response to conversation history
            this.messages.push({ role: 'assistant', content: response });
            
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
            this.removeTypingIndicator();
            this.addMessageToChat(
                'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente mais tarde.',
                'bot'
            );
        }
        
        // Disable input if max messages reached
        if (this.messageCount >= this.maxMessages) {
            this.disableInput();
        }
    }
    
    async callOpenAI(userMessage) {
        const systemPrompt = `Você é o assistente do portfólio do Allison Joanine de Araujo Ribeiro. 
        
        Informações sobre Allison:
        - Nome: Allison Joanine de Araujo Ribeiro
        - Profissão: Desenvolvedor Full-Stack especializado em IA e DevOps
        - Localização: Sorocaba - SP, Brasil
        - Email: allisonjoanine@gmail.com
        - WhatsApp: +55 15 99186-1717
        
        Habilidades principais:
        - AI/ML: Python, C#, .NET, PyTorch, TensorFlow
        - Front-end: React, React Native, Angular, Vue.js, TypeScript/JavaScript
        - Back-end: .NET, Node.js, MySQL, SQL Server
        - DevOps: Docker, Git, Azure DevOps
        - Segurança: Fortinet, Zabbix, Grafana
        
        Projetos principais:
        - LeiFacil Mobile: Aplicativo mobile para facilitar acesso a leis
        - JNSecure: Sistema de segurança digital com monitoramento
        - ALIS Vision: Sistema de visão computacional com IA
        - Claricode Websites: Desenvolvimento de websites modernos
        
        Experiência:
        - Freelancer na Claricode Solutions (Jan 2024 - presente)
        - Developer Full-Stack na Alumisoft (Ago 2023 - Fev 2025)
        - Analista de Segurança de Rede na Alumisoft (Fev 2024)
        
        Formação:
        - Tecnólogo em ADS na Anhembi Morumbi Sorocaba (Jan 2024 - presente)
        - Múltiplas certificações em Python, JavaScript, C#, IA, segurança
        
        Idiomas: Português (nativo), Inglês (intermediário/avançado), Espanhol (intermediário)
        
        Responda perguntas sobre o perfil, habilidades e projetos do Allison de forma amigável e informativa. Mantenha as respostas concisas mas completas.`;
        
        const messages = [
            { role: 'system', content: systemPrompt },
            ...this.messages.slice(-4), // Keep last 4 messages for context
            { role: 'user', content: userMessage }
        ];
        
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: messages,
                max_tokens: 300,
                temperature: 0.7,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0
            })
        });
        
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }
        
        const data = await response.json();
        return data.choices[0].message.content;
    }
    
    addMessageToChat(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.className = `chat-message ${sender}-message`;
        
        const messageContent = document.createElement('p');
        messageContent.textContent = message;
        messageElement.appendChild(messageContent);
        
        this.chatMessages?.appendChild(messageElement);
        
        // Scroll to bottom
        this.scrollToBottom();
        
        // Add animation
        messageElement.style.opacity = '0';
        messageElement.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            messageElement.style.transition = 'all 0.3s ease';
            messageElement.style.opacity = '1';
            messageElement.style.transform = 'translateY(0)';
        }, 50);
    }
    
    showTypingIndicator() {
        const typingElement = document.createElement('div');
        typingElement.className = 'chat-message bot-message typing-indicator';
        typingElement.innerHTML = `
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        
        // Add typing animation styles
        const styles = `
            .typing-indicator .typing-dots {
                display: flex;
                gap: 4px;
                align-items: center;
            }
            
            .typing-dots span {
                width: 6px;
                height: 6px;
                background: var(--text-muted);
                border-radius: 50%;
                animation: typing 1.4s infinite ease-in-out;
            }
            
            .typing-dots span:nth-child(1) { animation-delay: 0s; }
            .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
            .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
            
            @keyframes typing {
                0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
                30% { transform: translateY(-10px); opacity: 1; }
            }
        `;
        
        // Add styles if not already added
        if (!document.getElementById('typing-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'typing-styles';
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }
        
        this.chatMessages?.appendChild(typingElement);
        this.scrollToBottom();
    }
    
    removeTypingIndicator() {
        const typingIndicator = this.chatMessages?.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    scrollToBottom() {
        if (this.chatMessages) {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }
    }
    
    updateMessageCount() {
        if (this.messageCountDisplay) {
            this.messageCountDisplay.textContent = this.messageCount;
        }
        
        // Update input placeholder based on remaining messages
        if (this.chatInput) {
            const remaining = this.maxMessages - this.messageCount;
            if (remaining <= 0) {
                this.chatInput.placeholder = 'Limite de mensagens atingido';
            } else if (remaining <= 2) {
                this.chatInput.placeholder = `${remaining} mensagens restantes...`;
            } else {
                this.chatInput.placeholder = 'Digite sua pergunta...';
            }
        }
    }
    
    disableInput() {
        if (this.chatInput) {
            this.chatInput.disabled = true;
            this.chatInput.placeholder = 'Limite de mensagens atingido';
        }
        
        if (this.chatSend) {
            this.chatSend.disabled = true;
        }
        
        // Add message about limit
        this.addMessageToChat(
            'Você atingiu o limite de 6 mensagens para esta demonstração. Para continuar a conversa, entre em contato diretamente via email ou WhatsApp.',
            'bot'
        );
    }
    
    showApiKeyError() {
        this.addMessageToChat(
            'Desculpe, o chat está temporariamente indisponível. Por favor, entre em contato diretamente via email (allisonjoanine@gmail.com) ou WhatsApp (+55 15 99186-1717).',
            'bot'
        );
        
        // Disable input
        if (this.chatInput) {
            this.chatInput.disabled = true;
            this.chatInput.placeholder = 'Chat indisponível';
        }
        
        if (this.chatSend) {
            this.chatSend.disabled = true;
        }
    }
    
    // Reset chat (for development/testing)
    resetChat() {
        this.messageCount = 0;
        this.messages = [];
        this.chatMessages.innerHTML = '';
        
        if (this.chatInput) {
            this.chatInput.disabled = false;
        }
        
        if (this.chatSend) {
            this.chatSend.disabled = false;
        }
        
        this.updateMessageCount();
        this.addWelcomeMessage();
    }
}

// Initialize chat widget when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add slide animations CSS
    const slideAnimations = `
        @keyframes slideInUp {
            from {
                transform: translateY(100%);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutDown {
            from {
                transform: translateY(0);
                opacity: 1;
            }
            to {
                transform: translateY(100%);
                opacity: 0;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = slideAnimations;
    document.head.appendChild(styleSheet);
    
    // Initialize chat widget
    window.chatWidget = new ChatWidget();
});

