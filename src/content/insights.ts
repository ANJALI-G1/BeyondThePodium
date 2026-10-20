/**
 * INSIGHTS / ARTICLES
 * EDIT: these are starter drafts on general communication topics, written for
 * layout and SEO. Review, rewrite in Dr. Prachi's voice, or replace entirely.
 * Each article automatically gets its own page at /insights/<slug>/.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO yyyy-mm-dd
  readMinutes: number;
  body: Block[];
};

export const articles: Article[] = [
  {
    slug: "calm-stage-fear-before-you-speak",
    title: "5 Ways to Calm Stage Fear Before You Speak",
    excerpt: "Nerves are normal — even for experienced speakers. Here are simple, practical ways to turn that energy into presence.",
    category: "Public Speaking",
    date: "2026-10-01",
    readMinutes: 4,
    body: [
      { type: "p", text: "A racing heart, dry mouth and shaky hands before a talk don't mean you're bad at speaking. They mean your body is getting ready to perform. The goal isn't to eliminate nerves — it's to channel them." },
      { type: "h2", text: "1. Breathe low and slow" },
      { type: "p", text: "Before you begin, take a few slow breaths, letting the exhale be longer than the inhale. It signals safety to your nervous system and steadies your voice." },
      { type: "h2", text: "2. Know your first 30 seconds cold" },
      { type: "p", text: "The opening is where nerves peak. Rehearse your first few lines until they feel natural — momentum carries you through the rest." },
      { type: "h2", text: "3. Rehearse out loud, not just in your head" },
      { type: "p", text: "Speaking your content aloud reveals awkward phrasing and builds muscle memory. Practise standing up, the way you'll actually deliver it." },
      { type: "h2", text: "4. Find friendly faces" },
      { type: "p", text: "Speak to one person at a time. Holding eye contact with a few attentive listeners makes a large room feel like a conversation." },
      { type: "h2", text: "5. Reframe fear as excitement" },
      { type: "p", text: "Physically, anxiety and excitement feel almost identical. Telling yourself “I'm excited” instead of “I'm nervous” can shift how you show up." },
      { type: "quote", text: "Confidence isn't the absence of nerves. It's speaking anyway — and getting better each time." },
    ],
  },
  {
    slug: "body-language-that-builds-trust",
    title: "Body Language That Builds Trust in Seconds",
    excerpt: "Before you say a word, your posture, gestures and expression are already speaking. Make sure they say the right thing.",
    category: "Presence",
    date: "2026-09-18",
    readMinutes: 3,
    body: [
      { type: "p", text: "People form first impressions remarkably quickly, and much of that impression comes from non-verbal signals. The good news: a few small habits make a big difference." },
      { type: "h2", text: "Stand grounded" },
      { type: "p", text: "Feet roughly hip-width apart, weight balanced, shoulders relaxed. A stable stance reads as calm and self-assured." },
      { type: "h2", text: "Let your hands help" },
      { type: "p", text: "Open, purposeful gestures support your message. Avoid hiding hands in pockets or gripping the podium." },
      { type: "h2", text: "Match expression to message" },
      { type: "p", text: "A genuine smile when you greet people, and a thoughtful expression for serious points, keeps your words and face aligned." },
      { type: "ul", items: ["Keep an open posture", "Make steady, natural eye contact", "Pause instead of fidgeting", "Nod to show you're listening"] },
    ],
  },
  {
    slug: "introduce-yourself-in-interviews",
    title: "How to Answer “Tell Me About Yourself”",
    excerpt: "It's the most common interview opener — and the most often fumbled. Use this simple structure to make it count.",
    category: "Interviews",
    date: "2026-09-05",
    readMinutes: 4,
    body: [
      { type: "p", text: "“Tell me about yourself” isn't an invitation to recite your résumé. It's a chance to frame who you are and why you're right for the role — in about a minute." },
      { type: "h2", text: "Use Present – Past – Future" },
      { type: "ul", items: ["Present: what you do now and what you're good at", "Past: one or two experiences that shaped those strengths", "Future: why this role is the natural next step"] },
      { type: "h2", text: "Keep it relevant" },
      { type: "p", text: "Choose details that connect to the job. A focused answer shows self-awareness and respect for the interviewer's time." },
      { type: "h2", text: "Practise — but don't memorise" },
      { type: "p", text: "Know your key points, not a script. That keeps you sounding natural and lets you adapt to the conversation." },
      { type: "quote", text: "A clear introduction sets the tone for everything that follows." },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
