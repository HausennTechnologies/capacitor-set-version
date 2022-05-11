import { VersionInfo } from '../../../src/common/version-info.type';
import MockFsFactory from '../../mockfs/mockfs.factory';

const versionInfo: VersionInfo = {
  version: '1.5.0-rc1',
  build: 150,
};

import { expect, test } from '@oclif/test';

describe('set', () => {
  beforeEach(() => {
    MockFsFactory.createMockFs();
  });

  afterEach(() => {
    MockFsFactory.resetMockFs();
  });

  test
    .stdout()
    .stderr()
    .command(['set', '-v', versionInfo.version, '-b', versionInfo.build.toString(), MockFsFactory.DIR_PROJECT])
    .it('runs set cmd', ctx => {
      expect(ctx.stdout).to.equal('');
      expect(ctx.stderr).to.equal('');
    });

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
    .it('runs set cmd', ctx => {
      expect(ctx.stdout).to.contain(JSON.stringify(versionInfo, null, 2));
      expect(ctx.stderr).to.equal('');
    });
});
