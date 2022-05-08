import * as fs from 'fs';
import * as path from 'path';

export const CAPACITOR_CONFIG_TS_FILE = 'capacitor.config.ts';
export const CAPACITOR_CONFIG_JSON_FILE = 'capacitor.config.json';

export function checkForCapacitorProject(dir: string) {
  if (!fs.existsSync(dir)) throw new Error(`Invalid project path: directory ${dir} does not exist`);

  const configTsExist = fs.existsSync(path.join(dir, CAPACITOR_CONFIG_TS_FILE));
  const configJsonExist = fs.existsSync(path.join(dir, CAPACITOR_CONFIG_JSON_FILE));

  if (!configJsonExist && !configTsExist)
    throw new Error(
      `Invalid CapacitorJS project: neither ${CAPACITOR_CONFIG_TS_FILE} nor ${CAPACITOR_CONFIG_TS_FILE} exist in folder ${dir}`,
    );
}
