import * as mockfs from 'mock-fs';
import { resolve } from 'path';

export default class MockFsFactory {
  static DIR_PROJECT = 'project';
  static DIR_NO_PROJECT = 'no_project';
  static DIR_NO_DIRECTORY = 'no_directory';
  static DIR_NO_ANDROID = 'no_android';
  static DIR_ANDROID_KOTLIN = 'android_kotlin'
  static DIR_NO_BUILD_GRADLE = 'no_build_gradle';
  static DIR_NO_BUILD_GRADLE_VERSION = 'no_build_gradle_version';
  static DIR_NO_BUILD_GRADLE_VERSION_KOTLIN = 'no_build_gradle_version';
  static DIR_NO_BUILD_GRADLE_BUILD = 'no_build_gradle_build_kotlin';
  static DIR_NO_BUILD_GRADLE_BUILD_KOTLIN = 'no_build_gradle_build_kotlin';
  static DIR_NO_IOS = 'no_ios';
  static DIR_IOS_LEGACY = 'ios_legacy';
  static DIR_IOS_NO_INFO_PLIST = 'ios_no_info_plist';
  static DIR_IOS_NO_PROJECT_FILE = 'ios_no_project_file';
  static DIR_IOS_NO_PROJECT_VERSION = 'ios_no_project_version';
  static DIR_IOS_NO_PROJECT_BUILD = 'ios_no_project_build';

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
      'android_kotlin': {
        'capacitor.config.ts': mockfs.load(resolve(__dirname, '../mockfs/capacitor.config.ts')),
        'android': {
          app: {
            'build.gradle': mockfs.load(resolve(__dirname, '../mockfs/build.gradle.kts')),
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
      'no_build_gradle_version_kotlin': {
        'capacitor.config.ts': mockfs.load(resolve(__dirname, '../mockfs/capacitor.config.ts')),
        'android': {
          app: {
            'build.gradle': mockfs.load(resolve(__dirname, '../mockfs/build.gradle.kts.no-version')),
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
      'no_build_gradle_build_kotlin': {
        'capacitor.config.ts': mockfs.load(resolve(__dirname, '../mockfs/capacitor.config.ts')),
        'android': {
          app: {
            'build.gradle': mockfs.load(resolve(__dirname, '../mockfs/build.gradle.kts.no-build')),
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
      'ios_no_info_plist': {
        'capacitor.config.ts': mockfs.load(resolve(__dirname, '../mockfs/capacitor.config.ts')),
        'ios': {
          App: {
            'App': {},
            'App.xcodeproj': {
              'project.pbxproj': mockfs.load(resolve(__dirname, '../mockfs/project.pbxproj')),
            },
          },
        },
      },
      'ios_no_project_file': {
        'capacitor.config.ts': mockfs.load(resolve(__dirname, '../mockfs/capacitor.config.ts')),
        'ios': {
          App: {
            'App': {
              'Info.plist': mockfs.load(resolve(__dirname, '../mockfs/info.plist')),
            },
            'App.xcodeproj': {},
          },
        },
      },
      'ios_no_project_version': {
        'capacitor.config.ts': mockfs.load(resolve(__dirname, '../mockfs/capacitor.config.ts')),
        'ios': {
          App: {
            'App': {
              'Info.plist': mockfs.load(resolve(__dirname, '../mockfs/info.plist')),
            },
            'App.xcodeproj': {
              'project.pbxproj': mockfs.load(resolve(__dirname, '../mockfs/project.pbxproj.no-version')),
            },
          },
        },
      },
      'ios_no_project_build': {
        'capacitor.config.ts': mockfs.load(resolve(__dirname, '../mockfs/capacitor.config.ts')),
        'ios': {
          App: {
            'App': {
              'Info.plist': mockfs.load(resolve(__dirname, '../mockfs/info.plist')),
            },
            'App.xcodeproj': {
              'project.pbxproj': mockfs.load(resolve(__dirname, '../mockfs/project.pbxproj.no-build')),
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
