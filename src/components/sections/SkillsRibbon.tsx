import { skills } from "@/content/site";

export default function SkillsRibbon() {
  const items = [...skills, ...skills]; // duplicated for a seamless loop
  return (
    <div className="overflow-hidden border-y border-plum-700/10 bg-plum-700 py-5" aria-label="Areas of expertise">
      <ul className="flex w-max animate-marquee gap-10 whitespace-nowrap hover:[animation-play-state:paused]">
        {items.map((s, i) => (
          <li key={i} aria-hidden={i >= skills.length} className="flex items-center gap-10 font-display text-xl italic text-ivory/90">
            {s}
            <span className="text-gold-300 not-italic">✦</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
