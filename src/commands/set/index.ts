import { Flags } from '@oclif/core';

import * as fs from 'fs';
import * as semver from 'semver';
import * as utils from '../../common/utils';

import ExitCode from '../../common/exit-code';
import BaseCommand from '../../common/base-command';

export default class Set extends BaseCommand {
  static description = 'Set Android and iOS app version and build number for capacitorjs projects.';

  static flags = {
    ...BaseCommand.flags,
    version: Flags.string({ char: 'v', description: 'Set specific version', helpValue: 'x.x.x' }),
    build: Flags.integer({ char: 'b', description: 'Set specific build', helpValue: '10' }),
  };

  async run(): Promise<void> {
    const { args, flags } = await this.parse(Set);

    const dir = this.getDir(args);
    const version = this.getVersion(dir, flags.version);
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
