import { VersionInfo } from '../../../src/common/version-info.type';
import MockFsFactory from '../../mockfs/mockfs.factory';

import * as fs from 'fs';

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
        expect(ctx.stdout).to.contain('"status": "success"');
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
      .stdout()
      .stderr()
      .command(['set', '--json', '-v', versionInfo.version, '-b', versionInfo.build.toString(), './asd'])
      .it('should error', ctx => {
        expect(ctx.stderr).to.be.empty;
        expect(ctx.stdout).to.contain('"status": "error"');
      });
  });

  describe('with an invalid project folder', () => {
    test
      .command(['set', '-v', versionInfo.version, '-b', versionInfo.build.toString(), MockFsFactory.DIR_NO_PROJECT])
      .catch(err => {
        expect(err.message).to.contain('Invalid CapacitorJS project');
      })
      .it('should error');
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
        expect(err.message).to.contain('Could not find "versionName" in android/app/build.grade file');
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
        expect(err.message).to.contain('Could not find "versionCode" in android/app/build.grade file');
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

  describe('for ios project without ios folder', () => {
    test
      .command(['set:ios', '-v', versionInfo.version, '-b', versionInfo.build.toString(), MockFsFactory.DIR_NO_IOS])
      .catch(err => {
        expect(err.message).to.contain('Invalid iOS platform: folder');
      })
      .it('should error');
  });

  describe('for ios project without info.plist file', () => {
    test
      .command([
        'set:ios',
        '-v',
        versionInfo.version,
        '-b',
        versionInfo.build.toString(),
        MockFsFactory.DIR_IOS_NO_INFO_PLIST,
      ])
      .catch(err => {
        expect(err.message).to.contain('Invalid iOS platform: file');
      })
      .it('should error');
  });

  describe('for ios project without project file', () => {
    test
      .command([
        'set:ios',
        '-v',
        versionInfo.version,
        '-b',
        versionInfo.build.toString(),
        MockFsFactory.DIR_IOS_NO_PROJECT_FILE,
      ])
      .catch(err => {
        expect(err.message).to.contain('Invalid iOS project file: file');
      })
      .it('should error');
  });

  describe('for ios project without project version', () => {
    test
      .command([
        'set:ios',
        '-v',
        versionInfo.version,
        '-b',
        versionInfo.build.toString(),
        MockFsFactory.DIR_IOS_NO_PROJECT_VERSION,
      ])
      .catch(err => {
        expect(err.message).to.contain('Could not find "MARKETING_VERSION" in project.pbxproj file');
      })
      .it('should error');
  });

  describe('for ios project without project build', () => {
    test
      .command([
        'set:ios',
        '-v',
        versionInfo.version,
        '-b',
        versionInfo.build.toString(),
        MockFsFactory.DIR_IOS_NO_PROJECT_BUILD,
      ])
      .catch(err => {
        expect(err.message).to.contain('Could not find "CURRENT_PROJECT_VERSION" in project.pbxproj file');
      })
      .it('should error');
  });

  describe('for legacy ios project,', () => {
    test
      .command(['set:ios', '-v', versionInfo.version, '-b', versionInfo.build.toString(), MockFsFactory.DIR_IOS_LEGACY])
      .it('should set CFBundleVersion with type string (#215)', () => {
        const expectedCFBundleVersion = '<string>150</string>';
        const infoPlistFile = fs
          .readFileSync(MockFsFactory.DIR_IOS_LEGACY + '/ios/App/App/Info.plist')
          .toString('utf8');

        expect(infoPlistFile).to.contain(expectedCFBundleVersion);
      });
  });
});
