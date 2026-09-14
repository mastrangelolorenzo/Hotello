export const SETUP_STORAGE_KEY = "hotello:setup";

export type SetupData = Record<string, Record<string, unknown>>;

export function readSetupData(): SetupData | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(SETUP_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SetupData;
  } catch {
    return null;
  }
}

export function writeSetupData(data: SetupData) {
  window.localStorage.setItem(SETUP_STORAGE_KEY, JSON.stringify(data));
}

export function isSetupComplete(): boolean {
  return readSetupData() !== null;
}
