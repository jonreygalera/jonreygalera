import "server-only";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

function readJson(file: string): Record<string, any> | null {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return null;
  }
}

const rootPkg = readJson(path.join(ROOT, "package.json"));

/** Installed version of a dependency (falls back to the semver range in package.json). */
export function getPackageVersion(name: string): string | null {
  const installed = readJson(path.join(ROOT, "node_modules", name, "package.json"))?.version;
  if (installed) return installed;
  const range = rootPkg?.dependencies?.[name] ?? rootPkg?.devDependencies?.[name];
  return typeof range === "string" ? range.replace(/^[^\d]*/, "") || null : null;
}

export const majorOf = (version: string | null) => version?.split(".")[0] ?? null;

export interface ThemeColor {
  name: string;
  hex: string;
  variable: string;
}

/** Reads the `--color-<scale>-<step>` tokens straight from app/globals.css. */
export function getThemeColors(): Record<"primary" | "secondary", ThemeColor[]> {
  const result: Record<"primary" | "secondary", ThemeColor[]> = { primary: [], secondary: [] };
  let css = "";
  try {
    css = fs.readFileSync(path.join(ROOT, "app", "globals.css"), "utf8");
  } catch {
    return result;
  }

  const re = /--color-(primary|secondary)-(\d+)\s*:\s*(#[0-9a-fA-F]{3,8})\s*;/g;
  for (const [, scale, step, hex] of css.matchAll(re)) {
    result[scale as "primary" | "secondary"].push({
      name: step,
      hex: hex.toUpperCase(),
      variable: `${scale}-${step}`,
    });
  }
  for (const list of Object.values(result)) list.sort((a, b) => Number(a.name) - Number(b.name));
  return result;
}
