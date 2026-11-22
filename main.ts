// gta6-meme-x-01 — v10 entrypoint (Node 22).
// The entry is the X post itself: this program only hands the house the
// post's address by copying POST.json into MAKEFUN_OUTPUT_DIR.
// The meme picture (meme.png) is the post's first picture; its source
// layout is meme.html (rendered to PNG with headless Chromium).
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "POST.json");
if (!existsSync(src)) {
  console.error("POST.json is missing from the repository");
  process.exit(1);
}
copyFileSync(src, join(outDir, "POST.json"));
console.log("POST.json copied to", outDir);
