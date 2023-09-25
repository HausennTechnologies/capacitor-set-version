import * as fs from 'fs';
import * as path from 'path';
import CustomError from './custom-error';

const GROOVY_CONFIG_FILE = 'android/app/build.gradle';
const KOTLIN_CONFIG_FILE = 'android/app/build.gradle.kts';
let isKotlin = false;

export function checkForAndroidPlatform(dir: string) {
  const androidFolderPath = path.join(dir, 'android');

  if (!fs.existsSync(androidFolderPath))
    throw new Error(`Invalid Android platform: folder ${androidFolderPath} does not exist`);

  const groovyGradleBuildFilePath = path.join(dir, 'android/app/build.gradle');
  const kotlinGradleBuildFilePath = path.join(dir, 'android/app/build.gradle.kts');

  if (!fs.existsSync(groovyGradleBuildFilePath) && !fs.existsSync(kotlinGradleBuildFilePath))
    throw new Error(`Invalid Android platform: file ${groovyGradleBuildFilePath}(.kts) does not exist`);
}

export function setAndroidVersionAndBuild (dir: string, version: string, build: number) {
  const groovyGradleBuildFilePath = path.join(dir, GROOVY_CONFIG_FILE)
  const kotlinGradleBuildFilePath = path.join(dir, KOTLIN_CONFIG_FILE)
  let file = null

  // Try read a groovy config file first
  try {
    file = openGradleBuildFile(groovyGradleBuildFilePath)
  } catch (ignored) {}

  // If no groovy config exists, look for a kotlin config file
  if (file === null) {
    try {
      file = openGradleBuildFile(kotlinGradleBuildFilePath)
      // Set locally scoped Kotlin flag
      isKotlin = true
    } catch (ignored) {}
  }

  // If neither type of file exist, throw an error
  if (file === null) {
    throw new CustomError('Failed to find a build.gradle(.kts) file.', {
      code: 'ERR_ANDROID',
      suggestions: ['Check your module level build.gradle(.kts) file.']
    })
  }

  file = setAndroidVersion(file, version)
  file = setAndroidBuild(file, build)

  saveGradleBuildFile(isKotlin ? kotlinGradleBuildFilePath : groovyGradleBuildFilePath, file)
}

function openGradleBuildFile(gradleBuildFilePath: string) {
  return fs.readFileSync(gradleBuildFilePath, 'utf-8');
}

function saveGradleBuildFile(gradleBuildFilePath: string, file: string) {
  fs.writeFileSync(gradleBuildFilePath, file, 'utf-8');
}

function setAndroidVersion(file: string, version: string): string {
  checkIfVersionNameExist(file);
  const replaceValue = isKotlin ? `versionName = "${version}"` : `versionName "${version}"`

  return file.replace(/(versionName).*/g, replaceValue);
}

function checkIfVersionNameExist(file: string) {
  if (!file.match(/(versionName).*/g)) {
    throw new CustomError(`Could not find "versionName" in android/app/build.grade(.kts) file`, {
      code: 'ERR_ANDROID',
      suggestions: ['Add "versionName" your build.gradle(.kts) file'],
    });
  }
}

function setAndroidBuild(file: string, build: number): string {
  checkIfVersionCodeExist(file);
  const replaceValue = isKotlin ? `versionCode = ${build}` : `versionCode ${build}`

  return file.replace(/(versionCode).*/g, replaceValue);
}

function checkIfVersionCodeExist(file: string) {
  if (!file.match(/(versionCode).*/g)) {
    throw new CustomError(`Could not find "versionCode" in android/app/build.grade(.kts) file`, {
      code: 'ERR_ANDROID',
      suggestions: ['Add "versionCode" to your build.gradle(.kts) file'],
    });
  }
}
