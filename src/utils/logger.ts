import pino, {
  type DestinationStream,
  type LoggerOptions,
  type Logger as PinoLogger,
} from 'pino';

class Logger {
  private static instance: Logger;

  private constructor(
    private readonly client: PinoLogger<LoggerOptions | DestinationStream>
  ) {}

  static build(client: PinoLogger<LoggerOptions | DestinationStream>): Logger {
    if (this.instance === undefined) {
      this.instance = new Logger(client);
    }
    return this.instance;
  }

  error(msg: Error | string): void {
    this.client.error(msg);
  }

  info(msg: string): void {
    this.client.info(msg);
  }
}

export const logger = Logger.build(pino());
