import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const serverDir = path.join(rootDir, ".next", "server");
const middlewareManifestPath = path.join(serverDir, "middleware-manifest.json");

const emptyMiddlewareManifest = {
  version: 3,
  middleware: {},
  functions: {},
  sortedMiddleware: [],
};

await mkdir(serverDir, { recursive: true });
await writeFile(
  middlewareManifestPath,
  `${JSON.stringify(emptyMiddlewareManifest, null, 2)}\n`,
  "utf8"
);

