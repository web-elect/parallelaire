import { copyFile, cp, mkdir, rm, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const outDir = process.argv[2] ?? process.env.PAGES_OUT_DIR ?? "gh-pages-dist";
const clientDir = "dist/client";
const serverPort = process.env.PAGES_SERVER_PORT ?? "4873";
const sourceUrl = process.env.PAGES_SOURCE_URL ?? `http://127.0.0.1:${serverPort}/`;
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const routesToExport = ["/", "/admin"];

const ensureTrailingSlash = (value) => (value.endsWith("/") ? value : `${value}/`);
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const isLocalSource = /^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?\/?$/i.test(sourceUrl);

async function waitForServer(url, attempts = 30, intervalMs = 1000) {
  let lastError;
  for (let index = 0; index < attempts; index += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
      lastError = new Error(`Server responded with ${response.status} ${response.statusText}`);
    } catch (error) {
      lastError = error;
    }

    await delay(intervalMs);
  }

  throw lastError ?? new Error(`Server at ${url} did not become ready in time.`);
}

function startLocalServer() {
  const vinextCliPath = path.join(projectRoot, "node_modules", "vinext", "dist", "cli.js");
  const child = spawn(process.execPath, [vinextCliPath, "start", "--port", serverPort], {
    stdio: "inherit",
    shell: false,
    env: {
      ...process.env,
      PORT: serverPort,
    },
    cwd: projectRoot,
  });

  const stop = () => {
    if (!child.killed) {
      child.kill("SIGTERM");
    }
  };

  process.on("exit", stop);
  process.on("SIGINT", () => {
    stop();
    process.exit(130);
  });
  process.on("SIGTERM", () => {
    stop();
    process.exit(143);
  });

  return { child, stop };
}

function getAssetPrefix(routePath) {
  if (routePath === "/" || routePath === "") {
    return "./";
  }

  const cleanRoute = routePath.replace(/^\/+|\/+$/g, "");
  const depth = cleanRoute ? cleanRoute.split("/").length : 0;
  return `${"../".repeat(depth)}`;
}

function rewriteOptimizedImages(html, assetPrefix) {
  return html.replace(
    /(["'(])\/_next\/image\?url=([^"&')]+)[^"')]*(["')])/g,
    (_, start, encodedPath, end) => {
      const decoded = decodeURIComponent(encodedPath).replace(/^\/+/, "");
      return `${start}${assetPrefix}${decoded}${end}`;
    },
  );
}

function rewriteRootRelativeAssets(html, assetPrefix) {
  return html
    .replace(/\s(?:srcSet|imageSrcSet)="[^"]*"/g, "")
    .replace(/\simageSizes="[^"]*"/g, "")
    .replace(/(href|src)=["']\/(?!\/|#)/g, `$1="${assetPrefix}`)
    .replace(/url\(\/(?!\/)/g, `url(${assetPrefix}`);
}

function normalizeHtml(html, routePath) {
  const assetPrefix = getAssetPrefix(routePath);
  let output = html;
  output = rewriteOptimizedImages(output, assetPrefix);
  output = rewriteRootRelativeAssets(output, assetPrefix);
  return output;
}

async function writeRouteHtml(routePath, outRoot) {
  const cleanRoute = routePath.replace(/^\/+|\/+$/g, "");
  const targetDir = cleanRoute ? path.join(outRoot, cleanRoute) : outRoot;
  const targetFile = path.join(targetDir, "index.html");
  const routeUrl = new URL(cleanRoute ? `${cleanRoute}/` : "", ensureTrailingSlash(sourceUrl)).toString();

  await mkdir(targetDir, { recursive: true });

  const response = await fetch(routeUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${routeUrl}: ${response.status} ${response.statusText}`);
  }

  const html = await response.text();
  const staticHtml = normalizeHtml(html, routePath);
  await writeFile(targetFile, staticHtml, "utf8");
  return staticHtml;
}

async function main() {
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });
  await cp(clientDir, outDir, { recursive: true });

  let server;

  try {
    if (isLocalSource) {
      server = startLocalServer();
      await waitForServer(ensureTrailingSlash(sourceUrl));
    }

    let rootHtml = "";

    for (const routePath of routesToExport) {
      const exportedHtml = await writeRouteHtml(routePath, outDir);
      if (routePath === "/") {
        rootHtml = exportedHtml;
      }
    }

    await writeFile(`${outDir}/404.html`, rootHtml, "utf8");
    await writeFile(`${outDir}/.nojekyll`, "", "utf8");
    await copyFile(`${clientDir}/favicon.svg`, `${outDir}/favicon.svg`);
  } finally {
    server?.stop();
  }

  console.log(`GitHub Pages export created in ${outDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
