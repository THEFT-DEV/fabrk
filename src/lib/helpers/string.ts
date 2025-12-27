/**
 * String Utilities
 * Functions for manipulating and transforming strings
 */

/**
 * Truncate string with ellipsis
 * @example truncate("Hello World", 8) // "Hello..."
 */
export function truncate(str: string, maxLength: number, suffix: string = '...'): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Convert string to slug (URL-safe)
 * @example slugify("Hello World!") // "hello-world"
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Capitalize first letter of string
 * @example capitalize("hello") // "Hello"
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Capitalize first letter of each word
 * @example capitalizeWords("hello world") // "Hello World"
 */
export function capitalizeWords(str: string): string {
  return str
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');
}

/**
 * Convert camelCase or PascalCase to Title Case
 * @example camelToTitle("firstName") // "First Name"
 */
export function camelToTitle(str: string): string {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

/**
 * Convert string to camelCase
 * @example toCamelCase("hello world") // "helloWorld"
 */
export function toCamelCase(str: string): string {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
}

/**
 * Convert string to snake_case
 * @example toSnakeCase("Hello World") // "hello_world"
 */
export function toSnakeCase(str: string): string {
  return str
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join('_');
}

/**
 * Extract initials from name
 * @example getInitials("John Doe") // "JD"
 */
export function getInitials(name: string, maxLength: number = 2): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, maxLength);
}

/**
 * Generate random string
 * @example randomString(16) // "a8f3k2m9p1q4r7s6"
 */
export function randomString(length: number): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Mask sensitive data (email, credit card, etc.)
 * @example maskEmail("user@example.com") // "u***@example.com"
 */
export function maskEmail(email: string): string {
  const [name, domain] = email.split('@');
  return `${name[0]}${'*'.repeat(name.length - 1)}@${domain}`;
}

/**
 * Mask credit card number
 * @example maskCreditCard("1234567890123456") // "************3456"
 */
export function maskCreditCard(cardNumber: string): string {
  return '*'.repeat(cardNumber.length - 4) + cardNumber.slice(-4);
}

/**
 * Count words in string
 */
export function countWords(str: string): number {
  return str.trim().split(/\s+/).length;
}

/**
 * Pluralize word based on count
 * @example pluralize(1, "item") // "1 item"
 * @example pluralize(2, "item") // "2 items"
 */
export function pluralize(count: number, singular: string, plural?: string): string {
  const word = count === 1 ? singular : plural || `${singular}s`;
  return `${count} ${word}`;
}
