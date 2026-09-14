import { Translations } from "@/i18n";
import { CheckboxField, Field, Section, TextAreaField } from "./FormField";

type Props = {
  t: Translations["setup"]["forms"]["fiscalData"];
};

export default function FiscalDataForm({ t }: Props) {
  const { fiscal, identifiers, alloggiatiWeb, touristTax } = t;

  return (
    <div className="flex flex-col gap-10">
      <Section title={fiscal.title}>
        <Field id="companyName" label={fiscal.companyName} required />
        <Field id="vatNumber" label={fiscal.vatNumber} required />
        <Field id="taxCode" label={fiscal.taxCode} required />
        <Field id="legalAddress" label={fiscal.legalAddress} />
        <Field id="vatRegime" label={fiscal.vatRegime} />
        <Field id="accommodationVatRate" label={fiscal.accommodationVatRate} />
        <div className="sm:col-span-2">
          <Field id="sdiOrPec" label={fiscal.sdiOrPec} />
        </div>
      </Section>

      <Section title={identifiers.title}>
        <Field id="cin" label={identifiers.cin} />
        <Field id="cir" label={identifiers.cir} />
        <Field id="istatCode" label={identifiers.istatCode} />
      </Section>
      <p className="text-sm text-gray-500">{identifiers.note}</p>

      <Section title={alloggiatiWeb.title}>
        <Field id="alloggiatiUsername" label={alloggiatiWeb.username} />
        <Field id="alloggiatiPassword" label={alloggiatiWeb.password} type="password" />
        <Field id="alloggiatiWsKey" label={alloggiatiWeb.wsKey} type="password" />
      </Section>

      <Section title={touristTax.title}>
        <CheckboxField id="touristTaxActive" label={touristTax.active} />
        <Field id="touristTaxAmount" label={touristTax.amountPerPersonPerNight} type="number" min={0} step="0.01" />
        <Field id="touristTaxMaxNights" label={touristTax.maxTaxableNights} type="number" min={0} />
        <Field id="touristTaxExemptionAge" label={touristTax.exemptionAgeUnder} type="number" min={0} />
        <div className="sm:col-span-2">
          <TextAreaField id="touristTaxExemptions" label={touristTax.exemptions} />
        </div>
      </Section>
    </div>
  );
}
