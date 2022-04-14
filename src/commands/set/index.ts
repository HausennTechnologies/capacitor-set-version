import { Command, Flags } from '@oclif/core';

import * as semver from 'semver';
import * as fs from 'fs';
import * as utils from '../../utils/utils';
import { ExitCode } from '../../utils/exit-code';

export default class Set extends Command {
  static description = 'Set Android and iOS app version and build number for capacitorjs projects.';

  static flags = {
    version: Flags.string({ char: 'v', description: 'Set specific version', helpValue: 'x.x.x' }),
    build: Flags.integer({ char: 'b', description: 'Set specific build', helpValue: '10' }),
    android: Flags.boolean({ char: 'a', description: 'Android only' }),
    ios: Flags.boolean({ char: 'i', description: 'iOS only' }),
    quiet: Flags.boolean({ char: 'q', description: 'Print only error messages' }),
    info: Flags.version({ char: 'm', description: 'Print tool version' }),
    help: Flags.help({ char: 'h', description: 'Show help' }),
  };

  static args = [{ name: 'dir', description: 'Capacitor project root directory', required: true }];

  private quiet = false;

  async run(): Promise<void> {
    const { args, flags } = await this.parse(Set);

    if (!flags.android && !flags.ios) {
      flags.android = true;
      flags.ios = true;
    }

    if (flags.quiet) {
      this.quiet = true;
    }

    const dir = this.getDir(args);
    const version = this.getVersion(dir, flags.version);

    if (!this.quiet) {
      this.log('version: ' + version);
    }

    if (!this.quiet && flags.build) {
      this.log('build: ' + flags.build);
    }

    if (flags.android) {
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

      if (!this.quiet) {
        this.log(`Android version: ${androidVersion} -> ${version}`);
        this.log(`Android build: ${androidBuild} -> ${build}`);
      }
    }

    if (flags.ios) {
      const iosVersion = utils.getIOSVersion({ dir });
      const iosBuild = utils.getIOSBuild({ dir });

      if (!iosVersion || !iosBuild) {
        this.error(`Invalid ios settings: ${iosVersion}`, { exit: ExitCode.ERROR_IOS });
      }

      utils.setIOSVersion({ dir, version });

      const build = flags.build ? flags.build : iosBuild + 1;

      utils.setIOSBuild({ dir, build: build });

      if (!this.quiet) {
        this.log(`iOS version: ${iosVersion} -> ${version}`);
        this.log(`iOS build: ${iosBuild} -> ${build}`);
      }
    }

    if (!this.quiet) {
      this.log('Done!');
    }
  }

  private getDir(args: { [name: string]: string }): string {
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
