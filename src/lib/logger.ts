/**
 * Simple Logger Utility
 * Provides consistent logging across the application
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

type LogArg =
  | string
  | number
  | boolean
  | null
  | undefined
  | Error
  | Record<string, unknown>
  | unknown[];

class Logger {
  private sanitizeSensitiveData(data: LogArg): LogArg {
    if (typeof data === 'string') {
      // Redact potential sensitive patterns
      return data
        .replace(/password['":\s]+[^,}\]]+/gi, 'password":"[REDACTED]"')
        .replace(/token['":\s]+[^,}\]]+/gi, 'token":"[REDACTED]"')
        .replace(/key['":\s]+[^,}\]]+/gi, 'key":"[REDACTED]"');
    }
    return data;
  }

  private log(level: LogLevel, message: string, ...args: LogArg[]) {
    const timestamp = new Date().toISOString();
    const sanitizedArgs = args.map((arg) => this.sanitizeSensitiveData(arg));

    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;

    switch (level) {
      case 'error':
        console.error(logMessage, ...sanitizedArgs);
        break;
      case 'warn':
        console.warn(logMessage, ...sanitizedArgs);
        break;
      case 'debug':
        if (process.env.NODE_ENV === 'development') {
          console.debug(logMessage, ...sanitizedArgs);
        }
        break;
      default:
        console.log(logMessage, ...sanitizedArgs);
    }
  }

  info(message: string, ...args: LogArg[]) {
    this.log('info', message, ...args);
  }

  warn(message: string, ...args: LogArg[]) {
    this.log('warn', message, ...args);
  }

  error(message: string, error?: Error | unknown, ...args: LogArg[]) {
    if (error instanceof Error) {
      this.log('error', message, { error: error.message, stack: error.stack }, ...args);
    } else {
      this.log('error', message, error as LogArg, ...args);
    }
  }

  debug(message: string, ...args: LogArg[]) {
    this.log('debug', message, ...args);
  }
}

export const logger = new Logger();
