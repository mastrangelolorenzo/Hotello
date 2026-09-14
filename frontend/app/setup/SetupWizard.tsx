"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Translations } from "@/i18n";
import { isSetupComplete, writeSetupData, SetupData } from "@/lib/setupStorage";
import StepIndicator, { STEP_KEYS } from "./StepIndicator";
import UnlockGate from "./UnlockGate";
import AdminAccountForm from "./AdminAccountForm";
import PropertyForm from "./PropertyForm";
import FiscalDataForm from "./FiscalDataForm";
import RoomsForm, { RoomTypeDetail, RoomTypeSummary, RoomUnit } from "./RoomsForm";
import RatesForm from "./RatesForm";
import PolicyForm from "./PolicyForm";
import PaymentsForm from "./PaymentsForm";
import EmailForm from "./EmailForm";
import AppearanceForm from "./AppearanceForm";
import ClosingForm from "./ClosingForm";

const SKIPPABLE_STEPS = new Set<(typeof STEP_KEYS)[number]>(["policy", "payments", "email", "appearance"]);
const MANDATORY_STEPS = new Set<(typeof STEP_KEYS)[number]>([
  "adminAccount",
  "property",
  "fiscalData",
  "rooms",
  "rates",
]);

function captureFormData(form: HTMLFormElement | null): Record<string, unknown> {
  if (!form) return {};
  const data: Record<string, unknown> = {};

  for (const [key, value] of new FormData(form).entries()) {
    const entry = value instanceof File ? value.name : value;
    if (key in data) {
      const existing = data[key];
      data[key] = Array.isArray(existing) ? [...existing, entry] : [existing, entry];
    } else {
      data[key] = entry;
    }
  }

  form.querySelectorAll('input[type="checkbox"]').forEach((element) => {
    const checkbox = element as HTMLInputElement;
    if (checkbox.name) data[checkbox.name] = checkbox.checked;
  });

  return data;
}

export default function SetupWizard({ t }: { t: Translations["setup"] }) {
  const router = useRouter();
  const [alreadyComplete] = useState(() => isSetupComplete());
  const [unlocked, setUnlocked] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [roomTypes, setRoomTypes] = useState<RoomTypeSummary[]>([]);
  const [showRoomsError, setShowRoomsError] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const wizardDataRef = useRef<SetupData>({});
  const roomsDetailsRef = useRef<{ types: RoomTypeDetail[]; units: RoomUnit[] }>({ types: [], units: [] });

  useEffect(() => {
    if (alreadyComplete) router.replace("/");
  }, [alreadyComplete, router]);

  if (alreadyComplete) return null;

  if (!unlocked) {
    return <UnlockGate t={t.unlock} onUnlock={() => setUnlocked(true)} />;
  }

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === STEP_KEYS.length - 1;
  const stepKey = STEP_KEYS[currentStep];
  const isSkippable = SKIPPABLE_STEPS.has(stepKey);

  function captureCurrentStep() {
    if (stepKey === "rooms") return;
    wizardDataRef.current = { ...wizardDataRef.current, [stepKey]: captureFormData(formRef.current) };
  }

  function goToPrevious() {
    captureCurrentStep();
    setCurrentStep((step) => Math.max(0, step - 1));
  }

  function goToNext() {
    captureCurrentStep();
    setCurrentStep((step) => Math.min(STEP_KEYS.length - 1, step + 1));
  }

  function handleRoomTypesChange(types: RoomTypeSummary[]) {
    setRoomTypes(types);
    if (types.length > 0) setShowRoomsError(false);
  }

  function handleNext() {
    if (MANDATORY_STEPS.has(stepKey)) {
      if (!formRef.current?.reportValidity()) return;
      if (stepKey === "rooms" && roomTypes.length === 0) {
        setShowRoomsError(true);
        return;
      }
    }
    setShowRoomsError(false);
    goToNext();
  }

  function handleFinish() {
    const finalData: SetupData = {
      ...wizardDataRef.current,
      closing: captureFormData(formRef.current),
      rooms: roomsDetailsRef.current as unknown as Record<string, unknown>,
    };
    writeSetupData(finalData);
    router.push("/");
  }

  return (
    <>
      <p className="text-sm font-medium uppercase tracking-wide text-blue-600">{t.welcome}</p>

      <div className="mt-4">
        <StepIndicator labels={t.steps} currentStep={currentStep} />
      </div>

      <h1 className="mt-10 text-[34px] leading-tight font-bold tracking-tight text-gray-900">
        {t.steps[stepKey]}
      </h1>

      {isSkippable && (
        <p className="mt-3 rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-600">{t.skippableNotice}</p>
      )}

      <form ref={formRef} className="mt-8">
        {stepKey === "adminAccount" && <AdminAccountForm t={t.forms.adminAccount} />}
        {stepKey === "property" && <PropertyForm t={t.forms.property} />}
        {stepKey === "fiscalData" && <FiscalDataForm t={t.forms.fiscalData} />}
        {stepKey === "rooms" && (
          <RoomsForm
            t={t.forms.rooms}
            roomTypes={roomTypes}
            onRoomTypesChange={handleRoomTypesChange}
            onDetailsChange={(details) => {
              roomsDetailsRef.current = details;
            }}
            showEmptyTypesError={showRoomsError}
          />
        )}
        {stepKey === "rates" && <RatesForm t={t.forms.rates} roomTypes={roomTypes} />}
        {stepKey === "policy" && <PolicyForm t={t.forms.policy} common={t.common} />}
        {stepKey === "payments" && <PaymentsForm t={t.forms.payments} />}
        {stepKey === "email" && <EmailForm t={t.forms.email} />}
        {stepKey === "appearance" && <AppearanceForm t={t.forms.appearance} />}
        {stepKey === "closing" && <ClosingForm t={t.forms.closing} />}
      </form>

      <div className="mt-10 flex items-center justify-between">
        <button
          type="button"
          onClick={goToPrevious}
          disabled={isFirstStep}
          className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
        >
          {t.nav.previous}
        </button>

        <div className="flex gap-3">
          {isSkippable && !isLastStep && (
            <button
              type="button"
              onClick={goToNext}
              className="rounded-lg px-5 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              {t.nav.skip}
            </button>
          )}
          <button
            type="button"
            onClick={isLastStep ? handleFinish : handleNext}
            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            {isLastStep ? t.forms.closing.finishButton : t.nav.next}
          </button>
        </div>
      </div>
    </>
  );
}
