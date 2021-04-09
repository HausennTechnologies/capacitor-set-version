import { Command, flags } from '@oclif/command';
import * as semver from 'semver';
import * as fs from 'fs';
import * as utils from './utils';

class CapacitorSetVersion extends Command {
  static description = 'Set Android and iOS app version for capacitorjs projects.';

  static flags = {
    version: flags.string({ char: 'v' }),
    build: flags.integer({ char: 'b' }),
    android: flags.integer({ char: 'a' }),
    ios: flags.integer({ char: 'i' }),
    info: flags.integer({ char: 'm' }),
    help: flags.help({ char: 'h' }),
  };

  static args = [{ name: 'dir' }];

  async run(): Promise<void> {
    const { args, flags } = this.parse(CapacitorSetVersion);

    if (!args.dir) this.error('Project directory is required', { exit: 1 });
    if (!fs.existsSync(args.dir)) this.error('Project directory does not exist', { exit: 1 });

    const version = this.getVersion(args.dir, flags.version);

    if (!version) {
      this.error('Invalid version', { exit: 1 });
    }

    this.log('version: ' + version);

    if (flags.android) {
      const androidVersion = utils.getAndroidVersion({ dir: args.dir });
      const androidBuild = utils.getAndroidCode({ dir: args.dir });
    }
  }

  private getVersion(dir: string, version?: string): string | null {
    if (version && semver.valid(version)) {
      return version;
    } else {
      return utils.getProjectVersion({ dir });
    }
  }
}

export = CapacitorSetVersion;
