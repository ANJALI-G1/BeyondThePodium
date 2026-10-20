/**
 * Decorative on-brand illustration used where photos will go later.
 * IMAGE SLOT: swap <ArtPanel/> for <Image src="/images/your-photo.jpg" .../> when photos are ready.
 */
export default function ArtPanel({
  variant = "podium",
  className = "",
  children,
}: {
  variant?: "podium" | "wave" | "rings";
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-plum-700 via-plum-900 to-[#1d0f20] ${className}`}>
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(226,197,143,0.35),transparent_60%)]" />
      <svg aria-hidden viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        {variant === "podium" && (
          <g stroke="#e2c58f" strokeWidth="1.5" fill="none" opacity="0.85">
            {/* spotlight */}
            <path d="M200 0 120 300h160L200 0Z" fill="#e2c58f" fillOpacity="0.06" stroke="none" />
            {/* microphone */}
            <rect x="188" y="150" width="24" height="44" rx="12" />
            <path d="M178 186a22 22 0 0 0 44 0M200 208v20" />
            {/* podium */}
            <path d="M140 232h120l-12 24H152l-12-24Z" />
            <path d="M156 256h88v90h-88z" />
            <path d="M176 280h48M176 296h48" opacity="0.5" />
            <path d="M80 346h240" opacity="0.6" />
          </g>
        )}
        {variant === "wave" && (
          <g stroke="#e2c58f" strokeWidth="1.4" fill="none" opacity="0.7">
            {Array.from({ length: 9 }).map((_, i) => (
              <path key={i} d={`M-20 ${150 + i * 14} C 80 ${90 + i * 22}, 160 ${230 - i * 10}, 240 ${170 + i * 6} S 380 ${110 + i * 18}, 440 ${160 + i * 10}`} opacity={1 - i * 0.09} />
            ))}
          </g>
        )}
        {variant === "rings" && (
          <g stroke="#e2c58f" fill="none" opacity="0.6">
            {[40, 80, 120, 160, 200, 240].map((r, i) => (
              <circle key={r} cx="320" cy="80" r={r} strokeWidth={1.4 - i * 0.15} />
            ))}
          </g>
        )}
      </svg>
      <div className="relative h-full">{children}</div>
    </div>
  );
}
