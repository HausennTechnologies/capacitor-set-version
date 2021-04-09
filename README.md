<h1 align="center" style="border-bottom: none;">capacitor-set-version</h1>
<h3 align="center">Write version number and build number for Android and iOS on ionic/capacitor projects</h3>
<br />
<div align="center" style="margin-bottom: 3em">
  <a href="https://npmjs.org/package/capacitor-set-version">
    <img alt="Version" src="https://img.shields.io/npm/v/capacitor-set-version.svg">
  </a>
  <a href="https://github.com/HausennTechnologies/capacitor-set-version/actions/workflows/release.yml">
    <img alt="Release" src="https://github.com/HausennTechnologies/capacitor-set-version/actions/workflows/release.yml/badge.svg?branch=master">
  </a>
  <a href="https://david-dm.org/HausennTechnologies/capacitor-set-version">
    <img alt="Dependencies" src="https://david-dm.org/HausennTechnologies/capacitor-set-version/status.svg">
  </a>
  <a href="https://david-dm.org/HausennTechnologies/capacitor-set-version?type=dev">
    <img alt="Dev Dependencies" src="https://david-dm.org/HausennTechnologies/capacitor-set-version/dev-status.svg">
  </a>
    <a href="https://npmjs.org/package/capacitor-set-version">
    <img alt="Downloads per week" src="https://img.shields.io/npm/dw/capacitor-set-version.svg">
  </a>
    <a href="https://github.com/DKrepsky/capacitor-set-version/blob/master/package.json">
    <img alt="License" src="https://img.shields.io/npm/l/capacitor-set-version.svg">
  </a>
</div>

<p align="center">
Build With
<br />
<a href="https://oclif.io">
    <img alt="oclif" src="https://img.shields.io/badge/cli-oclif-brightgreen.svg">
  </a>
  <a href="https://github.com/semantic-release/semantic-release">
    <img alt="semantic release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg">
  </a>
</p>

# Installation

Use with npx without install:

```sh-session
  npx capacitor-set-version [options] [version]
```

install as a development dependency:

```sh-session
  npm i -g capacitor-set-version
```

or install globally:

```sh-session
  npm i -g capacitor-set-version
```

# How it works

By calling `capacitor-set-version` in your project root folder (where package.json is), Android and iOS app versions
will be set to the package.json version. Also the Android build number will be incremented.

You can pass the version number as an argument to set it manually.

## Options

Flags bellow are used to change the default behavior.

| Option    | Short form | Description              | Type                   |
| --------- | ---------- | ------------------------ | ---------------------- |
| --dir     | -d         | Change project directory | Semantic version x.x.x |
| --build   | -b         | Android build number     | Integer greater than 0 |
| --android | -a         | Android only             | Bool                   |
| --ios     | -i         | iOS only                 | Bool                   |

# Usage

## Examples

```sh-session
// Set version to 1.2.3
capacitor-set-version 1.2.3

// Set version of project on folder ./my-app
capacitor-set-version -d my-app 1.2.3

// Set version with specific build number for android
capacitor-set-version -b 1546 1.2.3

// Set iOS version only
capacitor-set-version -i

```

<p align="center">
  <a style="color: #7c7c7c; font-size: small; margin-top: 2em" href="https://www.hausenn.com.br">
  Hausenn Technologies
  </a>
</p>
