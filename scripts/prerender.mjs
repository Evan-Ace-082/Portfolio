import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const outputPublicDir = path.join(rootDir, ".output", "public");

async function prerender() {
  console.log("Starting GitHub Pages prerendering...");
  
  const serverPath = path.join(rootDir, ".output", "server", "index.mjs");
  if (!fs.existsSync(serverPath)) {
    console.error("Server bundle not found at:", serverPath);
    process.exit(1);
  }

  const serverModule = await import(`file://${serverPath.replace(/\\/g, "/")}`);
  const ctx = {
    waitUntil: () => {},
    context: { waitUntil: () => {} },
  };

  const response = await serverModule.default.fetch(
    new Request("http://localhost/"),
    {},
    ctx
  );

  if (response.status !== 200) {
    console.error("Failed to render page, status:", response.status);
    process.exit(1);
  }

  let html = await response.text();

  // Convert absolute root assets paths to relative for GitHub Pages subdirectory support
  // e.g., href="/assets/..." -> href="./assets/..." or src="/assets/..." -> src="./assets/..."
  html = html
    .replace(/(href|src)="\/(assets\/[^"]+)"/g, '$1="./$2"')
    .replace(/(href|src)="\/(favicon\.ico|robots\.txt)"/g, '$1="./$2"');

  if (!fs.existsSync(outputPublicDir)) {
    fs.mkdirSync(outputPublicDir, { recursive: true });
  }

  // Write index.html
  const indexPath = path.join(outputPublicDir, "index.html");
  fs.writeFileSync(indexPath, html, "utf-8");
  console.log("✓ Generated .output/public/index.html");

  // Write 404.html (for GitHub Pages SPA routing fallback)
  const notFoundPath = path.join(outputPublicDir, "404.html");
  fs.writeFileSync(notFoundPath, html, "utf-8");
  console.log("✓ Generated .output/public/404.html");

  // Write .nojekyll so GitHub Pages doesn't ignore files starting with _
  const nojekyllPath = path.join(outputPublicDir, ".nojekyll");
  fs.writeFileSync(nojekyllPath, "", "utf-8");
  console.log("✓ Generated .output/public/.nojekyll");

  console.log("Prerendering complete! Ready for GitHub Pages deployment.");
}

prerender().catch((err) => {
  console.error("Prerender error:", err);
  process.exit(1);
});
