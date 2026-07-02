import { createServer, type IncomingMessage } from "node:http";
import { readFileSync } from "node:fs";

const port = Number(process.env.PORT ?? 3000);

function loadDotEnv() {
  try {
    const env = readFileSync(".env", "utf8");
    for (const line of env.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      const separator = trimmed.indexOf("=");
      if (separator === -1) continue;

      const key = trimmed.slice(0, separator).trim();
      const rawValue = trimmed.slice(separator + 1).trim();
      const value = rawValue.replace(/^(['"])(.*)\1$/, "$2");

      process.env[key] ??= value;
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
}

loadDotEnv();

const { default: app } = await import("./app");

async function readBody(request: IncomingMessage) {
  const chunks: Buffer[] = [];
  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

const server = createServer(async (nodeRequest, nodeResponse) => {
  try {
    const host = nodeRequest.headers.host ?? `localhost:${port}`;
    const url = new URL(nodeRequest.url ?? "/", `http://${host}`);
    const method = nodeRequest.method ?? "GET";
    const headers = new Headers();

    for (const [key, value] of Object.entries(nodeRequest.headers)) {
      if (Array.isArray(value)) {
        for (const item of value) headers.append(key, item);
      } else if (value !== undefined) {
        headers.set(key, value);
      }
    }

    const request = new Request(url, {
      method,
      headers,
      body: method === "GET" || method === "HEAD" ? undefined : await readBody(nodeRequest),
    });
    const response = await app.fetch(request);

    nodeResponse.statusCode = response.status;
    response.headers.forEach((value, key) => nodeResponse.setHeader(key, value));
    nodeResponse.end(Buffer.from(await response.arrayBuffer()));
  } catch (error) {
    console.error(error);
    nodeResponse.statusCode = 500;
    nodeResponse.end("Internal Server Error");
  }
});

server.listen(port, () => {
  console.log(`Backend API listening on http://localhost:${port}/api/health`);
});
