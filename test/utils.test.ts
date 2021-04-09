import { expect } from 'chai';
import { resolve } from 'path';
import * as mockfs from 'mock-fs';

import * as utils from '../src/utils';

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

  describe('project', () => {
    it('should get package.json version', () => {
      const version = utils.getProjectVersion({ dir: path });
      expect(version).equals('1.2.3');
    });

    it('should return null when dir is invalid', () => {
      const version = utils.getProjectVersion({ dir: 'invalid' });
      expect(version).to.be.null;
    });
  });

  describe('android', () => {
    it('should get android version', () => {
      const version = utils.getAndroidVersion({ dir: path });
      expect(version).equals('0.0.7');
    });

    it('should set android version', () => {
      utils.setAndroidVersion({ dir: path, version: '0.0.8' });
      const version = utils.getAndroidVersion({ dir: path });
      expect(version).equals('0.0.8');
    });

    it('should get android code', () => {
      const code = utils.getAndroidCode({ dir: path });
      expect(code).equal(8);
    });

    it('should set android code', () => {
      utils.setAndroidCode({ dir: path, code: 10 });
      const code = utils.getAndroidCode({ dir: path });
      expect(code).equals(10);
    });

    it('should return null when dir is invalid', () => {
      const version = utils.getAndroidVersion({ dir: 'invalid' });
      expect(version).to.be.null;

      const code = utils.getAndroidCode({ dir: 'invalid' });
      expect(code).to.be.null;
    });

    it('should throw on set when dir is invalid', () => {
      expect(() => utils.setAndroidVersion({ dir: 'invalid', version: '' })).to.throw();
      expect(() => utils.setAndroidCode({ dir: 'invalid', code: 0 })).to.throw();
    });
  });
});
