import * as mockfs from 'mock-fs';
import { resolve } from 'path';

export default class MockFsFactory {
  static DIR_PROJECT = 'project';
  static DIR_NO_PROJECT = 'no_project';
  static DIR_NO_DIRECTORY = 'no_directory';
  static DIR_NO_ANDROID = 'no_android';
  static DIR_NO_BUILD_GRADLE = 'no_build_gradle';
  static DIR_NO_BUILD_GRADLE_VERSION = 'no_build_gradle_version';
  static DIR_NO_BUILD_GRADLE_BUILD = 'no_build_gradle_build';
  static DIR_NO_IOS = 'no_ios';
  static DIR_IOS_LEGACY = 'ios_legacy';

  static FILE_PACKAGE_JSON = 'project/package.json';
  static FILE_BUILD_GRADLE = 'project/android/app/build.gradle';
  static FILE_IOS_INFO_PLIST = 'project/ios/App/App/info.plist';
  static FILE_IOS_INFO_PLIST_LEGACY = 'project/ios/App/App/info.plist.legacy';
  static FILE_IOS_PROJECT_PBXPROJ = 'project/ios/App/App.xcodeproj/project.pbxproj';
  static FILE_CAPACITOR_CONFIG_JSON = 'project/capacitor.config.json';
  static FILE_CAPACITOR_CONFIG_TS = 'project/capacitor.config.ts';

  static createMockFs() {
    mockfs({
      'package.json': mockfs.load(resolve(__dirname, '../../package.json')),
      'tsconfig.json': mockfs.load(resolve(__dirname, '../../tsconfig.json')),
      'node_modules': mockfs.load(resolve(__dirname, '../../node_modules')),
      'src': mockfs.load(resolve(__dirname, '../../src')),
      'project': {
        'capacitor.config.ts': mockfs.load(resolve(__dirname, '../mockfs/capacitor.config.ts')),
        'android': {
          app: {
            'build.gradle': mockfs.load(resolve(__dirname, '../mockfs/build.gradle')),
          },
        },
        'ios': {
          App: {
            'App': {
              'Info.plist': mockfs.load(resolve(__dirname, '../mockfs/info.plist')),
            },
            'App.xcodeproj': {
              'project.pbxproj': mockfs.load(resolve(__dirname, '../mockfs/project.pbxproj')),
            },
          },
        },
      },
      'no_project': {},
      'no_android': {
        'capacitor.config.ts': mockfs.load(resolve(__dirname, '../mockfs/capacitor.config.ts')),
        'ios': {
          App: {
            App: {
              'Info.plist': mockfs.load(resolve(__dirname, '../mockfs/info.plist')),
            },
          },
        },
      },
      'no_build_gradle': {
        'capacitor.config.ts': mockfs.load(resolve(__dirname, '../mockfs/capacitor.config.ts')),
        'android': {
          app: {},
        },
      },
      'no_build_gradle_version': {
        'capacitor.config.ts': mockfs.load(resolve(__dirname, '../mockfs/capacitor.config.ts')),
        'android': {
          app: {
            'build.gradle': mockfs.load(resolve(__dirname, '../mockfs/build.gradle.no-version')),
          },
        },
      },
      'no_build_gradle_build': {
        'capacitor.config.ts': mockfs.load(resolve(__dirname, '../mockfs/capacitor.config.ts')),
        'android': {
          app: {
            'build.gradle': mockfs.load(resolve(__dirname, '../mockfs/build.gradle.no-build')),
          },
        },
      },
      'no_ios': {
        'capacitor.config.ts': mockfs.load(resolve(__dirname, '../mockfs/capacitor.config.ts')),
        'android': {
          app: {
            'build.gradle': mockfs.load(resolve(__dirname, '../mockfs/build.gradle')),
          },
        },
      },
      'ios_legacy': {
        'capacitor.config.ts': mockfs.load(resolve(__dirname, '../mockfs/capacitor.config.ts')),
        'ios': {
          App: {
            App: {
              'Info.plist': mockfs.load(resolve(__dirname, '../mockfs/info.plist.legacy')),
            },
          },
        },
      },
    });
  }

  static resetMockFs() {
    mockfs.restore();
  }
}
