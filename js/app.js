// Nine's Academy Core Application Controller

class App {
  constructor() {
    this.activeTab = "overview";
    this.currentCourseFilter = "all";
    this.toastContainer = null;
    this.init();
  }

  init() {
    this.setupToastContainer();
    this.setupNavigation();
    this.setupModalsAndDrawers();
    this.setupCourseCatalog();
    this.setupSyllabusViewer();
    this.setupCallbackForm();
    this.setupFAQAccordion();

    // Initialize sub-managers
    window.enrollmentManager = new window.EnrollmentManager();
    window.chatManager = new window.ChatManager();
    window.portalManager = new window.PortalManager();

    // Check URL hash
    const initialHash = window.location.hash.replace("#", "");
    if (["overview", "courses", "live-chat", "call-admissions", "student-portal"].includes(initialHash)) {
      this.switchTab(initialHash);
    }
  }

  setupToastContainer() {
    let container = document.getElementById("toastContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "toastContainer";
      container.className = "toast-container";
      document.body.appendChild(container);
    }
    this.toastContainer = container;
  }

  showToast(message, type = "info") {
    if (!this.toastContainer) return;

    const toast = document.createElement("div");
    toast.className = "toast-item";
    
    let icon = "info";
    if (type === "success") icon = "check_circle";
    if (type === "warning") icon = "warning";

    toast.innerHTML = `
      <span class="material-symbols-outlined text-[20px]">${icon}</span>
      <span class="flex-1">${message}</span>
    `;

    this.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("toast-out");
      setTimeout(() => toast.remove(), 250);
    }, 3200);
  }

  setupNavigation() {
    // Bottom nav items
    document.querySelectorAll("[data-path]").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const path = link.getAttribute("data-path");
        this.switchTab(path);
      });
    });

    // Links inside views that navigate to tabs
    document.querySelectorAll("[data-goto-tab]").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const tab = link.getAttribute("data-goto-tab");
        this.switchTab(tab);
      });
    });
  }

  switchTab(tabId) {
    if (!tabId) return;
    this.activeTab = tabId;

    // Update bottom nav links
    document.querySelectorAll("[data-path]").forEach(nav => {
      const path = nav.getAttribute("data-path");
      const icon = nav.querySelector(".material-symbols-outlined");
      const label = nav.querySelector("span:not(.material-symbols-outlined)");

      if (path === tabId) {
        nav.classList.add("text-primary", "font-bold");
        nav.classList.remove("text-on-surface-variant");
        nav.setAttribute("aria-current", "page");
      } else {
        nav.classList.remove("text-primary", "font-bold");
        nav.classList.add("text-on-surface-variant");
        nav.removeAttribute("aria-current");
      }
    });

    // Toggle tab views
    document.querySelectorAll(".tab-view").forEach(view => {
      if (view.id === `tab-${tabId}`) {
        view.classList.add("active");
      } else {
        view.classList.remove("active");
      }
    });

    // Update Header sub-label
    const headerSubtitle = document.getElementById("headerSubtitle");
    if (headerSubtitle) {
      const titles = {
        "overview": "Overview",
        "courses": "Courses",
        "live-chat": "AI Admissions Chat",
        "call-admissions": "Admissions Hub",
        "student-portal": "Student Portal"
      };
      headerSubtitle.textContent = titles[tabId] || "Overview";
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  setupModalsAndDrawers() {
    // Hamburger menu drawer
    const menuBtn = document.getElementById("openNavDrawerBtn");
    const drawer = document.getElementById("navDrawer");
    const closeDrawerBtn = document.getElementById("closeNavDrawerBtn");

    if (menuBtn && drawer) {
      menuBtn.addEventListener("click", () => {
        drawer.classList.add("active");
        document.body.classList.add("overflow-hidden");
      });
    }

    if (closeDrawerBtn && drawer) {
      closeDrawerBtn.addEventListener("click", () => {
        drawer.classList.remove("active");
        document.body.classList.remove("overflow-hidden");
      });
    }

    if (drawer) {
      drawer.addEventListener("click", (e) => {
        if (e.target === drawer) {
          drawer.classList.remove("active");
          document.body.classList.remove("overflow-hidden");
        }
      });
    }

    // Header Profile button -> opens profile drawer or switches to portal
    const profileBtn = document.getElementById("headerProfileBtn");
    if (profileBtn) {
      profileBtn.addEventListener("click", () => {
        this.switchTab("student-portal");
      });
    }

    // Close certificate modal
    const closeCertBtn = document.getElementById("closeCertificateModal");
    const certModal = document.getElementById("certificateModal");
    if (closeCertBtn && certModal) {
      closeCertBtn.addEventListener("click", () => {
        certModal.classList.remove("active");
        document.body.classList.remove("overflow-hidden");
      });
      certModal.addEventListener("click", (e) => {
        if (e.target === certModal) {
          certModal.classList.remove("active");
          document.body.classList.remove("overflow-hidden");
        }
      });
    }
  }

  setupCourseCatalog() {
    this.renderCourseCards("all");

    // Filter pills
    document.querySelectorAll("[data-filter]").forEach(pill => {
      pill.addEventListener("click", () => {
        document.querySelectorAll("[data-filter]").forEach(p => {
          p.classList.remove("bg-primary", "text-on-primary");
          p.classList.add("bg-surface-container", "text-on-surface-variant");
        });
        pill.classList.remove("bg-surface-container", "text-on-surface-variant");
        pill.classList.add("bg-primary", "text-on-primary");

        const filter = pill.getAttribute("data-filter");
        this.currentCourseFilter = filter;
        this.renderCourseCards(filter);
      });
    });
  }

  renderCourseCards(filter) {
    const list = document.getElementById("coursesCatalogList");
    if (!list) return;

    const filtered = filter === "all" 
      ? ACADEMY_DATA.tracks 
      : ACADEMY_DATA.tracks.filter(t => t.category === filter);

    list.innerHTML = filtered.map(course => `
      <div class="bg-surface-container-lowest p-space-md rounded-xl shadow-[0_8px_24px_rgba(124,58,237,0.06)] flex flex-col gap-space-sm border border-primary/10">
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-primary-fixed flex items-center justify-center text-primary shadow-sm text-2xl">
              ${course.icon}
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <span class="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-primary/10 text-primary">${course.badge}</span>
                <span class="font-label-sm text-label-sm text-on-surface-variant">${course.groupSize}</span>
              </div>
              <h3 class="font-title-md text-title-md text-on-surface font-bold mt-0.5">${course.title}</h3>
            </div>
          </div>
        </div>

        <p class="font-body-md text-body-md text-on-surface-variant">
          ${course.summary}
        </p>

        <div class="flex flex-wrap gap-1.5 py-1">
          ${course.tags.map(tag => `
            <span class="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
              ${tag}
            </span>
          `).join("")}
        </div>

        <div class="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low border border-primary/5">
          <div class="flex flex-col">
            <span class="font-label-sm text-label-sm text-on-surface-variant">Tuition</span>
            <span class="font-label-md text-label-md text-secondary font-bold">${course.discountPrice}</span>
          </div>
          <div class="flex flex-col text-right">
            <span class="font-label-sm text-label-sm text-on-surface-variant">${course.metricLabel}</span>
            <span class="font-label-md text-label-md text-primary font-bold">${course.metricValue}</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2 pt-1">
          <button data-action="view-syllabus" data-syllabus="${course.category === 'management' ? 'management' : 'english'}" class="py-2.5 px-3 rounded-full bg-surface-container text-primary font-label-md text-label-md flex items-center justify-center gap-1.5 hover:bg-surface-container-high transition-colors">
            <span>Syllabus</span>
            <span class="material-symbols-outlined text-[16px]">menu_book</span>
          </button>
          <button data-action="open-enroll" data-track="${course.id}" class="py-2.5 px-3 rounded-full bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all">
            <span>Enroll Now</span>
            <span class="material-symbols-outlined text-[16px]">bolt</span>
          </button>
        </div>
      </div>
    `).join("");

    // Rebind syllabus buttons
    list.querySelectorAll("[data-action='view-syllabus']").forEach(btn => {
      btn.addEventListener("click", () => {
        const type = btn.getAttribute("data-syllabus");
        this.openSyllabusModal(type);
      });
    });

    // Rebind enroll buttons
    list.querySelectorAll("[data-action='open-enroll']").forEach(btn => {
      btn.addEventListener("click", () => {
        const trackId = btn.getAttribute("data-track");
        window.enrollmentManager.open(trackId);
      });
    });
  }

  setupSyllabusViewer() {
    const modal = document.getElementById("syllabusModal");
    const closeBtn = document.getElementById("closeSyllabusModal");

    if (closeBtn && modal) {
      closeBtn.addEventListener("click", () => {
        modal.classList.remove("active");
        document.body.classList.remove("overflow-hidden");
      });
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("active");
          document.body.classList.remove("overflow-hidden");
        }
      });
    }

    // Direct buttons in overview
    document.querySelectorAll("[data-action='view-syllabus']").forEach(btn => {
      btn.addEventListener("click", () => {
        const type = btn.getAttribute("data-syllabus") || "english";
        this.openSyllabusModal(type);
      });
    });
  }

  openSyllabusModal(type = "english") {
    const data = ACADEMY_DATA.syllabi[type] || ACADEMY_DATA.syllabi.english;
    const modal = document.getElementById("syllabusModal");
    const titleEl = document.getElementById("syllabusModalTitle");
    const descEl = document.getElementById("syllabusModalDesc");
    const weeksList = document.getElementById("syllabusWeeksList");
    const enrollFromSyllabusBtn = document.getElementById("syllabusEnrollBtn");

    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.description;

    if (weeksList) {
      weeksList.innerHTML = data.weeks.map(item => `
        <div class="p-3.5 rounded-xl bg-surface-container-low border border-primary/10 flex flex-col gap-1.5">
          <div class="flex items-center justify-between">
            <span class="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold">${item.week}</span>
          </div>
          <h4 class="font-label-lg text-label-lg text-on-surface font-bold">${item.title}</h4>
          <ul class="flex flex-col gap-1 mt-1 text-on-surface-variant font-body-md text-body-md">
            ${item.topics.map(t => `<li class="flex items-start gap-1.5"><span class="text-primary text-xs">✓</span><span>${t}</span></li>`).join("")}
          </ul>
        </div>
      `).join("");
    }

    if (enrollFromSyllabusBtn) {
      enrollFromSyllabusBtn.onclick = () => {
        modal.classList.remove("active");
        window.enrollmentManager.open(type === "management" ? "track-management" : "track-english");
      };
    }

    if (modal) {
      modal.classList.add("active");
      document.body.classList.add("overflow-hidden");
    }
  }

  setupCallbackForm() {
    const form = document.getElementById("callbackRequestForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("callbackName")?.value.trim();
      const phone = document.getElementById("callbackPhone")?.value.trim();
      const time = document.getElementById("callbackTime")?.value;

      if (!name || !phone) {
        this.showToast("Please provide both your name and phone number.", "warning");
        return;
      }

      const callbackRequests = JSON.parse(localStorage.getItem("nines_callbacks") || "[]");
      callbackRequests.push({ name, phone, time, timestamp: new Date().toISOString() });
      localStorage.setItem("nines_callbacks", JSON.stringify(callbackRequests));

      form.reset();
      this.showToast(`Thank you ${name}! Ms. Nine Kapanadze's team will call you at ${phone}.`, "success");
    });
  }

  setupFAQAccordion() {
    document.querySelectorAll(".faq-toggle").forEach(btn => {
      btn.addEventListener("click", () => {
        const body = btn.nextElementSibling;
        const icon = btn.querySelector(".material-symbols-outlined");
        if (body) {
          body.classList.toggle("open");
          if (body.classList.contains("open")) {
            if (icon) icon.textContent = "expand_less";
          } else {
            if (icon) icon.textContent = "expand_more";
          }
        }
      });
    });
  }
}

// Global bootstrap
document.addEventListener("DOMContentLoaded", () => {
  window.app = new App();
});
