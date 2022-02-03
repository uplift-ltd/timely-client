export function assertAccountId(id: number | undefined): asserts id is number {
  if (typeof id !== "number") {
    throw new Error("Missing account id. Pass it in to TimelyClient constructor or to the method.");
  }
}
