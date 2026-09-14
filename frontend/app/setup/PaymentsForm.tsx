import { Translations } from "@/i18n";
import { CheckboxField, Field, Section, SelectField } from "./FormField";

type Props = {
  t: Translations["setup"]["forms"]["payments"];
};

export default function PaymentsForm({ t }: Props) {
  return (
    <div className="flex flex-col gap-10">
      <p className="text-sm text-gray-500">{t.skipHint}</p>

      <SelectField
        id="paymentMode"
        label={t.mode}
        options={Object.entries(t.modeOptions).map(([value, label]) => ({ value, label }))}
      />

      <Section title={t.stripe.title}>
        <Field id="stripePublishableKey" label={t.stripe.publishableKey} />
        <Field id="stripeSecretKey" label={t.stripe.secretKey} type="password" />
        <Field id="stripeWebhookSecret" label={t.stripe.webhookSecret} type="password" />
      </Section>

      <Section title={t.bankTransfer.title}>
        <CheckboxField id="bankTransferAccepted" label={t.bankTransfer.accepted} />
        <Field id="iban" label={t.bankTransfer.iban} />
        <Field id="accountHolder" label={t.bankTransfer.accountHolder} />
      </Section>

      <CheckboxField id="payAtProperty" label={t.payAtProperty} />
    </div>
  );
}
