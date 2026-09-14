import { getTranslations } from "@/i18n";
import SetupWizard from "./SetupWizard";

export default function Setup() {
    const t = getTranslations();

    return (
        <div className="min-h-screen bg-gray-50">
          <main className="mx-auto max-w-2xl px-4 pt-20 pb-24">
            <SetupWizard t={t.setup} />
          </main>
        </div>
    );
}
