import LZString from "lz-string";

export function compressURL(url: string): string {
  // const encoder = new TextEncoder();
  const compressed = LZString.compressToEncodedURIComponent(url);

  return compressed;
}

export function decompressURL(url: string): string {
  // Descomprimir el texto comprimido
  const decompressed = LZString.decompressFromEncodedURIComponent(url);

  return decompressed;
}
