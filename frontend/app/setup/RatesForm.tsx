import { Translations } from "@/i18n";
import { CheckboxField, Field } from "./FormField";

type Props = {
  t: Translations["setup"]["forms"]["rates"];
  roomTypes: { id: string; name: string }[];
};

export default function RatesForm({ t, roomTypes }: Props) {
  if (roomTypes.length === 0) {
    return <p className="text-sm text-gray-500">{t.noRoomTypesHint}</p>;
  }

  return (
    <div className="flex flex-col gap-8">
      {roomTypes.map((type) => (
        <div key={type.id} className="flex flex-col gap-4 rounded-lg border border-gray-200 p-4">
          <h2 className="text-base font-semibold text-gray-900">{type.name || t.title}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field id={`rate-base-${type.id}`} label={t.basePrice} type="number" min={0} step="0.01" required />
            <Field id={`rate-currency-${type.id}`} label={t.currency} defaultValue="EUR" />
            <Field id={`rate-extra-${type.id}`} label={t.extraGuestPrice} type="number" min={0} step="0.01" />
            <Field id={`rate-minstay-${type.id}`} label={t.minStayNights} type="number" min={1} />
            <CheckboxField id={`rate-breakfast-${type.id}`} label={t.breakfastIncluded} />
            <Field id={`rate-breakfast-price-${type.id}`} label={t.breakfastPrice} type="number" min={0} step="0.01" />
          </div>
        </div>
      ))}
    </div>
  );
}
