import * as fs from 'fs';
import * as path from 'path';
import CustomError from './custom-error';

export const CAPACITOR_CONFIG_TS_FILE = 'capacitor.config.ts';
export const CAPACITOR_CONFIG_JS_FILE = 'capacitor.config.js';
export const CAPACITOR_CONFIG_JSON_FILE = 'capacitor.config.json';

export function checkForCapacitorProject(dir: string) {
  checkDirectoryExist(dir);

  checkCapacitorConfigExist(dir);
}

function checkDirectoryExist(dir: string) {
  if (!fs.existsSync(dir)) {
    throw new CustomError(`Invalid project path: directory ${dir} does not exist`, {
      code: 'ERR_PROJECT',
      suggestions: ["Make sure you've passed the right path to your project"],
    });
  }
}

function checkCapacitorConfigExist(dir: string) {
  const configTsExist = fs.existsSync(path.join(dir, CAPACITOR_CONFIG_TS_FILE));
  const configJsExist = fs.existsSync(path.join(dir, CAPACITOR_CONFIG_JS_FILE));
  const configJsonExist = fs.existsSync(path.join(dir, CAPACITOR_CONFIG_JSON_FILE));

  if (!configJsonExist && !configTsExist && !configJsExist) {
    throw new CustomError(
      `Invalid CapacitorJS project: neither ${CAPACITOR_CONFIG_TS_FILE}, nor ${CAPACITOR_CONFIG_JS_FILE} or ${CAPACITOR_CONFIG_JSON_FILE} exist in folder ${dir}`,
      { code: 'ERR_PROJECT', suggestions: ['Make sure you are passing the right project path'] },
    );
  }
}
