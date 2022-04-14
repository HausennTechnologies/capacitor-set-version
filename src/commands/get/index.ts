import { Command, Flags } from '@oclif/core';

export default class Get extends Command {
  static description = 'Get android and ios current version';

  static examples = ['<%= config.bin %> <%= command.id %>'];

  static flags = {
    // flag with a value (-n, --name=VALUE)
    name: Flags.string({ char: 'n', description: 'name to print' }),
    // flag with no value (-f, --force)
    force: Flags.boolean({ char: 'f' }),
  };

  static args = [{ name: 'dir' }];

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Get);

    const name = flags.name ?? 'world';
    this.log(`hello ${name} from /home/kr/Projects/tools/capacitor-set-version/src/commands/get.ts`);
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`);
    }
  }
}
