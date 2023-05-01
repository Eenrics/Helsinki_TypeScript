export function assertNever(entry: never): never {
  throw new Error("Undiscriminated object: " + JSON.stringify(entry));
}