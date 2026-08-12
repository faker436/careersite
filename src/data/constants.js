export const JOBS = [
  { id: 1,  title: "Senior Backend Engineer",        dept: "Engineering", location: "Remote", type: "Full-time" },
  { id: 2,  title: "Staff Frontend Engineer",         dept: "Engineering", location: "Remote", type: "Full-time" },
  { id: 3,  title: "Machine Learning Engineer",       dept: "Engineering", location: "Remote", type: "Full-time" },
  { id: 4,  title: "DevOps / Platform Engineer",      dept: "Engineering", location: "Remote", type: "Full-time" },
  { id: 5,  title: "Product Manager, Core Platform",  dept: "Product",     location: "Remote", type: "Full-time" },
  { id: 6,  title: "Product Manager, Growth",         dept: "Product",     location: "Remote", type: "Full-time" },
  { id: 7,  title: "Senior Product Designer",         dept: "Design",      location: "Remote", type: "Full-time" },
  { id: 8,  title: "Design Systems Engineer",         dept: "Design",      location: "Remote", type: "Full-time" },
  { id: 9,  title: "Head of Content Marketing",       dept: "Marketing",   location: "Remote", type: "Full-time" },
  { id: 10, title: "Performance Marketing Manager",   dept: "Marketing",   location: "Remote", type: "Full-time" },
  { id: 11, title: "Customer Success Manager",        dept: "Operations",  location: "Remote", type: "Full-time" },
  { id: 12, title: "Finance & Accounting Lead",       dept: "Operations",  location: "Remote", type: "Full-time" },
];

export const PERKS = [
  { icon: "🏠", title: "Fully remote",    desc: "Work from anywhere. Async-first culture, no micromanaging." },
  { icon: "📈", title: "Equity for all",  desc: "Every employee gets meaningful equity from day one." },
  { icon: "🎓", title: "Learning budget", desc: "$2,000/year for courses, books, and conferences." },
  { icon: "☀️", title: "Unlimited PTO",   desc: "Take the time you need. We care about output, not hours." },
  { icon: "💻", title: "Top-tier gear",   desc: "Latest MacBook + $800 home office setup stipend." },
  { icon: "🏥", title: "Health coverage", desc: "100% medical, dental, and vision for you and family." },
];

export const VALUES = [
  { roman: "I",   label: "Default to transparency", desc: "Decisions, roadmaps, and mistakes are shared openly. No hidden agendas." },
  { roman: "II",  label: "Own your outcomes",        desc: "We hire people we trust, then let them lead. Accountability without bureaucracy." },
  { roman: "III", label: "Craft over speed",         desc: "We'd rather ship something excellent slowly than something mediocre fast." },
  { roman: "IV",  label: "Embrace hard problems",    desc: "We work on things others avoid. That's where the interesting work lives." },
];

export const DEPARTMENTS = ["All", "Engineering", "Product", "Design", "Marketing", "Operations"];

export const DEPT_COLORS = {
  Engineering: { bg: "#EEF2FF", text: "#3730A3" },
  Product:     { bg: "#F0FDF4", text: "#166534" },
  Design:      { bg: "#FFF7ED", text: "#9A3412" },
  Marketing:   { bg: "#FDF4FF", text: "#6B21A8" },
  Operations:  { bg: "#F0F9FF", text: "#075985" },
};

export const APPLY_STEPS = ["Your info", "Experience", "Final details", "Review"];

export const TEAM_MEMBERS = [
  { name: "Mia Chen",     role: "Engineering", initials: "MC", color: "#EEF2FF", text: "#3730A3" },
  { name: "James Okafor", role: "Product",     initials: "JO", color: "#F0FDF4", text: "#166534" },
  { name: "Sara Lind",    role: "Design",      initials: "SL", color: "#FFF7ED", text: "#9A3412" },
  { name: "Rahul Mehta",  role: "Engineering", initials: "RM", color: "#EEF2FF", text: "#3730A3" },
  { name: "Priya Nair",   role: "Marketing",   initials: "PN", color: "#FDF4FF", text: "#6B21A8" },
  { name: "Tom Bergmann", role: "Operations",  initials: "TB", color: "#F0F9FF", text: "#075985" },
];

export const DRIVER_COMMANDS = {
  windows: {
    label: "Run in PowerShell (as Administrator)",
    cmd: "pnputil /scan-devices",
    note: "Press Win + X → select 'Windows PowerShell (Admin)' or 'Terminal (Admin)'",
    steps: [
      "Press Win + X on your keyboard",
      "Click 'Windows PowerShell (Admin)' or 'Terminal (Admin)'",
      "Paste the command and press Enter",
      "Wait a few seconds — your camera will open here automatically",
    ],
  },
  mac: {
    label: "Run in Terminal",
    cmd: "sudo killall VDCAssistant 2>/dev/null; sudo killall AppleCameraAssistant 2>/dev/null; tccutil reset Camera",
    note: "Finder → Applications → Utilities → Terminal  (or press ⌘ Space and search 'Terminal')",
    steps: [
      "Press ⌘ Space and type 'Terminal', then press Enter",
      "Paste the command and press Enter",
      "Enter your Mac password if prompted",
      "Wait a few seconds — your camera will open here automatically",
    ],
  },
  linux: {
    label: "Run in Terminal",
    cmd: "sudo modprobe uvcvideo && v4l2-ctl --list-devices",
    note: "Press Ctrl + Alt + T to open a terminal window",
    steps: [
      "Press Ctrl + Alt + T to open Terminal",
      "Paste the command and press Enter",
      "Enter your password if prompted",
      "Wait a few seconds — your camera will open here automatically",
    ],
  },
};

export const JOB_DETAILS = {
  "Senior Backend Engineer": {
    summary: "We're looking for a Senior Backend Engineer to own the core infrastructure that millions of users depend on.",
    responsibilities: [
      "Design and build high-throughput APIs and microservices",
      "Own reliability and performance of core backend systems",
      "Define architecture standards and review team PRs",
      "Collaborate with product to scope technical feasibility",
      "Mentor junior engineers and grow the team's craft",
    ],
    requirements: [
      "5+ years of backend engineering experience",
      "Deep expertise in one of: Go, Rust, Node.js, or Python",
      "Experience designing distributed systems at scale",
      "Strong understanding of SQL and NoSQL databases",
      "Track record of shipping reliable production systems",
    ],
    nice: ["Experience with Kubernetes and cloud infrastructure", "Open source contributions", "Startup experience"],
  },
};
