export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}
