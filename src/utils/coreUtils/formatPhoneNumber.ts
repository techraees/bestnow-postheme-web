export function formatPhoneNumber(number: string): string {
  return number.replace(/(\d{4})(\d{4})(\d{3})/, "$1 $2 $3");
}
