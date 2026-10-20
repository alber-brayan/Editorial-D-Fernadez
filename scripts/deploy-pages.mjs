import { execFileSync } from "node:child_process";
import { cp, mkdir, readdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve, dirname, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, "dist");
const checkout = resolve(root, ".local/github-pages");
if (!checkout.startsWith(root + sep) || !existsSync(resolve(output, "site.js"))) throw Error("Compila la web antes de publicar.");
const git = (args, cwd = root) => execFileSync("git", args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "inherit"] }).trim();
const remote = git(["remote", "get-url", "origin"]);
const source = git(["rev-parse", "HEAD"]);
if (git(["status", "--porcelain"])) throw Error("Guarda los cambios de fuentes en un commit antes de publicar.");
await mkdir(checkout, { recursive: true });
const fresh = !existsSync(resolve(checkout, ".git"));
if (fresh) {
  if ((await readdir(checkout)).length) throw Error("La carpeta de publicación debe empezar vacía.");
  git(["init", "--initial-branch=gh-pages"], checkout);
  git(["remote", "add", "origin", remote], checkout);
}
if (git(["remote", "get-url", "origin"], checkout) !== remote) throw Error("El destino de publicación no coincide con este repositorio.");
if (git(["ls-remote", "--heads", "origin", "refs/heads/gh-pages"], checkout)) {
  git(["fetch", "--no-tags", "origin", "gh-pages"], checkout);
  if (fresh) git(["checkout", "-B", "gh-pages", "FETCH_HEAD"], checkout);
  else git(["merge", "--ff-only", "FETCH_HEAD"], checkout);
}
if (git(["branch", "--show-current"], checkout) !== "gh-pages") throw Error("Rama de publicación inesperada.");
git(["config", "user.name", git(["config", "user.name"])], checkout);
git(["config", "user.email", git(["config", "user.email"])], checkout);
// Clear only previously published, tracked files inside this generated checkout.
for (const relative of git(["ls-files", "-z"], checkout).split("\0").filter(Boolean)) {
  const file = resolve(checkout, relative);
  if (!file.startsWith(checkout + sep)) throw Error("Recurso de publicación fuera del destino.");
  await rm(file, { force: true });
}
for (const entry of await readdir(output)) await cp(resolve(output, entry), resolve(checkout, entry), { recursive: true });
git(["add", "--all"], checkout);
if (git(["diff", "--cached", "--name-only"], checkout)) git(["commit", "-m", `Publish website from ${source}`], checkout);
git(["push", "origin", "HEAD:refs/heads/gh-pages"], checkout);
console.log("Web compilada publicada en gh-pages.");
