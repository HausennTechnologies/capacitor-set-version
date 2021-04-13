import { Command, flags } from '@oclif/command';
import * as semver from 'semver';
import * as fs from 'fs';
import * as utils from './utils';
import { ExitCode } from './exit-code';

class CapacitorSetVersion extends Command {
  static description = 'Set Android and iOS app version and build number for capacitorjs projects.';

  static flags = {
    version: flags.string({ char: 'v', description: 'Set specific vesion' }),
    build: flags.integer({ char: 'b', description: 'Set specific build' }),
    android: flags.boolean({ char: 'a', description: 'Android only' }),
    ios: flags.boolean({ char: 'i', description: 'iOS only' }),
    quiet: flags.boolean({ char: 'q', description: 'Print only error messages' }),
    info: flags.version({ char: 'm', description: 'Print tool version' }),
    help: flags.help({ char: 'h', description: 'Show help' }),
  };

  static args = [{ name: 'dir', description: 'Capacitor project root directory', required: true }];

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
