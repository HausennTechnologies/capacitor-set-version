import { expect, test } from '@oclif/test';
import * as fs from 'fs';

import cmd = require('../src');

describe('capacitor-set-version', () => {
  beforeEach(() => {
    const packageJson = JSON.stringify({ version: '1.2.3' }, null, 2);

    const buildGradle = `
    apply plugin: 'com.android.application'

    android {
        defaultConfig {
            versionCode 8
            versionName "0.0.7"
        }
    }`;
  });

  const infoPlist = `
  <?xml version="1.0" encoding="UTF-8"?>
  <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
  <plist version="1.0">
    <dict>
	      <key>CFBundleShortVersionString</key>
	      <string>1.0</string>
	      <key>CFBundleVersion</key>
	      <string>1</string>
	  </dict>
  </plist>`;

  test
    .stdout()
    .do(() => cmd.run([]))
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world');
    });

  test
    .stdout()
    .do(() => cmd.run(['--name', 'jeff']))
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff');
    });
});
