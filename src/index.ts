import { Command, flags } from '@oclif/command';
import * as semver from 'semver';
import * as fs from 'fs';
import * as utils from './utils';
import { ExitCode } from './exit-code';

class CapacitorSetVersion extends Command {
  static description = 'Set Android and iOS app version for capacitorjs projects.';

  static flags = {
    version: flags.string({ char: 'v' }),
    build: flags.integer({ char: 'b' }),
    android: flags.boolean({ char: 'a' }),
    ios: flags.boolean({ char: 'i' }),
    quiet: flags.boolean({ char: 'q' }),
    info: flags.version({ char: 'm' }),
    help: flags.help({ char: 'h' }),
  };

  static args = [{ name: 'dir' }];

  private quiet = false;

  async run(): Promise<void> {
    const { args, flags } = this.parse(CapacitorSetVersion);

    if (!flags.android && !flags.ios) {
      flags.android = true;
      flags.ios = true;
    }

    if (flags.quiet) {
      this.quiet = true;
    }

    const dir = this.getDir(args);
    const version = this.getVersion(dir, flags.version);

    if (!this.quiet) this.log('version: ' + version);

    if (flags.android) {
      const androidVersion = utils.getAndroidVersion({ dir });
      const androidCode = utils.getAndroidCode({ dir });

      if (!androidVersion || !androidCode) {
        this.error(`Invalid android settings: ${androidVersion}:${androidCode}`, {
          exit: ExitCode.ERROR_ANDROID,
        });
      }

      utils.setAndroidVersion({ dir, version });

      const code = flags.build ? flags.build : androidCode + 1;

      utils.setAndroidCode({ dir, code });

      if (!this.quiet) {
        this.log(`Android version: ${androidVersion} -> ${version}`);
        this.log(`Android code: ${androidCode} -> ${code}`);
      }
    }

    if (flags.ios) {
      const iosVersion = utils.getIOSVersion({ dir });

      if (!iosVersion) {
        this.error(`Invalid ios settings: ${iosVersion}`, { exit: ExitCode.ERROR_IOS });
      }

      utils.setIOSVersion({ dir, version });

      if (!this.quiet) {
        this.log(`iOS version: ${iosVersion} -> ${version}`);
      }
    }

    if (!this.quiet) {
      this.log('Done!');
    }
  }

  private getDir(args: { [name: string]: string }): string {
    if (!args.dir) {
      this.error('Project directory is required', { exit: ExitCode.ERROR_PROJECT });
    }

    if (!fs.existsSync(args.dir)) {
      this.error('Project directory does not exist', { exit: ExitCode.ERROR_PROJECT });
    }

    return args.dir;
  }

  private getVersion(dir: string, version?: string): string {
    const result = version ? version : utils.getProjectVersion({ dir });

    if (!result || !semver.valid(result)) {
      this.error(`Invalid version: ${version}`, { exit: ExitCode.ERROR_VERSION });
    }

    return result;
  }
}

export = CapacitorSetVersion;
