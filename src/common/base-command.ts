import { Command, Flags } from '@oclif/core';

export default abstract class BaseCommand extends Command {
  static args = [{ name: 'dir', description: 'Capacitor project root directory', required: false }];
  static flags = { quiet: Flags.boolean({ char: 'q', description: 'Print only error messages' }) };

  public quiet = false;

  public async init() {
    const { flags } = await this.parse(BaseCommand);
    this.quiet = flags.quiet;
  }

  public log(message?: string, ...args: unknown[]): void {
    if (this.quiet) return;

    super.log(message, args);
  }
}
