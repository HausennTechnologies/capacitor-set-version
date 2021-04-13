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

```sh-session
  npx capacitor-set-version [options] path
```

install as a development dependency:

```sh-session
  npm i -D capacitor-set-version
```

or install globally:

```sh-session
  npm i -g capacitor-set-version
```

# How it works

Calling `capacitor-set-version` will set your Android and iOS app versions to package.json version
as well as increment the app build number.

For Android, build number means the `versionCode` option, on iOS this will use `CFBundleVersion`.

If you want, you can specify both version and build number using options flags.

## Options

Flags bellow are used to change the default behavior.

```
USAGE
  $ capacitor-set-version DIR

ARGUMENTS
  DIR  Capacitor project root directory

OPTIONS
  -a, --android        Android only
  -b, --build=10       Set specific build
  -h, --help           Show help
  -i, --ios            iOS only
  -m, --info           Print tool version
  -q, --quiet          Print only error messages
  -v, --version=x.x.x  Set specific version
```

# Usage

## Examples

```sh-session
// Set version to 1.2.3
capacitor-set-version -v 1.2.3 ./

// Set version of project on folder ./my-app
capacitor-set-version -v 1.2.3 ./my-app

// Set android version with specific build number for android
capacitor-set-version -a -b 1546 ./

// Set iOS version only
capacitor-set-version -i ./

```

<p align="center">
  <a style="color: #7c7c7c; font-size: small; margin-top: 2em" href="https://www.hausenn.com.br">
  Hausenn Technologies
  </a>
</p>
