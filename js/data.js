// Nine's Academy Central Data Store

const ACADEMY_DATA = {
  contact: {
    primaryPhone: "597 042 154",
    primaryPhoneRaw: "597042154",
    supportPhone: "504 444 569",
    supportPhoneRaw: "504444569",
    email: "ninekapanadze@gmail.com",
    location: "Tbilisi, Georgia | Online Worldwide",
    director: "Nine Kapanadze",
    hours: "Mon - Sat: 10:00 AM - 8:00 PM (GET)"
  },

  tracks: [
    {
      id: "track-english",
      category: "english",
      title: "Real-World English Mastery",
      badge: "Popular • A1 to C2",
      badgeColor: "primary",
      icon: "🇬🇧",
      tagline: "Speak with authentic confidence in social and professional settings.",
      summary: "Ditch boring grammar drills! Speak fluently through scenario-based conversation, business etiquette drills, and IELTS/TOEFL sprints.",
      duration: "12 Weeks (36 Sessions)",
      level: "All Levels (A1 - C2)",
      groupSize: "Max 6 Students",
      price: "$180 / month",
      discountPrice: "$144 / month (-20% Spring)",
      accentCoach: true,
      tags: ["Accent Coaching", "Vocab Quests", "Business Idioms"],
      metricLabel: "Speaking Confidence Index",
      metricValue: "+88% Avg Jump"
    },
    {
      id: "track-management",
      category: "management",
      title: "Modern Management & Leadership",
      badge: "Career Booster • Practical",
      badgeColor: "secondary",
      icon: "📈",
      tagline: "Lead high-performing teams, manage projects, and present like an executive.",
      summary: "Lead people and projects like a seasoned executive. Learn Agile frameworks, conflict resolution, and boardroom-level pitch presentation.",
      duration: "10 Weeks (30 Sessions)",
      level: "Emerging & Senior Leaders",
      groupSize: "Max 6 Students",
      price: "$220 / month",
      discountPrice: "$176 / month (-20% Spring)",
      accentCoach: false,
      tags: ["Negotiation", "Team Dynamics", "Agile & Scrum"],
      metricLabel: "Career Advancement",
      metricValue: "Promoted in 6 Mo"
    },
    {
      id: "track-ielts",
      category: "english",
      title: "IELTS & TOEFL Band 7.5+ Intensive",
      badge: "High-Score Sprint",
      badgeColor: "tertiary",
      icon: "🎯",
      tagline: "Rapid score amplification for university admissions and visa applications.",
      summary: "Targeted strategy drills for Academic Writing Task 2, Speaking fluency, and high-speed reading comprehension with mock exams.",
      duration: "8 Weeks (24 Sessions)",
      level: "B1 to C1 Entry",
      groupSize: "Max 4 Students",
      price: "$200 / month",
      discountPrice: "$160 / month (-20% Spring)",
      accentCoach: true,
      tags: ["Mock Exams", "Writing Feedback", "Timed Drills"],
      metricLabel: "Average Band Score",
      metricValue: "7.8 Band"
    },
    {
      id: "track-kids",
      category: "kids",
      title: "Young Explorers English (Ages 8-14)",
      badge: "Kids & Teens",
      badgeColor: "primary",
      icon: "🚀",
      tagline: "Gamified storytelling, drama games, and natural pronunciation habits.",
      summary: "Fun, vibrant immersion classes that inspire young learners to speak freely without fear of mistakes through animated quests.",
      duration: "Ongoing / Term-based",
      level: "Ages 8-14",
      groupSize: "Max 6 Students",
      price: "$140 / month",
      discountPrice: "$112 / month (-20% Spring)",
      accentCoach: true,
      tags: ["Storytelling", "Drama & Roleplay", "Interactive Quests"],
      metricLabel: "Student Engagement",
      metricValue: "99% Active"
    },
    {
      id: "track-exec",
      category: "management",
      title: "Executive Pitching & Negotiation",
      badge: "Masterclass",
      badgeColor: "secondary",
      icon: "💼",
      tagline: "Persuade stakeholders and close key deals with poise.",
      summary: "Boardroom simulations, live debate moderation, objection handling, and crisis communication for startup founders and managers.",
      duration: "6 Weeks (18 Sessions)",
      level: "Professionals & Founders",
      groupSize: "Max 5 Students",
      price: "$250 / month",
      discountPrice: "$200 / month (-20% Spring)",
      accentCoach: false,
      tags: ["Pitch Decks", "Deal Closing", "Executive Presence"],
      metricLabel: "Deal Close Rate Jump",
      metricValue: "+45% Success"
    }
  ],

  syllabi: {
    english: {
      title: "Real-World English Mastery Syllabus",
      description: "A 12-week comprehensive fluency accelerator designed to eliminate hesitation and develop native-like rhythm.",
      weeks: [
        {
          week: "Weeks 1 - 3",
          title: "Accent Neutralization & Phonetic Confidence",
          topics: [
            "Connecting speech, vowel reduction, and intonation patterns",
            "Eliminating mother-tongue interference and common pronunciation traps",
            "Daily active listening and shadowing exercises"
          ]
        },
        {
          week: "Weeks 4 - 6",
          title: "Scenario-Based Conversational Agility",
          topics: [
            "Impromptu storytelling and conversational hooks",
            "Defending arguments in debates and polite disagreements",
            "Idioms, phrasal verbs, and natural slang in everyday context"
          ]
        },
        {
          week: "Weeks 7 - 9",
          title: "Professional English & Business Correspondence",
          topics: [
            "Impactful email writing, executive summaries, and memos",
            "Conducting international Zoom calls with cross-cultural etiquette",
            "Negotiation phrases and formal diplomatic tone"
          ]
        },
        {
          week: "Weeks 10 - 12",
          title: "Mastery Capstone & Live Public Speaking",
          topics: [
            "TED-style 5-minute presentation delivered to live cohort",
            "Q&A handling and spontaneous topic defense",
            "Graduation evaluation and CEFR certification award"
          ]
        }
      ]
    },

    management: {
      title: "Modern Management & Leadership Syllabus",
      description: "A 10-week intensive framework transforming individual contributors into confident, agile team leaders.",
      weeks: [
        {
          week: "Weeks 1 - 2",
          title: "Foundations of High-Performance Leadership",
          topics: [
            "Leadership styles: servant, situational, and transformational",
            "Self-awareness, emotional intelligence (EQ), and active listening",
            "Setting strategic visions and OKRs (Objectives & Key Results)"
          ]
        },
        {
          week: "Weeks 3 - 5",
          title: "Agile, Scrum & Execution Frameworks",
          topics: [
            "Sprint planning, daily standups, retrospectives, and Kanban",
            "Delegation matrices and psychological safety in teams",
            "Handling blockers and running razor-sharp team meetings"
          ]
        },
        {
          week: "Weeks 6 - 8",
          title: "Conflict Resolution & Strategic Negotiation",
          topics: [
            "The Harvard Negotiation Model: principled bargaining",
            "Managing difficult conversations and constructive feedback loops",
            "Cross-functional alignment and stakeholder management"
          ]
        },
        {
          week: "Weeks 9 - 10",
          title: "Executive Presence & Boardroom Simulation",
          topics: [
            "Delivering pitches to simulated investor panels",
            "Crisis communication under rapid-fire constraints",
            "Final leadership manifesto and accredited certificate"
          ]
        }
      ]
    }
  },

  botResponses: [
    {
      keywords: ["price", "cost", "fee", "tuition", "how much", "discount", "offer"],
      reply: "Our cohort fees range from $112 to $200/month with our current Spring 20% discount! For example, our flagship Real-World English is $144/mo (regular $180), and Management is $176/mo (regular $220). Would you like to reserve a seat?"
    },
    {
      keywords: ["schedule", "time", "when", "days", "hours", "calendar"],
      reply: "We offer both Weekday evening cohorts (Mon/Wed/Fri 7:00 PM) and Weekend intensive tracks (Sat/Sun morning). All live sessions are held in small cohorts of max 6 students for deep practice."
    },
    {
      keywords: ["location", "address", "where", "tbilisi", "online", "zoom"],
      reply: "Nine's Academy is based in Tbilisi, Georgia with hybrid options! You can join in-person at our central modern classroom or attend online worldwide via interactive HD Zoom cohorts."
    },
    {
      keywords: ["phone", "call", "contact", "whatsapp", "number"],
      reply: "You can reach Ms. Nine Kapanadze and our admissions team directly at 597 042 154 or student support at 504 444 569. Or click the Call Now tab for 1-tap dialing!"
    },
    {
      keywords: ["certificate", "diploma", "accreditation", "verified"],
      reply: "Yes! Every graduate receives a verified digital certificate with verifiable ID for LinkedIn, resumes, and international universities."
    },
    {
      keywords: ["placement", "test", "level", "eval", "assessment"],
      reply: "We provide a free 15-minute 1-on-1 placement diagnostic call with a senior coach to determine your exact CEFR level before you start! Tap 'Enroll' to book yours."
    },
    {
      keywords: ["nine", "teacher", "instructor", "founder", "coach"],
      reply: "Nine Kapanadze is the founder and lead instructor with over a decade of international experience coaching diplomats, startup executives, and students to fluency."
    }
  ],

  studentMock: {
    name: "Alex Beridze",
    studentId: "NA-2025-0842",
    track: "Real-World English Mastery",
    level: "Upper-Intermediate (B2.2)",
    xp: 840,
    nextLevelXp: 1000,
    streakDays: 12,
    attendanceRate: "96%",
    upcomingClass: {
      title: "Scenario: High-Stakes Negotiation & Idioms",
      date: "Tomorrow, 7:00 PM (Tbilisi)",
      instructor: "Nine Kapanadze",
      roomLink: "https://zoom.us/j/mock-nines-academy"
    },
    badges: [
      { id: "b1", title: "Accent Ace", icon: "🎙️", desc: "Mastered connected vowel flow" },
      { id: "b2", title: "10-Day Streak", icon: "🔥", desc: "Never missed a homework quest" },
      { id: "b3", title: "Debate Champ", icon: "🏆", desc: "Won cohort debate tournament" },
      { id: "b4", title: "Agile Leader", icon: "⚡", desc: "Led Scrum sprint simulation" }
    ]
  }
};
