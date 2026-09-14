"use client";

import { FormEvent, useState } from "react";
import { Translations } from "@/i18n";
import { Field } from "./FormField";

type Props = {
  t: Translations["setup"]["unlock"];
  onUnlock: () => void;
};

export default function UnlockGate({ t, onUnlock }: Props) {
  const [token, setToken] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (token.trim().length > 0) {
      onUnlock();
    }
  }

  return (
    <div className="flex flex-col items-center gap-3 py-24 text-center">
      <h1 className="text-[28px] font-bold tracking-tight text-gray-900">{t.title}</h1>
      <p className="max-w-md text-gray-600">{t.description}</p>
      <form onSubmit={handleSubmit} className="mt-6 flex w-full max-w-sm flex-col gap-4">
        <Field
          id="unlockToken"
          label={t.tokenLabel}
          value={token}
          onChange={(event) => setToken(event.target.value)}
        />
        <button
          type="submit"
          disabled={token.trim().length === 0}
          className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-700"
        >
          {t.continueButton}
        </button>
      </form>
    </div>
  );
}
