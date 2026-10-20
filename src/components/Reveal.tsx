import type { ElementType, ReactNode } from "react";

/**
 * Fades/slides children in when they enter the viewport.
 * Server component: the observer lives in `revealScript` (inlined in the layout), so content
 * never depends on hydration and stays fully visible without JavaScript.
 */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
}) {
  return (
    <Tag suppressHydrationWarning className={`reveal ${className}`} style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}>
      {children}
    </Tag>
  );
}

/** Inline script: marks <html> as JS-enabled and reveals `.reveal` elements as they scroll in
 *  (including ones added later by client-side navigation). */
export const revealScript = `(function(){var d=document.documentElement;d.classList.add('js');
if(!('IntersectionObserver' in window)){d.classList.remove('js');return;}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target);}});},{threshold:0.12,rootMargin:'0px 0px -40px 0px'});
function scan(){document.querySelectorAll('.reveal:not(.is-visible)').forEach(function(el){io.observe(el);});}
document.addEventListener('DOMContentLoaded',function(){scan();new MutationObserver(scan).observe(document.body,{childList:true,subtree:true});});})();`;
