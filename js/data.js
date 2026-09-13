

var initialBooks = [
  {
    id: "book-1",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self-Improvement",
    summary:
      "A practical guide to building good habits and breaking bad ones through small, consistent changes that compound over time.",
    cover: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
    source: "initial"
  },
  {
    id: "book-2",
    title: "The Warren Buffett Way",
    author: "Robert G. Hagstrom",
    category: "Investing",
    summary:
      "Explains Warren Buffett’s investment approach: buy wonderful businesses at fair prices and hold them for the long term.",
    cover: "https://covers.openlibrary.org/b/isbn/9781118503256-L.jpg",
    source: "initial"
  },
  {
    id: "book-3",
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    category: "Mindset",
    summary:
      "A classic on desire, faith, persistence, and a clear plan — the mental foundations behind lasting success.",
    cover: "https://covers.openlibrary.org/b/isbn/9781585424337-L.jpg",
    source: "initial"
  },
  {
    id: "book-4",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Finance",
    summary:
      "Shows how behaviour matters more than formulas in money decisions, through short stories about wealth and risk.",
    cover: "https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg",
    source: "initial"
  },
  {
    id: "book-5",
    title: "Mindset",
    author: "Carol S. Dweck",
    category: "Psychology",
    summary:
      "Introduces fixed vs growth mindset and how believing you can improve changes learning, work, and relationships.",
    cover: "https://covers.openlibrary.org/b/isbn/9780345472328-L.jpg",
    source: "initial"
  },
  {
    id: "book-6",
    title: "Deep Work",
    author: "Cal Newport",
    category: "Productivity",
    summary:
      "Argues that focused, undistracted work is rare and valuable, and teaches how to train your attention.",
    cover: "https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg",
    source: "initial"
  },
  {
    id: "book-7",
    title: "Hyperfocus",
    author: "Chris Bailey",
    category: "Productivity",
    summary:
      "Explains how to manage attention: when to focus deeply, and when to let your mind wander productively.",
    cover: "https://covers.openlibrary.org/b/isbn/9780525522232-L.jpg",
    source: "initial"
  },
  {
    id: "book-8",
    title: "Zero to One",
    author: "Peter Thiel",
    category: "Startups",
    summary:
      "A contrarian take on startups: build something new (0 to 1) instead of copying what already exists (1 to n).",
    cover: "https://covers.openlibrary.org/b/isbn/9780804139298-L.jpg",
    source: "initial"
  }
];

var initialResources = [
  {
    id: "res-1",
    title: "Why Databases Use B+ Trees",
    type: "Video",
    creator: "Arpit Bhayani",
    url: "https://www.youtube.com/results?search_query=why+databases+use+b+trees+arpit+bhayani",
    topic: "Databases",
    summary: "Explains why B+ Trees fit disk/page-based storage better than simple arrays or binary trees.",
    source: "initial"
  },
  {
    id: "res-2",
    title: "MDN Web Docs — JavaScript Guide",
    type: "Docs",
    creator: "MDN Contributors",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
    topic: "Web",
    summary: "Official beginner-to-intermediate guide for JavaScript language fundamentals.",
    source: "initial"
  },
  {
    id: "res-3",
    title: "System Design Primer",
    type: "Article",
    creator: "Donne Martin",
    url: "https://github.com/donnemartin/system-design-primer",
    topic: "System Design",
    summary: "A free collection of system design concepts, trade-offs, and interview-style examples.",
    source: "initial"
  },
  {
    id: "res-4",
    title: "PostgreSQL Official Documentation",
    type: "Docs",
    creator: "PostgreSQL Global Development Group",
    url: "https://www.postgresql.org/docs/current/",
    topic: "Databases",
    summary: "Primary reference for SQL, indexes, transactions, and PostgreSQL features.",
    source: "initial"
  },
  {
    id: "res-5",
    title: "The Distributed Systems Reading List",
    type: "Paper",
    creator: "Different authors (curated list)",
    url: "https://dancres.github.io/Pages/",
    topic: "Distributed Systems",
    summary: "A curated set of classic papers on consensus, replication, and distributed failures.",
    source: "initial"
  },
  {
    id: "res-6",
    title: "How DNS Works",
    type: "Article",
    creator: "Cloudflare Learning Center",
    url: "https://www.cloudflare.com/learning/dns/what-is-dns/",
    topic: "Networking",
    summary: "Clear explanation of DNS lookups, records, and why the internet needs name resolution.",
    source: "initial"
  },
  {
    id: "res-7",
    title: "CS50 — Introduction to Computer Science",
    type: "Video",
    creator: "Harvard / David J. Malan",
    url: "https://cs50.harvard.edu/x/",
    topic: "Software Engineering",
    summary: "A free course covering algorithms, memory, data structures, and problem solving.",
    source: "initial"
  },
  {
    id: "res-8",
    title: "roadmap.sh — Developer Roadmaps",
    type: "Website",
    creator: "Kamran Ahmed",
    url: "https://roadmap.sh/",
    topic: "Software Engineering",
    summary: "Visual learning paths for frontend, backend, DevOps, and other engineering tracks.",
    source: "initial"
  }
];

var initialIdeas = [
  {
    id: "idea-1",
    title: "AI-Native Software Development",
    category: "Blog Idea",
    description: "Write about how software engineering may change when engineers work with multiple AI agents day to day.",
    source: "initial"
  },
  {
    id: "idea-2",
    title: "Personal Knowledge CLI",
    category: "Project Idea",
    description: "Build a tiny command-line tool that saves notes into local markdown files with tags.",
    source: "initial"
  },
  {
    id: "idea-3",
    title: "Why databases are not just files",
    category: "Blog Idea",
    description: "Explain B+ Trees, pages, and indexing in plain language for beginners.",
    source: "initial"
  },
  {
    id: "idea-4",
    title: "Study-with-me accountability app",
    category: "Business Idea",
    description: "A simple web app where students set weekly goals and check in publicly with friends.",
    source: "initial"
  },
  {
    id: "idea-5",
    title: "Transactional outbox demo",
    category: "Engineering Idea",
    description: "Create a small demo that writes a DB row and an outbox event in one transaction.",
    source: "initial"
  },
  {
    id: "idea-6",
    title: "Habit tracker for deep work blocks",
    category: "Project Idea",
    description: "Track 90-minute focus blocks and show a weekly streak chart.",
    source: "initial"
  },
  {
    id: "idea-7",
    title: "Psychology of money notes series",
    category: "Blog Idea",
    description: "Turn chapter takeaways into short LinkedIn posts with one practical tip each.",
    source: "initial"
  },
  {
    id: "idea-8",
    title: "Weekend prototype: spaced repetition flashcards",
    category: "Random Thought",
    description: "Use browser localStorage first, then maybe sync later — keep the first version tiny.",
    source: "initial"
  }
];

var initialInsights = [
  {
    id: "ins-1",
    title: "Why databases use B+ Trees",
    domain: "Databases",
    whatLearned:
      "B+ Trees keep data ordered and are designed around efficient page-based disk access, which matches how databases read and write storage.",
    source: "initial"
  },
  {
    id: "ins-2",
    title: "Transactional Outbox Pattern",
    domain: "Distributed Systems",
    whatLearned:
      "The database change and the event record are written in the same transaction, then the event is published asynchronously so systems stay consistent.",
    source: "initial"
  },
  {
    id: "ins-3",
    title: "Growth mindset vs fixed mindset",
    domain: "Psychology",
    whatLearned:
      "Believing abilities can improve changes how you respond to failure — effort and strategy become the focus instead of talent alone.",
    source: "initial"
  },
  {
    id: "ins-4",
    title: "Deep work needs boundaries",
    domain: "Software Engineering",
    whatLearned:
      "Focus is trainable. Long uninterrupted blocks produce better work than constant context switching between chat, email, and code.",
    source: "initial"
  },
  {
    id: "ins-5",
    title: "Caching is a trade-off",
    domain: "System Design",
    whatLearned:
      "Caches make reads faster but add complexity: stale data, invalidation rules, and harder debugging when values disagree.",
    source: "initial"
  },
  {
    id: "ins-6",
    title: "Prompts work better with examples",
    domain: "AI",
    whatLearned:
      "Clear constraints plus one or two examples usually beat vague prompts when asking an AI for code or explanations.",
    source: "initial"
  },
  {
    id: "ins-7",
    title: "Indexes speed reads, slow writes",
    domain: "Databases",
    whatLearned:
      "An index helps find rows quickly, but every insert/update must also maintain the index, so too many indexes can hurt write performance.",
    source: "initial"
  },
  {
    id: "ins-8",
    title: "Idempotency for retries",
    domain: "Distributed Systems",
    whatLearned:
      "Network calls can be retried. Designing operations so repeating them does not create duplicate side effects keeps systems safer.",
    source: "initial"
  }
];

var initialQuotes = [
  { id: "q-1", text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { id: "q-2", text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { id: "q-3", text: "Whether you think you can, or you think you can't — you're right.", author: "Henry Ford" },
  { id: "q-4", text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { id: "q-5", text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
  { id: "q-6", text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { id: "q-7", text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
  { id: "q-8", text: "The expert in anything was once a beginner.", author: "Helen Hayes" }
];
