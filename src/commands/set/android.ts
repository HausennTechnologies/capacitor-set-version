import CustomCommand from '../../common/custom-command';
import { checkForAndroidPlatform, setAndroidVersionAndBuild } from '../../common/utils-android';
import { checkForCapacitorProject } from '../../common/utils-capacitor';
import { VersionInfo } from '../../common/version-info.type';

export default class SetAndroid extends CustomCommand {
  static description = 'Set android version and build number';
  static examples = ['<%= config.bin %> <%= command.id %> /project/path -v 1.0.0-rc1 -b 10'];

  static args = [...CustomCommand.args];
  static flags = { ...CustomCommand.flags };

  public async run(): Promise<VersionInfo> {
    const { args, flags } = await this.parse(SetAndroid);

    const dir = args['dir'];
    const version = flags.version;
    const build = flags.build;

    checkForCapacitorProject(dir);
    checkForAndroidPlatform(dir);
    setAndroidVersionAndBuild(dir, version, build);

    return { version, build };
  }
}
