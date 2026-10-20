/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SITE CONTENT — edit everything here. Components only render this data.
 *
 *  VERIFIED (from her public Instagram/LinkedIn):
 *    • Dr Prachi Behrani Manocha (PhD)
 *    • Certified Soft Skills Trainer, Communication Skills & Public Speaking Coach
 *    • 5+ years of experience
 *
 *  Anything marked `EDIT` is draft copy written for layout — review/replace it.
 *  Never add credentials, testimonials or client names that aren't real.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const site = {
  brand: "Beyond the Podium",
  name: "Dr. Prachi Behrani Manocha",
  shortName: "Dr. Prachi",
  credential: "PhD",
  title: "Certified Soft Skills Trainer, Communication Skills & Public Speaking Coach",
  experience: "5+ years",
  // Set NEXT_PUBLIC_SITE_URL in .env / CI once the domain is known.
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.com").replace(/\/$/, ""),
  description:
    "Communication skills, soft skills and public speaking coaching with Dr. Prachi Behrani Manocha (PhD), a certified soft skills trainer with 5+ years of experience.",
  headshot: "/images/dr-prachi-headshot.jpg",

  // EDIT: fill these in. Empty values are hidden automatically.
  contact: {
    email: "", // e.g. "hello@yourdomain.com"
    whatsapp: "", // digits with country code, no "+" or spaces, e.g. "919876543210"
    phone: "", // display format, e.g. "+91 98765 43210"
    location: "", // e.g. "New Delhi, India · Sessions online & in person"
  } as { email: string; whatsapp: string; phone: string; location: string },

  socials: [
    { label: "Instagram", handle: "@beyondthepodiumwithdrprachi", href: "https://www.instagram.com/beyondthepodiumwithdrprachi/" },
    { label: "LinkedIn", handle: "Dr. Prachi Behrani", href: "https://www.linkedin.com/in/dr-prachi-behrani-1290b4188/" },
    { label: "Threads", handle: "@beyondthepodiumwithdrprachi", href: "https://www.threads.com/@beyondthepodiumwithdrprachi" },
  ],
} as const;

export const nav = [
  { label: "About", href: "/#about" },
  { label: "Programs", href: "/#programs" },
  { label: "Approach", href: "/#approach" },
  { label: "Insights", href: "/insights/" },
  { label: "Contact", href: "/#contact" },
] as const;

// EDIT: hero copy
export const hero = {
  eyebrow: "Communication · Soft Skills · Public Speaking",
  headline: ["Speak with clarity.", "Lead with presence."],
  sub: "Coaching and training that helps students, professionals and teams communicate with confidence — on stage, in the boardroom, and in every conversation beyond the podium.",
  primaryCta: { label: "Book a discovery call", href: "#contact" },
  secondaryCta: { label: "Explore programs", href: "#programs" },
};

// Only verified facts here.
export const highlights = [
  { value: "5+", label: "Years of experience" },
  { value: "PhD", label: "Doctorate holder" },
  { value: "Certified", label: "Soft skills trainer" },
];

// Words for the scrolling ribbon.
export const skills = [
  "Public Speaking",
  "Presentation Skills",
  "Business Communication",
  "Interview Readiness",
  "Body Language",
  "Voice & Delivery",
  "Storytelling",
  "Confidence Building",
  "Professional Etiquette",
];

// EDIT: about copy (written from the verified facts; add her own story)
export const about = {
  eyebrow: "Meet your coach",
  heading: "Hi, I'm Dr. Prachi.",
  paragraphs: [
    "I'm a certified soft skills trainer and a communication & public speaking coach with a PhD and more than five years of experience helping people find — and use — their voice.",
    "Beyond the Podium grew from a simple belief: great communication isn't reserved for the stage. It shows up in interviews, meetings, classrooms, pitches and everyday conversations. When you speak with clarity and presence, people listen — and opportunities follow.",
    "My sessions are practical, supportive and tailored to you. We work on what you say, how you say it, and the confidence to say it when it matters.",
  ],
  pillars: [
    { title: "Practical", text: "Real scenarios, real practice, clear feedback." },
    { title: "Personal", text: "Built around your goals, pace and context." },
    { title: "Supportive", text: "A safe space to stretch, stumble and grow." },
  ],
};

export type Program = {
  id: string;
  title: string;
  audience: string;
  summary: string;
  outcomes: string[];
  format: string;
  icon: "mic" | "people" | "cap" | "spark";
};

// EDIT: programs are draft offerings based on her stated expertise — confirm with Dr. Prachi.
export const programs: Program[] = [
  {
    id: "public-speaking",
    title: "1:1 Public Speaking Coaching",
    audience: "Individuals & professionals",
    summary: "Personalised coaching to overcome stage fear, structure your message and deliver it with confidence.",
    outcomes: ["Manage nerves & stage fright", "Structure talks that land", "Voice, pace & body language"],
    format: "Online / in person · EDIT",
    icon: "mic",
  },
  {
    id: "corporate-training",
    title: "Corporate Soft Skills Training",
    audience: "Teams & organisations",
    summary: "Interactive workshops that build sharper communication, collaboration and professional presence at work.",
    outcomes: ["Business communication", "Presentation & meeting skills", "Workplace etiquette"],
    format: "Workshops · half / full day · EDIT",
    icon: "people",
  },
  {
    id: "student-workshops",
    title: "Workshops for Colleges & Schools",
    audience: "Students & institutions",
    summary: "Engaging sessions that prepare students to present, participate and perform with confidence.",
    outcomes: ["Presentation skills", "Group discussions", "Interview readiness"],
    format: "On campus / virtual · EDIT",
    icon: "cap",
  },
  {
    id: "interview-presence",
    title: "Interview & Personal Presence",
    audience: "Job seekers & graduates",
    summary: "Focused preparation to introduce yourself well, answer with clarity and leave a lasting impression.",
    outcomes: ["Self-introduction & storytelling", "Mock interviews with feedback", "Confident body language"],
    format: "Short-term coaching · EDIT",
    icon: "spark",
  },
];

// EDIT: process copy
export const approach = [
  { step: "01", title: "Discovery call", text: "We talk about where you are, where you want to be, and what's holding you back." },
  { step: "02", title: "Personalised plan", text: "A focused roadmap built around your goals, schedule and speaking situations." },
  { step: "03", title: "Practise with feedback", text: "Guided practice, honest feedback and simple techniques you can use immediately." },
  { step: "04", title: "Go beyond the podium", text: "Carry your confidence into interviews, meetings, classrooms and life." },
];

export type Testimonial = { quote: string; name: string; role?: string };

// Add REAL testimonials only (with permission). The section stays hidden while empty.
export const testimonials: Testimonial[] = [];

// Enquiry form options
export const enquiryRoles = ["Student", "Working professional", "Organisation / HR", "College / School", "Other"];
export const enquiryModes = ["Online", "In person", "Either"];
