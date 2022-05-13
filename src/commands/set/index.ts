import CustomCommand from '../../common/custom-command';
import SetAndroid from './android';
import { VersionInfo } from '../../common/version-info.type';
import SetIOS from './ios';

export default class Set extends CustomCommand {
  static description = 'Set Android and iOS app version and build number for capacitorjs projects.';
  static examples = ['<%= config.bin %> <%= command.id %> /project/path -v 1.0.0-rc1 -b 10'];

  static args = [...CustomCommand.args];
  static flags = { ...CustomCommand.flags };

  public async run(): Promise<VersionInfo> {
    const { args, flags } = await this.parse(Set);

    const dir = args['dir'];
    const version = flags.version;
    const build = flags.build;

    await SetAndroid.run([dir, '-v', version, '-b', build.toString()]);
    await SetIOS.run([dir, '-v', version, '-b', build.toString()]);

    return { version, build };
  }
}
