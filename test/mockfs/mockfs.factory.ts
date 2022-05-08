export default class MockFsFactory {
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
}