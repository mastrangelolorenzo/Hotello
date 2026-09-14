import { Translations } from "@/i18n";
import { CheckboxField, Field, Section, SelectField, TextAreaField } from "./FormField";

type Props = {
  t: Translations["setup"]["forms"]["policy"];
  common: Translations["setup"]["common"];
};

export default function PolicyForm({ t, common }: Props) {
  const { schedule, cancellation, other } = t;

  return (
    <div className="flex flex-col gap-10">
      <Section title={schedule.title}>
        <div className="flex gap-3 sm:col-span-2">
          <Field id="checkInFrom" label={`${schedule.checkIn} (${common.from})`} type="time" />
          <Field id="checkInTo" label={`${schedule.checkIn} (${common.to})`} type="time" />
        </div>
        <Field id="checkOutBy" label={schedule.checkOutBy} type="time" />
      </Section>

      <Section title={cancellation.title}>
        <SelectField
          id="cancellationPolicy"
          label={cancellation.cancellationPolicy}
          options={Object.entries(cancellation.cancellationOptions).map(([value, label]) => ({ value, label }))}
        />
        <Field id="freeCancellationDays" label={cancellation.freeCancellationDays} type="number" min={0} />
        <Field id="penaltyPercentage" label={cancellation.penaltyPercentage} type="number" min={0} max={100} />
        <CheckboxField id="depositRequired" label={cancellation.depositRequired} />
        <Field id="depositPercentage" label={cancellation.depositPercentage} type="number" min={0} max={100} />
      </Section>

      <Section title={other.title}>
        <CheckboxField id="petsAllowed" label={other.petsAllowed} />
        <CheckboxField id="smokingAllowed" label={other.smokingAllowed} />
        <Field id="minCheckInAge" label={other.minCheckInAge} type="number" min={0} />
        <div className="sm:col-span-2">
          <TextAreaField id="termsText" label={other.termsText} />
        </div>
      </Section>
    </div>
  );
}
