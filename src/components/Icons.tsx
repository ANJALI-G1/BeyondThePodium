import type { SVGProps } from "react";

const base = (props: SVGProps<SVGSVGElement>) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
});

export const MicIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3M8.5 21h7" /></svg>
);
export const PeopleIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><circle cx="9" cy="8" r="3.2" /><path d="M3 20c.6-3.3 3-5.2 6-5.2s5.4 1.9 6 5.2" /><circle cx="17" cy="9" r="2.5" /><path d="M16.5 14.6c2.3.2 4 1.8 4.5 4.4" /></svg>
);
export const CapIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="m2 9 10-5 10 5-10 5L2 9Z" /><path d="M6 11v5c1.7 1.6 3.7 2.4 6 2.4s4.3-.8 6-2.4v-5M22 9v6" /></svg>
);
export const SparkIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" /></svg>
);
export const CheckIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
);
export const MailIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m4 7 8 6 8-6" /></svg>
);
export const PhoneIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M5 4h3.5l1.7 4.3-2.2 1.4a11 11 0 0 0 6.3 6.3l1.4-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5C10.6 20 4 13.4 3.5 5.6A1.5 1.5 0 0 1 5 4Z" /></svg>
);
export const PinIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
);
export const InstagramIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r=".6" fill="currentColor" /></svg>
);
export const LinkedInIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10.5V17M8 7.3v.2M12 17v-3.8c0-1.6 1-2.7 2.4-2.7s2.1 1 2.1 2.7V17M12 10.5V17" /></svg>
);
export const ThreadsIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M16.8 11.2C16.4 8.4 14.6 7 12.2 7 9 7 7 9.4 7 12.6 7 16 9.2 18 12.3 18c2.6 0 4.7-1.5 4.7-3.8 0-2.1-1.8-3.4-4.3-3.4-1.9 0-3.2 1-3.2 2.4 0 1.2 1 2 2.4 2 2.2 0 3.3-1.8 3.3-4.6" /><path d="M12 21.5C6.8 21.5 3 17.6 3 12S6.8 2.5 12 2.5c4 0 6.9 2 8 5.5" /></svg>
);
export const WhatsAppIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3 1 2.6 1.1 2.8.1.2 1.9 2.9 4.6 4 1.7.7 2.4.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.6-.3Z" />
  </svg>
);

export const programIcons = { mic: MicIcon, people: PeopleIcon, cap: CapIcon, spark: SparkIcon };
export const socialIcons: Record<string, (p: SVGProps<SVGSVGElement>) => React.JSX.Element> = {
  Instagram: InstagramIcon,
  LinkedIn: LinkedInIcon,
  Threads: ThreadsIcon,
};
