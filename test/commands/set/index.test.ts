import { test, expect } from '@oclif/test';

import { VersionInfo } from '../../../src/common/version-info.type';
import MockFsFactory from '../../mockfs/mockfs.factory';

describe('capacitor-set-version', () => {
  const versionInfo: VersionInfo = {
    version: '1.5.0-rc1',
    build: 150,
  };

  beforeEach(() => {
    MockFsFactory.createMockFs();
  });

  afterEach(() => {
    MockFsFactory.resetMockFs();
  });

  test
    .stdout()
    // .command(['set', MockFsFactory.DIR_PROJECT, '-v', versionInfo.version, '-b', versionInfo.build.toString()])
    .command(['set', '-v', '1.1.1', '-b', '45'])
    .it('should set android and ios version and build number', ctx => {
      // expect(ctx.stdout).to.be.empty('string');
      console.log(ctx.stdout);
      expect(ctx.stdout).to.contain('set');
    });

  test
    .stdout()
    .command(['set', MockFsFactory.DIR_PROJECT, '-v', versionInfo.version, '-b', versionInfo.build.toString()])
    .it('should set android and ios to package version and increment build number', ctx => {
      expect(ctx.stdout).to.contain(JSON.stringify(versionInfo, null, 2));
    });
});
