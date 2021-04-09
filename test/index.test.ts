import { test, expect } from '@oclif/test';
import { resolve } from 'path';

import * as mockfs from 'mock-fs';
import * as utils from '../src/utils';

import cmd = require('../src');

describe('capacitor-set-version', () => {
  const path = './mockfs';

  beforeEach(() => {
    mockfs({
      'package.json': mockfs.load(resolve(__dirname, '../package.json')),
      'node_modules': mockfs.load(resolve(__dirname, '../node_modules')),
      'mockfs': {
        'package.json': mockfs.load(resolve(__dirname, 'mockfs/package.json')),
        'android': {
          app: {
            'build.gradle': mockfs.load(resolve(__dirname, 'mockfs/build.gradle')),
          },
        },
        'ios': {
          App: {
            App: {
              'Info.plist': mockfs.load(resolve(__dirname, 'mockfs/info.plist')),
            },
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
      .do(() => cmd.run([path]))
      .it('should set android and ios to package version', ctx => {
        const androidVerion = utils.getAndroidVersion({ dir: path });
        const androidBuild = utils.getAndroidBuild({ dir: path });

        expect(androidVerion).to.equal('0.0.7');
        expect(androidBuild).to.equal(8);

        expect(ctx.stdout).to.contain('version: 1.2.3');
      });
  });

  describe('when called with --version', () => {
    test
      .skip()
      .stdout()
      .do(() => cmd.run(['-v 2.5.5', './mockfs']))
      .it('should set android and ios to --setversion', ctx => {
        expect(ctx.stdout).to.contain('version: 2.5.5');
      });
  });

  describe('when called with --build', () => {
    test
      .skip()
      .stdout()
      .do(() => cmd.run(['--name', 'jeff']))
      .it('shoud set android build number to specific number', ctx => {
        expect(ctx.stdout).to.contain('hello jeff');
      });
  });

  describe('when called with --android', () => {
    test
      .skip()
      .stdout()
      .do(() => cmd.run(['--name', 'jeff']))
      .it('shoud set android version only', ctx => {
        expect(ctx.stdout).to.contain('hello jeff');
      });
  });

  describe('when called with --ios', () => {
    test
      .skip()
      .stdout()
      .do(() => cmd.run(['--name', 'jeff']))
      .it('shoud set ios version only', ctx => {
        expect(ctx.stdout).to.contain('hello jeff');
      });
  });

  describe('when called with --android --ios', () => {
    test
      .skip()
      .stdout()
      .do(() => cmd.run(['--name', 'jeff']))
      .it('shoud set android and ios version', ctx => {
        expect(ctx.stdout).to.contain('hello jeff');
      });
  });

  // describe('should fail', () => {
  //   test
  //     .skip()
  //     .stdout()
  //     .do(() => cmd.run([]))
  //     .it('if package.json is not found', ctx => {
  //       // TBI.
  //     });

  //   test
  //     .skip()
  //     .stdout()
  //     .do(() => cmd.run([]))
  //     .it('if version is invalid', ctx => {
  //       // TBI.
  //     });

  //   test
  //     .skip()
  //     .stdout()
  //     .do(() => cmd.run([]))
  //     .it('if android is not set', ctx => {
  //       // TBI.
  //     });

  //   test
  //     .skip()
  //     .stdout()
  //     .do(() => cmd.run([]))
  //     .it('if ios is not set', ctx => {
  //       // TBI.
  //     });
  // });
});
