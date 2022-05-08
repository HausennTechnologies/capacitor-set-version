import BaseCommand from '../../common/base-command';
import { checkForCapacitorProject } from '../../common/utils-capacitor';
import {
  checkForIOSPlatform,
  isLegacyIOSProject,
  setIOSVersionAndBuild,
  setIOSVersionAndBuildLegacy,
} from '../../common/utils-ios';

import { VersionInfo } from '../../common/version-info.type';

export default class SetIOS extends BaseCommand {
  static description = 'Set iOS project version and build number';
  static examples = ['<%= config.bin %> <%= command.id %> /project/path -v 1.0.0-rc1 -b 10'];

  static args = [...BaseCommand.args];
  static flags = { ...BaseCommand.flags };

  public async run(): Promise<VersionInfo> {
    const { args, flags } = await this.parse(SetIOS);

    const dir = args['dir'];
    const version = flags.version;
    const build = flags.build;

    checkForCapacitorProject(dir);
    checkForIOSPlatform(dir);

    // In legacy xCode projects, the version information was stored inside info.plist file.
    // For modern projects, it is stored in project.pbxproj file.
    // The command will handle both legacy and modern projects.
    if (isLegacyIOSProject(dir)) {
      this.warn('Legacy iOS project detected, please update to the latest xCode');
      setIOSVersionAndBuildLegacy(dir, version, build);
    } else {
      setIOSVersionAndBuild(dir, version, build);
    }

    return { version, build };
  }
}
