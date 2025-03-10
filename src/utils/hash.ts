import LZString from "lz-string";

export function compressURL(url: string): string {
  const normalizedURL = url.trim();

  const compressed = LZString.compressToEncodedURIComponent(normalizedURL);

  return compressed;
}

export function decompressURL(compressed: string): string {
  const decompressed = LZString.decompressFromEncodedURIComponent(compressed);

  if (
    decompressed &&
    decompressed.startsWith("http:") &&
    decompressed.indexOf("https:") === -1
  ) {
    const fixedURL = decompressed.replace("http:", "https:");
    return fixedURL;
  }

  return decompressed || "";
}
