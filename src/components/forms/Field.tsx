import { createContext, useContext, type ReactNode } from "react";

/** Prefixes field ids so several forms can share field names on one page. */
export const FormIdContext = createContext("form");
const useFieldId = (name: string) => `${useContext(FormIdContext)}-${name}`;

const control =
  "w-full rounded-xl border bg-white/70 px-4 py-3 lg:py-2.5 short:py-2 text-ink placeholder:text-muted/60 transition-colors focus:border-plum-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-plum-300/50";

type Common = { name: string; label: string; error?: string; required?: boolean; className?: string };

function Wrapper({ name, label, error, required, className = "", children }: Common & { children: ReactNode }) {
  const id = useFieldId(name);
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-plum-900 lg:mb-1.5">
        {label}
        {required && <span className="ml-0.5 text-gold-700" aria-hidden>*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

function useA11y(name: string, error?: string, required?: boolean) {
  const id = useFieldId(name);
  return {
    id,
    name,
    required,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
  };
}

export function TextField({
  type = "text",
  placeholder,
  autoComplete,
  ...c
}: Common & { type?: string; placeholder?: string; autoComplete?: string }) {
  const a11yProps = useA11y(c.name, c.error, c.required);
  return (
    <Wrapper {...c}>
      <input
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...a11yProps}
        className={`${control} ${c.error ? "border-red-400" : "border-plum-700/15"}`}
      />
    </Wrapper>
  );
}

export function SelectField({
  options,
  value,
  onChange,
  placeholder = "Select…",
  ...c
}: Common & { options: readonly string[]; value?: string; onChange?: (v: string) => void; placeholder?: string }) {
  const a11yProps = useA11y(c.name, c.error, c.required);
  const controlled = value !== undefined ? { value, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => onChange?.(e.target.value) } : { defaultValue: "" };
  return (
    <Wrapper {...c}>
      <div className="relative">
        <select {...controlled} {...a11yProps} className={`${control} appearance-none pr-10 ${c.error ? "border-red-400" : "border-plum-700/15"}`}>
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <svg aria-hidden viewBox="0 0 20 20" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-plum-700">
          <path d="m5 8 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </div>
    </Wrapper>
  );
}

export function TextArea({ placeholder, rows = 4, ...c }: Common & { placeholder?: string; rows?: number }) {
  const a11yProps = useA11y(c.name, c.error, c.required);
  return (
    <Wrapper {...c}>
      <textarea
        rows={rows}
        placeholder={placeholder}
        {...a11yProps}
        className={`${control} resize-y ${c.error ? "border-red-400" : "border-plum-700/15"}`}
      />
    </Wrapper>
  );
}
