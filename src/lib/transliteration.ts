// Utilities for Indic script transliteration
// Keeps logic separate from UI so Transliterator.tsx stays lean

import * as Sanscript from "sanscript";

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

  // Try fast, offline transliteration via Sanscript
  try {
    const sFrom = fromKey === "odia" ? "oriya" : fromKey;
    const sTo = toKey === "odia" ? "oriya" : toKey;
    // @ts-ignore - types may not be available for the package
    const result = (Sanscript as any).t(text, sFrom, sTo);
    if (result) return result;
  } catch (e) {
    // If local transliteration fails, fall back to API
  }

  // Fallback: Aksharamukha HTTP API (may be blocked by CORS)
  const from = mapToAksharamukhaScript(fromKey);
  const to = mapToAksharamukhaScript(toKey);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  const url = `${AKSHARAMUKHA_ENDPOINT}?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&text=${encodeURIComponent(text)}`;

  try {
    const res = await fetch(url, { method: "GET", headers: { Accept: "text/plain, */*" }, signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) throw new Error(`API error (${res.status})`);
    const body = await res.text();
    if (!body) throw new Error("Empty response from transliteration API");
    return body;
  } catch (e2) {
    clearTimeout(timeout);
    throw new Error("Transliteration failed. Try a different script pair or try again later.");
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
