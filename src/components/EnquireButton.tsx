"use client";

export const PROGRAM_EVENT = "btp:select-program";

/** Jumps to the contact section and pre-selects a program in the enquiry form. */
export default function EnquireButton({ programTitle, className = "", children }: { programTitle: string; className?: string; children: React.ReactNode }) {
  return (
    <a
      href="#contact"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent(PROGRAM_EVENT, { detail: programTitle }))}
    >
      {children}
    </a>
  );
}
