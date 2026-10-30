// Enrollment Wizard & Modal Controller

class EnrollmentManager {
  constructor() {
    this.modal = document.getElementById("enrollModal");
    this.form = document.getElementById("enrollForm");
    this.currentStep = 1;
    this.totalSteps = 3;
    this.remainingSeats = parseInt(localStorage.getItem("nines_remaining_seats") || "4", 10);
    this.enrolledStudents = JSON.parse(localStorage.getItem("nines_enrollments") || "[]");

    this.init();
  }

  init() {
    this.updateSeatsDisplay();
    this.bindEvents();
  }

  bindEvents() {
    // Open modal triggers
    document.querySelectorAll("[data-action='open-enroll']").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const preselectTrack = btn.dataset.track || "track-english";
        this.open(preselectTrack);
      });
    });

    // Close button
    const closeBtn = document.getElementById("closeEnrollModal");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.close());
    }

    // Overlay click to close
    if (this.modal) {
      this.modal.addEventListener("click", (e) => {
        if (e.target === this.modal) this.close();
      });
    }

    // Step navigation buttons
    const nextBtn = document.getElementById("enrollNextStep");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => this.nextStep());
    }

    const prevBtn = document.getElementById("enrollPrevStep");
    if (prevBtn) {
      prevBtn.addEventListener("click", () => this.prevStep());
    }

    // Form submission
    if (this.form) {
      this.form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.submitEnrollment();
      });
    }
  }

  open(preselectTrack) {
    if (preselectTrack) {
      const radio = document.querySelector(`input[name="enrollTrack"][value="${preselectTrack}"]`);
      if (radio) radio.checked = true;
    }
    this.setStep(1);
    if (this.modal) {
      this.modal.classList.add("active");
      document.body.classList.add("overflow-hidden");
    }
  }

  close() {
    if (this.modal) {
      this.modal.classList.remove("active");
      document.body.classList.remove("overflow-hidden");
    }
  }

  setStep(step) {
    this.currentStep = step;

    // Update step containers
    for (let i = 1; i <= this.totalSteps; i++) {
      const stepEl = document.getElementById(`enrollStep${i}`);
      const indicator = document.getElementById(`stepIndicator${i}`);
      if (stepEl) {
        if (i === step) {
          stepEl.classList.remove("hidden");
        } else {
          stepEl.classList.add("hidden");
        }
      }
      if (indicator) {
        if (i < step) {
          indicator.className = "step-item completed flex items-center gap-2";
        } else if (i === step) {
          indicator.className = "step-item active flex items-center gap-2";
        } else {
          indicator.className = "step-item flex items-center gap-2 text-on-surface-variant";
        }
      }
    }

    const prevBtn = document.getElementById("enrollPrevStep");
    const nextBtn = document.getElementById("enrollNextStep");
    const submitBtn = document.getElementById("enrollSubmitBtn");

    if (prevBtn) {
      if (step === 1) {
        prevBtn.classList.add("hidden");
      } else {
        prevBtn.classList.remove("hidden");
      }
    }

    if (nextBtn && submitBtn) {
      if (step === this.totalSteps) {
        nextBtn.classList.add("hidden");
        submitBtn.classList.remove("hidden");
      } else {
        nextBtn.classList.remove("hidden");
        submitBtn.classList.add("hidden");
      }
    }
  }

  nextStep() {
    if (this.currentStep === 1) {
      const selectedTrack = document.querySelector("input[name='enrollTrack']:checked");
      if (!selectedTrack) {
        window.app.showToast("Please choose a study track.", "warning");
        return;
      }
      this.setStep(2);
    } else if (this.currentStep === 2) {
      const name = document.getElementById("enrollName")?.value.trim();
      const phone = document.getElementById("enrollPhone")?.value.trim();
      const email = document.getElementById("enrollEmail")?.value.trim();

      if (!name) {
        window.app.showToast("Please provide your full name.", "warning");
        return;
      }
      if (!phone || phone.length < 6) {
        window.app.showToast("Please provide a valid phone number.", "warning");
        return;
      }
      if (!email || !email.includes("@")) {
        window.app.showToast("Please provide a valid email address.", "warning");
        return;
      }

      this.populateReview();
      this.setStep(3);
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.setStep(this.currentStep - 1);
    }
  }

  populateReview() {
    const trackVal = document.querySelector("input[name='enrollTrack']:checked")?.value;
    const trackObj = ACADEMY_DATA.tracks.find(t => t.id === trackVal) || ACADEMY_DATA.tracks[0];
    const name = document.getElementById("enrollName")?.value;
    const phone = document.getElementById("enrollPhone")?.value;
    const email = document.getElementById("enrollEmail")?.value;
    const schedule = document.querySelector("input[name='enrollSchedule']:checked")?.value || "Weekday Evenings";

    const summaryEl = document.getElementById("enrollReviewSummary");
    if (summaryEl) {
      summaryEl.innerHTML = `
        <div class="bg-surface-container-low p-3.5 rounded-xl flex flex-col gap-2 border border-primary/10">
          <div class="flex items-center justify-between">
            <span class="font-label-sm text-label-sm text-on-surface-variant">Selected Track</span>
            <span class="font-label-md text-label-md text-primary font-bold">${trackObj.title}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="font-label-sm text-label-sm text-on-surface-variant">Tuition Rate</span>
            <span class="font-label-md text-label-md text-secondary font-bold">${trackObj.discountPrice}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="font-label-sm text-label-sm text-on-surface-variant">Learner</span>
            <span class="font-label-md text-label-md text-on-surface">${name}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="font-label-sm text-label-sm text-on-surface-variant">Contact</span>
            <span class="font-label-md text-label-md text-on-surface">${phone} • ${email}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="font-label-sm text-label-sm text-on-surface-variant">Format</span>
            <span class="font-label-md text-label-md text-tertiary font-bold">${schedule}</span>
          </div>
        </div>
      `;
    }
  }

  submitEnrollment() {
    const trackVal = document.querySelector("input[name='enrollTrack']:checked")?.value;
    const trackObj = ACADEMY_DATA.tracks.find(t => t.id === trackVal) || ACADEMY_DATA.tracks[0];
    const name = document.getElementById("enrollName")?.value.trim();
    const phone = document.getElementById("enrollPhone")?.value.trim();
    const email = document.getElementById("enrollEmail")?.value.trim();
    const schedule = document.querySelector("input[name='enrollSchedule']:checked")?.value || "Weekday Evenings";

    const record = {
      id: "ENR-" + Date.now(),
      trackId: trackObj.id,
      trackTitle: trackObj.title,
      name,
      phone,
      email,
      schedule,
      date: new Date().toLocaleDateString()
    };

    this.enrolledStudents.push(record);
    localStorage.setItem("nines_enrollments", JSON.stringify(this.enrolledStudents));

    // Decrement seats
    if (this.remainingSeats > 1) {
      this.remainingSeats -= 1;
      localStorage.setItem("nines_remaining_seats", this.remainingSeats.toString());
      this.updateSeatsDisplay();
    }

    this.close();
    if (window.confetti) window.confetti.burst(100);
    window.app.showToast(`Congratulations ${name}! Your seat for ${trackObj.title} is reserved.`, "success");

    // Also update student portal mock name if user wants
    localStorage.setItem("nines_active_student_name", name);
    if (window.portalManager) window.portalManager.refresh();
  }

  updateSeatsDisplay() {
    document.querySelectorAll("[data-element='seats-left-counter']").forEach(el => {
      el.textContent = `Only ${this.remainingSeats} Seats Left`;
    });
  }
}

window.EnrollmentManager = EnrollmentManager;
