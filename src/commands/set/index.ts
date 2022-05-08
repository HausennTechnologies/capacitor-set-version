import BaseCommand from '../../common/base-command';
import SetAndroid from './android';
import { VersionInfo } from '../../common/version-info.type';
import SetIOS from './ios';

export default class Set extends BaseCommand {
  static description = 'Set Android and iOS app version and build number for capacitorjs projects.';
  static examples = ['<%= config.bin %> <%= command.id %> /project/path -v 1.0.0-rc1 -b 10'];

  static args = [...BaseCommand.args];
  static flags = { ...BaseCommand.flags };

  public async run(): Promise<VersionInfo> {
    const { args, flags } = await this.parse(Set);

    const dir = args['dir'];
    const version = flags.version;
    const build = flags.build;

    await SetAndroid.run([dir, '-v', flags.version, '-b', flags.build.toString()]);
    await SetIOS.run([dir, '-v', flags.version, '-b', flags.build.toString()]);

    return { version, build };
  }
}
