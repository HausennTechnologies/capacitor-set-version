import BaseCommand from '../../src/common/base-command';
import { getIOSBuild, getIOSVersion } from '../../src/common/utils';

export default class iOS extends BaseCommand {
  static description = 'Get ios current version';
  static examples = ['<%= config.bin %> <%= command.id %>'];

  public async run(): Promise<any> {
    const { args, flags } = await this.parse(iOS);

    const path = args['dir'] ? args['dir'] : './';

    if (!this.isCapacitorProjectDirectory(path)) {
      this.error(new Error(`Directory ${path} is not a valid Capacitor project`));
    }

    // if (!this.isIOSProject(path)) {
    //   this.error(new Error(`Project does not have a valid iOS folder`));
    // }

    const iosVersion = getIOSVersion({ dir: path });

    if (!iosVersion) {
      this.error(new Error(`Invalid ios version: ${iosVersion}`));
    }

    const iosBuild = getIOSBuild({ dir: path });

    if (!iosBuild) {
      this.error(new Error(`Invalid ios build: ${iosBuild}`));
    }

    return { iosVersion, iosBuild };
  }

  public isCapacitorProjectDirectory(path: string) {
    return true;
  }
}
