import { cp, mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const checkout = resolve(root, ".sites-checkout");
await mkdir(checkout, { recursive: true });
for (const entry of ["src", "public", "scripts", "docs", "package.json", "package-lock.json", "tsconfig.json", "build.mjs", "index.html", ".openai", ".gitignore", "README.md", "LICENSE", "THIRD_PARTY_NOTICES.md"]) {
  await cp(resolve(root, entry), resolve(checkout, entry), { recursive: true });
}
console.log("Fuentes de publicación preparadas.");
