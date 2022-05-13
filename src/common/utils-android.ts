import * as fs from 'fs';
import * as path from 'path';
import CustomError from './custom-error';

export const ANDROID_CONFIG_FILE = 'android/app/build.gradle';

export function checkForAndroidPlatform(dir: string) {
  const androidFolderPath = path.join(dir, 'android');

  if (!fs.existsSync(androidFolderPath))
    throw new Error(`Invalid Android platform: folder ${androidFolderPath} does not exist`);

  const gradleBuildFilePath = path.join(dir, 'android/app/build.gradle');

  if (!fs.existsSync(gradleBuildFilePath))
    throw new Error(`Invalid Android platform: file ${gradleBuildFilePath} does not exist`);
}

export function setAndroidVersionAndBuild(dir: string, version: string, build: number) {
  const gradleBuildFilePath = path.join(dir, 'android/app/build.gradle');

  let file = openGradleBuildFile(gradleBuildFilePath);

  file = setAndroidVersion(file, version);
  file = setAndroidBuild(file, build);

  saveGradleBuildFile(gradleBuildFilePath, file);
}

function openGradleBuildFile(gradleBuildFilePath: string) {
  return fs.readFileSync(gradleBuildFilePath, 'utf-8');
}

function saveGradleBuildFile(gradleBuildFilePath: string, file: string) {
  fs.writeFileSync(gradleBuildFilePath, file, 'utf-8');
}

function setAndroidVersion(file: string, version: string): string {
  checkIfVersionNameExist(file);
  return file.replace(/(versionName).*/g, `versionName "${version}"`);
}

function checkIfVersionNameExist(file: string) {
  if (!file.match(/(versionName).*/g)) {
    throw new CustomError(`Could not find "versionName" in android/app/build.grade file`, {
      code: 'ERR_ANDROID',
      suggestions: ['Add "versionName" your build.gradle file'],
    });
  }
}

function setAndroidBuild(file: string, build: number): string {
  checkIfVersionCodeExist(file);
  return file.replace(/(versionCode).*/g, `versionCode ${build}`);
}

function checkIfVersionCodeExist(file: string) {
  if (!file.match(/(versionCode).*/g)) {
    throw new CustomError(`Could not find "versionCode" in android/app/build.grade file`, {
      code: 'ERR_ANDROID',
      suggestions: ['Add "versionCode" to your build.gradle file'],
    });
  }
}
