export function joinErrorMessages(error: string[] | undefined) {
  return error?.join(", ");
}
