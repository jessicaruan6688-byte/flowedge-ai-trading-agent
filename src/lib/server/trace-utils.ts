import { createHash } from "node:crypto";

export function hashJson(value: unknown) {
  return `0x${createHash("sha256").update(stableStringify(value)).digest("hex")}`;
}

export function redactSensitive(value: unknown, secrets: Array<string | undefined>) {
  const secretValues = secrets.filter((secret): secret is string => Boolean(secret));
  let text = value instanceof Error ? value.message : String(value);

  for (const secret of secretValues) {
    text = text.split(secret).join("[redacted]");
  }

  return text
    .replace(/Bearer\s+sk-[A-Za-z0-9_-]+/g, "Bearer [redacted]")
    .replace(/sk-[A-Za-z0-9_-]+/g, "[redacted]")
    .slice(0, 300);
}

function stableStringify(value: unknown): string {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map((item) => stableStringify(item)).join(",")}]`;

  const record = value as Record<string, unknown>;
  return `{${Object.keys(record)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${stableStringify(record[key])}`)
    .join(",")}}`;
}
