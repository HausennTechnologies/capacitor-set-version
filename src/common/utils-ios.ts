import * as fs from 'fs';
import * as plist from 'plist';
import * as path from 'path';
import CustomError from './custom-error';

export const IOS_PLIST_FILE_PATH = 'ios/App/App/Info.plist';
export const IOS_PROJECT_FILE_PATH = 'ios/App/App.xcodeproj/project.pbxproj';

export function checkForIOSPlatform(dir: string) {
  const iosFolderPath = path.join(dir, 'ios');

  if (!fs.existsSync(iosFolderPath)) {
    throw new CustomError(`Invalid iOS platform: folder ${iosFolderPath} does not exist`, {
      code: 'ERR_IOS',
      suggestions: ['Make sure your Capacitor project has the ios platform added'],
    });
  }

  const infoPlistFilePath = path.join(dir, IOS_PLIST_FILE_PATH);

  if (!fs.existsSync(infoPlistFilePath)) {
    throw new CustomError(`Invalid iOS platform: file ${infoPlistFilePath} does not exist`, {
      code: 'ERR_IOS',
      suggestions: ['Check the integrity of your ios folder', 'Add again the ios platform to your project'],
    });
  }
}

export function isLegacyIOSProject(dir: string): boolean {
  const infoPlistFilePath = path.join(dir, IOS_PLIST_FILE_PATH);

  const file = fs.readFileSync(infoPlistFilePath);

  return !file.includes('$(MARKETING_VERSION)');
}

export function setIOSVersionAndBuild(dir: string, version: string, build: number) {
  const projectFilePath = path.join(dir, IOS_PROJECT_FILE_PATH);

  let file = openIOSProjectFile(projectFilePath);

  file = setIOSVersion(file, version);
  file = setIOSBuild(file, build);

  saveIOSProjectFile(projectFilePath, file);
}

export function setIOSVersionAndBuildLegacy(dir: string, version: string, build: number) {
  const plistFilePath = path.join(dir, IOS_PLIST_FILE_PATH);

  let file = openInfoPlistFile(plistFilePath);

  const parsed = plist.parse(file);

  setIOSVersionLegacy(parsed, version);
  setIOSBuildLegacy(parsed, build);

  file = plist.build(parsed);

  saveInfoPlistFile(plistFilePath, file);
}

function openIOSProjectFile(projectFilePath: string) {
  try {
    return fs.readFileSync(projectFilePath, 'utf-8');
  } catch (error) {
    throw new CustomError(`Invalid iOS project file: file ${projectFilePath} does not exist`, {
      code: 'ERR_IOS',
    });
  }
}

function saveIOSProjectFile(projectFilePath: string, file: string) {
  fs.writeFileSync(projectFilePath, file, 'utf-8');
}

function setIOSVersion(file: string, version: string): string {
  checkIfVersionExist(file);
  return file.replace(/(MARKETING_VERSION = ).*/g, `MARKETING_VERSION = ${version};`);
}

function checkIfVersionExist(file: string) {
  if (file.match(/(MARKETING_VERSION = ).*/g)) return;

  throw new CustomError(`Could not find "MARKETING_VERSION" in project.pbxproj file`, {
    code: 'ERR_IOS',
    suggestions: [
      'Check if "MARKETING_VERSION" is found inside file ios/App/App.xcodeproj/project.pbxproj file.',
      'Update you iOS xCode project to auto manage the project version',
    ],
  });
}

function setIOSBuild(file: string, build: number): string {
  checkIfBuildNumberExist(file);

  return file.replace(/(CURRENT_PROJECT_VERSION = ).*/g, `CURRENT_PROJECT_VERSION = ${build};`);
}

function checkIfBuildNumberExist(file: string) {
  if (file.match(/(CURRENT_PROJECT_VERSION = ).*/g)) return;

  throw new CustomError(`Could not find "CURRENT_PROJECT_VERSION" in project.pbxproj file`, {
    code: 'ERR_IOS',
    suggestions: [
      'Check if "CURRENT_PROJECT_VERSION" is found inside file ios/App/App.xcodeproj/project.pbxproj file.',
      'Update you iOS xCode project to auto manage the project version',
    ],
  });
}

function openInfoPlistFile(plistFilePath: string) {
  return fs.readFileSync(plistFilePath, 'utf-8');
}

function saveInfoPlistFile(plistFilePath: string, file: string) {
  fs.writeFileSync(plistFilePath, file, 'utf-8');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setIOSVersionLegacy(infoPlist: any, version: string) {
  infoPlist.CFBundleShortVersionString = version;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setIOSBuildLegacy(infoPlist: any, build: number) {
  infoPlist.CFBundleVersion = build.toString();
}
