// Utilities for Indic script transliteration
// Keeps logic separate from UI so Transliterator.tsx stays lean

const AKSHARAMUKHA_ENDPOINT = "https://aksharamukha.appspot.com/api/convert";

// Map our internal script keys to Aksharamukha script names
const scriptNameMap: Record<string, string> = {
  devanagari: "Devanagari",
  gurmukhi: "Gurmukhi",
  malayalam: "Malayalam",
  telugu: "Telugu",
  tamil: "Tamil",
  bengali: "Bengali",
  gujarati: "Gujarati",
  kannada: "Kannada",
  odia: "Oriya", // Aksharamukha uses 'Oriya'
  assamese: "Assamese",
};

export function mapToAksharamukhaScript(key: string): string {
  return scriptNameMap[key] ?? key;
}

export async function transliterateText(
  fromKey: string,
  toKey: string,
  text: string,
): Promise<string> {
  if (!text?.trim()) return "";
  if (fromKey === toKey) return text;

  const from = mapToAksharamukhaScript(fromKey);
  const to = mapToAksharamukhaScript(toKey);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  const attempt = async (payloadKey: "text" | "data") => {
    const url = `${AKSHARAMUKHA_ENDPOINT}?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&${payloadKey}=${encodeURIComponent(
      text,
    )}`;
    const res = await fetch(url, {
      method: "GET",
      headers: { Accept: "text/plain, */*" },
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`API error (${res.status})`);
    const body = await res.text();
    if (!body) throw new Error("Empty response from transliteration API");
    return body;
  };

  try {
    const result = await attempt("text");
    clearTimeout(timeout);
    return result;
  } catch (e1) {
    try {
      const result = await attempt("data");
      clearTimeout(timeout);
      return result;
    } catch (e2) {
      clearTimeout(timeout);
      const reason = (e2 as Error)?.message || (e1 as Error)?.message || "Unknown error";
      throw new Error(`Transliteration service unavailable. ${reason}`);
    }
  }
}

// Map script keys to BCP-47 language tags for speech synthesis
const speechLangMap: Record<string, string> = {
  devanagari: "hi-IN", // Hindi
  gurmukhi: "pa-IN", // Punjabi
  bengali: "bn-IN",
  gujarati: "gu-IN",
  kannada: "kn-IN",
  malayalam: "ml-IN",
  tamil: "ta-IN",
  telugu: "te-IN",
  odia: "or-IN",
  assamese: "as-IN", // may not be available on all devices
};

export function getSpeechLangForScript(key: string): string {
  return speechLangMap[key] ?? "hi-IN";
}
