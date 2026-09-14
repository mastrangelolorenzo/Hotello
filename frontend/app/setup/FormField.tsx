import { InputHTMLAttributes, ReactNode, Ref, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const inputClasses =
  "text-black rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200";

type FieldProps = { id: string; label: string; ref?: Ref<HTMLInputElement> } & InputHTMLAttributes<HTMLInputElement>;

export function Field({ id, label, className, ref, ...rest }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input ref={ref} id={id} name={id} className={`${inputClasses} ${className ?? ""}`} {...rest} />
    </div>
  );
}

type TextAreaFieldProps = { id: string; label: string } & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextAreaField({ id, label, className, ...rest }: TextAreaFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea id={id} name={id} rows={3} className={`${inputClasses} ${className ?? ""}`} {...rest} />
    </div>
  );
}

type SelectFieldProps = {
  id: string;
  label: string;
  options: { value: string; label: string }[];
} & SelectHTMLAttributes<HTMLSelectElement>;

export function SelectField({ id, label, options, className, ...rest }: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <select id={id} name={id} className={`${inputClasses} ${className ?? ""}`} {...rest}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

type CheckboxFieldProps = { id: string; label: string } & InputHTMLAttributes<HTMLInputElement>;

export function CheckboxField({ id, label, className, ...rest }: CheckboxFieldProps) {
  return (
    <label htmlFor={id} className="flex items-center gap-2 text-sm font-medium text-gray-700">
      <input
        id={id}
        name={id}
        type="checkbox"
        className={`w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-200 ${className ?? ""}`}
        {...rest}
      />
      {label}
    </label>
  );
}

export function CheckboxGroupField({
  legend,
  options,
  selected,
  onToggle,
}: {
  legend: string;
  options: { value: string; label: string }[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-gray-700">{legend}</span>
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {options.map((option) => (
          <label key={option.value} className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={selected.includes(option.value)}
              onChange={() => onToggle(option.value)}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-200"
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-base font-semibold text-gray-900">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}
