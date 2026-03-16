export function normalizeIndianDateTime(value) {
  if (!value || value === "NULL") return null;

  const trimmed = String(value).trim();
  if (!trimmed) return null;

  let normalized = trimmed;

  if (normalized.includes(" ") && !normalized.includes("T")) {
    normalized = normalized.replace(" ", "T");
  }

  if (!normalized.endsWith("Z") && !/[+-]\d{2}:\d{2}$/.test(normalized)) {
    normalized += "+05:30";
  }

  return normalized;
}

export function parseIndianDateTime(value) {
  const normalized = normalizeIndianDateTime(value);
  if (!normalized) return null;

  const parsed = new Date(normalized);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function formatIndianDateTime(value) {
  const parsed = parseIndianDateTime(value);
  if (!parsed) return "N/A";

  return parsed.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export function formatIndianDate(value) {
  const parsed = parseIndianDateTime(value);
  if (!parsed) return "N/A";

  return parsed.toLocaleDateString("en-GB", {
    timeZone: "Asia/Kolkata",
  });
}

export function formatIndianTime(value) {
  const parsed = parseIndianDateTime(value);
  if (!parsed) return null;

  return parsed.toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}
