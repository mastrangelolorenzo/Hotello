import { Translations } from "@/i18n";
import AddressMapPicker from "./AddressMapPicker";
import { Field, Section, SelectField, TextAreaField } from "./FormField";

type Props = {
  t: Translations["setup"]["forms"]["property"];
};

export default function PropertyForm({ t }: Props) {
  const { identity, location, contacts } = t;

  return (
    <div className="flex flex-col gap-10">
      <Section title={identity.title}>
        <Field id="commercialName" label={identity.commercialName} required />
        <SelectField
          id="type"
          label={identity.type}
          required
          options={Object.entries(identity.typeOptions).map(([value, label]) => ({ value, label }))}
        />
        <Field id="starRating" label={identity.starRating} type="number" min={1} max={5} />
        <div className="sm:col-span-2">
          <TextAreaField id="shortDescription" label={identity.shortDescription} maxLength={160} required />
        </div>
        <div className="sm:col-span-2">
          <TextAreaField id="longDescription" label={identity.longDescription} rows={5} />
        </div>
      </Section>

      <div className="flex flex-col gap-4">
        <h2 className="text-base font-semibold text-gray-900">{location.title}</h2>
        <AddressMapPicker
          label={location.address}
          confirmLabel={location.confirmAddress}
          editLabel={location.editAddress}
          confirmedLabel={location.addressConfirmed}
          missingKeyLabel={location.missingApiKey}
          confirmRequiredMessage={location.confirmRequiredMessage}
        />
      </div>

      <Section title={contacts.title}>
        <Field id="phone" label={contacts.phone} type="tel" />
        <Field id="publicEmail" label={contacts.publicEmail} type="email" />
        <div className="sm:col-span-2">
          <Field id="existingWebsite" label={contacts.existingWebsite} type="url" />
        </div>
      </Section>
    </div>
  );
}
