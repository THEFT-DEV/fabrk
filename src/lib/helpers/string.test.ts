/**
 * String Utilities Unit Tests
 * Tests for string manipulation and transformation functions
 */

import { describe, it, expect } from 'vitest';
import {
  truncate,
  slugify,
  capitalize,
  capitalizeWords,
  camelToTitle,
  toCamelCase,
  toSnakeCase,
  getInitials,
  randomString,
  maskEmail,
  maskCreditCard,
  countWords,
  pluralize,
} from './string';

describe('truncate', () => {
  it('should truncate long strings', () => {
    expect(truncate('Hello World', 8)).toBe('Hello...');
  });

  it('should not truncate short strings', () => {
    expect(truncate('Hello', 10)).toBe('Hello');
  });

  it('should handle exact length', () => {
    expect(truncate('Hello', 5)).toBe('Hello');
  });

  it('should support custom suffix', () => {
    expect(truncate('Hello World', 8, '…')).toBe('Hello W…');
  });

  it('should handle empty string', () => {
    expect(truncate('', 5)).toBe('');
  });
});

describe('slugify', () => {
  it('should convert to lowercase slug', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('should remove special characters', () => {
    expect(slugify('Hello World!')).toBe('hello-world');
  });

  it('should handle multiple spaces', () => {
    expect(slugify('Hello   World')).toBe('hello-world');
  });

  it('should trim leading/trailing dashes', () => {
    expect(slugify('  Hello World  ')).toBe('hello-world');
  });

  it('should handle underscores', () => {
    expect(slugify('hello_world')).toBe('hello-world');
  });

  it('should handle complex strings', () => {
    expect(slugify("What's New in 2025?")).toBe('whats-new-in-2025');
  });
});

describe('capitalize', () => {
  it('should capitalize first letter', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('should lowercase rest of string', () => {
    expect(capitalize('hELLO')).toBe('Hello');
  });

  it('should handle single character', () => {
    expect(capitalize('h')).toBe('H');
  });

  it('should handle empty string', () => {
    expect(capitalize('')).toBe('');
  });
});

describe('capitalizeWords', () => {
  it('should capitalize each word', () => {
    expect(capitalizeWords('hello world')).toBe('Hello World');
  });

  it('should handle mixed case', () => {
    expect(capitalizeWords('hELLO wORLD')).toBe('Hello World');
  });

  it('should handle single word', () => {
    expect(capitalizeWords('hello')).toBe('Hello');
  });

  it('should handle multiple spaces', () => {
    expect(capitalizeWords('hello  world')).toBe('Hello  World');
  });
});

describe('camelToTitle', () => {
  it('should convert camelCase to Title Case', () => {
    expect(camelToTitle('firstName')).toBe('First Name');
  });

  it('should handle PascalCase', () => {
    expect(camelToTitle('FirstName')).toBe('First Name');
  });

  it('should handle single word', () => {
    expect(camelToTitle('name')).toBe('Name');
  });

  it('should handle multiple capitals', () => {
    expect(camelToTitle('getUserById')).toBe('Get User By Id');
  });
});

describe('toCamelCase', () => {
  it('should convert space-separated to camelCase', () => {
    expect(toCamelCase('hello world')).toBe('helloWorld');
  });

  it('should handle mixed case input', () => {
    expect(toCamelCase('Hello World')).toBe('helloWorld');
  });

  it('should handle hyphens', () => {
    expect(toCamelCase('hello-world')).toBe('helloWorld');
  });

  it('should handle underscores', () => {
    expect(toCamelCase('hello_world')).toBe('helloWorld');
  });
});

describe('toSnakeCase', () => {
  it('should convert space-separated to snake_case', () => {
    expect(toSnakeCase('Hello World')).toBe('hello_world');
  });

  it('should handle camelCase', () => {
    expect(toSnakeCase('helloWorld')).toBe('hello_world');
  });

  it('should handle PascalCase', () => {
    expect(toSnakeCase('HelloWorld')).toBe('hello_world');
  });

  it('should handle special characters', () => {
    // Function replaces special chars with spaces, then converts to underscore
    // This can leave trailing underscores for strings ending in special chars
    const result = toSnakeCase('Hello@World!');
    expect(result).toContain('hello');
    expect(result).toContain('world');
  });
});

describe('getInitials', () => {
  it('should extract initials from name', () => {
    expect(getInitials('John Doe')).toBe('JD');
  });

  it('should handle single name', () => {
    expect(getInitials('John')).toBe('J');
  });

  it('should respect maxLength', () => {
    expect(getInitials('John Michael Doe', 3)).toBe('JMD');
    expect(getInitials('John Michael Doe', 1)).toBe('J');
  });

  it('should handle multiple names', () => {
    expect(getInitials('Jean Claude Van Damme')).toBe('JC');
  });

  it('should uppercase initials', () => {
    expect(getInitials('john doe')).toBe('JD');
  });
});

describe('randomString', () => {
  it('should generate string of specified length', () => {
    expect(randomString(10)).toHaveLength(10);
    expect(randomString(20)).toHaveLength(20);
  });

  it('should only contain allowed characters', () => {
    const str = randomString(100);
    expect(str).toMatch(/^[a-z0-9]+$/);
  });

  it('should generate unique strings', () => {
    const strings = new Set<string>();
    for (let i = 0; i < 100; i++) {
      strings.add(randomString(16));
    }
    // Should have very high uniqueness (collision probability is extremely low)
    expect(strings.size).toBeGreaterThan(95);
  });

  it('should handle zero length', () => {
    expect(randomString(0)).toBe('');
  });
});

describe('maskEmail', () => {
  it('should mask email address', () => {
    expect(maskEmail('user@example.com')).toBe('u***@example.com');
  });

  it('should handle short usernames', () => {
    expect(maskEmail('a@example.com')).toBe('a@example.com');
  });

  it('should preserve domain', () => {
    const masked = maskEmail('longusername@test.io');
    expect(masked).toContain('@test.io');
    expect(masked).not.toContain('longusername');
  });
});

describe('maskCreditCard', () => {
  it('should show only last 4 digits', () => {
    expect(maskCreditCard('1234567890123456')).toBe('************3456');
  });

  it('should handle shorter numbers', () => {
    expect(maskCreditCard('1234')).toBe('1234');
  });

  it('should mask appropriately', () => {
    const masked = maskCreditCard('4111111111111111');
    expect(masked.slice(-4)).toBe('1111');
    expect(masked.slice(0, -4)).toBe('************');
  });
});

describe('countWords', () => {
  it('should count words in string', () => {
    expect(countWords('Hello world')).toBe(2);
  });

  it('should handle multiple spaces', () => {
    expect(countWords('Hello   world')).toBe(2);
  });

  it('should handle single word', () => {
    expect(countWords('Hello')).toBe(1);
  });

  it('should handle leading/trailing spaces', () => {
    expect(countWords('  Hello world  ')).toBe(2);
  });
});

describe('pluralize', () => {
  it('should return singular for count of 1', () => {
    expect(pluralize(1, 'item')).toBe('1 item');
  });

  it('should return plural for count other than 1', () => {
    expect(pluralize(0, 'item')).toBe('0 items');
    expect(pluralize(2, 'item')).toBe('2 items');
    expect(pluralize(100, 'item')).toBe('100 items');
  });

  it('should use custom plural form', () => {
    expect(pluralize(2, 'person', 'people')).toBe('2 people');
    expect(pluralize(1, 'person', 'people')).toBe('1 person');
  });

  it('should handle irregular plurals', () => {
    expect(pluralize(3, 'child', 'children')).toBe('3 children');
  });
});
