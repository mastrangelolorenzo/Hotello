import { Translations } from "@/i18n";
import { CheckboxField, Field, Section, TextAreaField } from "./FormField";

type Props = {
  t: Translations["setup"]["forms"]["email"];
};

export default function EmailForm({ t }: Props) {
  return (
    <div className="flex flex-col gap-10">
      <Section title={t.smtp.title}>
        <Field id="smtpHost" label={t.smtp.host} defaultValue="mailpit" />
        <Field id="smtpPort" label={t.smtp.port} type="number" defaultValue={1025} />
        <Field id="smtpUser" label={t.smtp.user} />
        <Field id="smtpPassword" label={t.smtp.password} type="password" />
        <CheckboxField id="smtpTls" label={t.smtp.tls} />
      </Section>

      <Section title={t.sender.title}>
        <Field id="senderAddress" label={t.sender.address} type="email" />
        <Field id="senderName" label={t.sender.name} />
        <div className="sm:col-span-2">
          <Field id="internalNotificationsEmail" label={t.sender.internalNotificationsEmail} type="email" />
        </div>
      </Section>

      <TextAreaField id="signature" label={t.signature} />
    </div>
  );
}
