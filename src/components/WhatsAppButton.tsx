import { site } from "@/content/site";
import { WhatsAppIcon } from "./Icons";

/** Floating WhatsApp shortcut — renders only once `site.contact.whatsapp` is set. */
export default function WhatsAppButton() {
  if (!site.contact.whatsapp) return null;
  const text = encodeURIComponent(`Hi ${site.shortName}, I'd like to know more about your coaching programs.`);
  return (
    <a
      href={`https://wa.me/${site.contact.whatsapp}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/15 transition-transform hover:scale-110"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
