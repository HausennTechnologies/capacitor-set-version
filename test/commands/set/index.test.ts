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

  describe('with only version and build flags', () => {
    test
      .stdout()
      .stderr()
      .command(['set', '-v', versionInfo.version, '-b', versionInfo.build.toString(), MockFsFactory.DIR_PROJECT])
      .it('should set the android and ios version', ctx => {
        expect(ctx.stdout).to.be.empty;
        expect(ctx.stderr).to.be.empty;
      });
  });

  describe('with aditional --json flag', () => {
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
        expect(ctx.stderr).to.be.empty;
      });
  });

  describe('with aditional -q flag', () => {
    test
      .stdout()
      .stderr()
      .command(['set', '-v', versionInfo.version, '-b', versionInfo.build.toString(), MockFsFactory.DIR_PROJECT, '-q'])
      .it('should set android and ios versions and print nothing', ctx => {
        expect(ctx.stdout).to.be.empty;
        expect(ctx.stderr).to.be.empty;
      });
  });

  describe('with a non existing project folder', () => {
    test
      .command(['set', '-v', versionInfo.version, '-b', versionInfo.build.toString(), MockFsFactory.DIR_NO_DIRECTORY])
      .catch(err => {
        expect(err.message).to.contain('Invalid project path');
      })
      .it('should error');
  });

  describe('with a non existing project folder and --json flag', () => {
    test
      .command(['set', '--json', '-v', versionInfo.version, '-b', versionInfo.build.toString(), './asd'])
      .catch(err => {
        expect(err.message).to.contain('"error":');
        expect(err.message).to.contain('Invalid project path');
      })
      .it('should error');
  });

  describe('with an invalid project folder', () => {
    test
      .command(['set', '-v', versionInfo.version, '-b', versionInfo.build.toString(), MockFsFactory.DIR_NO_PROJECT])
      .catch(err => {
        expect(err.message).to.contain('Invalid CapacitorJS project');
      })
      .it('should error');
  });

  describe('with a legacy iOS project', () => {
    test
      .stdout()
      .stderr()
      .command(['set:ios', '-v', versionInfo.version, '-b', versionInfo.build.toString(), MockFsFactory.DIR_IOS_LEGACY])
      .it('should set the version in Info.plist', ctx => {
        expect(ctx.stderr).to.be.equal(
          ` ›   Warning: Legacy iOS project detected, please update to the latest xCode\n`,
        );
        expect(ctx.stdout).to.be.empty;
      });
  });

  describe('for android project without android folder', () => {
    test
      .command(['set', '-v', versionInfo.version, '-b', versionInfo.build.toString(), MockFsFactory.DIR_NO_ANDROID])
      .catch(err => {
        expect(err.message).to.contain('Invalid Android platform: folder');
      })
      .it('should error');
  });

  describe('for android project without build.gradle file', () => {
    test
      .command([
        'set',
        '-v',
        versionInfo.version,
        '-b',
        versionInfo.build.toString(),
        MockFsFactory.DIR_NO_BUILD_GRADLE,
      ])
      .catch(err => {
        expect(err.message).to.contain('Invalid Android platform: file');
      })
      .it('should error');
  });

  describe('for android project without build.gradle version', () => {
    test
      .command([
        'set',
        '-v',
        versionInfo.version,
        '-b',
        versionInfo.build.toString(),
        MockFsFactory.DIR_NO_BUILD_GRADLE_VERSION,
      ])
      .catch(err => {
        expect(err.message).to.contain('Could not find "versionName" in build.grade file');
      })
      .it('should error');
  });

  describe('for android project without build.gradle build', () => {
    test
      .command([
        'set',
        '-v',
        versionInfo.version,
        '-b',
        versionInfo.build.toString(),
        MockFsFactory.DIR_NO_BUILD_GRADLE_BUILD,
      ])
      .catch(err => {
        expect(err.message).to.contain('Could not find "versionCode" in build.grade file');
      })
      .it('should error');
  });
});
