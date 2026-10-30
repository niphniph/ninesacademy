// Student Portal & Gamification Manager

class PortalManager {
  constructor() {
    this.student = ACADEMY_DATA.studentMock;
    this.quests = [
      { id: "q1", title: "Record 2-Min Impromptu Audio Note", xp: 50, done: true },
      { id: "q2", title: "Review Boardroom Negotiation Idioms", xp: 30, done: false },
      { id: "q3", title: "Shadow Native Speaker Pitch Video", xp: 40, done: false }
    ];

    this.init();
  }

  init() {
    this.refresh();
    this.bindEvents();
  }

  refresh() {
    const customName = localStorage.getItem("nines_active_student_name");
    if (customName) {
      this.student.name = customName;
    }

    const nameEl = document.getElementById("portalStudentName");
    if (nameEl) nameEl.textContent = this.student.name;

    const trackEl = document.getElementById("portalStudentTrack");
    if (trackEl) trackEl.textContent = this.student.track;

    const xpEl = document.getElementById("portalXpNumber");
    if (xpEl) xpEl.textContent = `${this.student.xp} / ${this.student.nextLevelXp} XP`;

    const xpBar = document.getElementById("portalXpProgressBar");
    if (xpBar) {
      const percentage = Math.min(100, Math.round((this.student.xp / this.student.nextLevelXp) * 100));
      xpBar.style.setProperty("--xp-percent", `${percentage}%`);
    }

    this.renderQuests();
    this.renderBadges();
  }

  renderQuests() {
    const list = document.getElementById("portalQuestsList");
    if (!list) return;

    list.innerHTML = this.quests.map(quest => `
      <div class="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-primary/10">
        <div class="flex items-center gap-3">
          <input type="checkbox" id="quest-${quest.id}" data-quest-id="${quest.id}" ${quest.done ? "checked" : ""} class="quest-checkbox w-5 h-5 rounded text-primary focus:ring-primary accent-primary">
          <label for="quest-${quest.id}" class="font-label-md text-label-md text-on-surface ${quest.done ? "line-through opacity-60" : ""}">
            ${quest.title}
          </label>
        </div>
        <span class="font-label-sm text-label-sm px-2 py-0.5 rounded-full ${quest.done ? 'bg-tertiary-fixed text-on-tertiary-fixed' : 'bg-primary-fixed text-primary'}">
          +${quest.xp} XP
        </span>
      </div>
    `).join("");
  }

  renderBadges() {
    const container = document.getElementById("portalBadgesGrid");
    if (!container) return;

    container.innerHTML = this.student.badges.map(badge => `
      <div class="bg-surface-container-low p-3 rounded-xl flex flex-col items-center text-center gap-1.5 border border-primary/10">
        <span class="text-2xl">${badge.icon}</span>
        <span class="font-label-sm text-label-sm font-bold text-on-surface leading-tight">${badge.title}</span>
        <span class="text-[11px] text-on-surface-variant leading-tight">${badge.desc}</span>
      </div>
    `).join("");
  }

  bindEvents() {
    // Checkbox quests
    const list = document.getElementById("portalQuestsList");
    if (list) {
      list.addEventListener("change", (e) => {
        if (e.target.classList.contains("quest-checkbox")) {
          const questId = e.target.dataset.questId;
          const quest = this.quests.find(q => q.id === questId);
          if (quest) {
            quest.done = e.target.checked;
            if (quest.done) {
              this.student.xp += quest.xp;
              window.app.showToast(`Quest completed! +${quest.xp} XP earned! 🎉`, "success");
              if (window.confetti) window.confetti.burst(50);
            } else {
              this.student.xp -= quest.xp;
            }
            this.refresh();
          }
        }
      });
    }

    // Join Zoom button
    const zoomBtn = document.getElementById("portalJoinZoomBtn");
    if (zoomBtn) {
      zoomBtn.addEventListener("click", () => {
        window.app.showToast("Opening Nine's Academy Live HD Room...", "info");
        setTimeout(() => {
          alert("Connecting to live session: 'Scenario: High-Stakes Negotiation & Idioms' with Nine Kapanadze! (Room ID: NA-ROOM-2025)");
        }, 300);
      });
    }

    // View Certificate button
    const certBtn = document.getElementById("portalViewCertificateBtn");
    if (certBtn) {
      certBtn.addEventListener("click", () => {
        this.openCertificateModal();
      });
    }
  }

  openCertificateModal() {
    const modal = document.getElementById("certificateModal");
    const nameEl = document.getElementById("certRecipientName");
    const idEl = document.getElementById("certVerificationCode");

    if (nameEl) nameEl.textContent = this.student.name;
    if (idEl) idEl.textContent = `CREDENTIAL ID: NA-CERT-${Math.floor(100000 + Math.random() * 900000)}`;

    if (modal) {
      modal.classList.add("active");
      document.body.classList.add("overflow-hidden");
    }
  }
}

window.PortalManager = PortalManager;
