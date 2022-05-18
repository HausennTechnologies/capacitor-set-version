import CustomCommand from '../../common/custom-command';
import CustomError from '../../common/custom-error';
import { checkForCapacitorProject } from '../../common/utils-capacitor';
import {
  checkForIOSPlatform,
  isLegacyIOSProject,
  setIOSVersionAndBuild,
  setIOSVersionAndBuildLegacy,
} from '../../common/utils-ios';

import { VersionInfo } from '../../common/version-info.type';

export default class SetIOS extends CustomCommand {
  static description = 'Set iOS project version and build number';
  static examples = ['<%= config.bin %> <%= command.id %> /project/path -v 1.0.0-rc1 -b 10'];

  static args = [...CustomCommand.args];
  static flags = { ...CustomCommand.flags };

  public async run(): Promise<VersionInfo> {
    const { args, flags } = await this.parse(SetIOS);

    const dir = args['dir'];
    const version = flags.version;
    const build = flags.build;

    try {
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
    } catch (error) {
      if (error instanceof CustomError) {
        this.error(error, { exit: -1, code: error.code, message: error.message, suggestions: error.suggestions });
      }

      this.error('Unknown error', { exit: -1, message: 'Unknown error', code: 'ERR_UNKNOWN' });
    }

    return { version, build };
  }
}
