import { test, expect } from '@oclif/test';
import { resolve } from 'path';

import * as mockfs from 'mock-fs';
import * as utils from '../../src/utils/utils';

import Set from '../../src/commands/set';
import { ExitCode } from '../../src/utils/exit-code';

describe('capacitor-set-version', () => {
  const path = './project';
  const pathNoAndroid = './no_android';
  const pathNoIos = './no_ios';

  beforeEach(() => {
    mockfs({
      'package.json': mockfs.load(resolve(__dirname, '../../package.json')),
      'node_modules': mockfs.load(resolve(__dirname, '../../node_modules')),
      'project': {
        'package.json': mockfs.load(resolve(__dirname, '../mockfs/package.json')),
        'android': {
          app: {
            'build.gradle': mockfs.load(resolve(__dirname, '../mockfs/build.gradle')),
          },
        },
        'ios': {
          App: {
            App: {
              'Info.plist': mockfs.load(resolve(__dirname, '../mockfs/info.plist')),
            },
          },
        },
      },
      'no_android': {
        'package.json': mockfs.load(resolve(__dirname, '../mockfs/package.json')),
        'ios': {
          App: {
            App: {
              'Info.plist': mockfs.load(resolve(__dirname, '../mockfs/info.plist')),
            },
          },
        },
      },
      'no_ios': {
        'package.json': mockfs.load(resolve(__dirname, '../mockfs/package.json')),
        'android': {
          app: {
            'build.gradle': mockfs.load(resolve(__dirname, '../mockfs/build.gradle')),
          },
        },
      },
    });
  });

  afterEach(() => {
    mockfs.restore();
  });

  describe('when called', () => {
    test
      .stdout()
      .do(() => Set.run([path]))
      .it('should set android and ios to package version and increment build number', ctx => {
        const androidVersion = utils.getAndroidVersion({ dir: path });
        const androidBuild = utils.getAndroidBuild({ dir: path });
        const iosVersion = utils.getIOSVersion({ dir: path });
        const iosBuild = utils.getIOSBuild({ dir: path });

        expect(androidVersion).to.equal('1.2.3');
        expect(androidBuild).to.equal(9);
        expect(iosVersion).to.equal('1.2.3');
        expect(iosBuild).to.equal(2);

        expect(ctx.stdout).to.contain('version: 1.2.3');
      });
  });

  describe('when called with --version', () => {
    test
      .stdout()
      .do(() => Set.run(['-v', '2.5.5', path]))
      .it('should set android and ios to --version and increment build number', ctx => {
        const androidVersion = utils.getAndroidVersion({ dir: path });
        const androidBuild = utils.getAndroidBuild({ dir: path });
        const iosVersion = utils.getIOSVersion({ dir: path });
        const iosBuild = utils.getIOSBuild({ dir: path });

        expect(androidVersion).to.equal('2.5.5');
        expect(androidBuild).to.equal(9);
        expect(iosVersion).to.equal('2.5.5');
        expect(iosBuild).to.equal(2);

        expect(ctx.stdout).to.contain('version: 2.5.5');
      });
  });

  describe('when called with --build', () => {
    test
      .stdout()
      .do(() => Set.run(['-b', '10', path]))
      .it('should set build number to specific number', ctx => {
        const androidVersion = utils.getAndroidVersion({ dir: path });
        const androidBuild = utils.getAndroidBuild({ dir: path });
        const iosVersion = utils.getIOSVersion({ dir: path });
        const iosBuild = utils.getIOSBuild({ dir: path });

        expect(androidVersion).to.equal('1.2.3');
        expect(androidBuild).to.equal(10);
        expect(iosVersion).to.equal('1.2.3');
        expect(iosBuild).to.equal(10);

        expect(ctx.stdout).to.contain('version: 1.2.3');
      });
  });

  describe('when called with --android', () => {
    test
      .stdout()
      .do(() => Set.run(['-a', path]))
      .it('should set android version only', ctx => {
        const androidVersion = utils.getAndroidVersion({ dir: path });
        const androidBuild = utils.getAndroidBuild({ dir: path });
        const iosVersion = utils.getIOSVersion({ dir: path });
        const iosBuild = utils.getIOSBuild({ dir: path });

        expect(androidVersion).to.equal('1.2.3');
        expect(androidBuild).to.equal(9);
        expect(iosVersion).to.equal('1.0');
        expect(iosBuild).to.equal(1);

        expect(ctx.stdout).to.contain('version: 1.2.3');
      });
  });

  describe('when called with --ios', () => {
    test
      .stdout()
      .do(() => Set.run(['-i', path]))
      .it('should set ios version only', ctx => {
        const androidVersion = utils.getAndroidVersion({ dir: path });
        const androidBuild = utils.getAndroidBuild({ dir: path });
        const iosVersion = utils.getIOSVersion({ dir: path });
        const iosBuild = utils.getIOSBuild({ dir: path });

        expect(androidVersion).to.equal('0.0.7');
        expect(androidBuild).to.equal(8);
        expect(iosVersion).to.equal('1.2.3');
        expect(iosBuild).to.equal(2);

        expect(ctx.stdout).to.contain('version: 1.2.3');
      });
  });

  describe('when called with --quiet', () => {
    test
      .stdout()
      .do(() => Set.run(['-q', path]))
      .it('should not print text', ctx => {
        expect(ctx.stdout).to.be.empty;
      });
  });

  describe('when project directory does not exist', () => {
    test
      .do(() => Set.run(['./doesNotExist']))
      .exit(ExitCode.ERROR_PROJECT)
      .it('should fail');
  });

  describe('when version is invalid', () => {
    test
      .do(() => Set.run(['-v', 'no.ver', path]))
      .exit(ExitCode.ERROR_VERSION)
      .it('should fail');
  });

  describe('when android files are not found', () => {
    test
      .do(() => Set.run(['-a', pathNoAndroid]))
      .exit(ExitCode.ERROR_ANDROID)
      .it('should fail');
  });

  describe('when ios files are not found', () => {
    test
      .do(() => Set.run(['-i', pathNoIos]))
      .exit(ExitCode.ERROR_IOS)
      .it('should fail');
  });
});
