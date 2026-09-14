import { Translations } from "@/i18n";
import { CheckboxField } from "./FormField";

type Props = {
  t: Translations["setup"]["forms"]["closing"];
};

export default function ClosingForm({ t }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-base font-semibold text-gray-900">{t.summaryTitle}</h2>
      <p className="text-sm text-gray-500">{t.summaryHint}</p>
      <CheckboxField id="seedDemoData" label={t.demoDataCheckbox} />
    </div>
  );
}
