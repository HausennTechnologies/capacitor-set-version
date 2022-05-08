import * as fs from 'fs';
import * as plist from 'plist';
import * as path from 'path';

export const IOS_PLIST_FILE_PATH = 'ios/App/App/Info.plist';
export const IOS_PROJECT_FILE_PATH = 'ios/App/App.xcodeproj/project.pbxproj';

export function checkForIOSPlatform(dir: string) {
  const iosFolderPath = path.join(dir, 'ios');

  if (!fs.existsSync(iosFolderPath)) throw new Error(`Invalid iOS platform: folder ${iosFolderPath} does not exist`);

  const infoPlistFilePath = path.join(dir, IOS_PLIST_FILE_PATH);

  if (!fs.existsSync(infoPlistFilePath))
    throw new Error(`Invalid iOS platform: file ${infoPlistFilePath} does not exist`);
}

export function isLegacyIOSProject(dir: string): boolean {
  const infoPlistFilePath = path.join(dir, IOS_PLIST_FILE_PATH);

  const file = fs.readFileSync(infoPlistFilePath);

  return !file.includes('$(MARKETING_VERSION)');
}

export function setIOSVersionAndBuild(dir: string, version: string, build: number) {
  const projectFilePath = path.join(dir, IOS_PROJECT_FILE_PATH);

  let file = fs.readFileSync(projectFilePath, 'utf-8');

  file = setIOSVersion(file, version);
  file = setIOSBuild(file, build);

  fs.writeFileSync(projectFilePath, file, 'utf-8');
}

function setIOSVersion(file: string, version: string): string {
  if (!file.match(/(MARKETING_VERSION = ).*/g))
    throw new Error(`Could not find "MARKETING_VERSION" in project.pbxproj file`);

  return file.replace(/(MARKETING_VERSION = ).*/g, `MARKETING_VERSION = ${version};`);
}

function setIOSBuild(file: string, build: number): string {
  if (!file.match(/(CURRENT_PROJECT_VERSION = ).*/g))
    throw new Error(`Could not find "CURRENT_PROJECT_VERSION" in project.pbxproj file`);

  return file.replace(/(CURRENT_PROJECT_VERSION = ).*/g, `CURRENT_PROJECT_VERSION = ${build};`);
}

export function setIOSVersionAndBuildLegacy(dir: string, version: string, build: number) {
  const plistFilePath = path.join(dir, IOS_PLIST_FILE_PATH);

  let file = fs.readFileSync(plistFilePath, 'utf-8');

  const parsed = plist.parse(file);

  setIOSVersionLegacy(file, version);
  setIOSBuildLegacy(file, build);

  file = plist.build(parsed);

  fs.writeFileSync(plistFilePath, file, 'utf-8');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setIOSVersionLegacy(infoPlist: any, version: string) {
  infoPlist.CFBundleShortVersionString = version;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setIOSBuildLegacy(infoPlist: any, build: number) {
  infoPlist.CFBundleVersion = build;
}
