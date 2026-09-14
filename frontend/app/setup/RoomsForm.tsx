import { useEffect, useRef, useState } from "react";
import { Translations } from "@/i18n";
import { CheckboxField, CheckboxGroupField, Field, SelectField, TextAreaField } from "./FormField";

export type RoomTypeSummary = { id: string; name: string };

export type RoomTypeDetail = RoomTypeSummary & {
  description: string;
  standardOccupancy: string;
  maxOccupancy: string;
  bedCount: string;
  surfaceSqm: string;
  amenities: string[];
};

export type RoomUnit = {
  id: string;
  numberOrName: string;
  floor: string;
  typeId: string;
  internalNotes: string;
  active: boolean;
};

type Props = {
  t: Translations["setup"]["forms"]["rooms"];
  roomTypes: RoomTypeSummary[];
  onRoomTypesChange: (types: RoomTypeSummary[]) => void;
  onDetailsChange?: (details: { types: RoomTypeDetail[]; units: RoomUnit[] }) => void;
  showEmptyTypesError?: boolean;
};

export default function RoomsForm({ t, roomTypes, onRoomTypesChange, onDetailsChange, showEmptyTypesError }: Props) {
  const [types, setTypes] = useState<RoomTypeDetail[]>(
    roomTypes.map((type) => ({
      ...type,
      description: "",
      standardOccupancy: "",
      maxOccupancy: "",
      bedCount: "",
      surfaceSqm: "",
      amenities: [],
    }))
  );
  const [units, setUnits] = useState<RoomUnit[]>([]);

  const onDetailsChangeRef = useRef(onDetailsChange);
  useEffect(() => {
    onDetailsChangeRef.current = onDetailsChange;
  });

  useEffect(() => {
    onDetailsChangeRef.current?.({ types, units });
  }, [types, units]);

  function publishTypes(next: RoomTypeDetail[]) {
    setTypes(next);
    onRoomTypesChange(next.map(({ id, name }) => ({ id, name })));
  }

  function addType() {
    publishTypes([
      ...types,
      {
        id: crypto.randomUUID(),
        name: "",
        description: "",
        standardOccupancy: "",
        maxOccupancy: "",
        bedCount: "",
        surfaceSqm: "",
        amenities: [],
      },
    ]);
  }

  function updateType(id: string, patch: Partial<RoomTypeDetail>) {
    publishTypes(types.map((type) => (type.id === id ? { ...type, ...patch } : type)));
  }

  function removeType(id: string) {
    publishTypes(types.filter((type) => type.id !== id));
    setUnits((prev) => prev.filter((unit) => unit.typeId !== id));
  }

  function toggleAmenity(id: string, amenity: string) {
    const type = types.find((current) => current.id === id);
    if (!type) return;
    const amenities = type.amenities.includes(amenity)
      ? type.amenities.filter((current) => current !== amenity)
      : [...type.amenities, amenity];
    updateType(id, { amenities });
  }

  function addUnit() {
    setUnits((prev) => [
      ...prev,
      { id: crypto.randomUUID(), numberOrName: "", floor: "", typeId: "", internalNotes: "", active: true },
    ]);
  }

  function updateUnit(id: string, patch: Partial<RoomUnit>) {
    setUnits((prev) => prev.map((unit) => (unit.id === id ? { ...unit, ...patch } : unit)));
  }

  function removeUnit(id: string) {
    setUnits((prev) => prev.filter((unit) => unit.id !== id));
  }

  const amenityOptions = Object.entries(t.types.amenityOptions).map(([value, label]) => ({ value, label }));

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">{t.types.title}</h2>
          <button
            type="button"
            onClick={addType}
            className="rounded-lg border border-blue-600 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50"
          >
            {t.types.addButton}
          </button>
        </div>

        {types.length === 0 && (
          <p className={`text-sm ${showEmptyTypesError ? "text-red-600" : "text-gray-500"}`}>{t.types.emptyHint}</p>
        )}

        {types.map((type) => (
          <div key={type.id} className="flex items-start justify-between gap-4 rounded-lg border border-gray-200 p-4">
            <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
              <Field id={`type-name-${type.id}`} label={t.types.name} value={type.name} onChange={(e) => updateType(type.id, { name: e.target.value })} />
              <Field id={`type-surface-${type.id}`} label={t.types.surfaceSqm} type="number" min={0} value={type.surfaceSqm} onChange={(e) => updateType(type.id, { surfaceSqm: e.target.value })} />
              <Field id={`type-standard-${type.id}`} label={t.types.standardOccupancy} type="number" min={1} value={type.standardOccupancy} onChange={(e) => updateType(type.id, { standardOccupancy: e.target.value })} />
              <Field id={`type-max-${type.id}`} label={t.types.maxOccupancy} type="number" min={1} value={type.maxOccupancy} onChange={(e) => updateType(type.id, { maxOccupancy: e.target.value })} />
              <Field id={`type-beds-${type.id}`} label={t.types.bedCount} type="number" min={1} value={type.bedCount} onChange={(e) => updateType(type.id, { bedCount: e.target.value })} />
              <div className="sm:col-span-2">
                <TextAreaField id={`type-desc-${type.id}`} label={t.types.description} value={type.description} onChange={(e) => updateType(type.id, { description: e.target.value })} />
              </div>
              <div className="sm:col-span-2">
                <CheckboxGroupField
                  legend={t.types.amenities}
                  options={amenityOptions}
                  selected={type.amenities}
                  onToggle={(value) => toggleAmenity(type.id, value)}
                />
              </div>
              <div className="sm:col-span-2">
                <Field id={`type-photos-${type.id}`} label={t.types.photos} type="file" accept="image/*" multiple />
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeType(type.id)}
              className="shrink-0 text-sm font-medium text-red-600 hover:text-red-700"
            >
              {t.types.removeButton}
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">{t.units.title}</h2>
          <button
            type="button"
            onClick={addUnit}
            className="rounded-lg border border-blue-600 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50"
          >
            {t.units.addButton}
          </button>
        </div>

        {units.length === 0 && <p className="text-sm text-gray-500">{t.units.emptyHint}</p>}

        {units.map((unit) => (
          <div key={unit.id} className="flex items-start justify-between gap-4 rounded-lg border border-gray-200 p-4">
            <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
              <Field id={`unit-number-${unit.id}`} label={t.units.numberOrName} value={unit.numberOrName} onChange={(e) => updateUnit(unit.id, { numberOrName: e.target.value })} />
              <Field id={`unit-floor-${unit.id}`} label={t.units.floor} value={unit.floor} onChange={(e) => updateUnit(unit.id, { floor: e.target.value })} />
              <SelectField
                id={`unit-type-${unit.id}`}
                label={t.units.roomType}
                value={unit.typeId}
                onChange={(e) => updateUnit(unit.id, { typeId: e.target.value })}
                options={[
                  { value: "", label: t.units.selectTypePlaceholder },
                  ...types.map((type) => ({ value: type.id, label: type.name || t.units.selectTypePlaceholder })),
                ]}
              />
              <div className="flex items-end">
                <CheckboxField id={`unit-active-${unit.id}`} label={t.units.active} checked={unit.active} onChange={(e) => updateUnit(unit.id, { active: e.target.checked })} />
              </div>
              <div className="sm:col-span-2">
                <TextAreaField id={`unit-notes-${unit.id}`} label={t.units.internalNotes} value={unit.internalNotes} onChange={(e) => updateUnit(unit.id, { internalNotes: e.target.value })} />
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeUnit(unit.id)}
              className="shrink-0 text-sm font-medium text-red-600 hover:text-red-700"
            >
              {t.units.removeButton}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
