import { Flags } from '@oclif/core';
import BaseCommand from '../common/base-command';

export default class GetAndroid extends BaseCommand {
  static description = 'Get android and ios current version';
  static examples = ['<%= config.bin %> <%= command.id %>'];

  static flags = {
    ...BaseCommand.flags,
    // flag with a value (-n, --name=VALUE)
    name: Flags.string({ char: 'n', description: 'name to print' }),
    // flag with no value (-f, --force)
    force: Flags.boolean({ char: 'f' }),
  };

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(GetAndroid);

    const name = flags.name ?? 'world';
  }
}
