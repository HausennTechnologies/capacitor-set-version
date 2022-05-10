import { Command, Flags } from '@oclif/core';

export default abstract class BaseCommand extends Command {
  static quiet = false;
  static enableJsonFlag = true;

  static args = [{ name: 'dir', description: 'Capacitor project root directory', required: false, default: './' }];
  static flags = {
    version: Flags.string({ char: 'v', description: 'Set specific version', helpValue: 'x.x.x', required: true }),
    build: Flags.integer({ char: 'b', description: 'Set specific build', helpValue: '10', required: true }),
    quiet: Flags.boolean({ char: 'q', description: 'Print only error messages' }),
  };

  public async init() {
    const { flags } = await this.parse(BaseCommand);
    BaseCommand.quiet = flags.quiet;
  }

  public log(message?: string, ...args: unknown[]): void {
    if (!BaseCommand.quiet) super.log(message, ...args);
  }

  async catch(err: Error & { exitCode?: number | undefined }) {
    const message = err?.message ?? 'unknown error';

    if (this.jsonEnabled()) {
      console.error({ error: { message } });
    } else {
      console.error(err.message);
    }
  }
}
