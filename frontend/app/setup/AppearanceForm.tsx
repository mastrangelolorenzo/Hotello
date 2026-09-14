import { useState } from "react";
import { Translations } from "@/i18n";
import { CheckboxGroupField, Field, Section, TextAreaField } from "./FormField";

type Props = {
  t: Translations["setup"]["forms"]["appearance"];
};

export default function AppearanceForm({ t }: Props) {
  const [activeLanguages, setActiveLanguages] = useState<string[]>(["it"]);

  function toggleLanguage(value: string) {
    setActiveLanguages((prev) =>
      prev.includes(value) ? prev.filter((lang) => lang !== value) : [...prev, value]
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <Section title={t.branding.title}>
        <Field id="logo" label={t.branding.logo} type="file" accept="image/*" />
        <Field id="favicon" label={t.branding.favicon} type="file" accept="image/*" />
        <div className="sm:col-span-2">
          <Field id="heroImage" label={t.branding.heroImage} type="file" accept="image/*" />
        </div>
        <Field id="primaryColor" label={t.branding.primaryColor} type="color" defaultValue="#2563eb" />
        <Field id="secondaryColor" label={t.branding.secondaryColor} type="color" defaultValue="#1e293b" />
      </Section>

      <Section title={t.hero.title}>
        <Field id="heroTitle" label={t.hero.heroTitle} />
        <Field id="heroSubtitle" label={t.hero.heroSubtitle} />
      </Section>

      <div className="flex flex-col gap-4">
        <h2 className="text-base font-semibold text-gray-900">{t.languages.title}</h2>
        <CheckboxGroupField
          legend={t.languages.activeLanguages}
          options={Object.entries(t.languages.options).map(([value, label]) => ({ value, label }))}
          selected={activeLanguages}
          onToggle={toggleLanguage}
        />
        {activeLanguages.map((lang) => (
          <input key={lang} type="hidden" name="activeLanguages" value={lang} readOnly />
        ))}
      </div>

      <Section title={t.social.title}>
        <Field id="facebook" label={t.social.facebook} type="url" />
        <Field id="instagram" label={t.social.instagram} type="url" />
        <Field id="twitter" label={t.social.twitter} type="url" />
      </Section>

      <Section title={t.other.title}>
        <Field id="analyticsCode" label={t.other.analyticsCode} />
        <div className="sm:col-span-2">
          <TextAreaField id="cookieBannerText" label={t.other.cookieBannerText} />
        </div>
      </Section>
    </div>
  );
}
