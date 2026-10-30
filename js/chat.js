// Interactive Admissions AI Advisor Chat

class ChatManager {
  constructor() {
    this.container = document.getElementById("chatMessages");
    this.input = document.getElementById("chatInput");
    this.sendBtn = document.getElementById("chatSendBtn");
    this.typingIndicator = document.getElementById("chatTyping");
    this.chipsContainer = document.getElementById("chatQuickChips");

    this.messages = [
      {
        sender: "bot",
        text: "Hello! Welcome to Nine's Academy. I am your admissions assistant. How can I help you elevate your English or Leadership skills today?",
        time: "Just now"
      }
    ];

    this.init();
  }

  init() {
    this.renderMessages();
    this.bindEvents();
  }

  bindEvents() {
    if (this.sendBtn) {
      this.sendBtn.addEventListener("click", () => this.sendMessage());
    }

    if (this.input) {
      this.input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          this.sendMessage();
        }
      });
    }

    // Quick chip buttons
    if (this.chipsContainer) {
      this.chipsContainer.addEventListener("click", (e) => {
        const chip = e.target.closest("[data-query]");
        if (chip) {
          const query = chip.dataset.query;
          this.input.value = query;
          this.sendMessage();
        }
      });
    }
  }

  renderMessages() {
    if (!this.container) return;

    this.container.innerHTML = this.messages.map(msg => {
      const isBot = msg.sender === "bot";
      const bubbleClass = isBot ? "chat-bubble-bot" : "chat-bubble-user";
      return `
        <div class="${bubbleClass}">
          <p class="leading-relaxed">${msg.text}</p>
        </div>
      `;
    }).join("");

    this.scrollToBottom();
  }

  scrollToBottom() {
    if (this.container) {
      this.container.scrollTop = this.container.scrollHeight;
    }
  }

  sendMessage() {
    if (!this.input) return;
    const text = this.input.value.trim();
    if (!text) return;

    // Add user message
    this.messages.push({
      sender: "user",
      text: text,
      time: "Just now"
    });

    this.input.value = "";
    this.renderMessages();

    // Show typing
    this.showTyping(true);

    setTimeout(() => {
      const reply = this.generateBotResponse(text);
      this.showTyping(false);
      this.messages.push({
        sender: "bot",
        text: reply,
        time: "Just now"
      });
      this.renderMessages();
    }, 700);
  }

  showTyping(show) {
    if (this.typingIndicator) {
      if (show) {
        this.typingIndicator.classList.remove("hidden");
        this.typingIndicator.classList.add("flex");
      } else {
        this.typingIndicator.classList.remove("flex");
        this.typingIndicator.classList.add("hidden");
      }
      this.scrollToBottom();
    }
  }

  generateBotResponse(query) {
    const lower = query.toLowerCase();

    for (const item of ACADEMY_DATA.botResponses) {
      for (const keyword of item.keywords) {
        if (lower.includes(keyword)) {
          return item.reply;
        }
      }
    }

    // Default friendly response
    return "Thank you for asking! We would be delighted to guide you. You can directly connect with Ms. Nine Kapanadze at 597 042 154 or tap 'Enroll' to secure your cohort seat with 20% off.";
  }
}

window.ChatManager = ChatManager;
