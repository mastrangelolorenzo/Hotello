import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserShield,
  faHotel,
  faFileInvoiceDollar,
  faBed,
  faTags,
  faClipboardList,
  faCreditCard,
  faEnvelope,
  faPalette,
  faFlagCheckered,
} from "@fortawesome/free-solid-svg-icons";
import { Fragment } from "react";

export type StepIndicatorLabels = {
  adminAccount: string;
  property: string;
  fiscalData: string;
  rooms: string;
  rates: string;
  policy: string;
  payments: string;
  email: string;
  appearance: string;
  closing: string;
};

export const STEP_KEYS = [
  "adminAccount",
  "property",
  "fiscalData",
  "rooms",
  "rates",
  "policy",
  "payments",
  "email",
  "appearance",
  "closing",
] as const;

const STEP_ICONS = {
  adminAccount: faUserShield,
  property: faHotel,
  fiscalData: faFileInvoiceDollar,
  rooms: faBed,
  rates: faTags,
  policy: faClipboardList,
  payments: faCreditCard,
  email: faEnvelope,
  appearance: faPalette,
  closing: faFlagCheckered,
};

export default function StepIndicator({
  labels,
  currentStep,
}: {
  labels: StepIndicatorLabels;
  currentStep: number;
}) {
  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex items-start min-w-max">
        {STEP_KEYS.map((key, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <Fragment key={key}>
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`flex items-center justify-center w-14 h-14 rounded-full border-2 shrink-0 text-lg ${
                    isActive
                      ? "border-blue-600 bg-blue-600 text-white"
                      : isCompleted
                        ? "border-blue-600 bg-white text-blue-600"
                        : "border-gray-300 bg-white text-gray-400"
                  }`}
                >
                  <FontAwesomeIcon icon={STEP_ICONS[key]} className="w-6 h-6" />
                </div>
                <span
                  className={`text-xs leading-tight text-center w-20 ${
                    isActive || isCompleted ? "text-blue-600 font-medium" : "text-gray-500"
                  }`}
                >
                  {labels[key]}
                </span>
              </div>
              {index < STEP_KEYS.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mt-7 min-w-8 ${
                    index < currentStep ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
