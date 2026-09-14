import { useRef, useState } from "react";
import { Translations } from "@/i18n";
import { Field, Section, SelectField } from "./FormField";

type Props = {
  t: Translations["setup"]["forms"]["adminAccount"];
};

export default function AdminAccountForm({ t }: Props) {
  const [password, setPassword] = useState("");
  const [mismatch, setMismatch] = useState(false);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  function applyMatchValidity(confirmValue: string, passwordValue: string) {
    const isMismatch = confirmValue.length > 0 && confirmValue !== passwordValue;
    confirmPasswordRef.current?.setCustomValidity(isMismatch ? t.passwordMismatch : "");
    setMismatch(isMismatch);
  }

  return (
    <Section title={t.title}>
      <Field id="firstName" label={t.firstName} required />
      <Field id="lastName" label={t.lastName} required />
      <div className="sm:col-span-2">
        <Field id="email" label={t.email} type="email" required />
      </div>
      <Field
        id="password"
        label={t.password}
        type="password"
        required
        minLength={8}
        onChange={(event) => {
          const value = event.target.value;
          setPassword(value);
          applyMatchValidity(confirmPasswordRef.current?.value ?? "", value);
        }}
      />
      <div className="flex flex-col gap-1.5">
        <Field
          id="confirmPassword"
          label={t.confirmPassword}
          type="password"
          required
          minLength={8}
          ref={confirmPasswordRef}
          onChange={(event) => applyMatchValidity(event.target.value, password)}
        />
        {mismatch && <p className="text-sm text-red-600">{t.passwordMismatch}</p>}
      </div>
      <SelectField
        id="interfaceLanguage"
        label={t.interfaceLanguage}
        options={Object.entries(t.interfaceLanguageOptions).map(([value, label]) => ({ value, label }))}
      />
      <Field id="timezone" label={t.timezone} defaultValue="Europe/Rome" />
    </Section>
  );
}
