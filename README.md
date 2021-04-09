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
  npx capacitor-set-version [options] <version>
```

Or install globally with:

```sh-session
  npm i -g capacitor-set-version
```

# Usage

## Examples

```sh-session
// Set version to 1.2.3
capacitor-set-version 1.2.3

// Set version of project on folder ./my-app
capacitor-set-version -d my-app 1.2.3

// Set version with specific build number for android
capacitor-set-version -b 1546 1.2.3

```
