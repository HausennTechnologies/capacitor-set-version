import { VersionInfo } from '../../../src/common/version-info.type';
import MockFsFactory from '../../mockfs/mockfs.factory';

const versionInfo: VersionInfo = {
  version: '1.5.0-rc1',
  build: 150,
};

import { expect, test } from '@oclif/test';

describe('when capacitor-set-version is called', () => {
  beforeEach(() => {
    MockFsFactory.createMockFs();
  });

  afterEach(() => {
    MockFsFactory.resetMockFs();
  });

  describe('without any extra flags', () => {
    test
      .stdout()
      .stderr()
      .command(['set', '-v', versionInfo.version, '-b', versionInfo.build.toString(), MockFsFactory.DIR_PROJECT])
      .it('should set the android and ios version', ctx => {
        expect(ctx.stdout).to.equal('');
        expect(ctx.stderr).to.equal('');
      });
  });

  describe('with --json', () => {
    test
      .stdout()
      .stderr()
      .command([
        'set',
        '-v',
        versionInfo.version,
        '-b',
        versionInfo.build.toString(),
        MockFsFactory.DIR_PROJECT,
        '--json',
      ])
      .it('should set android and ios versions and print the new version as json', ctx => {
        expect(ctx.stdout).to.contain(JSON.stringify(versionInfo, null, 2));
        expect(ctx.stderr).to.equal('');
      });
  });

  describe('with a legacy iOS project', () => {
    test
      .stdout()
      .stderr()
      .command([
        'set:ios',
        '-v',
        versionInfo.version,
        '-b',
        versionInfo.build.toString(),
        MockFsFactory.DIR_IOS_LEGACY,
        '--json',
      ])
      .it('should set the version in Info.plist', ctx => {
        expect(ctx.stderr).to.equal('');
        expect(ctx.stdout).to.contain(JSON.stringify(versionInfo, null, 2));
      });
  });
});
