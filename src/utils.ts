import * as fs from 'fs';

export const projectFile = '/package.json';
export const androidFile = '/android/app/build.gradle';
export const iosFile = '/ios/App/App/Info.plist';

export function getProjectVersion(options: { dir: string }): string | null {
  try {
    const file = fs.readFileSync(options.dir + projectFile, 'utf-8');
    const obj = JSON.parse(file);
    return obj.version;
  } catch (error) {
    return null;
  }
}

export function getAndroidVersion(options: { dir: string }): string | null {
  try {
    const file = fs.readFileSync(options.dir + androidFile, 'utf-8');
    return file.split('versionName "')[1].split('"')[0];
  } catch (error) {
    return null;
  }
}

export function setAndroidVersion(options: { dir: string; version: string }): void {
  const file = fs.readFileSync(options.dir + androidFile, 'utf-8');
  const result = file.replace(/(.*(?:versionName).*)/g, `        versionName "${options.version}"`);
  fs.writeFileSync(options.dir + androidFile, result, 'utf-8');
}

export function getAndroidCode(options: { dir: string }): number | null {
  try {
    const file = fs.readFileSync(options.dir + androidFile, 'utf-8');
    const buid = file.split('versionCode ')[1].split('\n')[0];
    return parseInt(buid);
  } catch (error) {
    return null;
  }
}

export function setAndroidCode(options: { dir: string; code: number }): void {
  const file = fs.readFileSync(options.dir + androidFile, 'utf-8');
  const result = file.replace(/(.*(?:versionCode).*)/g, `        versionCode ${options.code}`);
  fs.writeFileSync(options.dir + androidFile, result, 'utf-8');
}
