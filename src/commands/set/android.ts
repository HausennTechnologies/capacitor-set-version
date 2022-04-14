import { Flags } from '@oclif/core';
import BaseCommand from '../../common/base-command';

export default class Android extends BaseCommand {
  static description = 'Set android version and build number';

  static examples = ['<%= config.bin %> <%= command.id %>'];

  static flags = {
    ...BaseCommand.flags,
    // flag with a value (-n, --name=VALUE)
    name: Flags.string({ char: 'n', description: 'name to print' }),
    // flag with no value (-f, --force)
    force: Flags.boolean({ char: 'f' }),
  };

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Android);

    const androidVersion = utils.getAndroidVersion({ dir });
    const androidBuild = utils.getAndroidBuild({ dir });

    if (!androidVersion || !androidBuild) {
      this.error(`Invalid android settings: ${androidVersion}:${androidBuild}`, {
        exit: ExitCode.ERROR_ANDROID,
      });
    }

    utils.setAndroidVersion({ dir, version });

    const build = flags.build ? flags.build : androidBuild + 1;

    utils.setAndroidBuild({ dir, build: build });

    this.log(`Android version: ${androidVersion} -> ${version}`);
    this.log(`Android build: ${androidBuild} -> ${build}`);
  }
}
