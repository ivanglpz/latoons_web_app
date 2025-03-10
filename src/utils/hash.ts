import LZString from "lz-string";

export function compressURL(url: string): string {
  console.log("Original URL:", url);

  const normalizedURL = url.trim();

  const compressed = LZString.compressToEncodedURIComponent(normalizedURL);
  console.log("Compressed:", compressed);

  return compressed;
}

export function decompressURL(compressed: string): string {
  const decompressed = LZString.decompressFromEncodedURIComponent(compressed);
  console.log("Decompressed:", decompressed);

  if (
    decompressed &&
    decompressed.startsWith("http:") &&
    decompressed.indexOf("https:") === -1
  ) {
    console.log("Protocol fix needed!");
    const fixedURL = decompressed.replace("http:", "https:");
    console.log("Fixed URL:", fixedURL);
    return fixedURL;
  }

  return decompressed || "";
}
