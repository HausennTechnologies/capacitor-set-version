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
    <a href="https://github.com/HausennTechnologies/capacitor-set-version/actions/workflows/test.yml">
    <img alt="Test" src="https://github.com/HausennTechnologies/capacitor-set-version/actions/workflows/test.yml/badge.svg?branch=master">
  </a>
  <a href="https://npmjs.org/package/capacitor-set-version">
    <img alt="Downloads per week" src="https://img.shields.io/npm/dw/capacitor-set-version.svg">
  </a>
    <a href="https://github.com/HausennTechnologies/capacitor-set-version/blob/master/package.json">
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

```bash
  npx capacitor-set-version [DIR] -v <value> -b <value> [--json]
```

install as a development dependency:

```bash
  npm i -D capacitor-set-version
```

or install globally:

```bash
  npm i -g capacitor-set-version
```

# How it works

Calling `capacitor-set-version` will set your Android and iOS app versions and build number to the values passed as flags.

For Android, build number means the `versionCode` option and in iOS it will be `CFBundleVersion`.

## Options

Flags bellow are used to change the default behavior.

```bash
USAGE
  $ capacitor-set-version [DIR] -v <value> -b <value> [--json]

ARGUMENTS
  DIR  Capacitor project root directory

OPTIONS
  -b, --build=10       App build number (Integer)
  -v, --version=x.x.x  App version
  --json               Print errors and result as JSON
  -h, --help           Show help
```

## Setting version for iOS or Android only

If you need to update the version in only one platform, you can use the commands "set:ios" or "set:android", accordingly.

```bash
# Set android version only
capacitor-set-version set:android -v 1.1.1 -b 100 ./my-app

# Set ios version only
capacitor-set-version set:ios -v 1.1.1 -b 100 ./my-app
```

# Usage

## Examples

```bash
# Set version to 1.2.3 and build number to 10 on current folder.
capacitor-set-version -v 1.2.3 -b 10

# Set version of project on folder ./my-app
capacitor-set-version -v 1.2.3 -b 10 ./my-app

# Set android only version and build number
capacitor-set-version set:android -v 1.2.3-rc1 -b 1546 ./my-app

# Set iOS version only
capacitor-set-version set:ios -v 1.2.3 -b 10 ./my-app

```

# Migrating from version 1.x.x

A lot of changes were made from version 1.x.x, with some features being removed. Bellow is a list of all braking changes:

- Removed reading the version from package.json;
- Removed auto-increment for version and build numbers;
- Flags -v and -b are now mandatory;
- Replaced flags for ios and android with commands "set:ios" and "set:android".

If you need any of these features back, open up an issue relating your use case.

<br>

<p align="center">
  <a style="color: #7c7c7c; font-size: small; margin-top: 2em" href="https://www.hausenn.com.br">
  Hausenn Technologies
  </a>
</p>
